$(document).ready(function () {
  var statusText = $("#status");
  var btnText = $("#dogsearch");
  var DropDownMenu = $("#doglistdropdown");
  var DogImage = $("#dogimage");

  //Load all Breeds into the DropDown Menu
  $.get("https://dog.ceo/api/breeds/list/all", function (data) {
    // console.log(data.message);
    $.each(data.message, function (i, item) {
      addOption(i, i);

      if (!jQuery.isEmptyObject(item)) {
        $.each(item, function (j, item2) {
          addOption(i + " " + item2, i + " " + item2);
        });
      }
    });
  });

  //Add Options to the DropDown List
  function addOption(Text, Value) {
    DropDownMenu.append(`<option value="${Value}">${Text}</option>`);
  }

  //Loads the Picture into the IMG HTML depending on the Breed
  function GetPicture(breed) {
    DogImage.css({
      width: "600px",
      height: "600px",
    });
    if (breed == "All") {
      $.get("https://dog.ceo/api/breeds/image/random", function (data) {
        DogImage.attr("src", data.message);
        statusText.html("Loaded Image. Click Next to see more!");
        btnText.html("Next");
      });
    } else {
      breed = breed.replace(/ /g, "/");
      DogImage.css({
        width: "600px",
        height: "600px",
      });
      $.get(
        "https://dog.ceo/api/breed/" + breed + "/images/random",
        function (data) {
          DogImage.attr("src", data.message);
        }
      );
      statusText.html("Loaded Image. Click Next to see more!");
      btnText.html("Next");
    }
  }

  //Opening Text
  statusText.html("Click Search to Search All Breeds");

  //Searching For a Picture and passing the while of the selected Breed
  btnText.click(function () {
    statusText.html("Searching for the Image....");
    GetPicture(DropDownMenu.find(":selected").text());
  });

  //Notice the Change when selecting different Dropdowns and update status Text
  DropDownMenu.change(function () {
    statusText.html(
      "Click Search to Search " +
        DropDownMenu.find(":selected").text() +
        " breed"
    );
    btnText.html("Search");
  });
});
