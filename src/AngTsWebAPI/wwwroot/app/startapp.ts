import {ROUTER_DIRECTIVES, Router, Route, RouteConfig, Location, RouteDefinition} from "angular2/router";
import {Component, OnInit} from "angular2/core";
import {AppComponent} from './app.component';
import {PlaceholdComponent} from './placehold.component';

@Component({
    selector: "app",
    templateUrl: "/app/startapp.html",
	directives: [ROUTER_DIRECTIVES]
	})

export class StartApp implements OnInit {
	constructor(private router: Router, private location: Location) { }
	public routes: RouteDefinition[] = null;

	ngOnInit() {
		// route
		if (this.routes === null) {
			this.routes = [
				{ path: "/flightapp", component: AppComponent, name: "AppComponent", useAsDefault: false },
				{path: "/placeholdapp", component: PlaceholdComponent, name: "PlaceholdComponent", useAsDefault: false }
			];

			this.router.config(this.routes);
		}
	}

	getLinkStyle(route: RouteDefinition) {
		return this.location.path().indexOf(route.path) > -1;
	}
}
