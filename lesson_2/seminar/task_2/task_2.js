"use strict";

// Задание 2.
 
// Создайте простое модальное окно, которое появляется при клике 
// на кнопку "Открыть модальное окно" и закрывается при клике на 
// кнопку "Закрыть". Модальное окно должно содержать заголовок 
// "Модальное окно" и кнопку для закрытия. Модальное окно должно 
// плавно появляться и исчезать при открытии и закрытии.

const modalEl = document.querySelector('.modal');


document.addEventListener('click', function ({target}) {
    if (target.closest('.open-btn')) {
        modalEl.classList.add('active');
    };
    if (target.closest('.close-btn')) {
        modalEl.classList.remove('active');
    }  
});