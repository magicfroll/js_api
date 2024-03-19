const accessKey = 'GeQCAkYhARGeV7bg6NSl1fAM53DLTY9fFRgMzQ6MCVk';
const endpoint = 'https://api.unsplash.com/photos/random/?client_id=' + accessKey;

const photoContainer = document.getElementById('photo-container');

let history = localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history')) : [];
const likedItems = JSON.parse(localStorage.getItem('likedItems')) || {};
const dislikedItems = JSON.parse(localStorage.getItem('dislikedItems')) || {};

const fetchPhotos = async () => {
    try {
        const response = await fetch(endpoint);    
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error
    }   
}

function likeHandler(id) {

    const likeButton = document.querySelector(`.like-button`);
    const dislikeButton = document.querySelector(`.dislike-button`);

    likedItems[id] = true;
    likeButton.setAttribute('disabled', true);
    if (dislikedItems[id]) {
        dislikeButton.removeAttribute('disabled');
        delete dislikedItems[id];
    }    

    localStorage.setItem('likedItems', JSON.stringify(likedItems));
    localStorage.setItem('dislikedItems', JSON.stringify(dislikedItems));
}

function dislikeHandler(id) {
    
    const dislikeButton = document.querySelector(`.dislike-button`);
    const likeButton = document.querySelector(`.like-button`);

    dislikedItems[id] = true;
    dislikeButton.setAttribute('disabled', true);
    if (likedItems[id]) {
        likeButton.removeAttribute('disabled');
        delete likedItems[id];
    }    
  
    localStorage.setItem('dislikedItems', JSON.stringify(dislikedItems));
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
  }

function createPhotoHTML(obj) {
    return `
    <div id="${obj.id}" class="photo-div">
        <img src="${obj.urls.small}" alt="photo">
        <p>Photographer name: ${obj.user.name}</p>
        <div class="like-container">
            <button class="like-button">👍</button>
            <span class="like-count">${obj.likes}</span>
            <button class="dislike-button">👎</button>
        </div>
    </div>        
`}

async function init() {
    try {
        const data = await fetchPhotos();        
        console.log(data);
        const photoEl = createPhotoHTML(data);
        photoContainer.insertAdjacentHTML('beforeend', photoEl);

        const likeContainer = photoContainer.querySelector('.like-container');
        const likeCount = document.querySelector('.like-count');  

        likeContainer.addEventListener('click', ({target}) => {
            const currentCount = parseInt(likeCount.textContent, 10);
            if(target.closest('.like-button')) {
                likeHandler(data.id)
                likeCount.textContent = currentCount + 1;
            } else if (target.closest('.dislike-button')) {
                dislikeHandler(data.id)
                likeCount.textContent = currentCount - 1;
            }
        });        

        history.push(
            { 
                id: data.id, 
                urls: {
                    small: data.urls.small
                }, 
                user: {
                    name: data.user.name
                },
                likes: parseInt(likeCount.textContent, 10)
            });
        localStorage.setItem('history', JSON.stringify(history));
    } catch (error) {
        const errorMessageEl = document.createElement('div');
        errorMessageEl.textContent = error.message
        photoContainer.append(errorMessageEl);
    }    
}

const historyContainer = document.querySelector('.history')

async function initHistory() {
    try {
        const photoItems = JSON.parse(localStorage.getItem('history')) || [];
        photoItems.forEach(photo => {
            const photoEl = createPhotoHTML(photo)
            historyContainer.insertAdjacentHTML('beforeend', photoEl);            
        });
    } catch (error) {
        const errorMessageEl = document.createElement('div');
        errorMessageEl.textContent = error.message
        photoContainer.append(errorMessageEl);
    }
}

init();
initHistory();