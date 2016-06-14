import { Component, EventEmitter, Input, OnInit, Output } from 'angular2/core';
import { RouteParams } from "angular2/router";
import { flight }        from './model/flight';
import {gate} from './model/gate'
import { apiflightservice } from './apiservice';

@Component({
	selector: 'flightdetail',
	templateUrl: 'app/flightdetail.html'
})

export class FlightDetailComponent implements OnInit {
	@Input() f: flight;
	@Output() saved = new EventEmitter();
	error: any;
	navigated = false; // true if navigated here
	public gates: gate[];

	constructor(
		private flightservice: apiflightservice) {
	}

	//constructor(
	//	private flightservice: apiflightservice,
	//	private routeParams: RouteParams) {
	//}

	ngOnInit() {	
		this.gates = [
			new gate(1, "Gate 1"),
			new gate(2, "Gate 2")
		];	
		if (this.f) {
			//console.log("gate id:" + this.f.GateID);
			//let id = +this.f.Identity;
			//this.navigated = true;
			//this.flightservice.getflight(id)
			//	.then(f => { this.f = f;});
		}
		else {
			//this.navigated = false;
			//this.f = new flight();
		}
		//if (this.routeParams.get('id') !== null) {
		//	let id = +this.routeParams.get('id');
		//	this.navigated = true;
		//	this.flightservice.getflight(id)
		//		.then(f => { this.f = f; });
		//	console.log(this.f);
		//} else {
		//	this.navigated = false;
		//	this.f = new flight();
		//}
	}

	save() {
		this.flightservice
			.saveFlight(this.f)
			.then(f => {
				this.f = f; // saved flight, w/ id if new				
				this.goBack(f);
			})
			.catch(error => this.error = error); // TODO: Display error message
	}

	onChangeArrivalTime(date: string) {
		var d = new Date(date);
		console.log(new Date((d.setHours(d.getHours() + 0.5))));
		this.f.DepartureTimeLong = new Date((d.setHours(d.getHours() + 1))).toISOString().slice(0, 16);
	}

	onChangeDepartTime(date: string) {
		var d = new Date(date);
		this.f.ArrivalTimeLong = new Date((d.setHours(d.getHours() - 1))).toISOString().slice(0, 16);
	}

	goBack(savedFlight: flight = null) {
		// clear f and hide edit flight detail
		this.f = null;
		this.saved.emit(savedFlight);
	}
}