import { Spinner } from "../utils/spinner.util.js";

export const loader = (message = 'Loading...', callback) => {
  const spinner = new Spinner('dots');
  spinner.start(message);

  if (callback) {
    const promise = callback();
    
    if (!promise?.then) {
      throw new Error('Callback must return a promise');
    }

    return promise.then((result) => result).finally(() => spinner.stop());
  }

  return () => spinner.stop();
};