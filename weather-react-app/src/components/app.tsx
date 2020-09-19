import { FunctionalComponent, h } from 'preact';
import { Route, Router, RouterOnChangeArgs } from 'preact-router';
import Home from '../routes/home';
import Profile from '../routes/profile';
import NotFoundPage from '../routes/notfound';
import Header from './header';
import {
  RouterContext,
  Settings,
  CurrentPosition,
  CurrentWeather,
} from './containers';
import { useState } from 'preact/hooks';

const App: FunctionalComponent = () => {
  // let currentUrl: string;
  let [contextValue, setContextValue] = useState<
    RouterOnChangeArgs | undefined
  >(undefined);
  const handleRoute = (e: RouterOnChangeArgs) => {
    // currentUrl = e.url;
    setContextValue(e);
  };

  return (
    <Settings.Provider value={{} as any}>
      <CurrentPosition.Provider value={{} as any}>
        <CurrentWeather.Provider value={{} as any}>
          <RouterContext.Provider value={contextValue}>
            <div id="app">
              <Header />
              <Router onChange={handleRoute}>
                <Route path="/" component={Home} />
                <Route path="/map" component={Profile} user="me" />
                <Route path="/settings" component={Profile} />
                <NotFoundPage default />
              </Router>
            </div>
          </RouterContext.Provider>
        </CurrentWeather.Provider>
      </CurrentPosition.Provider>
    </Settings.Provider>
  );
};

export default App;
