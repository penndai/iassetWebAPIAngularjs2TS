System.register(["rxjs/Rx", "angular2/http", "angular2/core"], function(exports_1, context_1) {
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
    var http_1, core_1;
    var apiflightservice;
    return {
        setters:[
            function (_1) {},
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            apiflightservice = (function () {
                function apiflightservice(http) {
                    this.http = http;
                }
                apiflightservice.prototype.handlerror = function (error) {
                    console.error('An error occurred', error);
                    return Promise.reject(error.message || error);
                };
                apiflightservice.prototype.getflight = function (identity) {
                    return this.getflights()
                        .then(function (flights) { return flights.filter(function (f) { return f.Identity === identity; })[0]; });
                };
                apiflightservice.prototype.getflights = function () {
                    return this.http.get("api/PdService")
                        .toPromise()
                        .then(function (response) { return response.json().data; })
                        .catch(this.handleError);
                };
                apiflightservice.prototype.getflights1 = function (handlefunc) {
                    var result = this.http.get("api/PdService").map(function (x) { return x.json(); });
                    result.subscribe(handlefunc);
                };
                apiflightservice.prototype.getFlightsJson = function (gatefilterid) {
                    //console.log(gatefilterid);
                    var data = this.http.get("api/PdService/" + gatefilterid)
                        .map(function (x) { return x.json().flights; })
                        .do(function (x) { return console.log(x); });
                    //.catch(this.handlerror);
                    //console.log(data);
                    return data;
                };
                apiflightservice.prototype.handleError = function (error) {
                    console.error('An error occurred', error);
                    return Promise.reject(error.message || error);
                };
                // Add new Hero
                apiflightservice.prototype.post = function (f) {
                    var headers = new http_1.Headers({
                        'Content-Type': 'application/json'
                    });
                    return this.http
                        .post('api/PdService/', JSON.stringify(f), { headers: headers })
                        .toPromise()
                        .then(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                apiflightservice.prototype.deleteFlight = function (f) {
                    if (f) {
                        var headers = new http_1.Headers();
                        headers.append('Content-Type', 'application/json');
                        var url = 'api/PdService/' + f.Identity;
                        return this.http.delete(url, { headers: headers })
                            .toPromise()
                            .catch(this.handleError);
                    }
                };
                apiflightservice.prototype.put = function (f) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    var url = 'api/PdService/' + f.Identity;
                    return this.http
                        .put(url, JSON.stringify(f), { headers: headers })
                        .toPromise()
                        .then(function () { return f; })
                        .catch(this.handleError);
                };
                apiflightservice.prototype.saveFlight = function (f) {
                    if (f.Identity > 0) {
                        f.ArrivalTime = new Date(new Date(f.ArrivalTimeLong.toString()).getFullYear(), new Date(f.ArrivalTimeLong.toString()).getMonth(), new Date(f.ArrivalTimeLong.toString()).getDate(), new Date(f.ArrivalTimeLong.toString()).getHours(), new Date(f.ArrivalTimeLong.toString()).getMinutes());
                        f.DepartureTime = new Date(new Date(f.DepartureTimeLong.toString()).getFullYear(), new Date(f.DepartureTimeLong.toString()).getMonth(), new Date(f.DepartureTimeLong.toString()).getDate(), new Date(f.DepartureTimeLong.toString()).getHours(), new Date(f.DepartureTimeLong.toString()).getMinutes());
                        console.log(f);
                        return this.put(f);
                    }
                    else {
                        return this.post(f);
                    }
                };
                apiflightservice = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], apiflightservice);
                return apiflightservice;
            }());
            exports_1("apiflightservice", apiflightservice);
        }
    }
});
//# sourceMappingURL=apiservice.js.map