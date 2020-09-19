import { FunctionalComponent, h } from 'preact';
import { Route, Router, RouterOnChangeArgs } from 'preact-router';
import HomePage from '../routes/home';
import SettingsPage from '../routes/settings';
import MapPage from '../routes/map';
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
    <Settings.Provider>
      <CurrentPosition.Provider>
        <CurrentWeather.Provider>
          <RouterContext.Provider value={contextValue}>
            <div id="app">
              <Header />
              <Router onChange={handleRoute}>
                <Route path="/" component={HomePage} />
                <Route path="/map" component={MapPage} />
                <Route path="/settings" component={SettingsPage} />
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
