apps/web
===

[source](apps/web)

The main website of Riffy H, built with [Gatsby](https://www.gatsbyjs.org/).

Demo: [h.rayriffy.com](https://h.rayriffy.com)

Features
---

- **Home** page that listing all galleries from nhentai
- **Listing** to add your own gallery collection to the site by add gallery id into the [file](apps/web/src/contents/database/codes.ts)
- **Custom** navigate to any ids by using this page
- **Search** search galleries on listing collection or nhentai
- List all tags from listing collection
- **Offline-ready!**

Running development locally
---

Run:

```
nx serve web
```

The webpack server will start. Collection will obtain only maximum amount of **15** galleries when `NODE_ENV` **is not in production mode**

You should now be able to browse to [http://localhost:3000](http://localhost:3000) to see the web application.

Build and deploy
---

Run:

```
nx build web
```

After build successfully executed, folder `apps/web/public` will be created which you can use it to serve via any web server.
