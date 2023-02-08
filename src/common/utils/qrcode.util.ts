import QRCode from 'qrcode';

export const generateQR = (data: string) => {
  let url: string;
  QRCode.toDataURL(data)
    .then((dataUrl: string) => {
      url = dataUrl;
      return url;
    })
    .catch((err) => {
      console.error(err);
    });
};
