# X API console

A local console for the X API, also called the Twitter API v2. You paste your own keys, pick a route, and send the call from your browser. The keys stay on your machine. This is not an official X product.

The page includes the X API routes published on 28 September 2026, plus a custom request box for any other path on `api.x.com`.

Short page: https://ankshvayt.github.io/x-api-console/

## What is the X API console?

It is one HTML file and a small Node program. Node serves the page on your computer and forwards each call to X. The browser cannot call `api.x.com` by itself, so that forwarder is required.

You can call posts, users, follows, likes, bookmarks, lists, direct messages, Spaces, trends, media upload, streams, webhooks, communities, Community Notes, news, articles, chat, compliance, and usage.

## How do I run it?

You need Node.js 18 or newer. There are no packages to install.

```bash
git clone https://github.com/ankshvayt/x-api-console.git
cd x-api-console
node start.js
```

Open http://127.0.0.1:8787

If that port is busy:

```bash
PORT=8790 node start.js
```

Open the address printed in the terminal. `npm start` does the same thing.

## How do I add my X API keys?

Click **Credentials**.

- App bearer token, for public reads.
- OAuth 1.0a: API key, API key secret, access token, access token secret.
- OAuth 2 user token. Paste one, or use **Connect**.

**Connect** needs an OAuth 2 client id in your X app. Set the redirect URI to the value shown in Credentials. On the default port that is:

```text
http://127.0.0.1:8787/oauth/callback
```

If you changed the port, use that port in the redirect URI. Add a client secret only if the app is a confidential client.

X keys are saved in `localStorage` for that exact address. They are not in this repo. Opening the HTML file directly does not work for API calls, and keys saved on a `file://` tab do not show up on localhost.

## What can I do after I am signed in?

**Who am I** calls `GET /2/users/me`. You can type `{{me}}` in a user id field.

**Upload** sends a file through the chunked media endpoints, then you can attach the media id to a new post.

**Custom request** sends any other `api.x.com` path.

Deletes ask you to confirm before they are sent. X bills pay-per-use calls on your developer account. Some routes need an enterprise plan and return 403 on a normal key.

## What is Ask?

**Ask** uses [Jev](https://www.typesafe.ai/) to pick a route and fill fields that already have a fixed list of values, such as `post.fields`. You still press Send. Jev does not write the post or the search text. If it is unsure, it shows the closest routes and leaves the form alone.

The sidebar does the same when a search has no text match.

Before a post, delete, or direct message, Jev can add a specific confirm. After a failed call, it adds one line about what kind of failure it looks like.

Open **Credentials**, paste your TypeSafe key, and press **Save key**. The bridge writes it to `.jev-key` in this folder. That file is gitignored. The browser does not keep the key, and the key is not sent to X.

You can also start it with a key in the environment:

```bash
TYPESAFE_API_KEY=your-key node start.js
```

**Forget** removes `.jev-key`. It does not unset `TYPESAFE_API_KEY`.

## Why does it need a local bridge?

A browser page on another site cannot call `api.x.com`. `start.js` listens on `127.0.0.1` only, and it only forwards to:

- `api.x.com`
- `api.twitter.com`
- `upload.twitter.com`

## FAQ

### Is this the official X or Twitter API console?

No. It is an independent local tool. X sells API access separately, and this repo does not include a key.

### Does the repo contain my API keys?

No. X keys stay in the browser for `http://127.0.0.1:8787`. A TypeSafe key you save is written to `.jev-key`, which git ignores.

### Can I post, delete, and send direct messages?

Yes, with a user token (OAuth 2 or OAuth 1.0a). The page asks you to confirm deletes. A bearer token is enough for many public reads.

### Which X API version does it call?

X API v2, on `api.x.com`. Media upload also uses the v2 chunked upload routes. The old name for this API is the Twitter API v2.

## License

MIT. See [LICENSE](LICENSE).
