const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const axios = require('axios');
const moment = require('moment');
const fs = require('fs');

const apiCall = process.argv[2];
const query = process.argv.slice(3).join(' ');

const callSpotify = q => {
  spotify
    .search({ type: 'track', query: q, limit: 1 })
    .then(function (response) {
      // console.log(JSON.stringify(response, null, 2));
      const track = response.tracks.items[0].name;
      const artist = response.tracks.items[0].album.artists[0].name;
      const album = response.tracks.items[0].album.name;
      const previewSong = response.tracks.items[0].preview_url;
      const isExplicitLyrics = response.tracks.items[0].explicit;

      console.log(`Track Title: ${track}`);
      console.log(`Artist: ${artist}`);
      console.log(`Album: ${album}`);
      if (isExplicitLyrics === true) {
        console.log(`Warning: Contains Explicit Lyrics!`)
      } else {
        console.log(`Lyrics suitable for most listeners.`)
      };
      console.log(`Preview Song: ${previewSong}`);
    });
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
      const rottenTomatoesRating = movie.Ratings[1].Value

      console.log(`Title: ${movie.Title}`)
      console.log(`Released: ${movie.Year}`)
      console.log(`Rated: ${movie.Rated}`)
      console.log(`Genre: ${movie.Genre}`)
      console.log(`Language: ${movie.Language}`)
      console.log(`Country: ${movie.Country}`)
      console.log(`Actors: ${movie.Actors}`)
      console.log(`Synopsis: ${movie.Plot}`)
      console.log(`IMDB Rating: ${movie.imdbRating}`)
      console.log(`Rotten Tomatoes Rating: ${rottenTomatoesRating}`)
    });
};

const doWhatItSays = () => {
  fs.readFile('./random.txt', 'utf8', function (error, data) {
    if (error) return console.log(error)
    var dataArr = data.split(",");
    var apiCall = dataArr[0]
    var query = dataArr[1]
    commands(apiCall, query)
  });
}

const commands = (apiCall, query) => {
  switch (apiCall) {
    case 'spotify':
      if (query) callSpotify(query)
      else callSpotify('god save the queen');
      break;
    case 'movie':
      if (query) callOmdbMovies(query)
      else callOmdbMovies('alien')
      break;
    case 'concert':
      if (query) callGetBandsInTown(query);
      else callGetBandsInTown('chain smokers');
      break;
    case 'do-this':
      doWhatItSays();
      break;
    default:
      console.log('Incorrect input, silly!');
  }
};
commands(apiCall, query)