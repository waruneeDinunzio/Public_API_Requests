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
form.innerHTML= `
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    `
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

function displayModal(data, i) {
  //data.map(data =>{
let current_datetime = new Date(`${data[i].dob.date}`);
console.log(current_datetime);
let formatted_date = current_datetime.getDate() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getFullYear()
console.log(formatted_date)
//var DateCreated = new Date(Date.parse(${data[i].dob.date})).format("MM/dd/yyyy"); 
  const modalContainer = document.createElement('div');
  modalContainer.className = "modal-container";
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
          <p class="modal-text">${data[i].phone}</p>
          <p class="modal-text">${data[i].location.street.number}`+ " "+`
                                ${data[i].location.street.name}` + ". " +`
                                ${data[i].location.city}` + ", " +`
                                ${data[i].location.state}` + " " +`
                                ${data[i].location.postcode}</p>
          <p class="modal-text">${formatted_date}</p>
      </div>
  </div>
  <div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
  </div>
  `;

  const button = document.querySelector('.modal-close-btn');
  //const modalContainer = document.querySelector('.modal-container');
  button.onclick = function() {
    modalContainer.style.display = "none";
  };

  window.onclick = function(event) {
    if (event.target == modalContainer) {
      modalContainer.style.display = "none";
    }
  };
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