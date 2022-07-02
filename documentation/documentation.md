### Get all the artists

Request components:

- Method: GET
- URL: /artists
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers:
    - Content-Type: application/json
- Body: information about all the artists
  ```json
  [
    {
      "artistId": 1,
      "name": "Red Hot Chili Peppers"
    }
  ]
  ```

### Get a specific artist's details based on artistId

Request components:

- Method: GET
- URL: /artists/artistId
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers:
    - Content-Type: application/json
- Body: json info about requested artist

```json
{"name":"Red Hot Chili Peppers","artistId":1,"albums":[{"name":"Stadium Arcadium","albumId":1,"artistId":1}]}
```

### Add an artist

Request components:

- Method: POST
- URL: /artists
- Headers:
    - Content-Type: application/json
- Body: json info for new artist

```json
{"name":"Ice Cold Chili Peppers"}
```

```javaScript
fetch("/artists", {
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify({"name":"Ice Cold Chili Peppers"})
}).then(res => res.text()).then(resBody => console.log(resBody))
```

Response components:

- Status code: 201
- Headers:
    - Content-Type: application/json
- Body: json info for newly added artist

```json
{"name":"Ice Cold Chili Peppers","artistId":4}
```

### Edit a specified artist by artistId

Request components:

- Method: PATCH
- URL: /artists/artistId
- Headers:
    - Content-Type: application/json
- Body: json with updated info

```javaScript
fetch("/artists/2", {
    method: "PATCH",
    headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify({"name":"The Blue Rasberry Slushies"})
}).then(res => {
    console.log(res.status); return res.text();
    }).then(resBody => console.log(resBody))
```

Response components:

- Status code: 200
- Headers:
    - Content-Type: application/json
- Body: json with updated artist object

```json
{"name":"The Blue Rasberry Slushies","artistId":2,"updatedAt":"2022-07-01T19:42:49.985Z"}
```

### Delete a specified artist by artistId

Request components:

- Method: DELETE
- URL: artists/artistId
- Headers: none
- Body: none

```javaScript
fetch("/artists/3", {
    method: "DELETE",
    headers: {
        "content-type": "application/json"
    },
}).then(res => {
    console.log(res.status); return res.text();
    }).then(resBody => console.log(resBody))
```

Response components:

- Status code: 200
- Headers:
    - Content-Type: application/json
- Body: json confirmation

```json
{"message":"Sucessfully deleted"}
```

### Get all albums of a specific artist based on artistId

Request components:

- Method: GET
- URL: /artists/artistId/albums
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers:
     - Content-Type: application/json
- Body: json info on artist's albums

```json
[{"name":"Stadium Arcadium","albumId":1,"artistId":1}]
```

### Get a specific album's details based on albumId

Request components:

- Method: GET
- URL: /albums/albumId
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers:
    - Content-Type: application/json
- Body: json info about album

```json
    {"name":"Stadium Arcadium","albumId":1,"artistId":1,"artist":{"name":"Red Hot Chili Peppers","artistId":1},"songs":[{"name":"Dani California","lyrics":"Getting born in the state of Mississippi\nPapa was a copper, and her mama was a hippy\nIn Alabama she would swing a hammer\nPrice you got to pay when you break the panorama\nShe never knew that there was anything more than poor\nWhat in the world does your company take me for?\nBlack bandanna, sweet Louisiana\nRobbing on a bank in the state of Indiana\nShe's a runner\nRebel, and a stunner\nOn her merry way saying baby, watcha gonna?\nLooking down the barrel of a hot metal forty-five\nJust another way to survive\nCalifornia, rest in peace\nSimultaneous release\nCalifornia, show your teeth\nShe's my priestess\nI'm your priest\nYeah, yeah, yeah\nShe's a lover, baby, and a fighter\nShould've seen it coming when I got a little brighter\nWith a name like Dani California\nDay was gonna come when I was gonna mourn ya\nA little loaded, she was stealing another breath\nI love my baby to death\nCalifornia, rest in peace\nSimultaneous release\nCalifornia, show your teeth\nShe's my priestess\nI'm your priest\nYeah, yeah, yeah\nWho knew the other side of you?\nWho knew that others died to prove?\nToo true to say goodbye to you\nToo true to say, say, say\nPushed the fader, gifted animator\nOne for the now, and eleven for the later\nNever made it up to Minnesota\nNorth Dakota man\nWasn't gunnin' for the quota\nDown in the Badlands she was saving the best for last\nIt only hurts when I laugh\nGone too fast\nCalifornia, rest in peace\nSimultaneous release\nCalifornia, show your teeth\nShe's my priestess\nI'm your priest\nYeah, yeah, yeah\nCalifornia, rest in peace\nSimultaneous release\nCalifornia, show your teeth\nShe's my priestess\nI'm your priest\nYeah, yeah, yeah","trackNumber":1,"songId":1,"createdAt":"2022-07-01T19:17:46.000Z","updatedAt":"2022-07-01T19:17:46.000Z","albumId":1}]}
```

