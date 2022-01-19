import './sass/main.scss';
import debounce from 'lodash.debounce';
import fetchPictures from './fetchPictures';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// console.log(SimpleLightbox);
let page = 1;
const formNode = document.querySelector('.search-form');
const divNode = document.querySelector('.gallery');
const nextBtnNode = document.querySelector('.load-more');

function clearFoo() {
    divNode.innerHTML = '';
}
async function drawImages() {
    try {
        const data = await fetchPictures(formNode.searchQuery.value, page);
        if (data.total === 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
            page += 1;
            console.dir(data);
            markupFoo(data);
        }
    } catch (error) {
        console.log('errrrrrrrrrrr');
        Notify.failure("We're sorry, but you've reached the end of search results.");
    }
    // window.scroll(0, window.scrollY / 2);
}
formNode.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    clearFoo();
    console.log('inputNode', formNode.searchQuery.value);
    drawImages();
}
window.addEventListener('scroll', debounce(onScroll, 300));

function onScroll() {
    // console.log('window.scrollY ', window.scrollY);
    // console.log('window.innerHeight', window.innerHeight);
    // console.log('document.documentElement.scrollHeight', document.documentElement.scrollHeight);
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        console.log('onScroll');
        // nextBtnNode.style.visibility = 'visible';
        // nextBtnNode.addEventListener('click', drawImages);
        drawImages();
    }
}

function markupFoo(data) {
    const markup = data.hits.map(item => {
        return `<a href="${item.largeImageURL}" class="gallary-link"><div class="photo-card">
         <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
         <div class="info">
             <p class="info-item">
                 <b>Likes: </b>${item.likes}
             </p>
             <p class="info-item">
                 <b>Views: </b>${item.views}
             </p>
             <p class="info-item">
                 <b>Comments: </b>${item.comments}
             </p>
             <p class="info-item">
                 <b>Downloads: </b>${item.downloads}
             </p>
         </div>
     </div></a>`;
    });
    divNode.insertAdjacentHTML('beforeend', markup.join(''));
    const lightbox = new SimpleLightbox('.gallery a', {
        /* options */
        captionsData: 'alt',
        captionDelay: 250,
    });
    lightbox.refresh();
}