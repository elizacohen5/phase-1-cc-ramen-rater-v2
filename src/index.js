// index.js

// Click on an image from the #ramen-menu div and fire a callback called
// handleClick to see all the info about that ramen displayed inside the
// #ramen-detail div (where it says insert comment here and insert rating here)

const handleClick = (ramen) => {
  console.log(`clicked ${ramen.name}`)
  let ratingDisplay = document.getElementById("rating-display")
  let commentDisplay = document.getElementById("comment-display")
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;

  document.querySelector('#ramen-detail .detail-image').src = ramen.image
  document.querySelector('#ramen-detail .name').textContent = ramen.name
  document.querySelector('#ramen-detail .restaurant').textContent = ramen.restaurant
};

// Attach a submit events listener to the new-ramen form using a function called 
// addSubmitListener. After the submission, create a new ramen and add it to the#ramen-menu 
// div. The new ramen does not need to persist; in other words, if you refresh the page,
// it's okay that the new ramen is no longer on the page.
// Updated to add post request to add new ramen to the database 

const addSubmitListener = () => {
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();

    const newRamenImage = event.target["image"].value;
    const newRamenName = event.target["name"].value;
    const newRamenRestaurant = event.target["restaurant"].value;
    const newRamenRating = event.target["rating"].value;
    const newRamenComment = event.target["new-comment"].value;

    const img = document.createElement("img");
    const ramenDiv = document.getElementById("ramen-menu");
    img.src = newRamenImage;
    ramenDiv.append(img);

    fetch("http://localhost:3000/ramens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: newRamenName,
        restaurant: newRamenRestaurant,
        image: newRamenImage,
        rating: newRamenRating,
        comment: newRamenComment
      })
    })
    .then(response => {
      response.json()
      console.log(response);
    })
  })
}

// Delete ramen, function added to button event listener inside of displayRamens()

function deleteRamen(id) {
  fetch(`http://localhost:3000/ramens/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
}

// See all ramen images in the div with the id of ramen-menu.
// When the page loads, fire a function called displayRamens that 
// requests the data from the server to get all the ramen objects.
// Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.

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
          console.log(ramen.id)
          img.src = "";
          let ratingDisplay = document.getElementById("rating-display")
          let commentDisplay = document.getElementById("comment-display")
          ratingDisplay.textContent = "";
          commentDisplay.textContent = "";
          document.querySelector('#ramen-detail .detail-image').src = ""
          document.querySelector('#ramen-detail .name').textContent = ""
          document.querySelector('#ramen-detail .restaurant').textContent = ""
        })
        })
      })
    })
});
}

const main = () => {
  // Invoke displayRamens here
  displayRamens()
  addSubmitListener()
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
