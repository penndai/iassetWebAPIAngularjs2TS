import {bootstrap} from "angular2/platform/browser"
import {ROUTER_PROVIDERS} from "angular2/router";
import {HTTP_PROVIDERS} from "angular2/http";
import {AppComponent} from "./app.component";
import {apiflightservice} from "./apiservice";
import {StartApp} from './startapp';
//import { disableDeprecatedForms, provideForms } from 'angular2/common';

bootstrap(StartApp, [HTTP_PROVIDERS, ROUTER_PROVIDERS,apiflightservice]);	