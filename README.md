# Stellar Tests

Some quick experiments with the basics of Stellar.

## Creating Keys

The first step is creating some keys in order to be able to create accounts in the network.

```
node make-account.js > accounts/authorization.json
node make-account.js > accounts/issuer.json
node make-account.js > accounts/account1.json
node make-account.js > accounts/account2.json
```

**Result:**

This script outputs a JSON string to STDOUT that looks as follows: 

```
{"secret":"SBNCL2SCKHUT5GSWCURDQIG5GCOKV5DWAALHP6KJW6YUF2SBVW2AXES2","public":"GBY47U7ZQIUSURT2I3SDTCKQASMELZD3H7OXRHXJYMBLIC2623MXDWQS"}
```

## Creating Accounts with friendbot and assigning funds

Now that we've created some keys, we can now give these accounts some stellar lumens on the testnet.

```
node assign-funds.js accounts/authorization.json
node assign-funds.js accounts/issuer.json
node assign-funds.js accounts/account1.json
node assign-funds.js accounts/account2.json
```

After this all accounts will be funded with 10000 stellar lumens on the testnet.

**Result:**

```
File accounts/account3.json
SUCCESS! You have a new account :)
 { _links:
   { transaction:
      { href: 'https://horizon-testnet.stellar.org/transactions/09e5d80244497f0ee38c0cb0a586a9b24b0b42f229aaa49b77fd1d04b8c94cc6' } },
  hash: '09e5d80244497f0ee38c0cb0a586a9b24b0b42f229aaa49b77fd1d04b8c94cc6',
  ledger: 6585694,
  envelope_xdr: 'AAAAAGXNhLrhGtltTwCpmqlarh7s1DB2hIkbP//jgzn4Fos/AAAAZAAACT0AAPQLAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAA2gY+qTAAeVhlgsE9X5qQLFb1K2t4TlbLcxHZHftvs+cAAAAXSHboAAAAAAAAAAAB+BaLPwAAAEA8WgsLoyczZPUXETklxqpRqdsxaDutitTXQANYNwOTJpCvFql8mv406sKpJdcQOCJwldGU8h7lr4rfCCEX0pMM',
  result_xdr: 'AAAAAAAAAGQAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAA=',
  result_meta_xdr: 'AAAAAAAAAAEAAAADAAAAAABkfV4AAAAAAAAAANoGPqkwAHlYZYLBPV+akCxW9StreE5Wy3MR2R37b7PnAAAAF0h26AAAZH1eAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAwBkfV4AAAAAAAAAAGXNhLrhGtltTwCpmqlarh7s1DB2hIkbP//jgzn4Fos/AAKq/1kUhxQAAAk9AAD0CwAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAQBkfV4AAAAAAAAAAGXNhLrhGtltTwCpmqlarh7s1DB2hIkbP//jgzn4Fos/AAKq6BCdnxQAAAk9AAD0CwAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAA' }
```

## Checking Account Balance

You can use the following script to check account balance

```
node get-account-details.js accounts/account1.json
```

**Result:**

```
File accounts/account1.json
Account { secret: '****',
  public: 'GDBWYOUPDDLHLP6XSXSU47MVE5Y667UDPXJFCH5HJKMFGAYBMDRCU4HM' }
Balances for account: GDBWYOUPDDLHLP6XSXSU47MVE5Y667UDPXJFCH5HJKMFGAYBMDRCU4HM
{ balance: '10000.0000000', asset_type: 'native' }
```

## Make Payment Using Your Lumens

This script will make a payment from `account1.json` to `account2.json` in stellar lumens.

```
node move-funds.js
```

## Issuing New Assets

One of the most interesting parts of Stellar is issuing your own assets.

In order to issue a new asset run:

```
node issue-assets.js
```

This will create a new asset under the `issuer.json` account and make a payment to `account1.json`

## Make Payment Using Your Custom Asset

This script will make a payment from `account1.json` to `account2.json` in our new custom asset.

```
node make-payment.js
```

## See Total Amount Issued for Custom Asset

Now you might want to know how much of your asset has been issue. For that, you can use the following script:

```
node get-assets.js
```

**Result:**

```
{ _links: { toml: { href: '' } },
  asset_type: 'credit_alphanum4',
  asset_code: 'HHJ',
  asset_issuer: 'GCGW76TJ22KPAGYA7QCOBKMS5N2KOZVF5YYRXEN4UQ7EFH4EEXZVQOUU',
  paging_token: 'HHJ_GCGW76TJ22KPAGYA7QCOBKMS5N2KOZVF5YYRXEN4UQ7EFH4EEXZVQOUU_credit_alphanum4',
  amount: '60.0000000',
  num_accounts: 2,
  flags: { auth_required: false, auth_revocable: false },
  toml: [Function] }
--- txs ----
{ records:
   [ { _links: [Object],
...
```
