var StellarSdk = require('stellar-sdk')
StellarSdk.Network.useTestNetwork()
const ASSET_CODE = 'HHJ'

const loadAccount = require('./_load-account.js')
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org')

const _issuer = loadAccount('./accounts/issuer.json')
const _account = loadAccount('./accounts/account1.json')

const issuerKeys = StellarSdk.Keypair.fromSecret(_issuer.secret)
const receiving = StellarSdk.Keypair.fromSecret(_account.secret)

// Create an object to represent the new asset
const ASSET = new StellarSdk.Asset('HHJ', issuerKeys.publicKey())

// First, the receiving account must trust the asset
server.loadAccount(receiving.publicKey())
  .then(function(receiver) {
    var transaction = new StellarSdk.TransactionBuilder(receiver)
      // The `changeTrust` operation creates (or alters) a trustline
      // The `limit` parameter below is optional
      .addOperation(StellarSdk.Operation.changeTrust({
        asset: ASSET,
        // limit: '100000000'
      }))
      .build()
    transaction.sign(receiving)
    return server.submitTransaction(transaction)
  })
  .then(function() {
    return server.loadAccount(issuerKeys.publicKey())
  })
  .then(function(issuer) {
    var transaction = new StellarSdk.TransactionBuilder(issuer)
      .addOperation(StellarSdk.Operation.payment({
        destination: receiving.publicKey(),
        asset: ASSET,
        amount: '10'
      }))
      .build()
    transaction.sign(issuerKeys)
    return server.submitTransaction(transaction)
  })
  .catch(function(error) {
    console.error('Error!', error)
  })
