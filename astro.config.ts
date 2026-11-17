import { defineConfig } from 'astro/config';
import { site } from './src/config/site';

export default defineConfig({
  site: site.url,
  output: 'static',
  trailingSlash: 'never',
  build: {
    // Never inline CSS into <style> tags: the CSP forbids inline styles (ADR 0004).
    inlineStylesheets: 'never',
    format: 'file',
  },
  // Keep the dev toolbar out of the way; it never ships to production either way.
  devToolbar: { enabled: false },
});
