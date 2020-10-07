window.onload=displayFavourites;

function displayFavourites() {
    event.preventDefault();

    var localFavs = [];
    var localFavs = localStorage.getItem("favourites");
    var favouritesToShow = JSON.parse(localStorage.getItem('favourites'));
    console.log("favourites", favouritesToShow);


    for (var i = 0; i < favouritesToShow.length; i++){

console.log(favouritesToShow[i].volumeInfo.title);
      document.getElementById("favContent").innerHTML += `<div class=" book-container"><div class= "heading"><h3>${favouritesToShow[i].volumeInfo.title}<br /></h3></div>`+
      `</h3> <p>Author:  ${favouritesToShow[i].volumeInfo.authors} </p>` +
      `<p><img src= ${favouritesToShow[i].volumeInfo.imageLinks.thumbnail}></p>` +
      `</p> <p>Category:   ${favouritesToShow[i].volumeInfo.categories}</p>` +
      `<a href=" ${favouritesToShow[i].volumeInfo.previewLink} ">View the book</a>` +
      `<input type="submit" class="addToFavs" data-item-id="${favouritesToShow[i].id}"  value="Remove from favourites">`


    }
}
