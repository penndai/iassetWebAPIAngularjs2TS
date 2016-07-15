import {Component, OnInit} from 'angular2/core'
import {CORE_DIRECTIVES} from "angular2/src/common/directives/core_directives";
import {HeroFormComponent} from './hero-form';

@Component({
    template: `
		<h2>Place holder</h2>
		<hero-form></hero-form>
	`,
	directives: [CORE_DIRECTIVES, HeroFormComponent]
})

export class PlaceholdComponent implements OnInit {
	ngOnInit() {

	}
}