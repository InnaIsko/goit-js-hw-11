import { hitsAreeyLength } from '../index';

function smoothScroll(hitsAreeyLength) {
  if (hitsAreeyLength !== 0) {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
export { smoothScroll };
