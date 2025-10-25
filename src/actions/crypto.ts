import CryptoES from "crypto-es";

const SECRET_KEY = process.env.SECRET_KEY;

export const encrypt = (value: any, secret: string) => {
   return CryptoES.AES.encrypt(JSON.stringify(value), secret).toString();
};

export const decrypt = (value: any, secret: string) => {
  if (value === undefined) return null;
  const bytes = CryptoES.AES.decrypt(value, secret);
  return JSON.parse(bytes.toString(CryptoES.enc.Utf8));
};
