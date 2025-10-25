const SECRET_KEY = process.env.SECRET_KEY;

const Cookies = require("js-cookie");
const CryptoJS = require("crypto-js");
const AES = require("crypto-js/aes");

export const navigateWithParam = (url: string) => {
  const encryptedUser = Cookies.get("user");
  if (encryptedUser) {
    const bytes = CryptoJS.AES.decrypt(encryptedUser, SECRET_KEY);
    const decryptedUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const username = decryptedUser.userName;
    const user = AES.encrypt(JSON.stringify(username), SECRET_KEY).toString();
    const encoded = encodeURIComponent(user);
    const urlWithParam = `${url}?user=${encoded}`;
    return urlWithParam;
  } else {
    return url;
  }
};


