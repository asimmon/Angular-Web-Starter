# Template d'application web Angular avec Bootstrap SASS

## Prérequis

Installer [Node.js LTS 4.4.X](https://nodejs.org).

Ensuite, installer les packages node suivants de manière globale:

    npm install --global bower gulp-cli

## Installation du projet

Récupérer le projet sur bitbucket:

    git clone git@bitbucket.org:c2i-outremer/angular-web-base.git

Installer les packages node locaux:

    npm install
    
Installer les packages bower

    bower install
    
## Lancer le projet en mode développement

Se positionner dans le répertoire racine du projet et lancer la commande:

    gulp

Cela équivaut à lancer la tâche `gulp serve` (définie comme tâche gulp principale).Cette commande permer de:

- **Lancer un serveur web**
 - Utilise un serveur local Node.js avec BrowserSync
 - Ouvre le navigateur
 - Surveille les fichiers et écrit dans la console le nom des fichiers modifiés
- **Fichiers SCSS / CSS**
 - Compiler les fichier SCSS en CSS au moindre changement
 - Ajouter les propriétés CSS de compatibilité (-moz-*, -webkit-*) automatiquement
 - Injecter le fichier CSS compiler dans le navigateur sans rechargement
 - Crée une version CSS combinée et une version combinée et minifiée
- **Fichiers HTML**
 - Recharge le navigateur au moindre changement
- **Fichiers JS**
 - Recharge le navigateur au moindre changement
 - Détecte les erreurs et les avertissements

## Créer un package de déploiement pour la production

Se positionner dans le répertoire racine du projet et lancer la commande:

    gulp build

Les fichiers sources prêts au déploiement sont publiés dans le dossier `./build/dist`

Il est possible de tester ce package de déploiement avec `gulp serve:dist`.

## Pratiques à appliquer

### Injection automatique des dépendances Angular par annotation

En cas de minification des fichiers JS, il est recommandé d'annoter les dépendances injectés dans les fonctions Angular (contrôleurs, services, etc.). Exemple:

	// bonne pratique
	angular.module('myapp').controller('MyCtrl', ['$timeout', function ($timeout) {
	    // implémentation
	}]);
	
	// mauvaise pratique
	angular.module('myapp').controller('MyCtrl', function ($timeout) {
	    // implémentation
	});

Après minification, la variable `$timeout` injectée sera renommée. Le préfixage permet de garder le nom des dépendances injectées. Pour faire cela automatiquement à la construction du package de déploiement, il faut ajouter la chaîne `ngInject` au début des fonctions qui utilisent des dépendances:

	angular.module('myapp').controller('MyCtrl', function ($timeout) {
	    'ngInject';

	    // implémentation
	});

### Utilisation de IIFE et 'use strict'

	(function () {
	    'use strict';

	    // implémentation
	})();

Cette pratique permet de ne pas exposer des variables JS de façon globale et de restreindre leur utilisation dans un scope précis.

L'utilisation du mot-clé use-strict permet d'exécuter le code JS de manière stricte. Exemple, une erreur sera émise au lieu d'un avertissement si une variable qui n'existe pas est utilisée.

## Gulp

Gulp est un "automatiseur de tâches". On y définit plusieurs tâches (minification, surveillance de fichier pour déclencher des actions spécifiques...). Les tâches peuvent être dépendantes d'autres tâches (ordre d'exécution).

Ce projet utilise Gulp et plusieurs autres plugin Gulp:

-  **gulp-autoprefixer**: Ajoute les propriétés CSS spécifiques pour certains navigateurs (-moz-*, -o-*, -webkit-*, etc.)
-  **gulp-sass**: Compilation de fichiers SCSS
-  **gulp-clean-css**: Minification CSS
-  **gulp-uglify**: Minification Javascript
-  **gulp-htmlmin**: Minification HTML
-  **gulp-jshint**: Affichage de warnings et erreurs Javascript
-  **gulp-rename**: Renommage de fichiers
-  **gulp-ng-annotate**: Annotations des dépendances Angular automatiques
-  **gulp-filter**: Restreint un stream Node (flux de plusieurs fichiers) à un type de fichiers, ce qui permet de travailler sur ces fichiers puis de restaurer le flux à son état initial
-  **gulp-useref**: Permet le traitement de fichiers référencés dans l'HTML via des commentaires <!-- build etc.
-  **gulp-load-plugins**: Lazy loading des plugins Gulp (gulp-*)

D'autres plugins Nodes.js sont utilisés par Gulp:

- **rimraf**: suppression de fichiers et dossiers (rm)
- **run-sequence**: permet de lancer plusieurs tâches successivements
- **browser-sync**: Serveur local node.js avec surveillance de fichiers (injection ou rechargement du navigateur)
- **jshint**: utilisé par gulp-jshint

## Liens

- Coding styles pour Angular : [https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)

- Tutoriel Gulp : [https://www.smashingmagazine.com/2014/06/building-with-gulp/](https://www.smashingmagazine.com/2014/06/building-with-gulp/)