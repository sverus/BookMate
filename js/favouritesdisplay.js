window.onload=displayFavourites;

function displayFavourites() {
    event.preventDefault();

    var localFavs = [];
    var localFavs = localStorage.getItem("favourites");
    var favouritesToShow = JSON.parse(localStorage.getItem('favourites'));
    console.log(favouritesToShow);

    // for (var i = 0; i < localFavs.length; i++){
    //   console.log("each iteration of localFavs", localFavs[i]);
    // }



    for (var i = 0; i < localStorage.length; i++){
      //console.log("each iteration",i);

      document.getElementById("favContent").innerHTML += `<div class=" book-container"><div class= "heading"><h3>${(localStorage.getItem(localStorage.key(i)))}<br /></h3></div>`

    }
}


// += `<div class=" book-container"><div class= "heading"><h3>${item.volumeInfo.title}</h3></div>` +
//     `</h3> <p>Author:  ${item.volumeInfo.authors} </p>` +
//     `<p><img src= ${item.volumeInfo.imageLinks.thumbnail}></p>` +
//     `</p> <p>Category:   ${item.volumeInfo.categories}</p>` +
//     `<a href=" ${item.volumeInfo.previewLink} ">View the book</a>` +
//     `<input type="submit" class="addToFavs" data-item-id="${item.id}"  value="Add to favourites">` +
//     `</div>`
//}
