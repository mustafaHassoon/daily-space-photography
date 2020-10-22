
//wraping the list inside IIFE
var dailyNews = (function () {

    var popularArtist = [];
    var apiUrl = 'https://api.themoviedb.org/3/person/popular?api_key=ee0326c2a9a0b787ee75f169ae1003ff&language=en-US&page=1';
    //FUNCTION TO EXTRACT OBJECTS FROM THE LIST
    function getAll() {
    return popularArtist;
    }
    //FUNCTION TO add OBJECTS LIST ITEM
    function add(artist) {
    popularArtist.push(artist);
    }
    //Function to load pokemon list from API
    function loadList() {
      return $.ajax(apiUrl, { dataType: "json" }).then(function(responseJSON) {
          return responseJSON;
        }).then(function(json) {
          json.results.forEach(function(artist){
            var artist = {
              name: artist.name,
              knownFor: artist.known_for[0].original_title,
              artistImage: artist.profile_path,
            };
            add(artist);
          });
        })
        .catch(function(e) {
          console.error(e);
        });
    }
    // FUNCTION TO ADD NEW LISTITEM FOR EACH artist OBJECT
    function addListItem(artist) {
    var $artistList = $(".artist-list");
    var $listItem = $('<li ></li>');
    var $button = $('<button class="list-class">' + artist.name + "</button>" );
    $('listItem').append($button);
    $button.css("background-image", "url('https://image.tmdb.org/t/p/original" + artist.artistImage + "')");
    $button.css("background-position", "center");
    $button.css("background-size", "160px 240px");
    $listItem.append($button);
    $artistList.append($listItem);
    // ADDING EVENT LISTENER TO THE BUTTON
    $button.on("click", function (event) {
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
    return $.ajax(url, {dataType: 'json'}).then(function(responseJSON) {
        return responseJSON;
      }).then(function(details) {
    }).catch(function (e) {
    console.error(e);
    });
    }
    // SHOW MODAL FUNCTION
    var $modalContainer = $('#modal-container');
    function showModal(artist) {
    // Clear existing modal content
    $modalContainer.empty();
    //add class to modal
    $modalContainer.addClass('is-visible');
    // Creating div element in DOM
    var modal = $('<div class="modal"></div>');
    // create closing button in modal content
    var closeButtonElement = $(
      '<button class="modal-close">' + "Close" + "</button>"
    );
    closeButtonElement.on("click", hideModal);
    // Create element for title in modal content
    var modalTitle = $('<h1 class="modal-title">' + artist.name + "</h1>");
    // Create element for release date in modal content
    var knownFor = $(
      '<p class="modal-details">' + "Known for : " + artist.knownFor + "</p>"
    );
    // Create img in modal content
    var imageElement = $('<img class="modal-img">');
    imageElement.attr("src", 'https://image.tmdb.org/t/p/original' +  artist.artistImage);
    // close if the user press esc
    modal.append(closeButtonElement);
    modal.append(imageElement);
    modal.append(modalTitle);
    modal.append(knownFor);
    $modalContainer.append(modal);
   };
   function hideModal() {
    var $modalContainer = $("#modal-container");
    $modalContainer.removeClass("is-visible");
  }
    return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    addListItem: addListItem,
    showDetails: showDetails,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal,
    };
    })()
    //End of IIFE
    dailyNews.loadList().then(function () {
    // Now the data is loaded!
    dailyNews.getAll().forEach(function (artist) {
    dailyNews.addListItem(artist);
    });
    });

   