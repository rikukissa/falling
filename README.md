# WebApp Template Project

Minimal scaffolding for quickly setting up the development environment for a new client-side web application project.

* Compiles CoffeeScript files from `src/coffee` into `public/js/modules`
* Compiles Stylus files from `src/stylus` into `public/css`
* Compiles `src/jade/index.jade` into `public/html`
* Includes a static server
* Watches for file changes and recompiles/reloads in browser
* `.gitignore` for all generated files
* 3rd party JavaScript libraries go into `public/js/vendor`

## Usage

    $ git clone https://github.com/shangaslammi/webapp-template.git
    $ cd webapp-template
    $ npm install
    $ grunt
