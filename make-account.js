const StellarSdk = require('stellar-sdk')

const pair = StellarSdk.Keypair.random()

const account = {
  secret: pair.secret(),
  public: pair.publicKey()
}

console.log(JSON.stringify(account))
