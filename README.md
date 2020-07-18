## Description

This repository hosts a demo for the Collock team for an assigment in the job interviewing process.

## Intro

To better demonstrate my ability of strategic problemsolving and documentation, I decided to also document the process of how I complete both assignments. To get started, I open up my terminal and create a new git repository called `portfolio-demo`, so I can version my changes. Within this main folder is where I can create sub-folders for each module. For folders and files I will be using a snake-case naming convention. For this demo, I will be creating two modules, one for the first assignment called `design-documentation` and one for the second assignment: `jobs-react-app`.

## Material UI React app

I have worked 3 years with Material UI, and I have successfully ransitioned an entire production codebase from v1 to v2, then from v2 to v3.
My developer environment is set up using the fish shell, my IDE of choice is VS Code with the appropriate extensions, and the SF Mono font in Chrome Dev Tools, VS Code, and the Alacritty terminal to match the system look and feel. I have added the FiraCode font's ligatures into SF Mono to get a better development experience with symbols. To bootstrap the project, I use the fish shell to execute the following commands:

```bash
curl https://codeload.github.com/mui-org/material-ui/tar.gz/master | tar -xz --strip=2 material-ui-master/examples/create-react-app-with-typescript
mv create-react-app-with-typescript jobs-react-app && cd jobs-react-app
npm install icepick use-http interweave react-router-dom
```

I use four basic dependencies: `react-router-dom` for clientside routing, `icepick` for treating frozen JavaScript objects as persistent immutable collections to implement a store, `use-http` for making isomorphic http requests with React hooks, and lastly, `interweave` to safely render HTML (the description field in the job posting object), filter attributes, autowrap text with matchers, render emoji characters, and so on.

> 📘 Note
>
> _To those using Deno with the VSCode Extension: you should disable it for the Node typescript environment to work._

For the most part, I avoid using default exports with ES6 modules (there are some exceptions), for the sake of better structure and easier to read codebase. I declare the type definitions in a typescript module based on the GitHub Jobs API documentation, also copy it into the inline JSDoc so that the intellisense will help me during the development process. It seems like the folks at GitHub don't have CORS enabled, so I will use a proxy for the GitHub Jobs API through `https://cors-anywhere.herokuapp.com/https://jobs.github.com`. I created a basic store that uses `use-http` library's built in `onNewData` hook whenever a page component mounts. I designed the store state in a way that it handles data from the two endpoints separately, even though they happen to be the same in case of the `JobPosting` object. I enabled a basic caching strategy with 24 hour expiration for persistance of the fetched data, which is built into the library. I made minor changes to the default theme by using Apple system colors, and the Inter webfont for a native look and feel.
Basic component structure is: the `JobsPage` shows a list of `JobPosting` components. Each `JobPosting` component then navigates to a `JobDetailsPage`, where there is a `BackNavigation` to the original master page. It is important to note that in the `JobPosting` component, I set the `state: { from: location.pathname }` on the router's link props, so that other components know that this page is being navigated from a master to detail view. This way, scroll restoration and the back link can be managed easily by relying on the browser rather than `window.scrollTo(x, y)`.
