// Задание 3.
// Необходимо создать страницу со списком статей.
// Каждая статья состоит из id, заголовка, текста статьи.
// id - будем брать из unix timestamp.
// Необходимо подготовить список статей в JSON-формате,
// которые будут выводиться на странице при первом ее 
// открытии.
// Необходимо реализовать возможность удаления статьи.
// Необходимо реализовать возможность добавления статьи.
// Необходимо реализовать возможность изменения статьи,
// ввод данных можно реализовать через prompt.
// Статьи должны сохраняться в локальное хранилище 
// браузера, и должны быть доступны после перезагрузки 
// страницы.

// const initialJSON = JSON.stringify([
//     {
//         id: Date.now(),
//         title: 'Title 1',
//         text: 'Text 1'
//     },
//     {
//         id: Date.now(),
//         title: 'Title 2',
//         text: 'Text 2'
//     },
//     {
//         id: Date.now(),
//         title: 'Title 3',
//         text: 'Text 3'
//     }
// ]);
// console.log(initialJSON); 

const initialJSON = '[{"id":1710403500880,"title":"Title 1","text":"Text 1"},{"id":1710403500881,"title":"Title 2","text":"Text 2"},{"id":1710403500882,"title":"Title 3","text":"Text 3"}]';

const lsKey = 'articles';

if(!localStorage.getItem(lsKey)) {
    localStorage.setItem(lsKey, initialJSON);
};

const articles = JSON.parse(localStorage.getItem(lsKey));


const postList = document.querySelector('.post-list');

function createArticleHTML(article) {
    return `
    <div class="article" id="${article.id}">
    <h2>${article.title}</h2>
    <h3>${article.id}</h3>
    <p>${article.text}</p>
    <button id="deleteButton">Delete</button>
    <button id="editButton">Edit</button>
    </div>
    `
}

// ПЕРВЫЙ ВАРИАНТ
// const ariclesHTMLArray = articles.map(createArticleHTML);

// ariclesHTMLArray.forEach(article => {
//     const newArticle = document.createElement('div');
//     newArticle.innerHTML = article;
//     // console.log(newArticle);
//     postList.append(newArticle);
// });

// ВТОРОЙ ВАРИАНТ
postList.innerHTML = articles.map(createArticleHTML).join('')


postList.addEventListener('click', ({target}) => {
    const articleDiv = target.closest('.article');
    if(target.closest('#deleteButton')) {        
        articleDiv.remove();
        const articleIndex = articles.findIndex(article => article.id === +articleDiv.getAttribute('id'));
        articles.splice(articleIndex, 1)
        localStorage.setItem(lsKey, JSON.stringify(articles));
    } else if(target.closest('#editButton')) {
        const title = prompt('Write title');
        const text = prompt('Write text');
        if(!title || !text) {
            alert('Wrong data');
            return;
        } 
        const article = articles.find(article => article.id === +articleDiv.getAttribute('id'));
        article.title = title;
        article.text = text;
        localStorage.setItem(lsKey, JSON.stringify(articles));
        articleDiv.querySelector('h2').textContent = title;
        articleDiv.querySelector('p').textContent = text;
    }
    
})

const addButton = document.querySelector('.add-btn');

addButton.addEventListener('click', () => {
    const title = prompt('Write title');
    const text = prompt('Write text');

    if(title && text) {
        const newArticle = {
            id: Date.now(),
            title,
            text,
        };
        articles.push(newArticle);
        localStorage.setItem(lsKey, JSON.stringify(articles));
        postList.insertAdjacentHTML('deforeend', createArticleHTML(newArticle));       
    } else {
        alert('Wrong data!')
    }          
})