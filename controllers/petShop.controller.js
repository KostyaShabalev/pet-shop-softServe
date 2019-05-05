import { PetShopModel } from "../models/petShop.model.js";
import { PetShopView } from "../views/petShop.view.js";

export class PetShopController {
	constructor(petShopElement) {
		this.petShopModel = new PetShopModel();
		this.petShopView = new PetShopView(petShopElement);
	}

	initiatePetShop() {
		let petsStoringPromise = this.petShopModel.storePets();

		petsStoringPromise
			.then(categories => {
				this.renderCategories(categories);
			});
	}

	renderCategories(categories) {
		this.petShopView.renderCategories(categories);
	}

}