const StellarSdk = require('stellar-sdk')
const loadAccount = require('./_load-account.js')

const request = require('request')

console.log('File', process.argv[2])
if (!process.argv[2]) {
  console.log('Not found')
  return
}

const account = loadAccount(process.argv[2])
const HORIZON_SERVER = process.env.HORIZON_SERVER || 'https://horizon-testnet.stellar.org'

request.get({
  url: `${HORIZON_SERVER}/friendbot`,
  qs: { addr: account.public },
  json: true
}, function (error, response, body) {
  if (error || response.statusCode !== 200) {
    console.error('ERROR!', error || body);
    console.error()
    return
  }
  console.log('SUCCESS! You have a new account :)\n', body);
});
