angular.module("MyApp").run(["$templateCache",function(a){a.put("app/views/home.html",'<div class="container"><div class="page-header"><h1>Home</h1></div><div><div class="form-group"><label for="input">Your name</label><input type="text" class="form-control" id="input" placeholder="Anything" ng-model="vm.input" ng-change="vm.sayHello()"><p class="help-block">{{vm.output}}</p></div></div></div>'),a.put("app/views/main.html",'<nav class="navbar navbar-inverse navbar-static-top"><div class="container"><div class="navbar-header"><button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" href="#">{{main.title}}</a></div><div id="navbar" class="navbar-collapse collapse"><ul class="nav navbar-nav"><li ui-sref-active="active"><a ui-sref="main.home">Home</a></li></ul></div></div></nav><div ui-view></div>'),a.put("app/views/test/azer.html",'<div class="container"><div class="page-header"><h1>Home</h1></div><div><div class="form-group"><label for="input">Your name</label><input type="text" class="form-control" id="input" placeholder="Anything" ng-model="vm.input" ng-change="vm.sayHello()"><p class="help-block">{{vm.output}}</p></div></div></div>')}]);