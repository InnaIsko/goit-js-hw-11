import { totalHits } from '../index';
import Notiflix from 'notiflix';

function NotifyFailure() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function NotifyInfoEnd() {
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}
function NotifyInfo(totalHits) {
  Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
}
export { NotifyFailure, NotifyInfo, NotifyInfoEnd };
