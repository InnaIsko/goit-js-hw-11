import axios from 'axios';
import Notiflix from 'notiflix';

const getRef = selector => document.querySelector(selector);
let inputValue;

const apiKey = '30946911-c6f6e3f672fcb97cd0cd3059d';
const options = '&image_type=photo&orientation=horizontal&safesearch=true';

getRef('.search-form__input').addEventListener('input', getValueInput);
getRef('.search-form__btn').addEventListener('click', getAxios);
getRef('.search-form').addEventListener('submit', event => {
  event.preventDefault();
});
function getValueInput(event) {
  inputValue = event.currentTarget.value;
}
function getAxios() {
  axios
    .get(`https://pixabay.com/api/?key=${apiKey}&q=${inputValue}${options}`)
    .then(response => {
      const hitsAreey = response.data.hits;
      renderMarkup(hitsAreey);
    })
    .catch(
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      )
    );
}

function createMarkup(properties) {
  return `    <div class="photo-card">
      <img src="${properties.webformatURL}" alt="${properties.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes: ${properties.likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${properties.views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${properties.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${properties.downloads}</b>
        </p>
      </div>
    </div>`;
}
function renderMarkup(hitsAreey) {
  hitsAreey.map(element => {
    const properties = element;
    const markup = createMarkup(properties);
    getRef('.search-form').insertAdjacentHTML('beforeend', markup);
  });
}
