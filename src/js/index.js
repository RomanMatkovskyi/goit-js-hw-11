import { getInfoArray } from './dataArray';
import { imageInfoArray } from './dataArray';
import Notiflix from 'notiflix';

let formEl = document.querySelector('.search-form');
let loadMoreBtn = document.getElementById('loadMore');
let galleryEl = document.querySelector('.gallery');
loadMoreBtn.classList.add('visually-hidden');

let currentPage;

function onFormSubmit(event) {
  event.preventDefault();
  let inputEl = this.elements.searchQuery;
  let submitBtnEl = this.elements.submitBtn;
  if (inputEl.value.trim() === '') {
    Notiflix.Notify.failure('Please enter a topic to search for images.');
    return;
  }
  galleryEl.innerHTML = '';
  currentPage = 1;
  let imageInfoArray = [];
  getInfoArray(inputEl.value, currentPage, imageInfoArray);
}
formEl.addEventListener('submit', onFormSubmit);

function loadMorePictures() {
  currentPage++;
  let inputEl = formEl.elements.searchQuery;
  getInfoArray(inputEl.value, currentPage, imageInfoArray);
}
loadMoreBtn.addEventListener('click', loadMorePictures);
