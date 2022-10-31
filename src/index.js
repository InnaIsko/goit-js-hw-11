import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const getRef = selector => document.querySelector(selector);
const apiKey = '30946911-c6f6e3f672fcb97cd0cd3059d';
disableBtnLoadMore();
let gallery = new SimpleLightbox('.gallery a');
let page = 1;
let inputValue;
let totalHits = null;
let responseDataGet;

getRef('.search-form__input').addEventListener('input', getValueInput);
getRef('.search-form').addEventListener('submit', submitForm);
getRef('.load-more').addEventListener('click', actionResponse);

function getValueInput(event) {
  inputValue = event.currentTarget.value;
  if (inputValue === '') {
    murkupClear();
  }
}
async function fetchImg(event) {
  let options = `&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  const getAxios = await axios.get(
    `https://pixabay.com/api/?key=${apiKey}&q=${inputValue}${options}`
  );
  return getAxios;
}
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
function resetPages() {
  page = 1;
}
function submitForm(event) {
  actionResponse();
  resetPages();
  murkupClear();
  enableBtnLoadMore();
}
function enableBtnLoadMore() {
  getRef('.load-more').classList.remove('is-hidden');
}
function disableBtnLoadMore() {
  getRef('.load-more').classList.add('is-hidden');
}
function NotifyFailure() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
function NotifyInfo(totalHits) {
  Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
}
function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
function getErrorAreeyLength(hitsAreeyLength) {
  if (hitsAreeyLength === 0) {
    disableBtnLoadMore();
    murkupClear();
    NotifyFailure();
  }
}
function checkTotalHits() {
  if (page === 2) {
    NotifyInfo(totalHits);
  }
}
function actionResponse() {
  event.preventDefault();
  fetchImg().then(response => {
    const hitsAreey = response.data.hits;
    const hitsAreeyLength = hitsAreey.length;
    renderMarkup(hitsAreey);

    gallery.on('show.simplelightbox');

    page += 1;
    totalHits = response.data.totalHits;

    smoothScroll();
    getErrorAreeyLength(hitsAreeyLength);
    checkTotalHits();
    enableBtnLoadMore();

    gallery.refresh();
  });
  return totalHits;
}
