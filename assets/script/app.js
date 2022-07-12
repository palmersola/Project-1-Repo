const roverAPIKey = "Q7oEuNeavWgiwaPavAuvpRyjlBVQzReLygSbcI3W";
let sol = Math.floor(Math.random() * 3495) + 1;
// let sol = 2548;

// console.log(sol);

let inSpaceQueryURL = "http://api.open-notify.org/astros.json";
let roverQueryURL =
  "http://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" +
  sol +
  "&api_key=" +
  roverAPIKey;
fetch(roverQueryURL).then(response => response.json()).then(data => {
  let i = Math.floor(Math.random() * data.photos.length);
  let imgSrc = data.photos[i].img_src;
  $("#rover-img").attr("src", imgSrc);
  $("#rover-name").text("Rover Name: " + data.photos[i].rover.name);
  $("#solar").text(
    "Solar date since the rover has landed: " + data.photos[i].sol
  );
  $("#earth").text(
    "Terrestrial date photo was taken: " + data.photos[i].earth_date
  );
});
fetch(inSpaceQueryURL).then(response => response.json()).then(data => {
  // console.log(data.number);
  $("#space-number").text(
    "There are " + data.number + " people currently in space!"
  );
});
