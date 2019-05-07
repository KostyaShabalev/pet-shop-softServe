export class PetShopView {

	get mainElementContentTemplate() {

		return `
			<div class="categories-container top-categories" style="display: flex"></div>
			<div class="main-pets-container" style="display: flex">
				<div class="categories-container main-categories"></div>
				<div class="pets-container">Pets</div>
				<div class="pet-details">Details</div>
				<div class="cart">Cart</div>
			</div>
		`;
	}

  constructor(mainElement) {
    this.mainElement = mainElement;
		this.elements = {};
		
		this.mainElement.innerHTML = this.mainElementContentTemplate;

		this.addBaseElementsToView();
	}

	addBaseElementsToView() {
		this.elements.mainCategoriesElement = this.getElement('.main-categories');
		this.elements.topCategoriesElement = this.getElement('.top-categories');
		this.elements.petsContainerElement = this.getElement('.pets-container');
		this.elements.petDetailsElement = this.getElement('.pet-details');
		this.elements.cartElement = this.getElement('.cart');
	}

  renderCategories(categories) {
		this.addCategoriesInnerElements(categories);
		this.addTopCategoriesItems(categories.topCategories);
    // create templates
    // add listeners
    // display
    // top categories maybe shouldn't have any handlers
    // this.renderTopCategories(categories.topCategories);
    // this.renderMainCategories(categories.mainCategories);
  }

  addCategoriesInnerElements(categories) {
		this.createCategoriesElement(categories, 'main-categories');
		this.createCategoriesElement(categories, 'top-categories');
  }

  createCategoriesElement(categories, type) {
    const currentCategories = (type === 'main-categories') ? categories.mainCategories : categories.topCategories;
		let categoriesContainer = (type === 'main-categories') ? this.elements.mainCategoriesElement : this.elements.topCategoriesElement;

    for (let categoryName in currentCategories) {
			const categoryContainer = this.createCategoryContainer(categoryName);

      categoriesContainer.appendChild(categoryContainer);
		}
	}
	
	createCategoryContainer(categoryName) {
		const categoryTitleTemplate = `<h3 class="category-title">${categoryName}</h3>`;
		let categoryContainer = document.createElement('div');

		categoryContainer.classList.add('category');
		categoryContainer.classList.add(categoryName);
		categoryContainer.innerHTML = categoryTitleTemplate;

		return categoryContainer;
	}

	addTopCategoriesItems(topCategories) {
		let topCategoriesContainer = this.elements.topCategoriesElement;

		for (let category in topCategories) {
			const itemList = this.createItemList(topCategories[category]);
			let categoryContainer = topCategoriesContainer.querySelector(`.${category}`);

			categoryContainer.appendChild(itemList);
		}
	}

	createItemList(items) {
		let list = document.createElement('ul');
		list.classList.add('item-list');
		
		items.forEach(item => {
			let listItem = document.createElement('li');
			listItem.classList.add('pet');
			listItem.innerHTML = `<h4 class="pet-title">${item.name || item.price}</h4>`;

			list.appendChild(listItem);
		});

		return list;
	}

  // fillCategoriesElements(categories) {
  //   // console.log(categories);
  // }

  renderTopCategories(topCategories) {
    let categoriesTemplate = document.querySelector('.top-categories');
    let categoryList = document.createElement('ul');

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
	
	getElement(query) {

		return this.mainElement.querySelector(query);
	}

}