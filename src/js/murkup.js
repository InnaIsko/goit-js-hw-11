import { getRef } from '../index';
import { disableBtnLoadMore } from '../index';

function createMarkup(properties) {
  return `  
 <a class="gallery__link" href="${properties.largeImageURL}" onclick="event.preventDefault()">
  <div class="photo-card">
    <img
      src="${properties.webformatURL}"
      alt="${properties.tags}"
      loading="lazy"
    />
    <div class="info">
      <p class="info-item">
        <b>Likes <span>${properties.likes}</span></b>
      </p>
      <p class="info-item">
        <b>Views <span>${properties.views}</span></b>
      </p>
      <p class="info-item">
        <b>Comments <span>${properties.comments}</span></b>
      </p>
      <p class="info-item">
        <b>Downloads <span>${properties.downloads}</span></b>
      </p>
    </div>
  </div>
</a>`;
}
function renderMarkup(hitsAreey) {
  hitsAreey.map(element => {
    const properties = element;
    const markup = createMarkup(properties);
    getRef('.gallery').insertAdjacentHTML('beforeend', markup);
  });
}
function murkupClear() {
  getRef('.gallery').innerHTML = ' ';
  disableBtnLoadMore();
}
export { murkupClear, renderMarkup, createMarkup };
