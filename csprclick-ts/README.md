# CSPR.click TypeScript Example

This is a simple example of an HTML app that imports CSPR.click scripts from the CDN, using TypeScript for type safety and esbuild for bundling.

## Key Differences from csprclick-html

- **TypeScript**: Full type safety with TypeScript
- **Type Imports**: Demonstrates importing types from `@make-software/csprclick-core-types`
- **Bundler**: Uses esbuild to bundle TypeScript modules into browser-compatible JavaScript
- **Type Definitions**: Includes type definitions for CSPR.click configuration options

## Building and Running

To build and test the application, run the following commands:

```bash
npm install
npm run build
npm run serve
```

Then open your browser at [http://localhost:8080](http://localhost:8080).

## Project Structure

- `src/app.ts` - Main TypeScript application file with type imports
- `src/types.ts` - Type definitions (in production, these would come from @make-software/csprclick-core-types)
- `public/` - Static files and build output
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and build scripts

