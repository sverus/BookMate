if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

var favList = []
var baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";
var key = "&key=AIzaSyD4GijWnTEom_CThw6R6deoZiI7h6n3UWM";
var items = [];

//Book/Author search
document.getElementById("submit").addEventListener("click", function() {
    event.preventDefault();
    var bookOrAuth = document.querySelector('input[name = bookOrAuthor]:checked').value;
    var bookValue = document.getElementById('bookInput').value;
    console.log(bookOrAuth);
    var url = baseUrl + bookValue + key;
    console.log(url);
    if (bookOrAuth == 'book') {
        url = baseUrl + "intitle:" + bookValue + key; //modify API url for book search
    } else if (bookOrAuth == 'author') {
        url = baseUrl + "inauthor:" + bookValue + key; //modify API url author search
    }
    //replace spaces with + for API call
    url = url.replace(/ /g, "+");
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById("content").innerHTML = ""; //clears the search result list to avoid stacking of searches
            //loop through search results and display them
            items = data.items;
            for (var i = 0; i < data.items.length; i++) {
                var item = data.items[i];
                document.getElementById("content").innerHTML += `<div class=" book-container"><div class= "heading"><h3>${item.volumeInfo.title}</h3></div>` +
                    `</h3> <p>Author:  ${item.volumeInfo.authors} </p>` +
                    `<p><img src= ${item.volumeInfo.imageLinks.thumbnail}></p>` +
                    `</p> <p>Category:   ${item.volumeInfo.categories}</p>` +
                    `<a href=" ${item.volumeInfo.previewLink} ">View the book</a>` +
                    `<input type="submit" class="addToFavs" data-item-id="${item.id}"  value="Add to favourites">` +
                    `</div>`
            }
            //addin event listener to each search result for favourtes functionality
            var favButton = document.getElementsByClassName("addToFavs");
            for (i = 0; i < favButton.length; i++) {
                favButton[i].addEventListener("click", addToFavList);
            }
        });
});

function addToFavList() {
    event.preventDefault();
    var item = items.find(x => x.id === event.target.dataset.itemId); //mapping event to correct favourites button
    if (localStorage.getItem("favourites") === null) {
      //if no favourites are currently stored in localstorage
        favList.push(item.volumeInfo.title);
        console.log('Favourites in array are:', favList);
        localStorage.setItem("favourites", JSON.stringify(favList)); //adding Favourites
        var localFavs = localStorage.getItem("favourites");
        console.log("This should be what is actually in localstorage", localFavs);
        //if favourites already exist in locastorage
    } else {
      //get old list, clear from localstorage, merge it with new list & readd to localstorage
        var oldFavs = localStorage.getItem("favourites");
        oldFavs = oldFavs ? oldFavs.split(',') : [];
        for(var i = 0; i < oldFavs.length; i++)
{
  //having issues with characters being reproduced on each list update. this removes those characters.
    oldFavs[i] = oldFavs[i].replace('[' , '');
    oldFavs[i] = oldFavs[i].replace(']' , '');
    oldFavs[i] = oldFavs[i].replace('"' , '');
    oldFavs[i] = oldFavs[i].replace('"' , '');
    oldFavs[i] = oldFavs[i].replace('\\' , '');
}
        console.log("old favourites", oldFavs);
        localStorage.clear();
        oldFavs.push(item.volumeInfo.title);
        console.log('Favourites in array are:', oldFavs);
        localStorage.setItem("favourites", JSON.stringify(oldFavs));
        var localFavs = localStorage.getItem("favourites");
    }
}
//Genre search
document.getElementById("submitGenre").addEventListener("click", function() {
    event.preventDefault();

    var genreValue = document.getElementById('genreInput').value;
    var url = baseUrl + "subject:" + genreValue; //build url with user genre query
    url = url.replace(/ /g, "+"); //replace spaces with + for API call
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById("content").innerHTML = ""; //clears the search result list to avoid stacking of searches
            //loop through search results and display them
            items = data.items;
            for (var i = 0; i < data.items.length; i++) {
                var item = data.items[i];
                document.getElementById("content").innerHTML += `<div class=" book-container"><div class= "heading"><h3>${item.volumeInfo.title}</h3></div>` +
                    `</h3> <p>Author:  ${item.volumeInfo.authors} </p>` +
                    `<p><img src= ${item.volumeInfo.imageLinks.thumbnail}></p>` +
                    `</p> <p>Category:   ${item.volumeInfo.categories}</p>` +
                    `<a href=" ${item.volumeInfo.previewLink} ">View the book</a>` +
                    `<input type="submit" class="addToFavs" data-item-id="${item.id}"  value="Add to favourites">` +
                    `</div>`
            }
            //addin event listener to each search result for favourtes functionality
            var favButton = document.getElementsByClassName("addToFavs");
            for (i = 0; i < favButton.length; i++) {
                favButton[i].addEventListener("click", addToFavList);
            }
        });
});
