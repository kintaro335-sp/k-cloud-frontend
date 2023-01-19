export const BLOB_SIZE = 10485760;

/**
 * condificar blob a base64
 * @param {string} blob texto a convertir
 * @returns {string} texto en base64
 */
export function parseBase64(blob: string) {
  return btoa(blob);
}

/**
 * obtener el base64 de un archivo
 * @param {File} file un objeto File
 * @returns {string} base64 del archivo
 */
export async function getBase64File(file: Blob): Promise<string | undefined> {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = (e) => {
      resolve(e.target?.result?.toString());
    };
  });
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
