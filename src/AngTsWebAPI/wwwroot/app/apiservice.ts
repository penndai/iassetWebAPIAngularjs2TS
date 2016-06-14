import "rxjs/Rx";
import {Http, Response, Headers, RequestOptions} from "angular2/http";
import {Observable} from 'rxjs/Observable';
import {Injectable} from "angular2/core";
import {FlightDetailComponent} from './flightdetails';
import {flight} from './model/flight';

@Injectable()
export class apiflightservice {
	constructor(private http: Http) { }

	private handlerror(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getflight(identity: number) {
		return this.getflights()
			.then(flights => flights.filter(f => f.Identity === identity)[0]);
	}

	getflights(): Promise<flight[]> {
		return this.http.get("api/PdService")
			.toPromise()
			.then(response => response.json().data)
			.catch(this.handleError);
	}

	getflights1(handlefunc: (json: any) => void) {
		var result = this.http.get("api/PdService").map(x => x.json());		
		result.subscribe(handlefunc);
	}

	getFlightsJson(gatefilterid) {
		//console.log(gatefilterid);
		var data =
			this.http.get("api/PdService/" + gatefilterid)
				.map(x => <flight[]>x.json().flights)
				.do(x => console.log(x));
				//.catch(this.handlerror);
		
		//console.log(data);
		return data;
	}

	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	// Add new Hero
	private post(f: flight): Promise<flight> {
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http
			.post('api/PdService/', JSON.stringify(f), { headers: headers })
			.toPromise()
			.then(res => res.json().data)
			.catch(this.handleError);
	}

	deleteFlight(f: flight) {
		if (f) {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			let url = 'api/PdService/' + f.Identity;
			return this.http.delete(url, { headers })
				.toPromise()
				.catch(this.handleError);
		}
	}

	private put(f: flight) {
		let headers = new Headers();		
		headers.append('Content-Type', 'application/json');
		let url = 'api/PdService/'+ f.Identity;

		return this.http
			.put(url, JSON.stringify(f), { headers: headers })
			.toPromise()
			.then(() => f)
			.catch(this.handleError);
	}

	saveFlight(f: flight) {		
		if (f.Identity > 0) {			
			f.ArrivalTime = new Date(new Date(f.ArrivalTimeLong.toString()).getFullYear(), new Date(f.ArrivalTimeLong.toString()).getMonth(), new Date(f.ArrivalTimeLong.toString()).getDate(), new Date(f.ArrivalTimeLong.toString()).getHours(), new Date(f.ArrivalTimeLong.toString()).getMinutes());
			f.DepartureTime = new Date(new Date(f.DepartureTimeLong.toString()).getFullYear(), new Date(f.DepartureTimeLong.toString()).getMonth(), new Date(f.DepartureTimeLong.toString()).getDate(), new Date(f.DepartureTimeLong.toString()).getHours(), new Date(f.DepartureTimeLong.toString()).getMinutes());
			console.log(f);
			return this.put(f);
		}
		else {
			return this.post(f);
		}
	}
}

