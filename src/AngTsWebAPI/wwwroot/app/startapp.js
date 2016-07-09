System.register(["angular2/router", "angular2/core", './app.component', './placehold.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var router_1, core_1, app_component_1, placehold_component_1;
    var StartApp;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (placehold_component_1_1) {
                placehold_component_1 = placehold_component_1_1;
            }],
        execute: function() {
            StartApp = (function () {
                function StartApp(router, location) {
                    this.router = router;
                    this.location = location;
                    this.routes = null;
                }
                StartApp.prototype.ngOnInit = function () {
                    // route
                    if (this.routes === null) {
                        this.routes = [
                            { path: "/flightapp", component: app_component_1.AppComponent, name: "AppComponent", useAsDefault: false },
                            { path: "/placeholdapp", component: placehold_component_1.PlaceholdComponent, name: "PlaceholdComponent", useAsDefault: false }
                        ];
                        this.router.config(this.routes);
                    }
                };
                StartApp.prototype.getLinkStyle = function (route) {
                    return this.location.path().indexOf(route.path) > -1;
                };
                StartApp = __decorate([
                    core_1.Component({
                        selector: "app",
                        templateUrl: "/app/startapp.html",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, (typeof (_a = typeof router_1.Location !== 'undefined' && router_1.Location) === 'function' && _a) || Object])
                ], StartApp);
                return StartApp;
                var _a;
            }());
            exports_1("StartApp", StartApp);
        }
    }
});
//# sourceMappingURL=startapp.js.map