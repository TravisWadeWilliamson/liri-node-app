const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const ombd = keys.omdb;
const bandsInTown = keys.bandsInTown;
const axios = require('axios');
const moment = require('moment');
const fs = require('fs');

const apiCall = process.argv[2];
const query = process.argv.slice(3).join(' ');
``
const callSpotify = q => {
  spotify
    .search({ type: 'track', query: q, limit: 1 })
    .then(function (response) {
      console.log(response.tracks);
    })

};

const callGetBandsInTown = q => {
  axios.get(`https://rest.bandsintown.com/artists/${q}/events?app_id=codingbootcamp`)
    .then(res => {
      const event = res.data[0];
      if (res.data[0] === undefined) {
        console.log(`Ain't no concerts!`);
      } else {
        console.log(`Venue: ${event.venue.name}\nDate: ${event.datetime}\nLocation: ${event.venue.city}, ${event.venue.country}`);
      }
    });
};


const callOmdbMovies = q => {
  axios.get(`http://www.omdbapi.com/?apikey=${keys.omdb.apiKey}&t=${q}`)
    .then(res => {

      const movie = res.data;
      console.log(res.data);
    });
};

switch (apiCall) {
  case 'spotify':
    callSpotify(query)
    break;
  case 'movie':
    callOmdbMovies(query);
    break;
  case 'concert':
    callGetBandsInTown(query);
    break;
  default:
    console.log('Incorrect input, silly!')
}
