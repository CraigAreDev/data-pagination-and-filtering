/*
Treehouse Techdegree:
Project 2 - Data Pagination and Filtering
by: Craig Arensberg
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/


// This variable sets the value of how many students the page will display.
const studentsPerPage = 9;
const studentList = document.querySelector('.student-list');

// Function to display a page of students.
function showPage (list,page) {
   const startIndex = (page * studentsPerPage) - studentsPerPage;
   const endIndex = page * studentsPerPage;
   studentList.innerHTML = '';

// Looping over the list of students to display each one to the page.
   for (let i = 0; i < list.length; i += 1) {
      if(i >= startIndex && i <= endIndex) {
         const studentItem = `
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

      studentList.insertAdjacentHTML('beforeend', studentItem)
      }
   };
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

// Function to create and append pagination buttons.
function addPagination(list) {
   const pages = Math.ceil(list.length / studentsPerPage);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

// This loop determines how many page buttons are displayed.
   for (let i = 1; i < pages; i ++) {
      const pageButton = `
         <li>
            <button type="button">${i}</button>
         </li>
      `;
      
      linkList.insertAdjacentHTML('beforeend', pageButton);
      linkList.querySelector('button').className = 'active';
   }
// The event listener for when users interact with page buttons.
   linkList.addEventListener('click', (e) => {
      const target = e.target;

      if (target.tagName === 'BUTTON') {
         document.querySelector('.active').className = '';
         target.className = 'active';

         showPage(list, target.textContent);
      }
   })
}






// Extra Credit Step 1:
// Adding a search bar to the header of the page.
const header = document.querySelector('.header');
const searchBar = `
   <label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`;
header.insertAdjacentHTML('beforeend', searchBar);

const searchInput = document.querySelector('#search');
const searchButton = document.querySelector('button');

// Extra Credit Step 2 & 3:
// This function adds functionality and pagination to the search component.
function searchStudent(list) {
   const userValue = searchInput.value.toLowerCase();
   const filterStudents = [];

   if (userValue.length !== 0) {
      for (let i = 0; i < data.length; i++) {
         const studentName = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`;
         if(studentName.includes(userValue)){
            filterStudents.push(list[i]);
         }
      }

      showPage(filterStudents, 1);
      addPagination(filterStudents);
   
   

   } else {

      showPage(list, 1);
      addPagination(list);
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

   
}

// Search button event listener. When clicked, calls the searchBox function.
searchButton.addEventListener('click', (e) => {
   e.preventDefault();
   searchStudent(data)
});

// Search field event listener. When being typed in, it will search automatically.
searchInput.addEventListener('keyup', () => {
   searchStudent(data);   
});

// Call functions
showPage(data, 1);
addPagination(data);