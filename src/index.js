// Global variables
const ratingForm = document.querySelector("#add-rating");
const submitBtn = document.querySelector("#submit-dog");
const nextDoggoBtn = document.querySelector("#next-dog");
let addRating = document.querySelector("#more-likes");
const p = document.querySelector("#like-value");
const currentRating = p.textContent;
const urlText = document.querySelector("#new-doggo");
const rateText = document.querySelector("#more-likes");
const favoriteContainer = document.querySelector("#favorite-doggos");
let container = document.querySelector("#doggo-img-container");
let dogs = [];
// Fetch dog URL's
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://dog.ceo/api/breed/labrador/images")
    .then((res) => res.json())
    .then((data) => {
      dogs = data.message.map((url) => {
        return { favorited: false, image: url };
      });
      p.textContent = "0/10";
      randomDoggo();
    });
});

nextDoggoBtn.addEventListener("click", () => {
  p.textContent = "0/10";
  randomDoggo();
});

//Image randomizer
function randomDoggo() {
  const randomIndex = Math.floor(Math.random() * dogs.length);
  const randomDoggo = dogs[randomIndex];
  imageGenerator(randomDoggo);
}
// Rating out of 10
ratingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (addRating.value === "") {
    alert("Please enter a valid rating. (HINT) Rating must be 10!");
  } else if (parseInt(addRating.value) < "10") {
    alert("Please enter a valid rating. (HINT) Rating must be 10!");
  } else if (parseInt(addRating.value) > "10") {
    alert("Please enter a valid rating. (HINT) Rating must be 10!");
  } else {
    p.textContent = addRating.value + "/10";
    document.querySelector("#favorite-button").disabled = false;
  }
  e.target.reset();
});

// Append random URL into image container DIV
function imageGenerator(dog) {
  const displayImg = (container.innerHTML = `<img src="${dog.image}" />`);
  const favoriteBtn = document.querySelector("#favorite-button");
  const newFavoriteBtn = document.createElement("button");
  newFavoriteBtn.disabled = true;
  let fillerImg = document.querySelector("img");
  fillerImg.className = "doggo-filler-img";
  favoriteBtn.remove();
  newFavoriteBtn.id = "favorite-button";
  newFavoriteBtn.textContent = "Favorite ♥";
  document.querySelector("#doggo-button-container").append(newFavoriteBtn);
  newFavoriteBtn.addEventListener("click", (e) => {
    dog.favorited = true;
    displayFavorites(dog);
    p.textContent = "0/10";
  });
}

//filters the dog array and clears the favorite dogs section, and repopulates with favorited dogs
function displayFavorites(dog) {
  randomDoggo();
  const favoriteDogs = dogs.filter((dog) => {
    return dog.favorited;
  });

  favoriteContainer.innerHTML = "";
  favoriteDogs.forEach((dog) => {
    let dogCard = document.createElement("div");
    dogCard.className = "dog-card";
    let image = document.createElement("img");
    image.src = dog.image;
    image.className = "favorited-doggo-img";
    favoriteContainer.append(dogCard);
    dogCard.append(p.textContent);
    dogCard.append(image);
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
    let dogCard = document.createElement("div");
    dogCard.class = "dog-card";
    let image = document.createElement("img");
    image.src = url;
    image.className = "favorited-doggo-img";
    dogCard.append(image);
    p.textContent = "10/10";
    dogCard.append(p.textContent);
    favoriteContainer.append(dogCard);
    //dogCard.append(10 + "/10");
  }
});

//push initial fetch data into a named array and iterate one by one instead of randomizer
//every saved favorite dog gets put into a empty array, then we can use an iterator to reveal those urls under the favorited image
