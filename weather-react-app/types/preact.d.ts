import 'preact';

declare module 'preact' {
  interface PreactDOMAttributes {
    native?: boolean;
  }
}
