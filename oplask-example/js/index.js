const API_KEY = '8f5cb789968ba70de1bf09bc1bf0aa979af568b6dd64a9a9c27758556041d409';
const BASE_URL = 'https://api.unsplash.com';
let photos;
const bodyElem = document.querySelector('main');
const inputElem = document.querySelector('input');
const buttonElem = document.querySelector('button');

function addClickEvent() {
    const photoElems = document.querySelectorAll('img'); // Hämtar alla img-element
    console.log(photoElems);
    for(const photoElem of photoElems) { // Loopar igenom alla img-element
        photoElem.addEventListener('click', () => { // Sätter en addEventListener på varje img-element
            const url = photoElem.getAttribute('src'); // Hämtar URL:en från src-attributet på img-taggen
            console.log(url);
            const fullImageElem = document.querySelector('#full-image'); // Hämtar img-taggen med id full-image
            fullImageElem.src = url; // Sätter url:en till img-element med id full-image
        });
    }
}

function createPhotoElem(photo) {
    console.log(photo);
    const imgElem = `<img src="${photo.urls.small}" alt="${photo.alt_description}" />`;
    bodyElem.insertAdjacentHTML('beforeend', imgElem);
}

function displayPhotos() {
    for(const photo of photos) {
        createPhotoElem(photo);
    }

    addClickEvent();
}

async function getPhotos(searchQuery) {
    //client_id är vår API-nyckel
    const response = await fetch(`${BASE_URL}/search/photos?client_id=${API_KEY}&query=${searchQuery}`);
    console.log(response);
    const data = await response.json();
    console.log(data);
    photos = data.results;

    displayPhotos();
}

buttonElem.addEventListener('click', () => {
    const searchQuery = inputElem.value; // Hämta från inputfältet vad användaren skrivit in

    getPhotos(searchQuery);
});