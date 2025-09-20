const CryptoJS = require('crypto-js');

// Deben coincidir EXACTAMENTE con los usados en Flutter
const key = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16 bytes
const iv = CryptoJS.enc.Utf8.parse('abcdefghijklmnop');  // 16 bytes

function desencriptarDNI(dniEncriptadoBase64) {
  try {
    const decrypted = CryptoJS.AES.decrypt(dniEncriptadoBase64, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    const resultado = decrypted.toString(CryptoJS.enc.Utf8);

    console.log("🔓 Desencriptado:", resultado || '[vacío]');
    return resultado;
  } catch (error) {
    console.error("❌ Error al desencriptar:", error.message);
    return null;
  }
}

// TEST: desde Flutter
const textoEncriptado = '537SA9AF4G1m7ql7ita7DA=='; // <-- Este viene de Flutter

desencriptarDNI(textoEncriptado);
