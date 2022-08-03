// Global variables
const likesForm = document.querySelector("#add-rating");
const submitBtn = document.querySelector("#submit-dog");
const nextDoggoBtn = document.querySelector("#next-dog");
const addVotes = document.querySelector("#more-likes");
const p = document.querySelector("#like-value");
const currentLikes = p.textContent;
const urlText = document.querySelector("#new-doggo");
const rateText = document.querySelector("#more-likes");
const favoriteContainer = document.querySelector("#favorite-doggos");
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
  if (rateText.value > 10 && rateText.value < 10) {
    alert("Please enter a valid rating. (HINT) Rating must be 10!");
  } else {
    p.textContent = likes;
  }
}

// Append random URL into image container DIV
function imageGenerator(randomUrl) {
  const displayImg = (container.innerHTML = `<img src="${randomUrl}" />`);
  let fillerImg = document.querySelector("img");
  fillerImg.className = "doggo-filler-img";
  const favoriteBtn = document.querySelector("#favorite-button");
  favoriteBtn.remove();
  const newFavoriteBtn = document.createElement("button");
  newFavoriteBtn.id = "favorite-button";
  newFavoriteBtn.textContent = "Favorite ♥";
  document.querySelector("#next-doggo-container").append(newFavoriteBtn);
  newFavoriteBtn.addEventListener("click", (e) => {
    const favoriteImg = document.createElement("img");
    favoriteImg.className = "favorited-doggo-img";
    favoriteContainer.append(favoriteImg);
    favoriteImg.src = `${randomUrl}`;
  });
}

// 'Submit' new dog
submitBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = urlText.value;
  e.target.reset();
  if (url === "") {
    alert("Please enter valid URL");
  } else {
    container.innerHTML = `<img src="${url}" />`;
    let fillerImg = document.querySelector("img");
    fillerImg.className = "doggo-filler-img";
  }
});

//push initial fetch data into a named array and iterate one by one instead of randomizer
//every saved favorite dog gets put into a empty array, then we can use an iterator to reveal those urls under the favorited image
