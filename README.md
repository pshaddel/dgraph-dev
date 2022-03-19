# dgraph-dev
A ready to use local development environment for Dgraph project

## Prerequisites
- <b>Nodejs</b>: You can install the latest version [here](https://nodejs.org/en/)
- <b>npm</b>:
- <b>docker</b>: Install docker engine from [here](https://docs.docker.com/engine/install/).
- <b>docker-compose</b>: You can find the latest version of docker-compose [here](https://docs.docker.com/compose/install/)

## Quick Start
All you need to do is to run this command in project folder:
```bash
npm run start:dev
```
After running this command you are going to see something like this in your console:

### What this `npm run start:dev` command is doing?
It is simple nodejs script that does these things:

- before starting this nodejs script it runs `docker-compose up` and one alpha, one zero, one lambda is going to start running detached.
- deploy schema
- bundle typescript files in `src` folder
- watch changes of `schema.graphql` on redeploy schema.
- watch changes in `src` folder and run webpack to create javascript bundle.

## Lambda Script
I have used dgraph 21.03 for this project and this version needs external lambda container. You can checkout `docker-compose.yml` file to see the lambda container, also this address `dist/bundle.js` is mounted as a volume to this container. Instead of using `javascript` I used `typescript` because it was safer and you can check this [stackoverflow issue](https://stackoverflow.com/questions/12694530/what-is-typescript-and-why-would-i-use-it-in-place-of-javascript) to know more about differences.

I have used [prettier](https://prettier.io/) as formatter and [eslint](https://eslint.org/) as linter for safer and cleaner code.

For bundling I have used [webpack 5](https://webpack.js.org/blog/2020-10-10-webpack-5-release/).

## Services and Default Ports
- Ratel:<b>9000</b> use `localhost:9000` for accessing ratel and executing dql commands.
- Alpha:<b>8080,9080,8000</b> these ports are mapped to alpha container
- Zero:<b>5080,6080</b> these ports are mapped to zero container
- Lambda:<b>8686</b> these ports are mapped to lambda container

You can send graphql requests to this address: `http://localhost:8080/graphql`

On Ratel set Dgraph server URL to: `http://localhost:8080`

## Contribution
Feel free to open issues and pull requests.