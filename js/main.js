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
var baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";
var key = "&key=AIzaSyD4GijWnTEom_CThw6R6deoZiI7h6n3UWM";

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
            for (var i = 0; i < data.items.length; i++) {
                var item = data.items[i];
                document.getElementById("content").innerHTML += "<div class=" + "book-container><div class=" + "heading>" + "<h3>" + item.volumeInfo.title + "</div>" +
                    "</h3> <p>Author: " + item.volumeInfo.authors + "</p>" +
                    "<p><img src=" + item.volumeInfo.imageLinks.thumbnail + "></p>" +
                    "</p> <p>Category: " + item.volumeInfo.categories + "</p>" +
                    "<a href=" + item.volumeInfo.previewLink + ">View the book</a>" +
                    "</div>"
            }
        });
});

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
                for (var i = 0; i < data.items.length; i++) {
                    var item = data.items[i];
                    document.getElementById("content").innerHTML += "<div class=" + "book-container>" + "<h3>" + item.volumeInfo.title +
                        "</h3> <p>Author: " + item.volumeInfo.authors + "</p>" +
                        "<p><img src=" + item.volumeInfo.imageLinks.thumbnail + "></p>" +
                        "</p> <p>Category: " + item.volumeInfo.categories + "</p>" +
                        "<a href=" + item.volumeInfo.previewLink + ">View the book</a>" +
                        "</div>"
                }
            });
    }
);
