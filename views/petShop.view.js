export class PetShopView {

	get mainCategoriesTemplate() {

		return `<div class="main-categories"></div>`;
	}

	get topCategoriesTemplate() {

		return `<div class="top-categories"></div>`;
	}

	constructor(element) {
		this.element = element;

		this.element.innerHTML = `${this.topCategoriesTemplate}${this.mainCategoriesTemplate}`;
	}

	renderCategories(categories) {
		// create templates
		// add listeners
		// display
		// top categories maybe shouldn't have any handlers
		this.renderTopCategories(categories.topCategories);
		this.renderMainCategories(categories.mainCategories);
	}

	renderTopCategories(topCategories) {
		let categoriesTemplate = document.querySelector('.top-categories');
		let categoryList = document.createElement('ul');

		let listItemNumber = 0;
		
		for (let category in topCategories) {
			categoryList.innerHTML += `<li>${category}</li>`;
		}

		Array.from(categoryList.children).forEach(item => {
			this.addListener(item);
		});
		
		categoriesTemplate.appendChild(categoryList);
	}

	renderMainCategories(mainCategories) {
		let categoriesTemplate = document.querySelector('.main-categories');
		let categoryList = document.createElement('ul');
		
		for (let category in mainCategories) {
			categoryList.innerHTML += `<li>${category}</li>`;
		}

		categoriesTemplate.appendChild(categoryList);
	}

	addListener(element) {
		element.addEventListener('click', this.controller.onClick);
	}

}