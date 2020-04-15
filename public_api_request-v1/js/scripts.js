const searchContainer = document.querySelector('.search-container');
const gallery = document.querySelector('.gallery');
const body = document.querySelector('body');

 /*
 ** Create search box
 */
const form = document.createElement('form');
form.action = "#";
form.method = "get";
searchContainer.appendChild(form);
const searchInput = document.createElement('input');
searchInput.type = "search";
searchInput.id = "search-input";
searchInput.className = "search-input";
searchInput.placeholder = "Search...";
form.appendChild(searchInput);
const submit = document.createElement('input');
submit.type = "submit";
submit.value = "&#x1F50D;";
submit.id = "search-submit";
submit.className = "search-submit";
form.appendChild(submit);
// 
//  FETCH FUNCTIONS
// ------------------------------------------

fetch('https://randomuser.me/api/?results=12&nat=us')
  .then(response => response.json())
  .then(data => {
    displayUsers(data.results);
    eventListener(data.results);
  })


function displayUsers(data) {
  for (let i=0; i < data.length; i++ ) {
  const card = document.createElement('div');
  card.className = "card";
  gallery.appendChild(card)[i];
  const cardImg = document.createElement('div');
  cardImg.className = "card-img-container";
  card.appendChild(cardImg)[i];
  const img = document.createElement("img");
  img.className = "card-img";
  img.src = `${data[i].picture.large}`;
  img.alt = "profile picture";
  cardImg.appendChild(img)[i];
  const cardInfo = document.createElement('div');
  cardInfo.className = "card-info-container";
  card.appendChild(cardInfo);
  const h3 = document.createElement("h3");
  h3.id = "name";
  h3.className = "card-name cap";
  h3.innerHTML = `${data[i].name.first}`+ " " + `${data[i].name.last}`;
  cardInfo.appendChild(h3)[i];
  const email = document.createElement("p");
  email.className = "card-text";
  email.innerHTML = `${data[i].email}`;
  cardInfo.appendChild(email)[i];
  const city = document.createElement("p");
  city.className = "card-text cap";
  city.innerHTML = `${data[i].location.city}`;
  cardInfo.appendChild(city)[i];
  }
}

  function displayModal(data) {
    for (let i=0; i < data.length; i++ ) {
      const modal = document.createElement('div');
      modal.className = "modal";
      body.appendChild(modal)[i];
      //modal.style.display = 'none';
      const button = document.createElement('button');
      button.type = "button";
      button.id = "modal-close-btn";
      button.className = "modal-close-btn";
      button.innerHTML = "<strong>X</strong>";
      modal.appendChild(button)[i];
      const modalInfo = document.createElement('div');
      modalInfo.className = "modal-info-container";
      modal.appendChild(modalInfo)[i];
      const modalImg = document.createElement("img");
      modalImg.className = "modal-img";
      modalImg.src = `${data[i].picture.large}`;
      modalImg.alt = "profile picture";
      modalInfo.appendChild(modalImg)[i];
      const modalH3 = document.createElement("h3");
      modalH3.id = "name";
      modalH3.className = "modal-name cap";
      modalH3.innerHTML = `${data[i].name.first}`+ " " + `${data[i].name.last}`;
      modalInfo.appendChild(modalH3)[i];
      const modalEmail = document.createElement("p");
      modalEmail.className = "card-text";
      modalEmail.innerHTML = `${data[i].email}`;
      modalInfo.appendChild(modalEmail)[i];
      const modalCity = document.createElement("p");
      modalCity.className = "card-text cap";
      modalCity.innerHTML = `${data[i].location.city}`;
      modalInfo.appendChild(modalCity)[i];
    }
  }

 
function eventListener(data) {
  let cards = document.querySelectorAll('.card');

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', (e) => {
          //console.log(e.target);
          displayModal(data);
        });
    }
}