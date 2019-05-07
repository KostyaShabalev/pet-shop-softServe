export class PetShopView {

  get mainCategoriesTemplate() {

    return `
			<div class="categories main-categories">
        <h3 class="category-name"></h3>
        <ul class="category-items-list"></ul>
		 	</div>`;
  }

  get topCategoriesTemplate() {
    
    return `
			<div class="categories main-categories">
        <h3 class="category-name"></h3>
        <ul class="category-items-list"></ul>
		 	</div>`;
  }

  constructor(mainElement) {
    this.mainElement = mainElement;
    this.elements = {};

    // this.mainElement.innerHTML = `${this.topCategoriesTemplate}${this.mainCategoriesTemplate}`;
  }

  renderCategories(categories) {
    this.addCategoriesElements(categories);
    // create templates
    // add listeners
    // display
    // top categories maybe shouldn't have any handlers
    this.renderTopCategories(categories.topCategories);
    this.renderMainCategories(categories.mainCategories);
  }

  addCategoriesElements(categories) {
    const mainCategoriesElement = this.createCategoryElement(categories, 'main-categories');
    const topCategoriesElement = this.createCategoryElement(categories, 'top-categories');
  }

  createCategoryElement(categories, type) {
    const currentCategories = (type === 'main-categories') ? categories.mainCategories : categories.topCategories;
    let categoriesElement = document.createElement('.div');
    let categoryList = document.createElement('ul');

    categoriesElement.classList.add(`.${type}`);
    categoriesElement.classList.add(type);

    for (let category in currentCategories) {
      categoryList.innerHTML += `<li>${category}</li>`;
    }
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

}