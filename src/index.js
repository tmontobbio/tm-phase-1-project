const likesForm = document.querySelector("#add-rating");
const submitBtn = document.querySelector("#submit-dog");
const nextDoggoBtn = document.querySelector("#next-dog");
const addVotes = document.querySelector("#more-likes");
const p = document.querySelector("#like-value");
const currentLikes = p.textContent;
const formText = document.querySelector("#new-doggo");
let container = document.querySelector("#doggo-img-container");

// Fetch dog URL's
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://dog.ceo/api/breed/labrador/images")
    .then((res) => res.json())
    .then((data) => {
      randomDoggo(data.message);
      nextDoggoBtn.addEventListener("click", () => {
        p.textContent = "";
        randomDoggo(data.message);
      });
    });
});

// Pass object and randomly select one.  Also selects the default image when page is loaded.
function randomDoggo(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  const randomDoggo = array[randomIndex];
  imageGenerator(randomDoggo);
}

// Rating out of 10
likesForm.addEventListener("submit", addLikes);
function addLikes(e) {
  e.preventDefault();
  likes = Number(addVotes.value) + Number(currentLikes);
  p.textContent = likes;
  e.target.reset();
}

// Append random URL into image container DIV
function imageGenerator(randomUrl) {
  container.innerHTML = `<img src="${randomUrl}" />`;
  let fillerImg = document.querySelector("img");
  fillerImg.className = "doggo-filler-img";
}

// Dog 'submission' #2
submitBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = formText.value;
  e.target.reset();
  if (url === "") {
    alert("Please enter valid URL");
  } else {
    container.innerHTML = `<img src="${url}" />`;
    let fillerImg = document.querySelector("img");
    fillerImg.className = "doggo-filler-img";
  }
});
