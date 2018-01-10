const StellarSdk = require('stellar-sdk')
const loadAccount = require('./_load-account.js')

StellarSdk.Network.useTestNetwork()
StellarSdk.Config.setAllowHttp(true)

const HORIZON_SERVER = process.env.HORIZON_SERVER || 'https://horizon-testnet.stellar.org'
const server = new StellarSdk.Server(HORIZON_SERVER)

const issuer = loadAccount('./accounts/issuer.json')

// the JS SDK uses promises for most actions, such as retrieving an account
server.assets()
  .forCode('HHJ')
  .forIssuer(issuer.public)
  .call()
  .then(assets => {
    const asset = assets.records[0]
    console.log(asset)
    return server.transactions()
      .forAccount(issuer.public)
      .call()
  })
  .then(txs => {
    console.log('--- txs ----')
    console.log(txs)
    console.log('--- effects ----')
    return txs.records[1].operations()
      .then(e => console.log(e, e._embedded.records))
    // var tx = txs.records[1]
    // var buf = Buffer.from(tx.envelope_xdr, 'base64')
    // var buf2 = Buffer.from(tx.result_xdr, 'base64')
    // var buf3 = Buffer.from(tx.result_meta_xdr, 'base64')
    // console.log('--- xdr ----')
    // console.log(buf.toString())
    // console.log(buf2.toString())
    // console.log(buf3.toString())
  })

