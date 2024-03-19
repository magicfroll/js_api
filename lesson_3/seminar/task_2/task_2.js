"use strict";

// Задача 2.
 
// Бесконечная лента фотографий
// Для создания бесконечной ленты с фотографиями с использованием 
// Unsplash API, выполните следующие шаги:
// 1. Зарегистрируйтесь на Unsplash:
// ○ Перейдите на веб-сайт Unsplash (https://unsplash.com/).
// ○ Нажмите кнопку "Join" или "Регистрация", чтобы создать аккаунт, если у вас его еще нет.
// ○ Войдите в свой аккаунт Unsplash.
 
// 2. Создайте приложение:
// ○ После входа в аккаунт Unsplash, перейдите на страницу разработчика Unsplash
// (https://unsplash.com/developers).
// ○ Нажмите на кнопку "Your apps".
// ○ Нажмите "New Application" (Новое приложение).
// ○ Заполните информацию о вашем приложении, такую как имя, описание и сайт (вы можете
// использовать http://localhost для тестового сайта).
// ○ После заполнения информации, нажмите "Create Application" (Создать приложение).
 
// 3. Получите API-ключ:
// ○ После создания приложения, вы получите API-ключ. Этот ключ будет
// отображаться в вашей панели управления приложением.
// ○ API-ключ представляет собой строку вида YOUR_ACCESS_KEY.
// Скопируйте его.
// 4. Измените код HTML и JavaScript:
// ○ Откройте вашу HTML-страницу в текстовом редакторе или
// интегрированной среде разработки.
// ○ Замените 'YOUR_ACCESS_KEY' в коде JavaScript на ваш собственный
// API-ключ.
 
// 5. Реализуйте загрузку фотографий при открытии страницы.
 
// 6. Реализуйте бесконечную подгрузку фотографий при прокручивании страницы.

const accessKey = 'GeQCAkYhARGeV7bg6NSl1fAM53DLTY9fFRgMzQ6MCVk';

const photoContainer = document.getElementById('photo-container');

let currentPage = 1;
let isFatching = false;

const fetchPhotos = async (page) => {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/?client_id=${accessKey}&page=${page}`)    
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error
    } finally {
        isFatching = false;
    }    
}

async function init() {
    try {
        const data = await fetchPhotos(currentPage);
        data.forEach(element => {
        const photoEl = createPhotoHTML(element.urls.full);
        photoContainer.insertAdjacentHTML('beforeend', photoEl);

    });
    } catch (error) {
        const errorMessageEl = document.createElement('div');
        errorMessageEl.textContent = error.message
        photoContainer.append(errorMessageEl);
    }
    
}

function createPhotoHTML(photo) {
    return `
    <div class="photo">
        <img src="${photo}" alt="">
    </div>
    `
}

init();

window.addEventListener('scroll', async () => {    
    const percent = (window.scrollY / (document.body.clientHeight - window.innerHeight)) * 100;
    if (percent >= 90 && !isFatching) {
        isFatching = true
        currentPage++;
        try {
            const data = await fetchPhotos(currentPage);
            data.forEach(element => {
                const photoEl = createPhotoHTML(element.urls.full);
                photoContainer.insertAdjacentHTML('beforeend', photoEl);
            }) 
        } catch (error) {
            alert(error.message);
        }
    }
});



