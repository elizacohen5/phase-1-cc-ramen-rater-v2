// index.js

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
  console.log(`clicked ${ramen.name}`)
  ratingAndCommentContent(ramen.rating, ramen.comment)
  updateRamenDisplay(ramen.image, ramen.name, ramen.restaurant);
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
      console.log(response);
    })
  })
}

function deleteRamen(id) {
  fetch(`http://localhost:3000/ramens/${id}`, {
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
      console.log(data)
      handleClick(data[0]) // Displays the first ramen upon loading the page
      data.map(ramen => {
        const img = document.createElement("img");
        const ramenDiv = document.getElementById("ramen-menu");
        img.src = ramen.image;
        ramenDiv.append(img);
        img.addEventListener("click", () => {
          handleClick(ramen)
        document.querySelector("button").addEventListener("click", () => {
          deleteRamen(ramen.id);
          console.log(`deleted ramen id: ${ramen.id}`)
          img.src = "";
          ratingAndCommentContent("", "")
          updateRamenDisplay("", "", "");
        })
        })
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
