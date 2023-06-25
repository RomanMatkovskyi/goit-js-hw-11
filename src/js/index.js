import axios from 'axios';
import Notiflix from 'notiflix';

let formEl = document.querySelector('.search-form');
let galleryEl = document.querySelector('.gallery');
let loadMoreBtn = document.getElementById('loadMore');
loadMoreBtn.classList.add('visually-hidden');


let currentPage;
let hitsCounter;
let imageInfoArray = [];

function onFormSubmit(event) {
  event.preventDefault();
  let inputEl = this.elements.searchQuery;
  let submitBtnEl = this.elements.submitBtn;
  galleryEl.innerHTML = '';
  currentPage = 1;
  imageInfoArray = [];
  renderMarkup(inputEl.value, currentPage);
}

formEl.addEventListener('submit', onFormSubmit);

// =============Отримання масиву данних=============

async function renderMarkup(searchData, page) {
  try {
    const response = await axios.get('https://pixabay.com/api/?', {
      params: {
        key: '37799813-d6baa13d55c299777f9561755',
        q: searchData,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: '40',
      },
    });

    let resObject = response.data;
    hitsCounter = resObject.totalHits;
    imageInfoArray.push(...resObject.hits);

    console.log('resObject', resObject);
    console.log('imageInfoArray ', imageInfoArray);

    if (resObject.hits.length !== 0) {
      if (imageInfoArray.length < hitsCounter) {
        loadMoreBtn.classList.remove('visually-hidden');
        createHeadlines(imageInfoArray);
      } else {
        Notiflix.Notify.failure(
          'We are sorry, but youve reached the end of search results.'
        );
        loadMoreBtn.classList.add('visually-hidden');
      }
    } else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  } catch (error) {
    console.error(error);
  }
}

// =============Створення розмітки=============

function createHeadlines(headlines) {
  headlines.forEach(headline => {
    createHeadline(headline);
  });
}

function createHeadline({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  let template = `<div class="photo-card">
<img src="${webformatURL}" alt="${tags}" class="img-photo" loading="lazy" />
<div class="card-description">
<ul class="info">
      <li class="info-item">Likes: ${likes}</li>
      <li class="info-item">Views: ${views}</li>
      <li class="info-item">Comments: ${comments}</li>
      <li class="info-item">Downloads: ${downloads}</li>
    </ul>
    </div>
</div>`;
  galleryEl.insertAdjacentHTML('beforeend', template);
}

// =============Load more btn=============

loadMoreBtn.addEventListener('click', loadMorePictures);

function loadMorePictures() {
  currentPage++;
  let inputEl = formEl.elements.searchQuery;
  renderMarkup(inputEl.value, currentPage);
}