### Add an album to a specific artist based on artistId

Request components:

- Method: POST
- URL: /artists/artistId/albums
- Headers:
     - Content-Type: application/json
- Body: json object with new album info

```javaScript
fetch("/artists/2/albums", {
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify({name: "Times Like These"}),
}).then(res => {
    console.log(res.status); console.log(res.headers.get("Content-Type"));
    return res.text();
    }).then(resBody => console.log(resBody))
```

Response components:

- Status code: 201
- Headers:
    - Content-Type: application/json
- Body: json info on new album

```json
{"name":"Times Like These","albumId":2,"artistId":2}
```

### Edit a specified album by albumId

Request components:

- Method: PATCH
- URL: /albums/albumId
- Headers:
    - Content-Type: application/json
- Body: json with new info

```javaScript
fetch("/albums/3", {
    method: "PATCH",
    headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify({name: "Is Someone Getting the Best of Foo Fighters?"}),
}).then(res => {
    console.log(res.status); console.log(res.headers.get("Content-Type"));
    return res.text();
    }).then(resBody => console.log(resBody))
```

Response components:

- Status code: 200
- Headers:
     - Content-Type: application/json
- Body: json with updated info

```json
{"name":"Is Someone Getting the Best of Foo Fighters?","albumId":3,"artistId":2,"updatedAt":"2022-07-01T20:20:32.710Z"}
```

### Delete a specified album by albumId

Request components:

- Method: DELETE
- URL: /albums/albumId
- Headers: none
- Body: none

```javaScript
fetch("/albums/3", {
    method: "DELETE",
    headers: {
        "content-type": "application/json"
    },
}).then(res => {
    console.log(res.status); console.log(res.headers.get("Content-Type"));
    return res.text();
    }).then(resBody => console.log(resBody))
```

Response components:

- Status code: 200
- Headers:
    - Content-Type: application/json
- Body: json confirming delete

```json
{"message":"Sucessfully deleted"}
```

### Get all songs of a specific artist based on artistId

Request components:

- Method: GET
- URL: /artists/artistId/songs
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers:
    - Content-Type: application/json
- Body: json with info on artist's songs

```json
[{"name":"Dani California","lyrics":"Getting born in the state of Mississippi\nPapa was a copper, and her mama was a hippy\nIn Alabama she would swing a hammer\nPrice you got to pay when you break the panorama\nShe never knew that there was anything more than poor\nWhat in the world does your company take me for?\nBlack bandanna, sweet Louisiana\nRobbing on a bank in the state of Indiana\nShe's a runner\nRebel, and a stunner\nOn her merry way saying baby, watcha gonna?\nLooking down the barrel of a hot metal forty-five\nJust another way to survive\nCalifornia, rest in peace\nSimultaneous release\nCalifornia, show your teeth\nShe's my priestess\nI'm your priest\nYeah, yeah, yeah\nShe's a lover, baby, and a fighter\nShould've seen it coming when I got a little brighter\nWith a name like Dani California\nDay was gonna come when I was gonna mourn ya\nA little loaded, she was stealing another breath\nI love my baby to death\nCalifornia, rest in peace\nSimultaneous release\nCalifornia, show your teeth\nShe's my priestess\nI'm your priest\nYeah, yeah, yeah\nWho knew the other side of you?\nWho knew that others died to prove?\nToo true to say goodbye to you\nToo true to say, say, say\nPushed the fader, gifted animator\nOne for the now, and eleven for the later\nNever made it up to Minnesota\nNorth Dakota man\nWasn't gunnin' for the quota\nDown in the Badlands she was saving the best for last\nIt only hurts when I laugh\nGone too fast\nCalifornia, rest in peace\nSimultaneous release\nCalifornia, show your teeth\nShe's my priestess\nI'm your priest\nYeah, yeah, yeah\nCalifornia, rest in peace\nSimultaneous release\nCalifornia, show your teeth\nShe's my priestess\nI'm your priest\nYeah, yeah, yeah","trackNumber":1,"songId":1,"albumId":1}]
```

