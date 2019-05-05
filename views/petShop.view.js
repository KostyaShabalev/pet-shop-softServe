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
		this.renderTopCategories(categories.topCategories);
		this.renderMainCategories(categories.mainCategories);
	}

	renderMainCategories(mainCategories) {
		let categoriesTemplate = document.querySelector('.main-categories');
		let categoryList = document.createElement('ul');
		
		for (let category in mainCategories) {
			categoryList.innerHTML += `<li>${category}</li>`;
		}

		categoriesTemplate.appendChild(categoryList);
	}

	renderTopCategories(topCategories) {
		let categoriesTemplate = document.querySelector('.top-categories');
		let categoryList = document.createElement('ul');
		
		for (let category in topCategories) {
			categoryList.innerHTML += `<li>${category}</li>`;
		}

		categoriesTemplate.appendChild(categoryList);
	}

}