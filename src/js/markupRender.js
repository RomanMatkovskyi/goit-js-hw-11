let galleryEl = document.querySelector('.gallery');

export function createHeadlines(headlines) {
  let markupContainer = document.createDocumentFragment();
  headlines.forEach(({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) => {
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
  let divEl = document.createElement('div');
  divEl.innerHTML = template;
  markupContainer.appendChild(divEl.firstChild);
})
galleryEl.appendChild(markupContainer);
};
