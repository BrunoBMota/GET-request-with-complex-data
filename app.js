const apiKey = 'y19TggV9xU9vdeU8MPjBgdNzg4BYcAnag4zhSHP7';


const watchForm = function() {
  $('form').submit(event => {
    event.preventDefault();
    getURL($('#query').val(), $('#querySize').val());
  });
}; 

const getURL = function(query, querySize){
  const apiUrl = `https://developer.nps.gov/api/v1/parks?q=${query}&api_key=`;
  const fullUrl = `${apiUrl}${apiKey}`;
  fetch(fullUrl).then(response => response.json()).then(response => logData(response, querySize));
};

const logData = function(response, querySize){
  console.log(response);
  $('.results').html('');
  if(querySize > response.data.length){
    querySize = response.data.length;
  }

  for(let i = 0; i < querySize; i++){
    $('.results').append(`<h2>${response.data[i].fullName}</h2>`);
    $('.results').append(`<p>${response.data[i].description}</p>`);
    $('.results').append(`<a href="${response.data[i].url}">${response.data[i].url}</a>`);
    for(let element of response.data[i].addresses){
      $('.results').append(`<p>${element.city}, ${element.line1}, ${element.line2}, ${element.line3 === "" ? ' ' : element.city+','} ${element.postalCode}, ${element.stateCode}</p>`);
    }
  }
};



watchForm();

