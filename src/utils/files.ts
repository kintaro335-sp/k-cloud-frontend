import { encode } from 'base-64';
export const BLOB_SIZE = 1048576 * 60;
import Numeral from 'numeral';

/**
 * obtener el base64 de un archivo
 * @param {File} file un objeto File
 * @returns {string} base64 del archivo
 */
export async function getBase64File(file: Blob): Promise<string | undefined> {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  return new Promise((resolve, reject) => {
    reader.onload = (e) => {
      const rawBuffer = e.target?.result;
      if (rawBuffer instanceof ArrayBuffer) {
        //@ts-ignore
        const decoder = new TextDecoder();
        const text = decoder.decode(rawBuffer);
        const finalText = encodeURI(text);
        const base64 = encode(finalText);
        resolve(base64);
      }
    };
  });
}

export function bytesFormat(bytes: number) {
  return Numeral(bytes).format('0.0 ib');
}

export function getBestSize(size: number) {
  if (size < BLOB_SIZE) {
    return size;
  }
  return size;
}

export function getNumberBlobs(size: number) {
  if (size < BLOB_SIZE) {
    return 1;
  }
  var blobNum = 1;
  while (true) {
    if (blobNum * BLOB_SIZE > size) {
      return blobNum;
    }
    blobNum++;
  }
}
