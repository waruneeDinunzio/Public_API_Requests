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
    console.log(data);
    displayUsers(data.results);
    eventListener(data.results);
  })


function displayUsers(data) {
  data.map( data =>{ 
  const card = document.createElement('div');
  card.className = "card";
  gallery.appendChild(card);
  card.innerHTML = `
  <div class="card-img-container">
          <img class="card-img" src="${data.picture.large}" alt="profile picture">
          </div>
            <div class="card-info-container">
              <h3 id="name" class="card-name cap">${data.name.first}`+ " " + `${data.name.last}</h3>
              <p class="card-text">${data.email}</p>
              <p class="card-text cap">${data.location.city}</p>
            </div>
  `;
});
}
/*
function displayModal(data, i) {
  data.map( data =>{ 
  const modalContainer = document.createElement('div');
  modalContainer.className = "modalContainer";
  body.appendChild(modalContainer);
  modalContainer.innerHTML = 
  `
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${data[i].picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${data[i].name.first}`+ " " + `${data[i].name.last}</h3>
          <p class="modal-text">${data[i].email}</p>
          <p class="modal-text cap">${data[i].location.city}</p>
          <hr>
          <p class="modal-text">(555) 555-5555</p>
          <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
          <p class="modal-text">Birthday: 10/21/2015</p>
      </div>
  </div>
  <div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
  </div>
  `;
  });
}*/

  function displayModal(data, i) {
    //for (let i=0; i < data.length; i++ ) {
      const modalContainer = document.createElement('div');
      modalContainer.className = "modal-container";
      body.appendChild(modalContainer)[i];
      const modal = document.createElement('div');
      modal.className = "modal";
      modalContainer.appendChild(modal)[i];
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
    //}
    //if (modalH3.innerHTML === 
  }

 
function eventListener(data) {
  let cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
      console.log(data.name);
    
        cards[i].addEventListener('click', (e) => {
          console.log(e.target);
          console.log(cards[i]);
          displayModal(data, i);
        });
    }
}