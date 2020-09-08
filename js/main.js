document.getElementById("submit").addEventListener("click", function() {
            document.getElementById("demo").innerHTML = "Hello World";
            event.preventDefault();
            console.log("Hello");
            var baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";
            var bookValue = document.getElementById('bookInput').value;
            var key = "&key=AIzaSyD4GijWnTEom_CThw6R6deoZiI7h6n3UWM";
            var url = baseUrl + bookValue + key;
            url = url.replace(/ /g, "+");
            console.log(url);
            document.getElementById("content").innerHTML = '<p>Search results:</p>';


            fetch(url)
              .then(response => response.json())
              .then(data => {
                        for (var i = 0; i < data.items.length; i++) {
                          var item = data.items[i];
                          // in production code, item.text should have the HTML entities escaped.
                          document.getElementById("content").innerHTML += "<br> <p>Book Title:" + item.volumeInfo.title +"</p> <p>Book Author:"+ item.volumeInfo.authors+ "</p>";
              }
      });
});
