# Spotisync Server

Server for spotisync.

## Developing locally

To run this server on local:

1. Clone this repository and navigate inside it.

```
git clone https://github.com/harshit-budhraja/spotisync-server.git
cd spotisync-server/
```

2. Install package dependencies using npm - `npm install`
3. Copy the config file at the location - `config/dev.json`
4. Start the server.

```
export NODE_ENV=dev
node src/app.js
```
