# todo
TypeScript + React + Amplify
[![CircleCI](https://circleci.com/gh/amaingot/todo.svg?style=svg)](https://circleci.com/gh/amaingot/todo)

## Getting started

### VS Code <3
This project has a `.vscode/settings.json` file in it. This allows for some already customized experiences to happen right when you load it. I highly recommend that you also install the following VS Code Extensions: Jest (orta.vscode-jest) and TSLint. Things just work great. 

### Normal getting started stuff

1. Install all the dependencies `npm i`
2. Run the app `npm run start`
3. Open a browser and visit https://todo.maingot.us?env=localhost

If you've gotten this far, you've probably run into an error. Something along the lines of "Unsecured Assets" 

### Serving local dev assets via HTTPS

When running this application locally, assets are served via HTTPS. This allows you to do testing from https://todo.maingot.us?env=localhost  First generate your certs (see command below). Then add them to your keychain as a trusted source.

```
mkdir certs && openssl req -x509 -out certs/localhost.crt -keyout certs/localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

