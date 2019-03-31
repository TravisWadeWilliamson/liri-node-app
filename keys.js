require('dotenv').config();
const spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};

const omdb = {
    apiKey: process.env.OMDB_ID
};

const bandsInTown = {
    apiKey: process.env.BANDS_IN_TOWN_ID
};

module.exports = {
    spotify: spotify,
    omdb: omdb,
    bandsInTown: bandsInTown
}

console.log(spotify.id, omdb.apiKey, bandsInTown.apiKey);