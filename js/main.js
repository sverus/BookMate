document.getElementById("submit").addEventListener("click", function(){
  document.getElementById("demo").innerHTML = "Hello World";
  event.preventDefault();


console.log("Hello");
var baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";
var bookValue = document.getElementById('bookInput').value;
var key ="&key=AIzaSyD4GijWnTEom_CThw6R6deoZiI7h6n3UWM";
var url = baseUrl+bookValue+key;
url=url.replace(/ /g,"+");
console.log (url);


fetch(url)
  .then(response => response.json())
  .then(data => console.log(data));


});



// localStorage.setItem("lastname", "Smith");
