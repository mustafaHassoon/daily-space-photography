
//wraping the list inside IIFE
var dailyNews = (function () {

    var populareArtist = [];
    var apiUrl = 'https://api.themoviedb.org/3/person/popular?api_key=ee0326c2a9a0b787ee75f169ae1003ff&language=en-US&page=1';
    
    //FUNCTION TO EXTRACT OBJECTS FROM THE LIST
    
    function getAll() {
    return populareArtist;
    }
    
    function add(artist) {
    populareArtist.push(artist);
    }
    
    function loadList() {
    return fetch(apiUrl).then(function (response) {
    return response.json();
    }).then(function (json) {
    json.results.forEach(function (artist) {
    var artist = {
    name: artist.name,
    knownFor: artist.known_for[0].original_title,
    artistImage: artist.profile_path
    
    };
    add(artist);
    console.log(artist);
    });
    }).catch(function (e) {
    console.error(e);
    })
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
    // adding class to div DOM element
    //$modal.addClass('modal');
    // create closing button in modal content
    var closeButtonElement = $(
      '<button class="modal-close">' + "Close" + "</button>"
    );
    closeButtonElement.on("click", hideModal);
    //var closeButtonElement = document.createElement('button');
    //closeButtonElement.classList.add('modal-close');
    //closeButtonElement.innerText = 'Close';
    // Add event listener to close modal when botton is clicked
    //closeButtonElement.addEventListener('click', hideModal);

    // Create element for title in modal content
    var modalTitle = $('<h1 class="modal-title">' + artist.name + "</h1>");
    //var titleElement = document.createElement('h1');
    //titleElement.innerText = artist.name;

    // Create element for release date in modal content
    var knownFor = $(
      '<p class="modal-details">' + "Known for : " + artist.knownFor + "</p>"
    );
    //var knownFor = document.createElement('p');
    //knownFor.innerText = 'Known for : ' + artist.knownFor;

    // Create img in modal content

    var imageElement = $('<img class="modal-img">');
    imageElement.attr("src", 'https://image.tmdb.org/t/p/original' +  artist.artistImage);
    //var imageElement = document.createElement('img');
    //imageElement.classList.add('modal-img');
    //imageElement.setAttribute('src','https://image.tmdb.org/t/p/original' +  artist.artistImage);

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
   //function hideModal() {
    //modalContainer.classList.remove('is-visible');
    //}
    
  
 
   
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


    //oroKBRq_-acaYAC4IrrrQYi-fwaZrA-HtmtDf6x9cRPBW1FD

    //d120a29b6fc2414a8b1c0a882ae38c37

    //https://newsapi.org/v2/everything?q=COVID&from=2020-03-16&sortBy=publishedAt&apiKey=d120a29b6fc2414a8b1c0a882ae38c37&pageSize=100&page=1



    //oroKBRq_-acaYAC4IrrrQYi-fwaZrA-HtmtDf6x9cRPBW1FD

   