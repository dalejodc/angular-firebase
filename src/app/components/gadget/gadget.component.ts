import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms"
import { Router, ActivatedRoute } from "@angular/router"
import { Gadget } from "../../interfaces/gadget.interface";


import { GadgetService } from "../../services/gadget.service";

@Component({
	selector: 'app-gadget',
	templateUrl: './gadget.component.html',
	providers: [GadgetService]
})
export class GadgetComponent implements OnInit {

	// Object
	gadget:any = {
		name: "",
		description: "",
		brand: "",
		price: null
	}

	id:string;
s
	constructor(
		private _gadgetService: GadgetService,
		private _router: Router,
		private _activatedRouter: ActivatedRoute
		) { }

	ngOnInit() {
		// Catch the params of the url
		this._activatedRouter.params.subscribe(
			params=>{
				this.id = params['id']
		});

		// Check the param. If is different to 'add'; it means that is route to edit, so it gets the specific gadget
		if(this.id != 'add'){
			this.getGadget();
		}
	}

	// Get the gadget by key$ gotten by params. Init the gadget with the request
	getGadget(){
		this._gadgetService.getGadget(this.id).subscribe(
			data=>{
				console.log(data);
				this.gadget = data;
			}, 
			error=>{
				console.log(error);
			});
	}

	

	// Send the object with the key$
	edit(){
		this._gadgetService.editGadget(this.gadget, this.id)
			.subscribe(data=>{
				this._router.navigate(['/gadgets']);
			},
			error =>{
				console.error(error);
			});
	}

	//Save the gadget
	save(){

		if(this.id != 'add'){
			this.edit();
		}else{
			this._gadgetService.addGadget(this.gadget)
			.subscribe(
				data=>{
					this._router.navigate(['/gadgets']);
				},
				error =>{
					console.error(error);
			});
		}
		
	}

}
