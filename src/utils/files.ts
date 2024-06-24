export const BLOB_SIZE = 1048576 * 100;
import Numeral from 'numeral';

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
