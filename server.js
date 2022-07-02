const http = require('http');
const fs = require('fs');

/* ============================ SERVER DATA ============================ */
let artists = JSON.parse(fs.readFileSync('./seeds/artists.json'));
let albums = JSON.parse(fs.readFileSync('./seeds/albums.json'));
let songs = JSON.parse(fs.readFileSync('./seeds/songs.json'));

let nextArtistId = 2;
let nextAlbumId = 2;
let nextSongId = 2;

// returns an artistId for a new artist
function getNewArtistId() {
  const newArtistId = nextArtistId;
  nextArtistId++;
  return newArtistId;
}

// returns an albumId for a new album
function getNewAlbumId() {
  const newAlbumId = nextAlbumId;
  nextAlbumId++;
  return newAlbumId;
}

// returns an songId for a new song
function getNewSongId() {
  const newSongId = nextSongId;
  nextSongId++;
  return newSongId;
}

/* ======================= PROCESS SERVER REQUESTS ======================= */
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // assemble the request body
  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => { // finished assembling the entire request body
    // Parsing the body of the request depending on the "Content-Type" header
    if (reqBody) {
      switch (req.headers['content-type']) {
        case "application/json":
          req.body = JSON.parse(reqBody);
          break;
        case "application/x-www-form-urlencoded":
          req.body = reqBody
            .split("&")
            .map((keyValuePair) => keyValuePair.split("="))
            .map(([key, value]) => [key, value.replace(/\+/g, " ")])
            .map(([key, value]) => [key, decodeURIComponent(value)])
            .reduce((acc, [key, value]) => {
              acc[key] = value;
              return acc;
            }, {});
          break;
        default:
          break;
      }
      console.log(req.body);
    }

    /* ========================== ROUTE HANDLERS ========================== */

    // Your code here
//1
    if (req.method === "GET" && req.url === "/artists") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(artists));
    }
//2
    if (req.method === "GET" && req.url.startsWith("/artists/") && !req.url.includes("albums") && !req.url.includes("songs")) {
      res.setHeader("Content-Type", "application/json");
      let urlPath = req.url.split("/");
      let artistId = urlPath[2];

      if (artists[artistId]) {
        res.statusCode = 200;
        return res.end(JSON.stringify(artists[artistId]));
      } else {
        res.statusCode = 404;
        return res.end("artistId not found");
      }
    }
//3
    if (req.method === "POST" && req.url === "/artists") {
      res.setHeader("Content-Type", "application/json");

      if (req.body) {
        let {name} = req.body;
        let newId = getNewArtistId();
        let newArtist = {name: name, artistId: newId}
        artists[newId] = newArtist;
        res.statusCode = 201;
        return res.end(JSON.stringify(newArtist));

      } else {
        res.statusCode = 404;
        return res.end("No info passed in");
      }
    }
//4
    if (req.method === "PATCH" && req.url.startsWith("/artists/")) {
      res.setHeader("Content-Type", "application/json");
      let urlPath = req.url.split("/");
      let artistId = urlPath[2];

      if (req.body && artists[artistId]) {
        let {name} = req.body;
        let updatedArtist = {name: name, artistId: artistId, updatedAt: new Date()}
        artists[artistId] = updatedArtist;
        res.statusCode = 200;
        return res.end(JSON.stringify(updatedArtist));

      } else {
        res.statusCode = 404;
        if (artists[artistId]) { return res.end("No info passed in") }
        else {return res.end("no artist of that artistId")}
    }
  }
//5
    if (req.method === "DELETE" && req.url.startsWith("/artists/")) {
      res.setHeader("Content-Type", "application/json");
      let urlPath = req.url.split("/");
      let artistId = urlPath[2];

      if (artists[artistId]) {
        delete artists[artistId];
        res.statusCode = 200;
        return res.end(JSON.stringify({"message":"Sucessfully deleted"}));
      } else {
        res.statusCode = 404;
        return res.end("artistId not found");
      }
    }
//6
    if (req.method === "GET" && req.url.startsWith("/artists/") && req.url.endsWith("/albums")) {
      res.setHeader("Content-Type", "application/json");
      let urlPath = req.url.split("/");
      let artistId = Number(urlPath[2]);
      let albumArr = [];

      for(let key in albums) {
        if (albums[key].artistId === artistId) { albumArr.push(albums[key]) }
      }

      if (albumArr.length > 0) {
        res.statusCode = 200;
        return res.end(JSON.stringify(albumArr));
      } else {
        res.statusCode = 404;
        return res.end("No albums by specified artist found");
      }
    }
//7
    if (req.method === "GET" && req.url.startsWith("/albums/") && !req.url.includes("songs")) {
      res.setHeader("Content-Type", "application/json");
      let urlPath = req.url.split("/");
      let albumId = urlPath[2];

      if (albums[albumId]) {
        res.statusCode = 200;
        return res.end(JSON.stringify(albums[albumId]));
      } else {
        res.statusCode = 404;
        return res.end("albumId not found");
      }
    }
//8
    if (req.method === "POST" && req.url.startsWith("/artists/") && req.url.endsWith("/albums")) {
      res.setHeader("Content-Type", "application/json");
      let urlPath = req.url.split("/");
      let artistId = urlPath[2];

      if (req.body && artists[artistId]) {
        let {name} = req.body;
        let newId = getNewAlbumId();
        let newAlbum = {name: name, albumId: newId, artistId: artistId}
        albums[newId] = newAlbum;
        res.statusCode = 201;
        return res.end(JSON.stringify(newAlbum));

      } else {
        res.statusCode = 404;
        if (artists[artistId]) {return res.end("No info passed in")}
        else {return res.end("no artist of that artistId")}
      }
    }
