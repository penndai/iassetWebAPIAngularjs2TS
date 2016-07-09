import {Component, OnInit, ViewChild} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {apiflightservice} from "./apiservice";
import {FlightDetailComponent} from "./flightdetails";
import {CORE_DIRECTIVES} from "angular2/src/common/directives/core_directives";
import {Observable} from 'rxjs/Observable';
import {flight} from './model/flight'
import {gate} from './model/gate'

declare var System: any;

@Component({
    //selector: "startapp",
    templateUrl: "/app/app.html",	
	directives: [CORE_DIRECTIVES, FlightDetailComponent]
})

export class AppComponent implements OnInit {
	constructor(
		private service: apiflightservice) {
	}

	public flights: flight[];
	public headers: string[];
	public selectedFlight: flight;
	public gates: gate[];
	public gatefilterid: number;	
	private timer;

	@ViewChild(FlightDetailComponent) fldetail: FlightDetailComponent;

	ngOnInit() {
		this.headers = ['Flight No.', 'Gate','Arrival Time', 'DepartureTime'];
		this.gates = [
			new gate(-1, "All"),
			new gate(1, "Gate 1"),
			new gate(2, "Gate 2")
		];

		this.gatefilterid = -1;
		this.getflightsJson();
		
		this.selectedFlight = null;	
	}

	getflights() {
		this.service.getflights1(x => {
			if (x && x.flights) {
				if (!this.flights) {
					this.flights = [];
				}
				this.flights = x.flights;
			}
		})
	}

	getflightsJson() {
		this.service.getFlightsJson(this.gatefilterid).subscribe(
			x => this.flights = x, error => console.log(error));
	}

	addNew = function () {
		this.selectedFlight = <flight>{};
		this.selectedFlight.Identity = -1;
		this.selectedFlight.ID = "";
		this.selectedFlight.GateID = 1;
		this.selectedFlight.ArrivalTime = new Date().toString();
		this.selectedFlight.ArrivalTimeLong = new Date().toISOString();

		var d = new Date();
		this.selectedFlight.DepartureTime = new Date((d.setHours(d.getHours() + 0.5))).toString();
		//this.selectedFlight.DepartureTimeLong = new Date((d.setHours(d.getHours() + 0.5))).toISOString();
	}

	editFlight = function (f: flight) {		
		this.selectedFlight = <flight>{};
		this.selectedFlight.ID = f.ID;
		this.selectedFlight.GateID = f.GateID;		
		this.selectedFlight.Identity = f.Identity;
		this.selectedFlight.ArrivalTime = f.ArrivalTime;
		//this.selectedFlight.ArrivalTimeLong = f.ArrivalTimeLong;
		this.selectedFlight.DepartureTime = f.DepartureTime;
		//this.selectedFlight.DepartureTimeLong = f.DepartureTimeLong;				
	}

	deleteFlight = function (f: flight) {
		if (f) {
			this.service.deleteFlight(f).then(f => { this.refreshList(f);});			
		}
	}

	saveFlight = function () {
		if (this.selectedFlight) {
			//console.log("save flight: " + this.selectedFlight.ID);
			this.service.saveFlight(this.selectedFlight)
				.then(f => { this.selectedFlight = null; this.goBack(f); })
				.catch(error => this.error = error);
		}
	}

	onSelectGate(gateId: number) {		
		this.selectedFlight = null;
		this.gatefilterid = gateId;
		this.getflightsJson();
	}

	refreshList(f: flight = null) {
		this.getflightsJson();
	}
}