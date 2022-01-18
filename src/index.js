import './sass/main.scss';
import fetchPictures from './fetchPictures';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
console.log(SimpleLightbox);

const formNode = document.querySelector('.search-form');
const divNode = document.querySelector('.gallery');
formNode.addEventListener('submit', onSubmit);
async function onSubmit(e) {
    e.preventDefault();
    console.log('inputNode', formNode.searchQuery.value);
    const data = await fetchPictures(formNode.searchQuery.value);
    console.log(data.hits);
    markupFoo(data);
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
    divNode.insertAdjacentHTML('afterbegin', markup.join(''));
    const lightbox = new SimpleLightbox('.gallery a', {
        /* options */
        captionsData: 'alt',
        captionDelay: 250,
    });
}