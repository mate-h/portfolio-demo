<a href="https://weather-psi.vercel.app"><img alt="View Demo" src="https://img.shields.io/badge/%E2%96%B3-View%20Demo-black"/></a>

# 🌤 Weather React App

> 🗒 **Assignment**
>
> Create an application that downloads the current weather forecast from the following service and displays it in a browser: https://openweathermap.org/api. The application should be written in TypeScript using the ReactJS framework, and your completed application should be uploaded to GitHub and the repo link sent to us.

I will be using `unstated-next` instead of Redux for global state management. Let's bootstrap the project with the typescript template provided by microsoft and in the official `create-react-app` command line arguments:

```bash
npx create-react-app weather-react-app --typescript && cd weather-react-app
npm i unstated-next use-http
npm i -D autoprefixer postcss-cli tailwindcss watch cli-progress
```

I then start the development server with `npm run start`, make sure my env is set up correctly in VSCode (verify code formatting, linting and typechecks), and get to the task itself. I will focus on the design a bit more this time since this is an assignment for a frontend software engineer position. I will be using Tailwind CSS as a baseline, and since it comes with some modular utility classes. I decided to go with Inter font and the default Material Design type scale for the typography, since it yields a good cross-platform look. The primary color will be the iOS system blue, mostly used for accenting CTAs, links, and interactive elements. I will also be using MapBox for its powerful toolset and data viz technology. OpenLayers and the Dark sky API are worth a mention here, but I won't be using them since the assignment specifies the Open Weather Map API, and since the Dark sky API will be unavailable due to Apple's recent acuirement.
Since weather forecasts are location specific, it seems the app needs access to the user's geolocation. There are built in browser APIs for that, so there needs to be a banner on the top to enable location access the first time the user visits the site, for a better UX. It's possible to use IP based geolocation as a fallback without the user's specific consent. Below the banner, the app attempts to show whatever information the user wants to see immediately. Assuming UX research by other weather providers, this should be current weather status, as well as a forecast for the rest of the week. I will be taking inspiration from the iOS weather app as well as Google Weather in the search results page and in native apps, as well as a popular weather app for iOS that Apple recently acquired called Dark sky. Another important aspect of weather apps is to be location agnostic, in other words, well internationalized. Inlcuding the ability for format temperature values to different units in multiple locales.
I continue by creating a quick mockup of what type of information we can display about the weather in the main screen. The sketch file can be found in the docs/design folder. I gathered a bunch of backgrounds by the artist @NathanFowkesArt on twitter, and I am using his artwork for the background. I used an AI-based online tool at https://letsenhance.io/v2/boost to upscale the resolution of 36 individual images to roughly 2400 × 1700. The background images depict the same location in different weather and lighting conditions, so I label them each to be able to display a specific one conditionally to the user based on the current weather at the current location.
Since I have a lot of experience with localization, it was mostly a breeze. I used built in `Intl` browser APIs for formatting the temperature, relative time, dates, and implemented fallbacks in case browser support is lacking (Safari). I used another online tool to translate the messages at https://smodin.me/translate-one-text-into-multiple-languages, then used the javascript console to process the data into the translations json bundle included in the source code. Since I am using English as the base language, the translation quality will be acceptable enough because this service uses Google's NMT (Neural Machine Translation) model, which is an AI-based language model. It would be interesting to see GPT-2 and GPT-3 applied in this case. Some pseudocode for the script I used in Chrome's javascript console for processing translation data can be found in [process-translations.js](scripts/process-translations.js).

## Scripts

Standard react scripts  
`npm run start`  
`npm run build`  
`npm run test`  
`npm run eject`

Custom scripts  
`build:css`  
`watch:css`  
`build:assets`
