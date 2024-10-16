# remix-code

Remixを用いてSSRのIDで取得しているJWTのトークンをデコードするサービスです。
Remixは基本的にSSRのアプローチの建築になっています。課題解決するための考えた建築ポイントとしてはサーバーサイドででコードを行ってすぐレンダリングできるようにする仕組みです。そしてRemixのnesting routesに従ってページのレイアウトが分けられます。
発動するには下記の通りにしてください。

## Initial

First install dependencies:

```sh
npm install
```

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/server`
- `build/client`