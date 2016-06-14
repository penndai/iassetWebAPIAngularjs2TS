System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var gate;
    return {
        setters:[],
        execute: function() {
            gate = (function () {
                function gate(id, name) {
                    this.id = id;
                    this.name = name;
                }
                return gate;
            }());
            exports_1("gate", gate);
        }
    }
});
//# sourceMappingURL=gate.js.map