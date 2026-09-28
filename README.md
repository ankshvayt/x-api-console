# X API console

A local page for calling the X API with your own keys. The keys stay in your browser. This is not an official X product.

The page includes the X API routes from the docs as of 28 September 2026, plus a custom request box for any other path.

## Run

You need Node.js 18 or newer.

```bash
node start.js
```

Open http://127.0.0.1:8787

If that port is busy:

```bash
PORT=8790 node start.js
```

Open the address printed in the terminal.

`npm start` does the same thing. There are no dependencies to install.

## Keys

Click **Credentials**.

- App bearer token, for public reads.
- OAuth 1.0a: API key, API key secret, access token, access token secret.
- OAuth 2 user token. Paste one, or use **Connect**.

**Connect** needs an OAuth 2 client id in your X app. Set the redirect URI to the value shown in Credentials. On the default port that is:

```text
http://127.0.0.1:8787/oauth/callback
```

If you changed the port, use that port in the redirect URI. Add a client secret only if the app is a confidential client.

The page saves keys in `localStorage` for that exact address. They are not in this repo. Do not commit a copy of the page after you have typed keys into it. Opening the HTML file directly does not work for API calls, and keys saved on a `file://` tab do not show up on localhost.

## What you can call

Posts, users, follows, likes, bookmarks, lists, direct messages, Spaces, trends, media upload, streams, webhooks, communities, Community Notes, news, articles, chat, compliance, and usage. **Custom request** is there for a path that is not in the list.

**Who am I** calls `GET /2/users/me`. You can type `{{me}}` in a user id field.

**Upload** sends a file through the chunked media endpoints, then you can attach the media id to a new post.

Deletes ask you to confirm before they are sent. X bills pay-per-use calls on your developer account. Some routes need an enterprise plan and return 403 on a normal key.

## Ask

The **Ask** box uses [Jev](https://www.typesafe.ai/) to pick a route and fill fields that already have a fixed list of values, such as `post.fields`. You still press Send.

Jev does not write the post or the search text. It chooses from the routes and fields in the page. If it is unsure, it shows the closest routes and leaves the form alone.

The sidebar does the same when a search has no text match.

Before a post, delete, or direct message, Jev can add a specific confirm. After a failed call, it adds one line about what kind of failure it looks like.

After you clone, run `node start.js` and open the page. Open **Credentials**, paste your TypeSafe key, and press **Save key**. The bridge writes it to `.jev-key` in this folder. That file is gitignored. The browser does not keep the key, and the key is not sent to X.

You can also start it with a key in the environment:

```bash
TYPESAFE_API_KEY=your-key node start.js
```

**Forget** removes `.jev-key`. It does not unset `TYPESAFE_API_KEY`.

## The bridge

A browser page cannot call `api.x.com` on its own. `start.js` serves this page and forwards each call. It listens on `127.0.0.1` only, and it only forwards to:

- `api.x.com`
- `api.twitter.com`
- `upload.twitter.com`

## License

MIT. See [LICENSE](LICENSE).
