const request = require('request')
const StellarSdk = require('stellar-sdk')
const loadAccount = require('./_load-account.js')
const ASSET_CODE = 'HHJ'

const issuer = loadAccount('./accounts/issuer.json')
const account1 = loadAccount('./accounts/account1.json')
const account2 = loadAccount('./accounts/account2.json')

StellarSdk.Network.useTestNetwork()
StellarSdk.Config.setAllowHttp(true)
const HORIZON_SERVER = process.env.HORIZON_SERVER || 'https://horizon-testnet.stellar.org'
const server = new StellarSdk.Server(HORIZON_SERVER)
const sourceKeypair = StellarSdk.Keypair.fromSecret(account1.secret)

StellarSdk.Network.useTestNetwork();

server.loadAccount(sourceKeypair.publicKey())
  .then(function(account) {
    const asset = new StellarSdk.Asset(ASSET_CODE, issuer.public)
    var transaction = new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.payment({
        destination: account2.public,
        asset,
        amount: '1'
      }))
      .build()

    transaction.sign(sourceKeypair)

    return server.submitTransaction(transaction)
      .then(function(transactionResult) {
        console.log(JSON.stringify(transactionResult, null, 2))
        console.log('\nSuccess! View the transaction at: ')
        console.log(transactionResult._links.transaction.href)
      })
      .catch(function(err) {
        console.log('An error has occured:')
        console.log(err)
        console.log(err.data.extras.result_codes)
      });
  })
  .catch(function(e) {
    console.error(e)
  })
