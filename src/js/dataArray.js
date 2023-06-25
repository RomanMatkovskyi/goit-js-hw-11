import { createHeadlines } from './markupRender'
import axios from 'axios';
import Notiflix from 'notiflix';
export let imageInfoArray = [];
let hitsCounter;



let loadMoreBtn = document.getElementById('loadMore');


export async function getInfoArray(searchData, page, imgArray) {
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
      imageInfoArray = imgArray;
      let resObject = response.data;
      hitsCounter = resObject.totalHits;
      imageInfoArray.push(...resObject.hits);
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

  