//9
    if (req.method === "PATCH" && req.url.startsWith("/albums/")) {
      res.setHeader("Content-Type", "application/json");
      let urlPath = req.url.split("/");
      let albumId = urlPath[2];

      if (req.body && albums[albumId]) {
        let {name} = req.body;
        let artistId = albums[albumId]["artistId"];
        let updatedAlbum = {name: name, albumId: albumId, artistId, updatedAt: new Date()}
        albums[albumId] = updatedAlbum;
        res.statusCode = 200;
        return res.end(JSON.stringify(updatedAlbum));

      } else {
        res.statusCode = 404;
        if (albums[albumId]) {return res.end("No info passed in")}
        else {return res.end("no album of that albumId")}
      }
    }
//10
    if (req.method === "DELETE" && req.url.startsWith("/albums/")) {
      res.setHeader("Content-Type", "application/json");
      let urlPath = req.url.split("/");
      let albumId = urlPath[2];

      if (albums[albumId]) {
        delete albums[albumId];
        res.statusCode = 200;
        return res.end(JSON.stringify({"message":"Sucessfully deleted"}));
      } else {
        res.statusCode = 404;
        return res.end("albumId not found");
      }
    }
//11
    if (req.method === "GET" && req.url.startsWith("/artists/") && req.url.endsWith("/songs")) {
      res.setHeader("Content-Type", "application/json");
      let urlPath = req.url.split("/");
      let artistId = Number(urlPath[2]);
      let songsArr = [];

      for(let key in songs) {
        let albumId = songs[key].albumId
        if (albums[albumId].artistId === artistId) { songsArr.push(songs[key]) }
      }

      if (songsArr.length > 0) {
        res.statusCode = 200;
        return res.end(JSON.stringify(songsArr));
      } else {
        res.statusCode = 404;
        return res.end("No songs by specified artist found");
      }
    }
//12
    if (req.method === "GET" && req.url.startsWith("/albums/") && req.url.endsWith("/songs")) {
      res.setHeader("Content-Type", "application/json");
      let urlPath = req.url.split("/");
      let albumId = Number(urlPath[2]);
      let songsArr = [];

      for(let key in songs) {
        if (songs[key].albumId === albumId) { songsArr.push(songs[key]) }
      }

      if (songsArr.length > 0) {
        res.statusCode = 200;
        return res.end(JSON.stringify(songsArr));
      } else {
        res.statusCode = 404;
        return res.end("No songs by specified album found");
      }
    }
//13
    if (req.method === "GET" && req.url.startsWith("/tracknumbers/") && req.url.endsWith("/songs")) {
      res.setHeader("Content-Type", "application/json");
      let urlPath = req.url.split("/");
      let trackNumber = Number(urlPath[2]);
      let songsArr = [];

      for(let key in songs) {
        if (songs[key].trackNumber === trackNumber) { songsArr.push(songs[key]) }
      }

      if (songsArr.length > 0) {
        res.statusCode = 200;
        return res.end(JSON.stringify(songsArr));
      } else {
        res.statusCode = 404;
        return res.end("No songs by specified tracknumber found");
      }
    }
//14
    if (req.method === "GET" && req.url.startsWith("/songs/")) {
      res.setHeader("Content-Type", "application/json");
      let urlPath = req.url.split("/");
      let songId = urlPath[2];

      if (songs[songId]) {
        res.statusCode = 200;
        return res.end(JSON.stringify(songs[songId]));
      } else {
        res.statusCode = 404;
        return res.end("no song with specified songId found");
      }
    }
//15
    if (req.method === "POST" && req.url.startsWith("/albums") && req.url.endsWith("/songs")) {
      res.setHeader("Content-Type", "application/json");
      let urlPath = req.url.split("/");
      let albumId = Number(urlPath[2]);

      if (req.body && albums[albumId]) {
        let {name, trackNumber, lyrics} = req.body;
        let newId = getNewSongId();
        let newSong = {name: name, songId: newId, trackNumber: trackNumber, albumId: albumId, lyrics: lyrics}
        songs[newId] = newSong;
        res.statusCode = 201;
        return res.end(JSON.stringify(newSong));
      } else {
        res.statusCode = 404;
        if (albums[albumId])  {return res.end("No info passed in");}
        else {return res.end("no album of that albumId")}
      }
    }
//16
    if (req.method === "PATCH" && req.url.startsWith("/songs/")) {
      res.setHeader("Content-Type", "application/json");
      let urlPath = req.url.split("/");
      let songId = urlPath[2];

      if (req.body && songs[songId]) {
        let {name, trackNumber, lyrics} = req.body;
        let albumId = songs[songId]["albumId"];
        let updatedSong = {name: name, songId: songId, trackNumber: trackNumber, albumId: albumId, lyrics: lyrics, updatedAt: new Date()};
        songs[songId] = updatedSong;
        res.statusCode = 200;
        return res.end(JSON.stringify(updatedSong));

      } else {
        res.statusCode = 404;
        if (songs[songId]) {return res.end("No info passed in")}
        else {return res.end("no song of that songId")}
      }
    }
//17
    if (req.method === "DELETE" && req.url.startsWith("/songs/")) {
      res.setHeader("Content-Type", "application/json");
      let urlPath = req.url.split("/");
      let songId = urlPath[2];

      if (songs[songId]) {
        delete songs[songId];
        res.statusCode = 200;
        return res.end(JSON.stringify({"message":"Sucessfully deleted"}));
      } else {
        res.statusCode = 404;
        return res.end("songId not found");
      }
    }

//EXTRA

    if (req.method === "GET" && req.url === "/albums") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(albums));
    }

    if (req.method === "GET" && req.url === "/songs") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(songs));
    }

//

    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.write("Endpoint not found");
    return res.end();
  });
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
