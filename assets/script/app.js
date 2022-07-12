const roverAPIKey = "Q7oEuNeavWgiwaPavAuvpRyjlBVQzReLygSbcI3W";
let sol = Math.floor(Math.random() * 3495) + 1;
let inSpaceQueryURL = "http://api.open-notify.org/astros.json";
let roverQueryURL =
  "http://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" +
  sol +
  "&api_key=" +
  roverAPIKey;
$("#random").click(function(event) {
  event.preventDefault();
  setImg();
});
function setImg() {

  fetch(roverQueryURL).then(response => response.json()).then(data => {
    let i = Math.floor(Math.random() * data.photos.length);
    let imgSrc = data.photos[i].img_src;
    if (imgSrc == "undefined") {
      setImg();
    } else {
      $("#rover-img").attr("src", imgSrc);
      $("#rover-name").text("Rover: " + data.photos[i].rover.name);
      $("#solar").text("Solar date since landed: " + data.photos[i].sol);
      $("#earth").text("Terrestrial date: " + data.photos[i].earth_date);
    }
  });
}
setImg();
fetch(inSpaceQueryURL).then(response => response.json()).then(data => {
  console.log(data.number);
  $("#space-number").text(data.number + " people are currently in space");
  for (i = 0; i < data.number; i++) {
    let craft = data.people[i].craft;
    if (craft == "ISS") {
      $("#iss").append("<li>" + data.people[i].name + "</li>");
    } else if (craft == "Tiangong") {
      $("#tss").append("<li>" + data.people[i].name + "</li>");
    }
  }
});
