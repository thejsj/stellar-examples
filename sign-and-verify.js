const StellarSdk = require('stellar-sdk')
const loadAccount = require('./_load-account.js')
const ASSET_CODE = 'HHJ'

const issuer = loadAccount('./accounts/issuer.json')
const authorizer = loadAccount('./accounts/authorization.json')
const account1 = loadAccount('./accounts/account1.json')
const account2 = loadAccount('./accounts/account2.json')

const account2Keys = StellarSdk.Keypair.fromSecret(account2.secret)
const account2KeysPublic = StellarSdk.Keypair.fromPublicKey(account2.public)

const buff = Buffer.from('this is a tést')
const signedBuff = account2Keys.sign(buff)

const valid = account2KeysPublic.verify(buff, signedBuff)
console.log(valid)
