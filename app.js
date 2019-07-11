//--------------------------------------------
// Function that creates a new li with value of inputs below
let container = document.querySelector('.output ul') // output container
const liMaker = (text, text2, text3) => {
    const li = document.createElement('li') // create a new li element
    li.innerHTML = "<h3> Task: " + text + "</h1><b> Category: </b>" + text2 + "<br><b>with mission: </b>" + text3 + "<br><button>IMPORTANT</button>"; // add value from parameters to li 
    li.classList.add(text); // add class name as text.value to the li
    container.appendChild(li) // apend li element to container
}
//--------------------------------------------

// This is a constructor
function Task(title, category, description) {
    this.title = title;
    this.category = category;
    this.description = description;
}

let items = localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session')) : []; // Array of all the data - (condition) ? true : false
const boxvalue = document.getElementById('box'); // first input
const boxvalue2 = document.getElementById('box2'); // second input
const boxvalue3 = document.getElementById('box3'); // third input

localStorage.setItem('session', JSON.stringify(items)); // send the array to the local storage
let localStorageValue = JSON.parse(localStorage.getItem('session')) || [];// get data from local storage

function pushItem() {
  let theTask = new Task(boxvalue.value, boxvalue2.value, boxvalue3.value); // create a new object with inputs' value as a parameters
  items.push(theTask); // push the object to the empty array
  localStorage.setItem('session', JSON.stringify(items)); // send the array to the local storage
  giveOutput(); // call outout function

  return false; // stop submission
}

// This function reacts on input change immediately - it's called by submitting the form
function giveOutput() {
    liMaker(boxvalue.value, boxvalue2.value, boxvalue3.value); // before refresh the date in li elements are just a inputs' value

    //clear values for comfort of user
    boxvalue.value = '';
    boxvalue2.value = '';
    boxvalue3.value = '';
}

// Get the data back to the DOM from a local storage 
localStorageValue.forEach(item => {
    liMaker(item.title, item.category, item.description); // after refresh we can see in our li elements data from local storage
    console.log(item.title + ' ' + item.category + ' ' + item.description); 

    let testVarBtn = document.querySelector('.' + item.title + " button"); // create a variable will take a class of li name by the title
    let testVar = document.querySelector('.' + item.title); 

    testVarBtn.addEventListener('click', function() {
        testVar.style.background = "red";
        console.log(item);
        //testVar.innerHTML = "<b>" + item.title + " " + item.category + " " + item.description + " </b>"; just a test
    })
})

// Clear a local storage function
function clearLocalStorage() {
    localStorage.clear() 

    while (container.firstChild) {
      container.removeChild(container.firstChild) 
    }
}