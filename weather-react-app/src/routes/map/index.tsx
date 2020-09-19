import { FunctionalComponent, h } from 'preact';
import { useRef } from 'preact/hooks';
import { useMap } from '../../lib/hooks';

const MapPage: FunctionalComponent = () => {
  const containerRef = useRef<HTMLDivElement>();
  useMap({ container: containerRef });
  return (
    <main class="h-full py-14 sm:pb-0">
      <div ref={containerRef} class="h-full"></div>
    </main>
  );
};

export default MapPage;
