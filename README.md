## Description
This repository hosts a demo for the Collock team for an assigment in the job interviewing process.

## Intro
To better demonstrate my ability of strategic problemsolving and documentation, I decided to also document the process of how I complete both assignments. To get started, I open VS Code and create a new git repository called `collock-demo`, so I can version my changes. Within this main folder is where I can create sub-folders for each module. For folders and files I will be using a snake-case naming convention. For this demo, I will be creating four modules, one for the first assignment called `design-documentation` and two for the second assignment: `jobs-react-app` and `jobs-sapper-app`. I have worked 3 years with Material UI, and I have successfully ransitioned an entire production codebase from v1 to v2, then from v2 to v3. Fortunately, there is a frontend UI language called Svelte and I have gained enough experience with it to demonstrate it as well, because there are many advanates that it provides.

To bootstrap each project, I use the fish shell to execute the following commands: 
```
curl https://codeload.github.com/mui-org/material-ui/tar.gz/master | tar -xz --strip=2 material-ui-master/examples/create-react-app-with-typescript
mv create-react-app-with-typescript jobs-react-app
npm install
```

```
npx degit "sveltejs/sapper-template#rollup" jobs-sapper-app
``