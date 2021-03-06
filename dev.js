const { exec, spawn } = require("child_process");
const fs = require('fs');
const clc = require("cli-color");

const ls = spawn('docker-compose', ['up']);

ls.stdout.on('data', (data) => {
    console.log(`${clc.bgBlue("Docker  Container   Logs")} ${data}`);
});

const deploySchema = () => {
    exec("curl -X POST localhost:8080/admin/schema --data-binary '@schema.graphql'", (error, stdout, stderr) => {
        if (error) {
            console.log(now(), `error: ${error.message}\n${clc.red(stdout)}`);
            return;
        }
        if (stderr.lastIndexOf('errors') != -1 || stdout.lastIndexOf('errors') != -1) {
            console.error(now(), clc.red("Error in deploying schema:\n"), stdout, stderr)
        } else {
            console.log(now(), clc.green(`Successfully Deployed Schema`));
        }
    });
}

const deployLambdaScript = () => {
    exec("npm run build:development", (error, stdout, stderr) => {
        if (error) {
            console.log(now(), `error: ${error.message}, \n${clc.red(stdout)}`);
            return;
        }
        if (stderr) {
            console.log(now(), `stderr: ${stderr}`);
            return;
        }
        /**
         * Webpack contains this message when it's done building the bundle.
         */
        if (stdout.indexOf("compiled successfully") != -1) {
            console.log(now(), clc.green("Successfully Compiled TS to JS Bundle"));
        } else {
            console.log(now(), clc.red("Webpack Error: "), `stdout: ${stdout}`);
        }
    });
}


deploySchema();
deployLambdaScript();

fs.watch('./src', (event, path) => {
    console.log(now(), clc.yellow("Code Change Detected: "), "Redeploying your Lambda Script", event, clc.red(path));
    deployLambdaScript()
});

fs.watch('./schema.graphql', () => {
    isDeployingSchema = true;
    console.log(now(), clc.yellow("Schema Change Detected: ", "Redeploying Schema"));
    deploySchema();
});


const now = () => clc.bgGreen(new Date().toISOString())