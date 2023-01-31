export const gridRef = document.querySelector('.grid');
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PixabayAPI } from './pixabay-api-masonry-gallery';
import { createGallery } from './create-masonry-gallery';

const searchFormRef = document.querySelector('.search-form');

const inputRef = document.querySelector('input');
const loaderRef = document.querySelector('.loader');

const pixabayApi = new PixabayAPI();
const lightBox = new SimpleLightbox('.gallery a');

let msnry;

searchFormRef.addEventListener('submit', onSearchFormSubmit);
window.addEventListener('scroll', onWindowScroll);
searchFormRef.addEventListener('input', handleInputRef);

async function onSearchFormSubmit(e) {
  e.preventDefault();

  pixabayApi.q = e.target.elements.searchQuery.value;
  pixabayApi.page = 1;

  try {
    const response = await pixabayApi.fetchPhotosByQuery();
    const { data } = response;

    if (data.hits.length === 0) {
      // e.target.reset();
      // gridRef.reset();
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      gridRef.innerHTML = '';

      setTimeout(() => {
        window.location.reload();
      }, 600);

      return;
    }

    Notify.success(`Hooray! We found ${data.totalHits} images.`);
    createGallery(data.hits);

    gridRef.insertAdjacentHTML('beforeend', createGallery(data.hits));

    imagesLoaded(gridRef, makeUpMasonry);

    lightBox.refresh();
  } catch (err) {
    console.log(err);
  }
}

async function onWindowScroll(e) {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    pixabayApi.page += 1;

    try {
      const response = await pixabayApi.fetchPhotosByQuery();
      const { data } = response;

      if (data.totalHits - pixabayApi.per_page * pixabayApi.page <= 0) {
        Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }

      setTimeout(() => {
        gridRef.insertAdjacentHTML('beforeend', createGallery(data.hits));
        imagesLoaded(gridRef, makeUpMasonry);
        lightBox.refresh();
      }, 500);

      showLoading();
    } catch (err) {
      console.log(err);
    }
  }
}

function makeUpMasonry() {
  const msnry = new Masonry(gridRef, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    gutter: 15,
  });
}

function handleInputRef(e) {
  if (inputRef.value === '') {
    window.location.reload();
  }
  return;
}

function showLoading() {
  loaderRef.classList.add('show');

  setTimeout(() => {
    loaderRef.classList.remove('show');
  }, 300);
}
