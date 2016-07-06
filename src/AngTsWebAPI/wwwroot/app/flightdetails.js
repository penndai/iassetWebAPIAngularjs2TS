System.register(['angular2/core', './model/flight', './model/gate', './apiservice'], function(exports_1, context_1) {
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
    var core_1, flight_1, gate_1, apiservice_1;
    var FlightDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (flight_1_1) {
                flight_1 = flight_1_1;
            },
            function (gate_1_1) {
                gate_1 = gate_1_1;
            },
            function (apiservice_1_1) {
                apiservice_1 = apiservice_1_1;
            }],
        execute: function() {
            FlightDetailComponent = (function () {
                function FlightDetailComponent(elementRef, flightservice) {
                    this.elementRef = elementRef;
                    this.flightservice = flightservice;
                    this.saved = new core_1.EventEmitter();
                    this.navigated = false; // true if navigated here
                }
                FlightDetailComponent.prototype.initDateTimePicker = function () {
                    var el = this.elementRef.nativeElement;
                    var dp = jQuery(el).find("#atimedatePicker");
                    var dtime = jQuery(el).find("#dtimedatePicker");
                    if (jQuery(dp).length > 0) {
                        jQuery(dp).datetimepicker();
                        //jQuery(dp).datetimepicker({ format: 'LT' });
                        var arDate = new Date(this.f.ArrivalTime.toString());
                        //set the selected flight arrival time
                        jQuery(dp)
                            .data("DateTimePicker")
                            .date(new Date(arDate.getFullYear(), arDate.getMonth(), arDate.getDate(), arDate.getHours(), arDate.getMinutes()));
                    }
                    if (jQuery(dtime).length > 0) {
                        //jQuery(dtime).datetimepicker({ format: 'LT' });
                        jQuery(dtime).datetimepicker();
                        var arDate = new Date(this.f.DepartureTime.toString());
                        //set the selected flight departure time
                        jQuery(dtime)
                            .data("DateTimePicker")
                            .date(new Date(arDate.getFullYear(), arDate.getMonth(), arDate.getDate(), arDate.getHours(), arDate.getMinutes()));
                    }
                };
                FlightDetailComponent.prototype.ngOnChanges = function (changes) {
                    var _this = this;
                    setTimeout(function () {
                        _this.initDateTimePicker();
                    }, 0);
                };
                FlightDetailComponent.prototype.ngOnInit = function () {
                    this.gates = [
                        new gate_1.gate(1, "Gate 1"),
                        new gate_1.gate(2, "Gate 2")
                    ];
                    this.errorcode = 0;
                };
                FlightDetailComponent.prototype.save = function () {
                    var _this = this;
                    this.flightservice
                        .saveFlight(this.f)
                        .then(function (fmsg) {
                        if (fmsg.code != 0) {
                            _this.errorcode = 1;
                            _this.errormsg = fmsg.msg;
                        }
                        else {
                            _this.errorcode = 0;
                            _this.errormsg = '';
                            _this.f = fmsg.flight; // saved flight, w/ id if new				
                            _this.goBack(fmsg.flight);
                        }
                    })
                        .catch(function (error) { return _this.error = error; }); // TODO: Display error message
                };
                FlightDetailComponent.prototype.ParseDateCustom = function (time) {
                    var hours = Number(time.match(/^(\d+)/)[1]);
                    var minutes = Number(time.match(/:(\d+)/)[1]);
                    var AMPM = time.match(/\s(.*)$/)[1];
                    if (AMPM == "PM" && hours < 12)
                        hours = hours + 12;
                    if (AMPM == "AM" && hours == 12)
                        hours = hours - 12;
                    var sHours = hours.toString();
                    var sMinutes = minutes.toString();
                    if (hours < 10)
                        sHours = "0" + sHours;
                    if (minutes < 10)
                        sMinutes = "0" + sMinutes;
                    return (sHours + ':' + sMinutes);
                };
                FlightDetailComponent.prototype.onChangeArrivalTime = function (date) {
                    var el = this.elementRef.nativeElement;
                    var dp = jQuery(el).find("#atimedatePicker");
                    var d = jQuery(dp)
                        .data("DateTimePicker")
                        .date();
                    //var customtime = this.ParseDateCustom(date);
                    //d = new Date(customtime.getFullYear(), customtime.getMonth(), d.getDate(), Number(customtime.split(':')[0]), Number(customtime.split(':')[1]));
                    console.log(d.toDate());
                    //d = d.toDate();
                    //d = new Date(
                    //	d.getFullYear(),
                    //	d.getMonth() + 1,
                    //	d.getDate(),
                    //	d.getHours(),
                    //	d.getMinutes()
                    //);
                    this.f.ArrivalTime = d.format("MM/DD/YYYY hh:mm A");
                    //console.log(new Date((d.setHours(d.getHours() + 0.5))));
                    //this.f.DepartureTimeLong = new Date((d.setHours(d.getHours() + 1))).toISOString().slice(0, 16);
                };
                FlightDetailComponent.prototype.onChangeDepartTime = function (date) {
                    var d = new Date(date);
                    this.f.ArrivalTimeLong = new Date((d.setHours(d.getHours() - 1))).toISOString().slice(0, 16);
                };
                FlightDetailComponent.prototype.goBack = function (savedFlight) {
                    if (savedFlight === void 0) { savedFlight = null; }
                    // clear f and hide edit flight detail
                    this.f = null;
                    this.saved.emit(savedFlight);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', flight_1.flight)
                ], FlightDetailComponent.prototype, "f", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], FlightDetailComponent.prototype, "saved", void 0);
                FlightDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'flightdetail',
                        templateUrl: 'app/flightdetail.html'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, apiservice_1.apiflightservice])
                ], FlightDetailComponent);
                return FlightDetailComponent;
            }());
            exports_1("FlightDetailComponent", FlightDetailComponent);
        }
    }
});
//# sourceMappingURL=flightdetails.js.map