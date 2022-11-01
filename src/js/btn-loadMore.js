import { getRef } from '../index';

function enableBtnLoadMore() {
  getRef('.load-more').classList.remove('is-hidden');
}
function disableBtnLoadMore() {
  getRef('.load-more').classList.add('is-hidden');
}

export { enableBtnLoadMore, disableBtnLoadMore };
