const roverAPIKey = "Q7oEuNeavWgiwaPavAuvpRyjlBVQzReLygSbcI3W";
let sol = 3495;
let roverQueryURL =
  "http://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" +
  sol +
  "&api_key=" +
  roverAPIKey;
let inSpaceQueryURL = "http://api.open-notify.org/astros.json?callback=?";
console.log(roverQueryURL);
fetch(roverQueryURL).then(response => response.json()).then(data => {
  let imgSrc = data.photos[10].img_src;
  $("main").text(imgSrc);
  $("img").attr("src", imgSrc);
});
