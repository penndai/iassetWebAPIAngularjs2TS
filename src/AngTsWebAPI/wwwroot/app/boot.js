System.register(["angular2/platform/browser", "angular2/router", "angular2/http", "./apiservice", './startapp'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, router_1, http_1, apiservice_1, startapp_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (apiservice_1_1) {
                apiservice_1 = apiservice_1_1;
            },
            function (startapp_1_1) {
                startapp_1 = startapp_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(startapp_1.StartApp, [http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS, apiservice_1.apiflightservice]);
        }
    }
});
//# sourceMappingURL=boot.js.map