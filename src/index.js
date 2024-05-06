// index.js
let currentRamen = null;

function updateRamenDisplay(image, name, restaurant) {
  document.querySelector('#ramen-detail .detail-image').src = image
  document.querySelector('#ramen-detail .name').textContent = name
  document.querySelector('#ramen-detail .restaurant').textContent = restaurant
  }

function ratingAndCommentContent(ratingContent, displayContent) {
  let ratingDisplay = document.getElementById("rating-display")
  let commentDisplay = document.getElementById("comment-display")
  ratingDisplay.textContent = ratingContent;
  commentDisplay.textContent = displayContent;
}

const handleClick = (ramen) => {
  ratingAndCommentContent(ramen.rating, ramen.comment)
  updateRamenDisplay(ramen.image, ramen.name, ramen.restaurant);
  currentRamen = ramen.id;
};

const addSubmitListener = () => {
  document.querySelector("#new-ramen").addEventListener("submit", (event) => {
    event.preventDefault();

    fetch("http://localhost:3000/ramens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: event.target["name"].value,
        restaurant: event.target["restaurant"].value,
        image: event.target["image"].value,
        rating: event.target["rating"].value,
        comment: event.target["new-comment"].value
      })
    })
    .then(response => {
      response.json()
    })
  })
}

function deleteRamen() {
  fetch(`http://localhost:3000/ramens/${currentRamen}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
}

function displayRamens() {
  document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(data => {
      handleClick(data[0]) // Displays the first ramen upon loading the page
      data.map(ramen => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.id = ramen.id;
        const ramenDiv = document.getElementById("ramen-menu");
        ramenDiv.append(img);
        img.addEventListener("click", () => {
          handleClick(ramen)
        })
      })
      document.querySelector("button").addEventListener("click", () => {
        deleteRamen();
        document.getElementById(currentRamen).src = "";
        ratingAndCommentContent("", "");
        updateRamenDisplay("", "", "");
      })
    })
});
}

function updateRamenRatingandComment() {
  document.querySelector("#edit-ramen").addEventListener("submit", (event) => {
    event.preventDefault();
    let ratingUpdate = event.target["rating"].value;
    let commentUpdate = event.target["new-comment"].value;
    ratingAndCommentContent(ratingUpdate, commentUpdate)
  })
}

const main = () => {
  // Invoke displayRamens here
  displayRamens()
  addSubmitListener()
  updateRamenRatingandComment()
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
