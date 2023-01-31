import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createGallery(cardsInfo) {
  const galleryArr = cardsInfo
    .map(card => {
      return `
  
<div class="grid-item">
  <a class ="photo-link" href="${card.webformatURL}">
      <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${card.likes}
        </p>
        <p class="info-item">
          <b>Views</b>${card.views}
        </p>
        <p class="info-item">
          <b>Comments</b>${card.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${card.downloads}
        </p>
      </div> 
    </a>
   </div>
`;
    })
    .join('');

  return galleryArr;
}
