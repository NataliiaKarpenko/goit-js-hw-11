import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PixabayAPI } from './pixabay-api';
import { createGallery } from './create-gallery';
import { handleWindowScroll } from './handle-window-scroll';

const searchFormRef = document.querySelector('.search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreBtnRef = document.querySelector('.load-more');

const pixabayApi = new PixabayAPI();

searchFormRef.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnRef.addEventListener('click', onLoadMoreBtnClick);

async function onSearchFormSubmit(e) {
  e.preventDefault();

  pixabayApi.q = e.target.elements.searchQuery.value;
  pixabayApi.page = 1;

  try {
    const response = await pixabayApi.fetchPhotosByQuery();
    const { data } = response;

    if (data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      e.target.reset();
      galleryRef.innerHTML = '';
      loadMoreBtnRef.classList.add('visually-hidden');
      return;
    }

    if (data.totalHits > 40) {
      loadMoreBtnRef.classList.remove('visually-hidden');
    }

    Notify.success(`Hooray! We found ${data.totalHits} images.`);
    galleryRef.innerHTML = createGallery(data.hits);
    handleWindowScroll();
    new SimpleLightbox('.gallery a');
  } catch (err) {
    console.log(err);
  }
}

async function onLoadMoreBtnClick(e) {
  pixabayApi.page += 1;

  try {
    const response = await pixabayApi.fetchPhotosByQuery();
    const { data } = response;
    if (data.totalHits - pixabayApi.per_page * pixabayApi.page <= 0) {
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtnRef.classList.add('visually-hidden');
    }

    galleryRef.insertAdjacentHTML('beforeend', createGallery(data.hits));
    handleWindowScroll();
    new SimpleLightbox('.gallery a').refresh();
  } catch (err) {
    console.log(err);
  }
}