### Get all songs of a specific album based on albumId

Request components:

- Method: GET
- URL: /albums/albumId/songs
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers:
    - Content-Type: application/json
- Body: json with info on album's songs

```json
[{"name":"Dani California","lyrics":"Getting born in the state of Mississippi\nPapa was a copper, and her mama was a hippy\nIn Alabama she would swing a hammer\nPrice you got to pay when you break the panorama\nShe never knew that there was anything more than poor\nWhat in the world does your company take me for?\nBlack bandanna, sweet Louisiana\nRobbing on a bank in the state of Indiana\nShe's a runner\nRebel, and a stunner\nOn her merry way saying baby, watcha gonna?\nLooking down the barrel of a hot metal forty-five\nJust another way to survive\nCalifornia, rest in peace\nSimultaneous release\nCalifornia, show your teeth\nShe's my priestess\nI'm your priest\nYeah, yeah, yeah\nShe's a lover, baby, and a fighter\nShould've seen it coming when I got a little brighter\nWith a name like Dani California\nDay was gonna come when I was gonna mourn ya\nA little loaded, she was stealing another breath\nI love my baby to death\nCalifornia, rest in peace\nSimultaneous release\nCalifornia, show your teeth\nShe's my priestess\nI'm your priest\nYeah, yeah, yeah\nWho knew the other side of you?\nWho knew that others died to prove?\nToo true to say goodbye to you\nToo true to say, say, say\nPushed the fader, gifted animator\nOne for the now, and eleven for the later\nNever made it up to Minnesota\nNorth Dakota man\nWasn't gunnin' for the quota\nDown in the Badlands she was saving the best for last\nIt only hurts when I laugh\nGone too fast\nCalifornia, rest in peace\nSimultaneous release\nCalifornia, show your teeth\nShe's my priestess\nI'm your priest\nYeah, yeah, yeah\nCalifornia, rest in peace\nSimultaneous release\nCalifornia, show your teeth\nShe's my priestess\nI'm your priest\nYeah, yeah, yeah","trackNumber":1,"songId":1,"albumId":1}]
```

### Get a specific song's details based on songId

Request components:

- Method: GET
- URL: /songs/songNumber
- Headers:
- Body:

Response components:

- Status code: 200
- Headers:
    - Content-Type: application/json
- Body: json with info about song

```json
{"name":"Dani California","lyrics":"Getting born in the state of Mississippi\nPapa was a copper, and her mama was a hippy\nIn Alabama she would swing a hammer\nPrice you got to pay when you break the panorama\nShe never knew that there was anything more than poor\nWhat in the world does your company take me for?\nBlack bandanna, sweet Louisiana\nRobbing on a bank in the state of Indiana\nShe's a runner\nRebel, and a stunner\nOn her merry way saying baby, watcha gonna?\nLooking down the barrel of a hot metal forty-five\nJust another way to survive\nCalifornia, rest in peace\nSimultaneous release\nCalifornia, show your teeth\nShe's my priestess\nI'm your priest\nYeah, yeah, yeah\nShe's a lover, baby, and a fighter\nShould've seen it coming when I got a little brighter\nWith a name like Dani California\nDay was gonna come when I was gonna mourn ya\nA little loaded, she was stealing another breath\nI love my baby to death\nCalifornia, rest in peace\nSimultaneous release\nCalifornia, show your teeth\nShe's my priestess\nI'm your priest\nYeah, yeah, yeah\nWho knew the other side of you?\nWho knew that others died to prove?\nToo true to say goodbye to you\nToo true to say, say, say\nPushed the fader, gifted animator\nOne for the now, and eleven for the later\nNever made it up to Minnesota\nNorth Dakota man\nWasn't gunnin' for the quota\nDown in the Badlands she was saving the best for last\nIt only hurts when I laugh\nGone too fast\nCalifornia, rest in peace\nSimultaneous release\nCalifornia, show your teeth\nShe's my priestess\nI'm your priest\nYeah, yeah, yeah\nCalifornia, rest in peace\nSimultaneous release\nCalifornia, show your teeth\nShe's my priestess\nI'm your priest\nYeah, yeah, yeah","trackNumber":1,"songId":1,"albumId":1,"album":{"name":"Stadium Arcadium","albumId":1,"artistId":1},"artist":{"name":"Red Hot Chili Peppers","artistId":1}}
```

### Get all songs of a specified trackNumber

**Note: This one is meant to be a little more challenging, but should still
follow a similar pattern to those above.**

