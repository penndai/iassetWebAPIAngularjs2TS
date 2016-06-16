System.register(['angular2/core', 'angular2/common'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1;
    var DatePicker;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            DatePicker = (function (_super) {
                __extends(DatePicker, _super);
                function DatePicker(element, renderer) {
                    _super.call(this, renderer, element);
                    this.element = element;
                }
                DatePicker.prototype.writeValue = function (value) {
                    (this.element.nativeElement).datepicker('setDate', value);
                };
                DatePicker.prototype.ngOnInit = function () {
                    console.log(this.element.nativeElement);
                    //(this.element.nativeElement).value(this.inputdatevalue);
                };
                __decorate([
                    core_1.Input('date-picker'), 
                    __metadata('design:type', Date)
                ], DatePicker.prototype, "inputdatevalue", void 0);
                DatePicker = __decorate([
                    core_1.Directive({
                        selector: '[date-picker]'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
                ], DatePicker);
                return DatePicker;
            }(common_1.DefaultValueAccessor));
            exports_1("DatePicker", DatePicker);
        }
    }
});
//# sourceMappingURL=datepicker.js.map