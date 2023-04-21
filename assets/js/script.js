// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var currentDay = document.getElementById("currentDay");
var descList = document.querySelectorAll(".time-block");
var description = document.querySelectorAll(".description");
var saveBtn = document.querySelectorAll(".saveBtn");

$(function () {
  // TODO: Add a listener for click events on the save button. This code should use the id in the containing time-block as a key to save the user input in local storage. HINT: What does `this` reference in the click listener function? How can DOM traversal be used to get the "hour-x" id of the time-block containing the button that was clicked? How might the id be useful when saving the description in local storage?

  for (let i = 0; i < descList.length; i++) {
    descList[i].setAttribute("id", "hour-" + [i]);
    description[i].setAttribute("id", "desc-" + [i]);
    saveBtn[i].setAttribute("id", "save-" + [i]);
    saveBtn[i].addEventListener("click", function(event) {
      event.preventDefault();
      
      localStorage.setItem("desc"+i, JSON.stringify(description[i].value));
    })
  }
  
  // TODO: Add code to apply the past, present, or future class to each time block by comparing the id to the current hour. HINTS: How can the id attribute of each time-block be used to conditionally add or remove the past, present, and future classes? How can Day.js be used to get the current hour in 24-hour time?

  

  var currentHour = dayjs().hour();
  console.log(currentHour);

  for (let i = 0; i < descList.length; i++) {
    var hour = [];
    hour[i] = i + 9;
    if (currentHour == hour[i]) {
      descList[i].setAttribute("class", "row time-block present");
      console.log(descList[i]);
    } else if (currentHour > hour[i]) {
      descList[i].setAttribute("class", "row time-block past");
    } else {
      descList[i].setAttribute("class", "row time-block future");
    }
  }

  // TODO: Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements. HINT: How can the id attribute of each time-block be used to do this?

  for (let i = 0; i < description.length; i++) {
    var descText = JSON.parse(localStorage.getItem("desc"+i));
    if (descText !== null) {
      description[i].value = descText;
    }
  }

  // TODO: Add code to display the current date in the header of the page.

  currentDay.textContent = dayjs().format('dddd, MMMM D');

});