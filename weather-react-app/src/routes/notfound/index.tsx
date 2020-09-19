import { FunctionalComponent, h } from 'preact';

const Notfound: FunctionalComponent = () => {
  return (
    <div class="py-14">
      <h1>Error 404</h1>
      <p>That page doesn&apos;t exist.</p>
      <a href="/">
        <h4>Back to Home</h4>
      </a>
    </div>
  );
};

export default Notfound;
