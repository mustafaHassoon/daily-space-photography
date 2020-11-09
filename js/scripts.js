//wraping the list inside IIFE
var dailyNews = (function () {
  var popularArtists = [];
  var apiUrl =
    "https://api.themoviedb.org/3/person/popular?api_key=ee0326c2a9a0b787ee75f169ae1003ff&language=en-US&page=1";
  //FUNCTION TO EXTRACT OBJECTS FROM THE LIST
  function getAll() {
    return popularArtists;
  }
  //FUNCTION TO add OBJECTS LIST ITEM
  function add(artist) {
    popularArtists.push(artist);
  }
  //Function to load pokemon list from API
  function loadList() {
    return $.ajax(apiUrl, { dataType: "json" })
      .then(function (responseJSON) {
        return responseJSON;
      })
      .then(function (json) {
        json.results.forEach(function (artist) {
          var artist = {
            name: artist.name,
            knownFor: artist.known_for[0].original_title,
            artistImage: artist.profile_path,
          };
          add(artist);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  // FUNCTION TO ADD NEW LIST ITEM FOR EACH artist OBJECT
  function addListItem(artist) {
    var $artistList = $(".artist-list");
    var $listItem = $("<li ></li>");

    var card = $(
      '<div class="card mt-5" style="width: 18rem; margin:13px;"></div>'
    );
    var image = $('<img class="card-img-top" alt="...">');
    var title = $('<h5 class="card-title">' + artist.name + "</h5>");
    image.attr(
      "src",
      "https://image.tmdb.org/t/p/original" + artist.artistImage + ""
    );
    let body = $('<div class="card-body" style="text-align: center;"></div>');
    let button = $(
      '<button type="button" class="btn" style="background-color: #d88780; color: white" data-toggle="modal" data-target="#exampleModal">See profile</button>'
    );
    card.append(image);
    card.append(body);
    body.append(title);
    body.append(button);
    $listItem.append(card);
    $artistList.append($listItem);
    // ADDING EVENT LISTENER TO THE BUTTON
    button.on("click", function (event) {
      showDetails(artist);
    });
  }
  //FUNCTION TO SHOW DETAILS OF THE LIST ITEM
  function showDetails(artist) {
    loadDetails(artist).then(function () {
      console.log(artist);
      showModal(artist);
    });
  }

  function loadDetails(artist) {
    var url = apiUrl;
    return $.ajax(url, { dataType: "json" })
      .then(function (responseJSON) {
        return responseJSON;
      })
      .then(function (details) {})
      .catch(function (e) {
        console.error(e);
      });
  }
  // SHOW MODAL FUNCTION
  function showModal(artist) {
    var modalHeader = $(".modal-header");
    modalHeader.empty();
    var modalTitle = $(".modal-title");
    modalTitle.empty();
    var modalBody = $(".modal-body");
    modalBody.empty();
    var modalFooter = $(".modal-footer");
    modalFooter.empty();
    var artistName = $('<h5 class="modal-title">' + artist.name + "</h5>");
    var artistImage = $(
      '<img class="modal-img" alt="..." style="width: 50%; padding: 30px;">'
    );
    artistImage.attr(
      "src",
      "https://image.tmdb.org/t/p/original" + artist.artistImage + ""
    );
    var closeButtonElement = $(
      '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        "Close" +
        "</button>"
    );
    var knownFor = $(
      "<p>" + "<strong>Known for : </strong>" + artist.knownFor + "</p>"
    );
    modalHeader.append(artistName);
    modalHeader.append(closeButtonElement);
    modalBody.append(artistImage);
    modalFooter.append(knownFor);
  }
  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    addListItem: addListItem,
    showDetails: showDetails,
    loadDetails: loadDetails,
    showModal: showModal,
  };
})();
//End of IIFE
dailyNews.loadList().then(function () {
  // Now the data is loaded!
  dailyNews.getAll().forEach(function (artist) {
    dailyNews.addListItem(artist);
  });
});
