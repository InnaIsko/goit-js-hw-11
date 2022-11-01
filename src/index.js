import axios from 'axios';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { enableBtnLoadMore, disableBtnLoadMore } from './js/btn-loadMore';
import { murkupClear, renderMarkup, createMarkup } from './js/murkup';
import { NotifyFailure, NotifyInfo, NotifyInfoEnd } from './js/notify';
import { smoothScroll } from './js/scroll';

const getRef = selector => document.querySelector(selector);

let gallery = new SimpleLightbox('.gallery a');
let page = 1;
let inputValue;
let totalHits;
let hitsAreeyLength;

getRef('.search-form__input').addEventListener('input', getValueInput);
getRef('.search-form').addEventListener('submit', submitForm);
getRef('.load-more').addEventListener('click', actionResponse);

function getValueInput(event) {
  inputValue = event.currentTarget.value;
  if (inputValue === '') {
    murkupClear();
  }
}
function resetPages() {
  page = 1;
}
function submitForm(event) {
  actionResponse();
  resetPages();
  murkupClear();
}
function getErrorAreeyLength(hitsAreeyLength) {
  if (hitsAreeyLength === 0) {
    murkupClear();
    NotifyFailure();
  }
}
function checkTotalHits(hitsAreeyLength) {
  if (page === 2 && hitsAreeyLength !== 0) {
    NotifyInfo(totalHits);
  }
}
function getEndOfCollection() {
  if (hitsAreeyLength < 40 && hitsAreeyLength !== 0) {
    NotifyInfoEnd();
    disableBtnLoadMore();
  }
}
function actionResponse() {
  event.preventDefault();
  fetchImg().then(response => {
    const hitsAreey = response.data.hits;
    hitsAreeyLength = hitsAreey.length;
    renderMarkup(hitsAreey);

    gallery.on('show.simplelightbox');

    page += 1;
    totalHits = response.data.totalHits;

    smoothScroll(hitsAreeyLength);
    enableBtnLoadMore();
    getErrorAreeyLength(hitsAreeyLength);
    checkTotalHits(hitsAreeyLength);
    getEndOfCollection();

    gallery.refresh();
  });
  return totalHits;
}
async function fetchImg(event) {
  const apiKey = '30946911-c6f6e3f672fcb97cd0cd3059d';
  let options = `&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}&min_height=300`;
  const getAxios = await axios.get(
    `https://pixabay.com/api/?key=${apiKey}&q=${inputValue}${options}`
  );
  return getAxios;
}

export { getRef, disableBtnLoadMore, totalHits, hitsAreeyLength };
