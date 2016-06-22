System.register(["angular2/core", "./apiservice", "./flightdetails", "angular2/src/common/directives/core_directives", './model/gate'], function(exports_1, context_1) {
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
    var core_1, apiservice_1, flightdetails_1, core_directives_1, gate_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (apiservice_1_1) {
                apiservice_1 = apiservice_1_1;
            },
            function (flightdetails_1_1) {
                flightdetails_1 = flightdetails_1_1;
            },
            function (core_directives_1_1) {
                core_directives_1 = core_directives_1_1;
            },
            function (gate_1_1) {
                gate_1 = gate_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(service) {
                    this.service = service;
                    this.addNew = function () {
                        this.selectedFlight = {};
                        this.selectedFlight.Identity = -1;
                        this.selectedFlight.ID = "";
                        this.selectedFlight.GateID = 1;
                        this.selectedFlight.ArrivalTime = new Date().toString();
                        this.selectedFlight.ArrivalTimeLong = new Date().toISOString();
                        var d = new Date();
                        this.selectedFlight.DepartureTime = new Date((d.setHours(d.getHours() + 0.5))).toString();
                        this.selectedFlight.DepartureTimeLong = new Date((d.setHours(d.getHours() + 0.5))).toISOString();
                    };
                    this.editFlight = function (f) {
                        this.selectedFlight = {};
                        this.selectedFlight.ID = f.ID;
                        this.selectedFlight.GateID = f.GateID;
                        //console.log(this.selectedFlight.GateID);
                        //console.log(f);
                        this.selectedFlight.Identity = f.Identity;
                        this.selectedFlight.ArrivalTime = f.ArrivalTime;
                        this.selectedFlight.ArrivalTimeLong = f.ArrivalTimeLong;
                        this.selectedFlight.DepartureTime = f.DepartureTime;
                        this.selectedFlight.DepartureTimeLong = f.DepartureTimeLong;
                        var start = new Date().getTime();
                        //this.fldetail.UpdateDateValue();
                    };
                    this.deleteFlight = function (f) {
                        var _this = this;
                        if (f) {
                            this.service.deleteFlight(f).then(function (f) { _this.refreshList(f); });
                        }
                    };
                    this.saveFlight = function () {
                        var _this = this;
                        if (this.selectedFlight) {
                            //console.log("save flight: " + this.selectedFlight.ID);
                            this.service.saveFlight(this.selectedFlight)
                                .then(function (f) { _this.selectedFlight = null; _this.goBack(f); })
                                .catch(function (error) { return _this.error = error; });
                        }
                    };
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.headers = ['Flight No.', 'Gate', 'Arrival Time', 'DepartureTime'];
                    this.gates = [
                        new gate_1.gate(-1, "All"),
                        new gate_1.gate(1, "Gate 1"),
                        new gate_1.gate(2, "Gate 2")
                    ];
                    this.gatefilterid = -1;
                    this.getflightsJson();
                    this.selectedFlight = null;
                    //this.getflights();		
                };
                AppComponent.prototype.getflights = function () {
                    var _this = this;
                    this.service.getflights1(function (x) {
                        if (x && x.flights) {
                            if (!_this.flights) {
                                _this.flights = [];
                            }
                            _this.flights = x.flights;
                        }
                    });
                };
                AppComponent.prototype.getflightsJson = function () {
                    var _this = this;
                    this.service.getFlightsJson(this.gatefilterid).subscribe(function (x) { return _this.flights = x; }, function (error) { return console.log(error); });
                };
                AppComponent.prototype.onSelectGate = function (gateId) {
                    //console.log('gate id: ');
                    //console.log(gateId);
                    this.selectedFlight = null;
                    this.gatefilterid = gateId;
                    this.getflightsJson();
                };
                AppComponent.prototype.refreshList = function (f) {
                    if (f === void 0) { f = null; }
                    this.getflightsJson();
                };
                __decorate([
                    core_1.ViewChild(flightdetails_1.FlightDetailComponent), 
                    __metadata('design:type', flightdetails_1.FlightDetailComponent)
                ], AppComponent.prototype, "fldetail", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: "app",
                        templateUrl: "/app/app.html",
                        //directives: [CORE_DIRECTIVES]
                        directives: [core_directives_1.CORE_DIRECTIVES, flightdetails_1.FlightDetailComponent]
                    }), 
                    __metadata('design:paramtypes', [apiservice_1.apiflightservice])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map