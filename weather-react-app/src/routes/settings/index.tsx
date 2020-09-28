import { FunctionalComponent, h } from 'preact';
import { icon } from '../../lib/config';

const Settings: FunctionalComponent = () => {
  return (
    <main class="container mx-auto py-14 flex flex-col justify-center items-center h-full">
      <i class="text-xl">{icon('person.crop.circle.fill')}</i>
      <p class="headline6">Settings</p>
      <p class="caption text-black text-opacity-54">
        There are currently no settings available.
      </p>
    </main>
  );
};

export default Settings;
