'use strict';

var angular = require("angular");

angular.module("blogger", ["ngAnimate", "ngMaterial", require("angular-messages")]);

// require("./../node_modules/angular-material/angular-material.min.js");
require("./controllers/mainCtrl.js");
require("./controllers/registerCtrl.js");
require("./controllers/profileCtrl.js");
require("./controllers/createPostCtrl.js");
require("./controllers/postViewCtrl.js");
require("./filters/blurbFilter.js");
require("./services/dataService.js");