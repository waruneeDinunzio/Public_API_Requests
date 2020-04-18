/*
**Project 5: public API Request
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
  form.innerHTML= `
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
      `;

    const searchButton = document.querySelector('.search-submit');
    const userInput = document.querySelector('.search-input');

// 
//  FETCH FUNCTIONS
// ------------------------------------------

fetch('https://randomuser.me/api/?results=12&nat=us')
  .then(response => response.json())
  .then(data => {
    displayUsers(data.results);
    eventListener(data.results);
    search(userInput, data.results);
  })

/*
create display employee name
*/

displayUsers = (data) => {
  data.map( data => { 
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
/**
* Creates displayModal fucntion
* @return {array} 
*/
displayModal = (data, i) => {
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
  const nextButton = document.querySelector('.modal-next');
  
  closeButton.onclick = () => modalContainer.remove();
  window.onclick = (event) => {
    if (event.target === modalContainer) {
      modalContainer.remove();
    }
  };

  prevButton.addEventListener('click', () => {
    modalContainer.parentNode.removeChild(modalContainer);
    i = i - 1; 
    if (i < 0) {
      i = 0;
      displayModal(data,i);
      document.querySelector('.modal-prev').style.backgroundColor = 'white';
      document.querySelector('.modal-prev').style.color = 'black';
      document.querySelector('.modal-prev').disabled = true;
    } else {
      displayModal(data,i);
    }
  });

  nextButton.addEventListener('click', () => {
    modalContainer.parentNode.removeChild(modalContainer);
    i = i + 1;
    if (i > 11) {
      i = 11;
      displayModal(data,i);
      document.querySelector('.modal-next').style.backgroundColor = 'white';
      document.querySelector('.modal-next').style.color = 'black';
      document.querySelector('.modal-next').disabled = true;
    } else {
      displayModal(data,i);
    }
  });
}


  eventListener = (data) => {
    let cards = document.querySelectorAll('.card');
      for (let i = 0; i < cards.length; i++) {
      
          cards[i].addEventListener('click', (e) => {
            if ( i === 0) {
            displayModal(data,i);
            displayPrevButton();
            } else if ( i === 11) {
              displayModal(data,i);
              displayNextButton()
            } else {
              displayModal(data,i);
            }
          });
      } 
    displayPrevButton = () => {
      document.querySelector('.modal-prev').style.backgroundColor = 'white';
      document.querySelector('.modal-prev').style.color = 'black';
      document.querySelector('.modal-prev').disabled = true;
    }
    displayNextButton= () => {
      document.querySelector('.modal-next').style.backgroundColor = 'white';
      document.querySelector('.modal-next').style.color = 'black';
      document.querySelector('.modal-next').disabled = true;
    }
  }

  search = (inputSearch, data) => {
  let cards = document.querySelectorAll('.card');
    userInput.addEventListener('keyup',(e) => {
      for (let i = 0; i < cards.length; i++) {
        if (`${data[i].name.first}`.toLowerCase().includes(inputSearch.value.toLowerCase()) 
         || `${data[i].name.last}`.toLowerCase().includes(inputSearch.value.toLowerCase())
         || inputSearch.value === "") {
          cards[i].style.display = "";
        } else {
        cards[i].style.display = "none";
        }
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
});