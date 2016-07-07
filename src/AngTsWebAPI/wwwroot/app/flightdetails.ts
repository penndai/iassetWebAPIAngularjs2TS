import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from 'angular2/core';
import {flightwithmsg} from './model/flightwithmsg';
import { RouteParams } from "angular2/router";
import { flight }        from './model/flight';
import {gate} from './model/gate'
import { apiflightservice } from './apiservice';
declare var jQuery: any;

@Component({
	selector: 'flightdetail',
	templateUrl: 'app/flightdetail.html'
})

export class FlightDetailComponent implements OnInit {
	@Input() f: flight;
	@Output() saved = new EventEmitter();
	@Output() edited = new EventEmitter();
	error: any;
	navigated = false; // true if navigated here
	public gates: gate[];
	public errormsg: string;
	public errorcode: number;
	public timeValidation: string;
	public timeError: boolean;

	initDateTimePicker() {
		var el = this.elementRef.nativeElement;
		var dp = jQuery(el).find("#atimedatePicker");
		var dtime = jQuery(el).find("#dtimedatePicker");
		if (jQuery(dp).length > 0) {
			jQuery(dp).datetimepicker();
			
			var arDate = new Date(this.f.ArrivalTime.toString());
			//set the selected flight arrival time
			jQuery(dp)
				.data("DateTimePicker")
				.date(
					new Date(arDate.getFullYear(),
					arDate.getMonth(),
					arDate.getDate(),
					arDate.getHours(),
					arDate.getMinutes()));			
		}

		if (jQuery(dtime).length > 0) {			
			jQuery(dtime).datetimepicker();
			var arDate = new Date(this.f.DepartureTime.toString());
			//set the selected flight departure time
			jQuery(dtime)
				.data("DateTimePicker")
				.date(
				new Date(arDate.getFullYear(),
					arDate.getMonth(),
					arDate.getDate(),
					arDate.getHours(),
					arDate.getMinutes()));	
		}
	}
	
	constructor(
		private elementRef: ElementRef,
		private flightservice: apiflightservice)
	{		
	}

	ngOnChanges(changes) {	
		setTimeout(() => {
            this.initDateTimePicker();
        }, 0);
	}

	ngOnInit() {	
		this.gates = [
			new gate(1, "Gate 1"),
			new gate(2, "Gate 2")
		];	

		//init error code and message
		this.errorcode = 0;		
		this.timeError = false;
		this.timeValidation = '';
	}

	save() {
		this.flightservice
			.saveFlight(this.f)
			.then(fmsg => {
				if (fmsg.code != 0) {
					this.errorcode = 1;
					this.errormsg = fmsg.msg;
				}
				else {
					this.errorcode = 0;
					this.errormsg = '';
					this.f = fmsg.flight; // saved flight, w/ id if new				
					this.goBack(fmsg.flight);
				}
			})
			.catch(error => this.error = error); // TODO: Display error message
	}

	ParseDateCustom(time: string) {
		var hours = Number(time.match(/^(\d+)/)[1]);
		var minutes = Number(time.match(/:(\d+)/)[1]);
		var AMPM = time.match(/\s(.*)$/)[1];
		if (AMPM == "PM" && hours < 12) hours = hours + 12;
		if (AMPM == "AM" && hours == 12) hours = hours - 12;
		var sHours = hours.toString();
		var sMinutes = minutes.toString();
		if (hours < 10) sHours = "0" + sHours;
		if (minutes < 10) sMinutes = "0" + sMinutes;

		return (sHours + ':' + sMinutes);
	}

	onChangeArrivalTime(date: string) {		
		var el = this.elementRef.nativeElement;
		var dp = jQuery(el).find("#atimedatePicker");
		var d = jQuery(dp)
			.data("DateTimePicker")
			.date();	
			
		this.f.ArrivalTime = d.format("MM/DD/YYYY h:mm A");

		this.timeError = new Date(this.f.ArrivalTime.toString()) >= new Date(this.f.DepartureTime.toString());
		if (this.timeError) {
			this.timeValidation = "Arrival Time should before departure time.";
		}
		else {
			this.timeValidation = '';
		}
	}

	onChangeDepartTime(date: string) {
		var el = this.elementRef.nativeElement;
		var dp = jQuery(el).find("#dtimedatePicker");
		var d = jQuery(dp)
			.data("DateTimePicker")
			.date();

		this.f.DepartureTime = d.format("MM/DD/YYYY h:mm A");
		this.timeError = new Date(this.f.ArrivalTime.toString()) >= new Date(this.f.DepartureTime.toString());
		if (this.timeError) {
			this.timeValidation = "Arrival Time should before departure time.";
		}
	}

	goBack(savedFlight: flight = null) {
		// clear f and hide edit flight detail
		this.f = null;
		this.saved.emit(savedFlight);
	}
}