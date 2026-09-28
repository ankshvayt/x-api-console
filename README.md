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

## The bridge

A browser page cannot call `api.x.com` on its own. `start.js` serves this page and forwards each call. It listens on `127.0.0.1` only, and it only forwards to:

- `api.x.com`
- `api.twitter.com`
- `upload.twitter.com`

## License

MIT. See [LICENSE](LICENSE).
