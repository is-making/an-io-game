# an .io game
> *gasp*

[![Join the chat at https://gitter.im/is-making/an-io-game](https://badges.gitter.im/is-making/an-io-game.svg)](https://gitter.im/is-making/an-io-game?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
## Setup
Install (if you don't have them):
- [Node.js 6](https://nodejs.org/)
- [Brunch](http://brunch.io/): `npm install -g brunch`

```sh
git clone https://github.com/is-making/an-io-game.git
npm install
```

## Building, server, _et cetera_

`public/` is auto-generated and served by Brunch. Write code in `app/`.  
Place static files you want to be copied from `app/assets/` to `public/`.

```
brunch build
brunch build --production # builds minified project for production 
brunch watch --server     # watches the project with continuous rebuild & start server
```

Then visit [localhost:3333](http://localhost:3333) in your favourite browser*. **Warning**: I haven't yet figured out how to get Brunch to reload the server file - so you'll have to restart the command if you're modifying the server code.

<small>* `if ans == 'IE' {` visit an insane asylum and leave the internet in peace `}`, thanks</small>