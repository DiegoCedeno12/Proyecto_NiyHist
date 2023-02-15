import fs from 'fs';
import QRCode from "qrcode";

export const urlCv = '';
const run = async()=>{
    const QR = await QRCode.toDataURL(urlCv)
    const imagen = `
    <img src="${QR}">`
    fs.writeFileSync('./index.html', imagen)
} 