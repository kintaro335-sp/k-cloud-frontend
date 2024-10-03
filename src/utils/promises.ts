/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

export async function timeOutIf(timems: number, evaluate: () => boolean): Promise<void> {
  return new Promise((resolve) => {
    if (evaluate()) {
      setTimeout(() => {
        resolve();
      }, timems);
    } else {
      resolve();
    }
  });
}
