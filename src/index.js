const likesForm = document.querySelector("#add-likes");
const nextDoggoBtn = document.querySelector("#next-dog");
const addVotes = document.querySelector("#more-likes");
const p = document.querySelector("#like-value");
const currentLikes = p.textContent;
// Fetch dog URL's

document.addEventListener("DOMContentLoaded", function originalCall() {
  fetch("https://dog.ceo/api/breed/labrador/images")
    .then((res) => res.json())
    .then((data) => dataToArray(data));
  nextDoggoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    originalCall();
  });
  // need to pass this info to make it callable

  // Push dog URL's into an empty array
  function dataToArray(data) {
    let dogArray = [];
    dogArray.push(data);
    randomDoggo(dogArray[0].message);
  }

  // Pass array to randomly select a key
  function randomDoggo(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomDoggo = array[randomIndex];
    imageGenerator(randomDoggo); // Need to access array values which are URL's
  }

  // Append random key into image container DIV
  function imageGenerator(random) {
    let container = document.querySelector("#doggo-img");
    let newDoggo = (container.innerHTML = `<img src="${random}" />`);
    let filler = document.querySelector("img");
    filler.id = "doggo-filler";
  }
});

// Need to fix this and make counter work
likesForm.addEventListener("submit", addLikes);

function addLikes(e) {
  e.preventDefault();
  likes = parseInt(addVotes.value) + parseInt(currentLikes);
  p.textContent = likes;
}

//where do i put this
// nextDoggoBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   originalCall();
// });
