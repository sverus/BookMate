if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/js/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.getElementById("submit").addEventListener("click", function() {
            event.preventDefault();
            console.log("Hello");
            var baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";
            var bookValue = document.getElementById('bookInput').value;
            var key = "&key=AIzaSyD4GijWnTEom_CThw6R6deoZiI7h6n3UWM";
            var url = baseUrl + bookValue + key;
            url = url.replace(/ /g, "+");
            console.log(url);
            //document.getElementById("content").innerHTML = '<p>Search results:</p>';


            fetch(url)
              .then(response => response.json())
              .then(data => {
                        for (var i = 0; i < data.items.length; i++) {
                          var item = data.items[i];
                          // in production code, item.text should have the HTML entities escaped.
                          document.getElementById("content").innerHTML += "<div class="+"book-container>"+"<h3>"+ item.volumeInfo.title+
                          "</h3> <p>Author: "+ item.volumeInfo.authors+ "</p>"+
                          //"</p> <p>Book Cover:</p>"
                           "<p><img src="+ item.volumeInfo.imageLinks.thumbnail + "></p>"+
                          //"</p> <p>Book Description: "+ item.volumeInfo.description+ "</p>"+
                          "</p> <p>Category: "+ item.volumeInfo.categories+ "</p>"
                          +"</div>"
              }
      });
});
