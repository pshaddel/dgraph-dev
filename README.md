# dgraph-dev

A ready to use local development environment for Dgraph project

## Summary of Important features
 - Schema Hot Reload
 - Lambda Script Hot Reload
 - All Logs are shown together
 - Ready-To-Use Pipeline that contains[install, lint, test, schema validation]

### Schema Hot Reload
<p align="center">
<img src="https://user-images.githubusercontent.com/43247296/225939441-943bdf1a-76b3-48ed-bfd9-e3fda82980f8.gif" width="75%">  
</p>

### Lambda Script Hot Reload
<p align="center">
<img src="https://user-images.githubusercontent.com/43247296/226066283-a39fa22f-fb2b-4107-aaec-f4fc3a6f9378.gif" width="75%">  
</p>


## Prerequisites

- <b>Nodejs</b>: You can install the latest version [here](https://nodejs.org/en/)
- <b>npm</b>:
- <b>docker</b>: Install docker engine from [here](https://docs.docker.com/engine/install/).

## Quick Start

First install the packages:

```bash
npm install
```

and then all you need to do is to run this command in project folder:

```bash
npm run start:dev
```

### Explaining Command: `npm run start:dev`

It is nodejs script that does these things:
- In case this is the first time you are running it, it creates a empty `bundle.js` file so Lambda container does not fail.
- It runs `docker compose up` and one `alpha`, one `zero`, one `lambda` is going to start running detached.
- Deploy Schema(schema.graphql)
- Bundle Typescript files in `src` folder
- Watch changes of `schema.graphql` to Redeploy Schema with each change.
- Watch changes in `src` folder and run webpack to create Javascript Bundle.
- Show you logs of all Docker Containers.

## Typescript Setup for Lambda Script
- Dgraph Lambda Version: `Dgraph@v22`
- Javascript Bundle file is created in `dist/bundle.js` and mounted to the docker container
I have used  for this project and this version needs external lambda container.
- Prettier as Formatter: [prettier](https://prettier.io/) 
- ESLint as Linter : [eslint](https://eslint.org/)
- Bundling with Webpack 5: [webpack 5](https://webpack.js.org/blog/2020-10-10-webpack-5-release/).

## Services and Default Ports

- Ratel:<b>9000</b> use `localhost:9000` for accessing ratel and executing dql commands.
- Alpha:<b>8080,9080,8000</b> these ports are mapped to alpha container
- Zero:<b>5080,6080</b> these ports are mapped to zero container
- Lambda:<b>8686</b> these ports are mapped to lambda container

You can send graphql requests to this address: `http://localhost:8080/graphql`

On Ratel set Dgraph server URL to: `http://localhost:8080`

## Examples with Tests
- How to use Authentication
- How to use Lambda Scripts
## Contribution

Feel free to open issues and pull requests.
