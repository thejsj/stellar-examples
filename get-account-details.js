const StellarSdk = require('stellar-sdk')
const loadAccount = require('./_load-account.js')

console.log('File', process.argv[2])
if (!process.argv[2]) {
  console.log('Not found')
  return
}

const accountsFilnames = [process.argv[2]]

StellarSdk.Network.useTestNetwork()
StellarSdk.Config.setAllowHttp(true)

const HORIZON_SERVER = process.env.HORIZON_SERVER || 'https://horizon-testnet.stellar.org'
const server = new StellarSdk.Server(HORIZON_SERVER)

accountsFilnames.forEach(filename => {
  const account = loadAccount(filename)
  console.log('Account', account)

  // the JS SDK uses promises for most actions, such as retrieving an account
  server.loadAccount(account.public).then(function(accountDetails) {
    console.log('Balances for account: ' + account.public)
    accountDetails.balances.forEach(function(balance) {
      console.log(balance)
    })
  })
})
