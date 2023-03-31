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
