import { FunctionalComponent, h } from 'preact';
import Match from 'preact-router/match';
const m = Match as any;
const Notfound: FunctionalComponent = () => {
  return (
    <div class="py-14">
      <h1>Error 404</h1>
      <p>That page doesn&apos;t exist.</p>
      <m.Link href="/">
        <h4>Back to Home</h4>
      </m.Link>
    </div>
  );
};

export default Notfound;
