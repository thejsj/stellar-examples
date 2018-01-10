const fs = require('fs')

module.exports = function (fileName) {
  const accountJSON = fs.readFileSync(fileName)
  const account = JSON.parse(accountJSON.toString())
  return account
}

