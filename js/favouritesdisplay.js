window.onload=displayFavourites;

function displayFavourites() {
    event.preventDefault();

//get items, parse to JS, display
    var localFavs = [];
    var localFavs = localStorage.getItem("favourites");
    var favouritesToShow = JSON.parse(localStorage.getItem('favourites'));
    console.log("favourites", favouritesToShow);

    if (favouritesToShow==null)
    //error handling if no favourites
    {
      document.getElementById("favContent").innerHTML += `<div class=" book-container"><p>You currently have no favourites in your list.
      This could be because you haven't added any, or have recently cleared your browser data.<p></div>`
    }
    //if there are favourites:


    for (var i = 0; i < favouritesToShow.length; i++){

console.log(favouritesToShow[i].volumeInfo.title);
      document.getElementById("favContent").innerHTML += `<div class=" book-container"><div class= "heading"><h3>${favouritesToShow[i].volumeInfo.title}<br /></h3></div>`+
      `</h3> <p>Author:  ${favouritesToShow[i].volumeInfo.authors} </p>` +
      `<p><img src= ${favouritesToShow[i].volumeInfo.imageLinks.thumbnail}></p>` +
      `</p> <p>Category:   ${favouritesToShow[i].volumeInfo.categories}</p>` +
      `<a href=" ${favouritesToShow[i].volumeInfo.previewLink} ">View the book</a>` +
      `<input type="submit" class="deleteFav" data-item-id="${favouritesToShow[i].id}"  value="Remove from favourites">`
    }
    //addin event listener to each search result for delete favourite functionality
    var favButton = document.getElementsByClassName("deleteFav");
    for (i = 0; i < favButton.length; i++) {
        favButton[i].addEventListener("click", deleteFav);
    }
}
function deleteFav() {
    event.preventDefault();
    var favouritesToShow = JSON.parse(localStorage.getItem('favourites'));
    console.log("Current favourites: ", favouritesToShow);

    var item = favouritesToShow.find(x => x.id === event.target.dataset.itemId); //mapping favourite to delete
    let index = favouritesToShow.findIndex(id => id == item);
    console.log("Index", index);
    console.log("Item to delete is:",item);
    favouritesToShow.splice(index, 1); //remove 1 index at index of selected favourite
    console.log("New favourites list:", favouritesToShow);
    //clear & refresh new favourite list
    localStorage.clear();
    localStorage.setItem("favourites", JSON.stringify(favouritesToShow));
    //refresh window
    location.reload()
}
