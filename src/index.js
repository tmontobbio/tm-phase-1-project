document.addEventListener("DOMContentLoaded", () => {
  fetch("https://dog.ceo/api/breed/labrador/random")
    .then((res) => res.json())
    .then((data) => data.forEach((labs) => generateDoggo(labs)));
});

// Ask for help to have a default image
// Ask for help to make a generate dog button

const rateButton = document
  .querySelector("rating-form")
  .addEventListener("submit", rateDoggo);
const addButton = document
  .querySelector("submit-dog")
  .addEventListener("submit", addDoggo);

function generateDoggo(labs) {
  console.log(labs);
}

function rateDoggo() {}

function addDoggo() {}
