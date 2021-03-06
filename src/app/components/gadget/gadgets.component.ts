import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

declare var $: any

import { GadgetService } from '../../services/gadget.service';
import { Gadget } from '../../interfaces/gadget.interface';

@Component({
	selector: 'app-gadgets',
	templateUrl: './gadgets.component.html'
})
export class GadgetsComponent implements OnInit {

	gadgets: any[]=[];
	budget: number=0;
	isListFull: boolean = false;
	isLoading: boolean = true;

	constructor(
		private _gadgetService:GadgetService,
		private _router:Router
		) { }

	ngOnInit() {
		this.getGadgets();
	}

	getGadgets(){
		this.gadgets = [];

		this._gadgetService.getGadgets().subscribe(
			data=>{
				// Building an array from Firebase 
				for(let key$ in data){
					let h = data[key$];
					h.key$ = key$; 
					this.gadgets.push(data[key$]);
				}
				// console.log(this.gadgets);

				if(this.gadgets.length<=4){
					this.isListFull = false;
				}else{
					this.isListFull = true;
				}

				this.isLoading = false;

				this.getBudget();

			}, error=>{
				console.error(error);
			})
	}

	getBudget(){
		this.budget =0;
		
		for (var i = 0; i < this.gadgets.length; i++) {
			this.budget += parseFloat(this.gadgets[i].price);
			console.log(this.budget);
		}
	}
	

	editGadget(key$:string){
		this._router.navigate(['/gadget', key$])
	}

	deleteGadget(gadget){

		swal({
			title: `Do you want to delete the gadget ${gadget.name}?`,
			animation: false,
			customClass: 'animated fadeIn',
			text: "You won't be able to revert this!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#e53935 ',
			cancelButtonColor: '#bdbdbd',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.value) {
				this._gadgetService.deleteGadget(gadget.key$).subscribe(
					success=>{
						console.log("Done!");
						this.getGadgets();

						swal(
							'Deleted!',
							'Your file has been deleted.',
							'success'
							)
					}, 
					error=>{
						console.error(error);
					});
			}
		});
	}

	toogle(){
		$('.ui.sidebar').sidebar('toggle');
	}

	navigate(route, id?){
		$('.ui.sidebar').sidebar('toggle');
		
		if(id=='add'){
			this._router.navigate(['/gadget', 'add']);
		}else{
			this._router.navigate([`'/${route}'`]);
		} 

		
	}

}
