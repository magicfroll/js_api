"use strict";

// Задача 1.
 
// Дан массив товаров:
 
// ```
// productsData = [
//   {
//     id: 1,
//     name: "Ноутбук",
//     category: "Электроника",
//   },
//   {
//     id: 2,
//     name: "Смартфон",
//     category: "Электроника",
//   },
//   {
//     id: 3,
//     name: "Кофемашина",
//     category: "Бытовая техника",
//   },
//   {
//     id: 4,
//     name: "Фотокамера",
//     category: "Электроника",
//   },
//   {
//     id: 5,
//     name: "Микроволновая печь",
//     category: "Бытовая техника",
//   },
//   {
//     id: 6,
//     name: "Книга",
//     category: "Книги",
//   },
//   {
//     id: 7,
//     name: "Футболка",
//     category: "Одежда",
//   },
//   {
//     id: 8,
//     name: "Шапка",
//     category: "Одежда",
//   },
//   {
//     id: 9,
//     name: "Стул",
//     category: "Мебель",
//   },
//   {
//     id: 10,
//     name: "Стол",
//     category: "Мебель",
//   },
// ];
// ```
 
// Вы разрабатываете интернет-магазин и хотите добавить
// функциональность динамической фильтрации товаров по
// категориям. У вас есть форма с выпадающим списком (select), в
// котором пользователь может выбрать категорию товаров, 
// значения необходимо сформировать исходя их имеющихся товаров. 
// При выборе категории товаров, необходимо динамически обновлять 
// список отображаемых товаров на странице, чтобы пользователь 
// видел только товары из выбранной категории.
// 1. Создайте интерфейс веб-страницы, который включает в себя
// следующие элементы:
// a. Выпадающий список (select) с категориями товаров.
// b. Список товаров, который будет отображать товары в
// соответствии с выбранной категорией.
// c. Каждый товар в списке должен содержать название и
// категорию.
 
// При выборе категории товаров в выпадающем списке, форма
// должна следить за изменениями.
// Динамически обновляйте список товаров на странице, чтобы
// отображать только товары из выбранной категории.
// Стилизуйте элементы интерфейса с помощью CSS для улучшения
// внешнего вида.

const productsData = [
    {
      id: 1,
      name: "Ноутбук",
      category: "Электроника",
    },
    {
      id: 2,
      name: "Смартфон",
      category: "Электроника",
    },
    {
      id: 3,
      name: "Кофемашина",
      category: "Бытовая техника",
    },
    {
      id: 4,
      name: "Фотокамера",
      category: "Электроника",
    },
    {
      id: 5,
      name: "Микроволновая печь",
      category: "Бытовая техника",
    },
    {
      id: 6,
      name: "Книга",
      category: "Книги",
    },
    {
      id: 7,
      name: "Футболка",
      category: "Одежда",
    },
    {
      id: 8,
      name: "Шапка",
      category: "Одежда",
    },
    {
      id: 9,
      name: "Стул",
      category: "Мебель",
    },
    {
      id: 10,
      name: "Стол",
      category: "Мебель",
    },
  ];

const categoryList = [];

productsData.forEach(product => {
      categoryList.push(product.category); 
});

const uniqueCategoryList = new Set(categoryList); 

const categoryListEl = document.getElementById('category-list');

uniqueCategoryList.forEach(category => {
    const categoryEl = document.createElement('option');
    categoryEl.setAttribute('value', category);
    categoryEl.textContent = category;
    categoryListEl.appendChild(categoryEl);
});

const productsEl = document.querySelector('.products');

function createProductsHTML(products) {
    return products.map((product) => `
        <div data-product_id=${product.id} class="product-item">
            <h3 class="name">${product.name}</h3>
            <p class="category">${product.category}</p>
            <button class="add-button">Купить</button>
        </div>
    `).join('')
}

productsEl.innerHTML = createProductsHTML(productsData);

// createProductsHTML(productsData);


const selectEl = document.querySelector(['#category-list']);

selectEl.addEventListener('change', () => {
    const selectedCategory = selectEl.value;
    if (selectedCategory === 'all') {
        productsEl.innerHTML = createProductsHTML(productsData);
    } else {
        const products = productsData.filter(product => product.category === selectedCategory);
        productsEl.innerHTML = createProductsHTML(products);
    }
});

productsEl.addEventListener('click', ({target}) => {
    if(!target.closest('.add-button')) {
        return;
    } 
    console.log(target.closest(".product-item").getAttribute('data-product_id'));
})