const request = require('request')
const StellarSdk = require('stellar-sdk')
const loadAccount = require('./_load-account.js')
const ASSET_CODE = 'HHJ'

const issuer = loadAccount('./accounts/issuer.json')
const authorizer = loadAccount('./accounts/authorization.json')
const account1 = loadAccount('./accounts/account1.json')
const account2 = loadAccount('./accounts/account2.json')

StellarSdk.Network.useTestNetwork()
StellarSdk.Config.setAllowHttp(true)
const HORIZON_SERVER = process.env.HORIZON_SERVER || 'https://horizon-testnet.stellar.org'
const server = new StellarSdk.Server(HORIZON_SERVER)
const sourceKeypair = StellarSdk.Keypair.fromSecret(authorizer.secret)

StellarSdk.Network.useTestNetwork()

const json = { hello: 'world', time: Date.now() }
const buff = Buffer.from(JSON.stringify(json), 'utf8')

server.loadAccount(sourceKeypair.publicKey())
  .then(function(account) {
    var transaction = new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.manageData({
        name: "messages",
        value: buff
      }))
      .build()

    transaction.sign(sourceKeypair)

    return server.submitTransaction(transaction)
  })
  .then(() => {
    return server.loadAccount(sourceKeypair.publicKey())
    .then(account => {
      var buff = Buffer.from(account.data_attr.messages, 'base64')
      console.log(JSON.parse(buff.toString()))
    })
  })
  .catch(function(e) {
    console.error(e)
  })
