import {Host, Renderer, Directive, Component, Input, Self, ElementRef, OnInit } from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {DefaultValueAccessor, FORM_DIRECTIVES} from 'angular2/common';
@Directive({
	selector: '[date-picker]'
})

export class DatePicker extends DefaultValueAccessor implements OnInit {
	private element: ElementRef;
	@Input('date-picker') inputdatevalue: Date;
	
	constructor( element: ElementRef, renderer: Renderer) {
		super(renderer, element);
		this.element = element;
	}

	public writeValue(value: any): void {
		(this.element.nativeElement).datepicker('setDate', value);
    }

	public ngOnInit(): void {
		console.log(this.element.nativeElement);
		//(this.element.nativeElement).value(this.inputdatevalue);
	}
}