import CryptoJS from 'crypto-js'
const encrypt = (text) => {
  const passphrase = 'EatsOnline2020'
  return CryptoJS.AES.encrypt(text, passphrase).toString()
}
const decrypt = (text) => {
  const passphrase = 'EatsOnline2020'
  var bytes = CryptoJS.AES.decrypt(text, passphrase)
  return bytes.toString(CryptoJS.enc.Utf8)
}
const decryptJSON = (text) => {
  const passphrase = 'EatsOnline2020'
  var bytes = CryptoJS.AES.decrypt(text, passphrase)

  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}
const encryptJSON = (text) => {
  const passphrase = 'EatsOnline2020'

  return {
    data: CryptoJS.AES.encrypt(JSON.stringify(text), passphrase).toString(),
  }
}

export { encrypt, decrypt, decryptJSON, encryptJSON }
