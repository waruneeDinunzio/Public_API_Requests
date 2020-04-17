/*
**
*/
window.addEventListener('DOMContentLoaded', (event) => { 

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
/*const searchInput = document.createElement('input');
   searchInput.type = 'search';
   searchInput.id = "search-input"
   searchInput.className = "search-input"
   searchInput.placeholder = "search...";
   form.appendChild(searchInput);
const searchButton = document.createElement('input');
   searchButton.type = "sumit";
   searchButton.value = "&#x1F50D;";
   searchButton.id = "search-submit";
   searchButton.className = "search-submit";
   form.appendChild(searchButton);*/
form.innerHTML= `
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    `

    const searchButton = document.querySelector('.search-submit');
    const searchInput = document.querySelector('input');
    const userInput = document.querySelector('.search-input');
    console.log(searchInput.value);
// 
//  FETCH FUNCTIONS
// ------------------------------------------

fetch('https://randomuser.me/api/?results=12&nat=us')
  .then(response => response.json())
  .then(data => {
    console.log(data.results[1]);
    displayUsers(data.results);
    eventListener(data.results);
    searchListener(userInput, data.results);
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

//create search function
//const employeeDirectory = document.querySelectorAll('.card-info-container h3');
/*const search = (inputSearch, names) => {
  
        const names = data;
  //create variable to store null list of class name "preventDup" to use for prevent a duplicate meassage
        const preventDup = document.querySelectorAll('.preventDup');
        if (preventDup.length >0) {
        preventDup[0].remove();
        }
  // compare student name in the list and user input name and store to nameMatch array
        for (let i=0; i < employeeDirectory.length; i +=1) {
           names[i].style.display ='none';
           if (inputSearch.value.length !== 0 
              && employeeDirectory[i].textContent.toLowerCase().includes(inputSearch.value.toLowerCase())) {
              employeeDirectory[i].style.display = "block"
           }
        }*/
  
function displayModal(data, i) {
let current_datetime = new Date(`${data[i].dob.date}`);
let formatted_date = current_datetime.getDate() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getFullYear();
  let modalContainer = document.createElement('div');
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

  const closeButton = document.querySelector('.modal-close-btn');
  const prevButton = document.querySelector('.modal-prev');
  //const modalContainer = document.querySelector('.modal-container');
  //console.log(button);
  closeButton.onclick = function() {
    modalContainer.style.display = "none";
    modalContainer.innerHTML = "";
  };

  window.onclick = function(event) {
    if (event.target == modalContainer) {
      modalContainer.style.display = "none";
    }
  };
  console.log(prevButton);
  prevButton.addEventListener('click',(e) => {
    console.log(modalContainer.nextSibling);
    let md= modalContainer.nextElementSibling;
    md.style.display = 'block';

  });
}

function eventListener(data) {
  let cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
      console.log(data.name);
    
        cards[i].addEventListener('click', (e) => {
          //console.log(e.target);
          //console.log(cards[i]);
          displayModal(data, i);
        });
    }
}
function searchListener(inputSearch, data) {
  let cards = document.querySelectorAll('.card');
    searchButton.addEventListener('click',(e) => {
      for (let i = 0; i < cards.length; i++) {
        console.log(userInput.value);
        console.log(data[i].name.first.toLowerCase()||data[i].name.last.toLowerCase());
        console.log(searchInput);
        if (`${data[i].name.first}`.toLowerCase() === inputSearch.value.toLowerCase() 
         || `${data[i].name.last}`.toLowerCase() === inputSearch.value.toLowerCase()
         || inputSearch.value === "") {
          cards[i].style.display = "";
        } else {
        cards[i].style.display = "none";
        }
      }
    });
}


});