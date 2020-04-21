/* Treehouse FSJS Techdegree
*  Project 5: public API Request: get data API, set data to display 12 employees on page, add search function filtered by employee's name
*/
window.addEventListener('DOMContentLoaded', (event) => { 
// declare global variable
  const searchContainer = document.querySelector('.search-container');
  const gallery = document.querySelector('.gallery');
  const body = document.querySelector('body');
/*
*  Create search box
*/
  const form = document.createElement('form');
  form.action = "#";
  form.method = "get";
  searchContainer.appendChild(form);
  form.innerHTML= `
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
      `;
  const searchButton = document.querySelector('.search-submit');
  const userInput = document.querySelector('.search-input');
/* 
*  Fetch API request JSON object and parse the data to display 12 employees
*/ 
  fetch('https://randomuser.me/api/?results=12&nat=us')
  .then(response => response.json())
  .then(data => displayUsers(data.results))
/*
* create display fucntion to display employees name, email, and city 
* - call back event listener function to display modal
* - call back search funcion
*/
  displayUsers = (data) => {
    data.map( data => { 
    cards = document.createElement('div');
    cards.className = 'card';
    gallery.appendChild(cards);
    cards.innerHTML = `
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
  eventListener(data);
  search(userInput, data);
  }
  //
  eventListener = (data) => {
    const cards = document.querySelectorAll('.card');
      for (let i = 0; i < cards.length; i++) {
          cards[i].addEventListener('click', (e) => {
            if ( i === 0) {
            displayModal(data,i);
            document.querySelector('.modal-prev').remove();
            } else if ( i === 11) {
              displayModal(data,i);
              document.querySelector('.modal-next').remove();
            } else {
              displayModal(data,i);
            }
          });
      } 
  }
/*
* Create displayModal fucntion to pop up a modal window
* - call back close button function onclick and window onclick function to close the modal window
* - call back 'click' event listenet to display prev and next page
*/
  displayModal = (data, i) => {
    let current_datetime = new Date(`${data[i].dob.date}`);
    let formatted_date = current_datetime.getDate() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getFullYear();
    let modalContainer = document.createElement('div');
    modalContainer.className = "modal-container";
    body.appendChild(modalContainer);
    modalContainer.innerHTML = `
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
    const nextButton = document.querySelector('.modal-next');
// user can click X button or anywhere out side modal window to close modal window
    closeButton.onclick = () => modalContainer.remove();
    window.onclick = (event) => {
      if (event.target === modalContainer) {
        modalContainer.remove();
      }
    };
// add 'click' event on prev button to display previous modal
    prevButton.addEventListener('click', () => {
      modalContainer.parentNode.removeChild(modalContainer);
      i = i - 1; 
      if (i < 0) {
        i = 0;
        displayModal(data,i);
        document.querySelector('.modal-prev').remove();
      } else {
        displayModal(data,i);
      }
    });
// add 'click' event on next button to display next modal
    nextButton.addEventListener('click', () => {
      modalContainer.parentNode.removeChild(modalContainer);
      i = i + 1;
      if (i === 11) {
        i = 11;
        displayModal(data,i);
        document.querySelector('.modal-next').remove();
      } else {
        displayModal(data,i);
      }
    });
  }
/*
* Create search fucntion with keyup event listener to fitered by name
* - call back displayNotFound function to display message when the search not found
*/
  search = (inputSearch, data) => {
    const cards = document.querySelectorAll('.card');
      userInput.addEventListener('keyup',(e) => {
        let card = [];
        for (let i = 0; i < cards.length; i++) {
          const notFound = document.querySelectorAll('.notFound');
          if (notFound.length >0) {
            notFound[0].remove();
            }
          if (`${data[i].name.first}`.toLowerCase().includes(inputSearch.value.toLowerCase()) 
           || `${data[i].name.last}`.toLowerCase().includes(inputSearch.value.toLowerCase())
           || inputSearch.value === "") {
            card.push(cards[i]);
            cards[i].style.display = "";
           } else {
            cards[i].style.display = "none"; 
           }  
        } 
          if (card.length === 0) {
            displayNotFound(); 
        }
      });
        searchButton.addEventListener('click',(e) => {
          for (let i = 0; i < cards.length; i++) {
            if (inputSearch.value === "") {
            cards[i].style.display = "";
            }
          }
        });
  }
  displayNotFound = () => {
    const cards = document.querySelectorAll('.card');
    for (let i=0; i< cards.length; i ++) {
    const notFound = document.querySelectorAll('.notFound');
        if (notFound.length >0) {
            notFound[0].remove();
        }
        const message = document.createElement('h2');
        message.className = "notFound";
        message.innerHTML = '"oop  Sorry! No match for that name."';
        document.querySelector('body').appendChild(message);  
    }
  } 
});