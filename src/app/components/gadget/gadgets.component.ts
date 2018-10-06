import { Component, OnInit } from '@angular/core';

import { GadgetService } from '../../services/gadget.service';
import { Gadget } from '../../interfaces/gadget.interface';

@Component({
	selector: 'app-gadgets',
	templateUrl: './gadgets.component.html'
})
export class GadgetsComponent implements OnInit {

	gadgets: any[]=[];

	constructor(private _gadgetService:GadgetService) { }

	ngOnInit() {
		this.getGadgets();
	}

	getGadgets(){
		this._gadgetService.getGadgets().subscribe(
			data=>{
				// Building an array from Firebase 
				for(let key$ in data){
					this.gadgets.push(data[key$]);
				}

		}, error=>{
			console.error(error);
		})
	}

}
