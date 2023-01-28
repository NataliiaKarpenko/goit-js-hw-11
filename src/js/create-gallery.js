export function createGallery(cardsInfo) {
  const galleryArr = cardsInfo.map(card => {
    return `
  <a class ="photo-link" href="${card.webformatURL}">
    <div class="photo-card">
      <img src="${card.largeImageURL}" alt="${card.tags}" loading="lazy" />
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
    </div>
  </a>
`;
  });

  return galleryArr.join('');
}
