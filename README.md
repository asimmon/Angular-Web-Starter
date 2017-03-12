# Angular startup template with Bootstrap and SASS

## Prerequisites

Download and install the latest [LTS version of Node.js](https://nodejs.org/en/download/).

Note that no global packages are required.

## Installation du projet

Clone this repository:

    git clone git@github.com:asimmon/Angular-Web-Starter.git angularWebStarter

Then, restore all the Node.js packages:

    npm install
    
Running `npm install` will automatically trigger the installation of client libraries with Bower, such as AngularJS itself.
    
## Run the project in development mode

All you have to do is to open a terminal, go to the root folder of this project and run:

    npm run start

This command will launch the Gulp task `serve`. The `serve` script launch the following steps:

- **Starts a web server**
 - Open a local Node.js webserver with BrowserSync on localhost:3000
 - Watch your HTML, JS and SCSS files
- **Compile stylesheets**
 - Transform SCSS files to CSS
 - Automatically add compatibility CSS properties (-moz-*, -webkit-*)
 - Inject the changes into your browser in live
 - Create an unminified and minified version 
- **Minify HTML**
 - Reload your browser when HTML files are modified
- **Handle JS files**
 - Reload your browser when JS files are modified
 - Show JS warning and errors in the terminal, if any

## Create a distribution package production-ready

Again, from the root folder in a terminal, run the following command:

    npm run build

The output files will be in the `./build/dist` folder.

Just as the `start` script, you can test the production-ready package with `npm run start-dist`. 

## Coding practices

### Automatic Angular dependencies annotation

When your JS source code is minified, it is recommanded to annotate your Angular dependencies (controllers, services, etc.). Example:

	// good practice
	angular.module('myapp').controller('MyCtrl', ['$timeout', function ($timeout) {
	    // your code
	}]);
	
	// bad practice
	angular.module('myapp').controller('MyCtrl', function ($timeout) {
	    // your code
	});

After minification, the `$timeout` variable will be renamed. Prefixing the dependencies will ensure that Angular know the name of the injected dependencies. To do that automatically on each packaging, all you have to do is to add `ngInject` after each function declaration which use dependencies:

	angular.module('myapp').controller('MyCtrl', function ($timeout) {
	    'ngInject';

	    // your code
	});

### IIFE and 'use strict' hint

	(function () {
	    'use strict';

	    // your code
	})();

This practice prevent variables to be globally visible from other source code files, and keep then in a specific scope.

The keyword `use-script` enable script execution mode of JavaScript. For exemple, an error will be triggered if an undeclared variable is used.

## Gulp

Gulp is a task runner. You define many tasks (minifying, watching files to trigger specific actions, etc.). These tasks can be executed after other tasks, or be chained with a specific execution order.

This project use Gulp and some Gulp plugins:

-  **gulp-autoprefixer**: Automatically add compatiblity rules (-moz-*, -o-*, -webkit-*, etc.)
-  **gulp-sass**: Compile SCSS to CSS
-  **gulp-clean-css**: Minify CSS
-  **gulp-uglify**: Minify JavaScript
-  **gulp-htmlmin**: Minify HTML
-  **gulp-jshint**: Show JavaScript warning and errors
-  **gulp-rename**: Rename files
-  **gulp-ng-annotate**: Insert Angular dependencies annotations
-  **gulp-filter**: Filters a Node.js stream of files up to a specific file type, which allows you to work on these files, then put back the modified files in the stream
-  **gulp-useref**: Concatenate files referenced in HTML files, and allows you to modify then before
-  **gulp-load-plugins**: Lazy loading of Gulp plugin (gulp-*)
-  **gulp-angular-templatecache**: Concatenate HTML templates to an Angular JavaScript file
-  **gulp-inject**: Insert references of JS or CSS files in HTML with <script> or <link> tags. 

Some Node.js plugins are used too:

- **rimraf**: Delete folders and files (rm)
- **run-sequence**: Allows multiple tasks to be executed sequentially
- **browser-sync**: Local web server with file watching and browser asset injection/reload
- **jshint**: used by gulp-jshint

## Related links

- Angular coding styles : [https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)

- Gulp tutorial : [https://www.smashingmagazine.com/2014/06/building-with-gulp/](https://www.smashingmagazine.com/2014/06/building-with-gulp/)