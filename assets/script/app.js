const roverAPIKey = "Q7oEuNeavWgiwaPavAuvpRyjlBVQzReLygSbcI3W";
let sol = 2000;
let inSpaceQueryURL = "http://api.open-notify.org/astros.json";
let roverQueryURL =
  "http://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" +
  sol +
  "&api_key=" +
  roverAPIKey;
fetch(roverQueryURL).then(response => response.json()).then(data => {
  let imgSrc = data.photos[17].img_src;
  $("main").text(imgSrc);
  $("img").attr("src", imgSrc);
});
fetch(inSpaceQueryURL).then(response => response.json()).then(data => {
  console.log(data.number);
  $("aside").text("There are " + data.number + " people currently in space!");
});
