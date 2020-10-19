
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
    var artistList = document.querySelector('.artist-list');
    var listItem = document.createElement('li');
    var button = document.createElement('button');
    button.innerText = artist.name;
    button.classList.add('list-class');
    button.style.backgroundPosition = "center"
    button.style.backgroundImage = "url('https://image.tmdb.org/t/p/original" + artist.artistImage + "')";
    button.style.backgroundSize = "160px 240px"
    listItem.appendChild(button);
    artistList.appendChild(listItem);
    // ADDING EVENT LISTENER TO THE BUTTON
    button.addEventListener('click', function (event) {
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
    return fetch(url).then(function (response) {
    return response.json();
    }).then(function (details) {
    }).catch(function (e) {
    console.error(e);
    });
    }
    
    // SHOW MODAL FUNCTION
    
    var modalContainer = document.querySelector('#modal-container');
    function showModal(artist) {
    // Clear existing modal content
    modalContainer.innerHTML = '';
    // Creating div element in DOM
    var modal = document.createElement('div');
    // adding class to div DOM element
    modal.classList.add('modal');
    // create closing button in modal content
    var closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    // Add event listener to close modal when botton is clicked
    closeButtonElement.addEventListener('click', hideModal);
    // Create element for title in modal content
    var titleElement = document.createElement('h1');
    titleElement.innerText = artist.name;
    // Create element for release date in modal content
    var knownFor = document.createElement('p');
    knownFor.innerText = 'Known for : ' + artist.knownFor;

    // Create img in modal content
    var imageElement = document.createElement('img');
    imageElement.classList.add('modal-img');
    imageElement.setAttribute('src','https://image.tmdb.org/t/p/original' +  artist.artistImage);
    
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(knownFor);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);
    modalContainer.classList.add('is-visible');
    }
    
    function hideModal() {
    modalContainer.classList.remove('is-visible');
    }
    
    window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
    }
    });
    modalContainer.addEventListener('click', (e) => {
    // close if the user clicks directly on the overlay
    var target = e.target;
    if (target === modalContainer) {
    hideModal();
    }
    });
   
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

   