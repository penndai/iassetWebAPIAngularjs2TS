import {Component, OnInit} from 'angular2/core'
import {CORE_DIRECTIVES} from "angular2/src/common/directives/core_directives";

@Component({
    template: `
		<h2>Place hold</h2>
	`,
	directives: [CORE_DIRECTIVES]
})

export class PlaceholdComponent implements OnInit {
	ngOnInit() {

	}
}