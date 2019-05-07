import { Pet } from "./pet.model.js";

export class Dog extends Pet {
	constructor(color, price, name) {
		super(color, price);

		this.name = name;
	}
}