/*
Treehouse Techdegree:
Project 2 - Data Pagination and Filtering
by: Craig Arensberg
*/

// This event fires when the initial HTML document completely loads, without waiting for images and stylesheets to finish.
document.addEventListener('DOMContentLoaded', () => {

// This variable sets the value of how many students the page will display.
const studentsPerPage = 9;
const studentList = document.querySelector('.student-list');

// Function to display a page of students.
function showPage (list,page) {
   const startIndex = (page * studentsPerPage) - studentsPerPage;
   const endIndex = page * studentsPerPage;
   studentList.innerHTML = '';

// Looping over the list of students to display each one to the page.
   for (let i = 0; i < list.length; i++) {
      if(i >= startIndex && i < endIndex) {
          studentList.innerHTML += 
          `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>
         `;
      }
   }
}

// Function to create and append pagination buttons.
function addPagination(list) {
   const pages = Math.ceil(list.length / studentsPerPage);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

// This loop determines how many page buttons are displayed.
   for (let i = 1; i < pages+1; i ++) {
      linkList.innerHTML +=
      `
         <li>
            <button type="button">${i}</button>
         </li>
      `;
   }
    const pageButton = linkList.querySelectorAll('BUTTON');
      if (pageButton.length > 0) {
         pageButton.className = 'active';
      }

// The event listener for when users interact with page buttons.
   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         for (let i = 0; i < pageButton.length; i++) {
            pageButton[i].className = '';
            e.target.className = 'active';
         }
      const pageNumber = e.target.textContent;
      showPage(list, pageNumber);   
      }
   });
}

// Extra Credit Step 1:
// Adding a search bar to the header of the page.
const searchField = document.querySelector('.header');
searchField.insertAdjacentHTML('beforeend',
`
   <label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button id="click" type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`);

// Extra Credit Step 2 & 3:
// This function adds functionality and pagination to the search component.
function searchStudent(list) {
   const searchButton = document.getElementById('click');
   const searchBar= document.getElementById('search');
   let filterStudents = [];

// Search field event listener. When being typed in, it will search automatically.
   searchBar.addEventListener('keyup', (e) => {
      filterStudents = [];
      const searchInput = searchBar.value.toLowerCase();
      for (let i = 0; i < list.length; i++) {
         const firstName = list[i].name.first.toLowerCase();
         const lastName = list[i].name.last.toLowerCase();
         if (firstName.includes(searchInput) || lastName.includes(searchInput)) {
            filterStudents.push(list[i]);
         }
      }

// Extra Credit Step 4:
// If statement to display error message when no results are found.
      if (filterStudents.length === 0) {
         studentList.innerHTML = '';
         studentList.insertAdjacentHTML('beforeend',
         `
         <h1>Sorry, no results were found</h1>
         `
         );
         addPagination(filterStudents);
      } else {
         showPage(filterStudents, 1);
         addPagination(filterStudents);
      }
   });

      searchButton.addEventListener('click', (e) => {
      filterStudents = [];
      const searchInput = searchBar.value.toLowerCase();
      for (let i = 0; i < list.length; i++) {
            const firstName = list[i].name.first.toLowerCase();
            const lastName = list[i].name.last.toLowerCase();
            if (firstName.includes(searchInput) || lastName.includes(searchInput)) {
               filterStudents.push(list[i]);
            }
         }

      if (filterStudents.length === 0) {
            studentList.innerHTML = '';
            studentList.insertAdjacentHTML('beforeend',
            `
            <h1>Sorry, no results were found</h1>
            `
            );
            addPagination(filterStudents);
         } else {
            showPage(filterStudents, 1);
            addPagination(filterStudents);
         }
      });
   }

// Call functions
showPage(data, 1);
addPagination(data);
searchStudent(data);
});