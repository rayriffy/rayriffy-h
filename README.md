[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Frayriffy%2Frayriffy-h.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Frayriffy%2Frayriffy-h?ref=badge_shield)

Riffy H
=======

The monorepo of [Riffy H](https://h.rayriffy.com)

What's included?
----------------

We have 3 seperated applications in this monorepo.

1. [apps/web](#appsweb): The frontend of **Riffy H**, built with [Gatsby](https://gatsbyjs.org/)
2. [apps/api](#appsapi): Public REST API for serving **Riffy H**
3. [apps/poster](#appsposter): Site for encoded images

Requirements
------------

- [yarn](https://yarnpkg.com/) (yarn 2 is not supported)
- Node LTS
- [@nrwl/cli](https://nx.dev/react) installed globally (`yarn global add @nrwl/cli`)

License
-------

All of **Riffy H** application and libraries are licensed under the [MIT licence](https://opensource.org/licenses/MIT). Please see [the licence file](LICENCE) for more information. [tl;dr](https://tldrlegal.com/license/mit-license) you can do whatever you want as long as you include the original copyright and license notice in any copy of the software/source.

apps/web
--------

[source](apps/web)

The main website of Riffy H, built with [Gatsby](https://www.gatsbyjs.org/).

Demo: [h.rayriffy.com](https://h.rayriffy.com)

### Features

- **Home** page that listing all galleries from nhentai
- **Listing** to add your own gallery collection to the site by add gallery id into the [file](apps/web/src/contents/database/codes.ts)
- **Custom** navigate to any ids by using this page
- **Search** search galleries on listing collection or nhentai
- List all tags from listing collection
- **Offline-ready!**

### Running development locally

Run:

```
nx serve web
```

The webpack server will start. Collection will obtain only maximum amount of **15** galleries when `NODE_ENV` **is not in production mode**

You should now be able to browse to [http://localhost:3000](http://localhost:3000) to see the web application.

### Build and deploy

Run:

```
nx build web
```

After build successfully executed, folder `apps/web/public` will be created which you can use it to serve via any web server.

apps/poster
-----------

[source](apps/poster)

Sharing code to socials securely with styled encoded poster

### Usage

`https://poster.h.api.rayriffy.com/encode/:id`

Set [puppeteer](https://github.com/GoogleChrome/puppeteer) or screenshot library to obtain the poster with **1000 * 1000 px** viewport and [screenshot](https://pptr.dev/#?product=Puppeteer&show=api-pagescreenshotoptions) it

### Running development locally

Run:

```
nx serve poster
```

The environment will start.

You should now be able to browse to [http://localhost:4200](http://localhost:4200) to see the web application.

### Build

Run:

```
nx build poster
```

After build successfully executed, folder `apps/web/public` will be created which you can use it to deploy.

apps/api
--------

[source](apps/api)

APIs of Riffy H

### API

The API is based on HTTPS requests and JSON responses. The stable HTTPS endpoint for the latest version is: `https://h.api.rayriffy.com/v1`

### HTTP status Codes

The following HTTP status codes are returned by the API

| Status Code | Description                                                                               |
| ----------- | ----------------------------------------------------------------------------------------- |
| 200         | Request successful                                                                        |
| 202         | Request has been accepted for further processing, which will be completed sometime later. |
| 400         | Problem with the request                                                                  |
| 401         | Unauthorized                                                                              |
| 404         | Request / Route is not found                                                              |
| 405         | Request method is invalid                                                                 |
| 500         | Error on the internal server                                                              |

Otherwise, successful response can be check by using modulo operation

```javascript
const isSuccessful = res.code % 100 === 2
```

### Response structure

The following JSON data is returned in the response body

| Property         | Type   | Description                                                                   |
| ---------------- | ------ | ----------------------------------------------------------------------------- |
| status           | String | Give the result of the request that it's success or not                       |
| code             | Number | Request status code. Note that this code does not related to HTTP status code |
| response.message | String | Result summary                                                                |
| response.data    | Any    | (Optional) Provide useful data for processing                                 |

### Get encoded image

Render a SFW version of an image that can be decodable

**HTTP request**

`GET /encode/:id`

**Path parameters**

| Parameter | Description     |
| --------- | --------------- |
| id        | ID of an hentai |

**Response**

Returns a 200 HTTP status code and a JSON object with the following data.

| Property      | Type   | Description                             |
| ------------- | ------ | --------------------------------------- |
| response.data | String | Base64 encoded string of **jpeg** image |

<details>
<summary>JSON</summary>

```json
{
  "status": "success",
  "code": 201,
  "response": {
    "message": "image encoded",
    "data": "data:image/jpeg;base64,<base64 data>"
}
```
</details>

### Get gallery

Get JSON format of NHentai gallery

**HTTP request**

`GET /gallery/:id`

**Path parameters**

| Parameter | Description     |
| --------- | --------------- |
| id        | ID of an hentai |

**Response**

Returns a 200 HTTP status code and a JSON object with the following data.

| Property      | Type                                       | Description             |
| ------------- | ------------------------------------------ | ----------------------- |
| response.data | [Hentai](libs/helper/src/@types/Hentai.ts) | Gallery of requested ID |

<details>
<summary>JSON</summary>

```json
{
  "status": "success",
  "code": 201,
  "response": {
    "message": "gallery obtained",
    "data": {
      "id": 153584,
      "media_id": "891754",
      "title": {
        "japanese": "[100円ロッカー] 風紀委員長のお仕事 (制服無双 放課後特別腔習編) [無修正]",
        "pretty": "Fuuki Iinchou no Oshigoto",
        "english": "[100yen locker] Fuuki Iinchou no Oshigoto (Seifuku Musou Houkago Tokubetsu Koushuu Hen) [Decensored]"
      },
      "images": {
        "cover": {
          "h": 508,
          "t": "p",
          "w": 350
        },
        "pages": [
          {
            "h": 1600,
            "t": "p",
            "w": 1102
          },
          {
            "h": 1600,
            "t": "p",
            "w": 1104
          },
          {
            "h": 1600,
            "t": "p",
            "w": 1104
          },
          {
            "h": 1600,
            "t": "p",
            "w": 1105
          }
        ]
      },
      "tags": [
        {
          "id": 6346,
          "name": "japanese",
          "type": "language"
        },
        {
          "id": 8693,
          "name": "uncensored",
          "type": "tag"
        },
        {
          "id": 10314,
          "name": "schoolgirl uniform",
          "type": "tag"
        },
        {
          "id": 13720,
          "name": "nakadashi",
          "type": "tag"
        },
        {
          "id": 20035,
          "name": "x-ray",
          "type": "tag"
        },
        {
          "id": 20905,
          "name": "full color",
          "type": "tag"
        },
        {
          "id": 25601,
          "name": "small breasts",
          "type": "tag"
        },
        {
          "id": 28521,
          "name": "voyeurism",
          "type": "tag"
        },
        {
          "id": 29513,
          "name": "100yen locker",
          "type": "artist"
        },
        {
          "id": 33173,
          "name": "manga",
          "type": "category"
        }
      ]
    }
  }
}
```
</details>

### Get related gallery

Get 5 related galleries by refering to gallery ID

**HTTP request**

`GET /related/:id`

**Path parameters**

| Parameter | Description     |
| --------- | --------------- |
| id        | ID of an hentai |

**Response**

Returns a 200 HTTP status code and a JSON object with the following data.

| Property      | Type                                        | Description                |
| ------------- | ------------------------------------------- | -------------------------- |
| response.data | [Hentai](ibs/helper/src/@types/Hentai.ts)[] | Array of related galleries |

<details>
<summary>JSON</summary>

```json
{
  "status": "success",
  "code": 201,
  "response": {
    "message": "related gallery obtained",
    "data": [
      {
        "id": 138020,
        "media_id": "829651",
        "title": {
          "japanese": "(コミティア100) [JUNKLAND2 (紙魚丸)] 浴室の異形(一) [無修正]",
          "pretty": "Yokushitsu no Igyou",
          "english": "(COMITIA100) [JUNKLAND2 (Shimimaru)] Yokushitsu no Igyou (Ichi) [Decensored]"
        },
        "images": {
          "cover": {
            "h": 497,
            "t": "j",
            "w": 350
          },
          "pages": [
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            },
            {
              "h": 1705,
              "t": "j",
              "w": 1200
            }
          ]
        },
        "tags": [
          {
            "id": 33172,
            "name": "doujinshi",
            "type": "category"
          },
          {
            "id": 6346,
            "name": "japanese",
            "type": "language"
          },
          {
            "id": 32224,
            "name": "eggs",
            "type": "tag"
          },
          {
            "id": 30083,
            "name": "shimimaru",
            "type": "artist"
          },
          {
            "id": 29224,
            "name": "impregnation",
            "type": "tag"
          },
          {
            "id": 28521,
            "name": "voyeurism",
            "type": "tag"
          },
          {
            "id": 20035,
            "name": "x-ray",
            "type": "tag"
          },
          {
            "id": 18567,
            "name": "monster",
            "type": "tag"
          },
          {
            "id": 10314,
            "name": "schoolgirl uniform",
            "type": "tag"
          },
          {
            "id": 9661,
            "name": "cervix penetration",
            "type": "tag"
          },
          {
            "id": 8693,
            "name": "uncensored",
            "type": "tag"
          },
          {
            "id": 8653,
            "name": "netorare",
            "type": "tag"
          },
          {
            "id": 8378,
            "name": "glasses",
            "type": "tag"
          },
          {
            "id": 7752,
            "name": "schoolboy uniform",
            "type": "tag"
          },
          {
            "id": 2707,
            "name": "junkland2",
            "type": "group"
          }
        ]
      },
    ]
  }
}
```
</details>



## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Frayriffy%2Frayriffy-h.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Frayriffy%2Frayriffy-h?ref=badge_large)