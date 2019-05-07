import { Pet } from "./pet.model.js";

export class Hamster extends Pet {
	constructor(color, price, isFluffy) {
		super(color, price);

		this.isFluffy = isFluffy;
	}
}