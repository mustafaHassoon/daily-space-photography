
//wraping the list inside IIFE
var dailyNews = (function () {

    var dailyNewsList = [];
    var apiUrl = 'https://github.com/Rob--W/cors-anywhere/https://newsapi.org/v2/everything?q=apple&from=2020-10-16&to=2020-10-16&sortBy=popularity&apiKey=d120a29b6fc2414a8b1c0a882ae38c37';
    
    //FUNCTION TO EXTRACT OBJECTS FROM THE LIST
    
    function getAll() {
    return dailyNewsList;
    }
    
    function add(newsItem) {
    dailyNewsList.push(newsItem);
    }
    
    function loadList() {
    return fetch(apiUrl).then(function (response) {
    return response.json();
    }).then(function (json) {
    json.results.forEach(function (newsItem) {
    var newsItem = {
    name: newsItem.title,
    detailsUrl: newsItem.description,
    publishDate: newsItem.publishedAt,
    newsImage: newsItem.urlToImage
    };
    add(newsItem);
    console.log(newsItem);
    });
    }).catch(function (e) {
    console.error(e);
    })
    }
    
    // FUNCTION TO ADD NEW LISTITEM FOR EACH newsItem OBJECT
    function addListItem(newsItem) {
    var newsItemList = document.querySelector('.newsItem-list');
    var listItem = document.createElement('li');
    var button = document.createElement('button');
    button.innerText = newsItem.name;
    button.classList.add('list-class');
    listItem.appendChild(button);
    newsItemList.appendChild(listItem);
    // ADDING EVENT LISTENER TO THE BUTTON
    button.addEventListener('click', function (event) {
    showDetails(newsItem);
    });
    }
    
    //FUNCTION TO SHOW DETAILS OF THE LIST ITEM
    function showDetails(newsItem) {
    loadDetails(newsItem).then(function () {
    console.log(newsItem);
    showModal(newsItem);
    });
    }
    
    function loadDetails(newsItem) {
    var url = apiUrl;
    return fetch(url).then(function (response) {
    return response.json();
    }).then(function (details) {
    // ADD THE DETAILS TO THE ITEM
    newsItem.imageUrl = details.poster_path;
    newsItem.publishDateDate = details.publishDate_date;
    newsItem.overview = details.overview;
    }).catch(function (e) {
    console.error(e);
    });
    }
    
    // SHOW MODAL FUNCTION
    
    var modalContainer = document.querySelector('#modal-container');
    function showModal(newsItem) {
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
    titleElement.innerText = newsItem.name;
    // Create element for publishDate date in modal content
    var publishDateDate = document.createElement('p');
    publishDateDate.innerText = 'publishDate date : ' + newsItem.publishDate;
    // Create element for overview in modal content
    var overview = document.createElement('p');
    overview.innerText = 'Overview : ' + newsItem.detailsUrl;
    
    // Create img in modal content
    var imageElement = document.createElement('img');
    imageElement.classList.add('modal-img');
    imageElement.setAttribute('src', newsItem.newsImage);
    
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(publishDateDate);
    modal.appendChild(overview);
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
    dailyNews.getAll().forEach(function (newsItem) {
    dailyNews.addListItem(newsItem);
    });
    });


    //oroKBRq_-acaYAC4IrrrQYi-fwaZrA-HtmtDf6x9cRPBW1FD

    //d120a29b6fc2414a8b1c0a882ae38c37

    //https://newsapi.org/v2/everything?q=COVID&from=2020-03-16&sortBy=publishedAt&apiKey=d120a29b6fc2414a8b1c0a882ae38c37&pageSize=100&page=1



    //oroKBRq_-acaYAC4IrrrQYi-fwaZrA-HtmtDf6x9cRPBW1FD

   