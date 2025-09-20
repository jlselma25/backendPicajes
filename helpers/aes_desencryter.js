const CryptoJS = require('crypto-js');

const key = CryptoJS.enc.Utf8.parse('1234567890123456');
const iv = CryptoJS.enc.Utf8.parse('abcdefghijklmnop');



function desencriptarDNI(dniEncriptadoBase64) {
  try {
    const decrypted = CryptoJS.AES.decrypt(dniEncriptadoBase64, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    const resultado = decrypted.toString(CryptoJS.enc.Utf8);
   
    return resultado;
  } catch (error) {
    console.error("❌ Error al desencriptar:", error.message);
    return null;
  }
}

module.exports = { desencriptarDNI };



