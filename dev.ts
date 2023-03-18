/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { exec, spawn } = require("child_process");
const fs = require("fs");
const clc = require("cli-color");
const ls = spawn("docker-compose", ["up"]);

ls.stdout.on("data", (data) => {
  console.log(`${clc.bgBlue("Docker  Container   Logs")} ${data}`);
});

function mergeSchemas() {
  exec("sh schema_merger.sh", (error, stdout, stderr) => {
    if (error) {
      console.log(now(), `error: ${error.message}, \n${clc.red(stdout)}`);
      return;
    }
    if (stderr) {
      console.log(now(), `stderr: ${stderr}`);
      return;
    }
  });
}

async function deploySchema(isFirstTimeDeployingSchema = false) {
  if (isFirstTimeDeployingSchema) {
    // sleep for 20 seconds to allow the docker container to start up
    await new Promise((resolve) => setTimeout(resolve, 20000));
    isFirstTimeDeployingSchema = false;
  }
  exec(
    "curl -X POST localhost:8080/admin/schema --data-binary '@schema.graphql'",
    (error, stdout, stderr) => {
      if (error) {
        console.log(now(), `error: ${error.message}\n${clc.red(stdout)}`);
        return;
      }
      if (stderr.lastIndexOf("errors") != -1) {
        console.error(
          now(),
          clc.red("Error in deploying schema:\n"),
          stdout,
          stderr
        );
      } else {
        console.log(now(), clc.green(`Successfully Deployed Schema`));
      }
    }
  );
}

function deployLambdaScript() {
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

mergeSchemas();
deploySchema(true);
deployLambdaScript();

// deploy only when .ts files change
fs.watch("./src", (event, path) => {
  if (path.indexOf(".ts") == -1) return;
  console.log(
    now(),
    clc.yellow("Code Change Detected: "),
    "Redeploying Lambda Script",
    event,
    clc.red(path)
  );
  deployLambdaScript();
});

// MutiSchema: watching for graphql files
fs.watch("./src", (event, path) => {
  if (path.indexOf(".graphql") == -1) return;
  console.log(
    now(),
    clc.yellow("Schema Change Detected: ", "Redeploying Schema"),
    event,
    clc.red(path)
  );
  mergeSchemas();
});

// Single Schema: only watch for schema.graphql file
fs.watch("./schema.graphql", () => {
  console.log(
    now(),
    clc.yellow("Schema Change Detected: ", "Redeploying Schema")
  );
  deploySchema();
});

const now = () => clc.bgGreen(new Date().toISOString());