Can you see a pattern between this endpoint and the two previous endpoints?

Hint: Think of how you solved getting all songs by a specific artist and by a
specific album. What is resource that you wanted to get back for those
endpoints? What information was that resource constrained by for each of those
endpoints? Now think about getting all songs by a specific `trackNumber`.
What is the resource you want to get? What information is the resource
constrained by for this endpoint?

Request components:

- Method: GET
- URL: /tracknumbers/tracknumId/songs
- Headers: none
- Body: none

Response components:

- Status code: 200
- Headers:
    - Content-Type: application/json
- Body: json with info about songs with track number

```json
[{"name":"Dani California","lyrics":"Getting born in the state of Mississippi\nPapa was a copper, and her mama was a hippy\nIn Alabama she would swing a hammer\nPrice you got to pay when you break the panorama\nShe never knew that there was anything more than poor\nWhat in the world does your company take me for?\nBlack bandanna, sweet Louisiana\nRobbing on a bank in the state of Indiana\nShe's a runner\nRebel, and a stunner\nOn her merry way saying baby, watcha gonna?\nLooking down the barrel of a hot metal forty-five\nJust another way to survive\nCalifornia, rest in peace\nSimultaneous release\nCalifornia, show your teeth\nShe's my priestess\nI'm your priest\nYeah, yeah, yeah\nShe's a lover, baby, and a fighter\nShould've seen it coming when I got a little brighter\nWith a name like Dani California\nDay was gonna come when I was gonna mourn ya\nA little loaded, she was stealing another breath\nI love my baby to death\nCalifornia, rest in peace\nSimultaneous release\nCalifornia, show your teeth\nShe's my priestess\nI'm your priest\nYeah, yeah, yeah\nWho knew the other side of you?\nWho knew that others died to prove?\nToo true to say goodbye to you\nToo true to say, say, say\nPushed the fader, gifted animator\nOne for the now, and eleven for the later\nNever made it up to Minnesota\nNorth Dakota man\nWasn't gunnin' for the quota\nDown in the Badlands she was saving the best for last\nIt only hurts when I laugh\nGone too fast\nCalifornia, rest in peace\nSimultaneous release\nCalifornia, show your teeth\nShe's my priestess\nI'm your priest\nYeah, yeah, yeah\nCalifornia, rest in peace\nSimultaneous release\nCalifornia, show your teeth\nShe's my priestess\nI'm your priest\nYeah, yeah, yeah","trackNumber":1,"songId":1,"albumId":1}]
```

### Add a song to a specific album based on albumId

Request components:

- Method: POST
- URL: /albums/albumId/songs
- Headers:
    - Content-Type: application/json
- Body: json with song info

```javaScript
fetch("/albums/2/songs", {
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify({name: "Brand New Shirt"})
}).then(res => {
    console.log(res.status); console.log(res.headers.get("Content-Type"));
    return res.text();
    }).then(resBody => console.log(resBody))
```

Response components:

- Status code: 201
- Headers:
    - Content-Type: application/json
- Body: json with new song info

```json
{"name":"Brand New Shirt","lyrics":null,"trackNumber":null,"songId":2,"albumId":2}
```

### Edit a specified song by songId

Request components:

- Method: PATCH
- URL: /songs/songId
- Headers:
    - Content-Type: application/json
- Body: json with new info

```javaScript
fetch("/songs/2", {
    method: "PATCH",
    headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify({lyrics: "got a brand new shirt"})
}).then(res => {
    console.log(res.status); console.log(res.headers.get("Content-Type"));
    return res.text();
    }).then(resBody => console.log(resBody))
```

Response components:

- Status code: 200
- Headers:
    - Content-Type: application/json
- Body: json info about song

```json
{"name":"Brand New Shirt","lyrics":"got a brand new shirt","trackNumber":null,"songId":2,"albumId":2,"updatedAt":"2022-07-01T21:47:09.038Z"}
```

### Delete a specified song by songId

Request components:

- Method: DELETE
- URL: songs/songId
- Headers:
    - Content-Type: application/json
- Body: none

```javaScript
fetch("/songs/2", {
    method: "DELETE",
    headers: {
        "content-type": "application/json"
    },
}).then(res => {
    console.log(res.status); console.log(res.headers.get("Content-Type"));
    return res.text();
    }).then(resBody => console.log(resBody))
```

Response components:

- Status code: 200
- Headers:
    - Content-Type: application/json
- Body: json confirming delete

```json
{"message":"Sucessfully deleted"}
```
