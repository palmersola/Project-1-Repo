const roverAPIKey = "Q7oEuNeavWgiwaPavAuvpRyjlBVQzReLygSbcI3W";
let roverQueryURL = "";
let selectorDate = "";
let test = "";
let ls = JSON.parse(localStorage.getItem("Recent Searches"));
let recentSearches = [];
if (ls === null) {
  recentSearches = ["", "", "", "", ""];
} else {
  recentSearches = ls;
  for (i = 0; i < recentSearches.length; i++) {
    $("#" + i).text(recentSearches[i]);
  }
}
$("#my_date_picker").datepicker({
  dateFormat: "yy-mm-dd",
  minDate: "2012-08-06",
  maxDate: "0D",
  changeMonth: true,
  changeYear: true
});
$("#my_date_picker").change(function(event) {
  event.preventDefault();
  let input = $("#my_date_picker").val();
  setDate(input);
  for (i = recentSearches.length - 1; i > 0; i--) {
    recentSearches[i] = recentSearches[i - 1];
  }
  recentSearches[0] = input;
  localStorage.setItem("Recent Searches", JSON.stringify(recentSearches));
  for (i = 0; i < recentSearches.length; i++) {
    $("#" + i).text(recentSearches[i]);
  }
});
$(".previous-search").click(function(event) {
  event.preventDefault();
  setDate($("#" + event.target.id).text());
});
$("#random").click(function(event) {
  event.preventDefault();
  setImg();
});
function setDate(btn) {
  if (btn) {
    selectorDate = btn;
    earthDate = selectorDate;
  } else if ($("#my_date_picker").val() === "") {
    earthDate =
      Math.floor(Math.random() * 10) +
      2012 +
      "-" +
      (Math.floor(Math.random() * 11) + 1) +
      "-" +
      (Math.floor(Math.random() * 30) + 1);
  } else {
    selectorDate = $("#my_date_picker").val();
    earthDate = selectorDate;
  }
  roverQueryURL =
    "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" +
    earthDate +
    "&api_key=" +
    roverAPIKey;
  setImg();
}
function setImg() {
  $.getJSON(roverQueryURL, function (data) {
    let i = Math.floor(Math.random() * data.photos.length);
    if (data.photos.length === 0 && selectorDate === "") {
      setDate();
    } else if (data.photos.length === 0) {
      $("#modal").addClass("is-active");
    } else {
      $("#rover-img").attr("src", data.photos[i].img_src);
      $("#rover-name").text("Rover: " + data.photos[i].rover.name);
      $("#solar").text("Solar date since landed: " + data.photos[i].sol);
      $("#earth").text("Terrestrial date: " + data.photos[i].earth_date);
    }
  });
}
setDate();
  $.get(
    "https://api.allorigins.win/get?url=http://api.open-notify.org/astros.json",
    function(data) {
      $("#space-number").text(
        JSON.parse(data["contents"])["number"] +
          " people are currently in space"
      );
      for (i = 0; i < JSON.parse(data["contents"])["number"]; i++) {
        let craft = JSON.parse(data["contents"])["people"][i].craft;
        if (craft == "ISS") {
          $("#iss").append(
            "<li>" + JSON.parse(data["contents"])["people"][i].name + "</li>"
          );
        } else if (craft == "Tiangong") {
          $("#tss").append(
            "<li>" + JSON.parse(data["contents"])["people"][i].name + "</li>"
          );
        }
      }
    }
  );

