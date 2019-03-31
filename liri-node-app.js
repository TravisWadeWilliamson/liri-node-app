const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const ombd = keys.omdb;
const bandsInTown = keys.bandsInTown;
const axios = require('axios');
const moment = require('moment');
const fs = require('fs');

const apiCall = process.argv[2];
const query = process.argv[3];

const callSpotify = q => {
  spotify
    .search({ type: 'track', query: q, limit: 1})
    .then(function (response) {
      console.log(response.tracks);
    })
    .catch(function (err) {
      console.log(err);
    });
};

const callGetBandsInTown = q => {
  axios.get(`https://rest.bandsintown.com/artists/${q}/events?app_id=codingbootcamp`)
    .then(res => {
      const event = res.data[0];
      console.log(`Venue: ${event.venue.name}\nDate: ${event.datetime}\nLocation: ${event.venue.city}, ${event.venue.country}`);
    });
};

const callOmdbMovies = q => {
  axios.get(`http://www.omdbapi.com/?apikey=${keys.omdb.apiKey}&t=${q}`)
    .then(res => {
      const movie = res.data[0];
      console.log(res.data);
    });
};

// Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the move.
//        * Actors in the movie.
switch (apiCall) {
  case 'spotify':
    //execute logic here
    callSpotify(query)
    break;
  case 'movies':
    callOmdbMovies(query);
    break;
  case 'bands':
    callGetBandsInTown(query);
    break;
  default:
    console.log('incorrect input')



}







// const Spotify = require('node-spotify-api');

// const spotify = new Spotify(spotifyKeys);

// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }

// console.log(data); 
// });

// // var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + bandsInTown.apiKey;

// // process.argv
