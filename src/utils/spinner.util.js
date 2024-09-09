
import path from 'node:path';
import { createRequire } from 'node:module';

import colors from 'yoctocolors';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const require = createRequire(import.meta.url);
const spinners = require(path.normalize(path.join(__dirname, '../../node_modules/cli-spinners/spinners.json')));

export class Spinner {
  #spinner;
  #index;
  #interval;

  /**
   * @param {import('cli-spinners').SpinnerName} spinner 
   */
  constructor(spinner) {
    this.#spinner = spinners[spinner];
    this.#index = 0;
  }

  #next() {
    this.#index = this.#nextIndex();
    return this.#getFrame();
  }

  #nextIndex() {
    return (this.#index + 1) % this.#spinner.frames.length;
  }

  #getFrame() {
    return this.#spinner.frames[this.#index % this.#spinner.frames.length];
  }

  start(message = 'Loading...') {
    this.#interval = setInterval(() => {
      process.stdout.write(`\r${colors.yellow(this.#next())} ${message}`);
    }, this.#spinner.interval);
  }

  stop() {
    clearInterval(this.#interval);
    process.stdout.write('\r' + ' '.repeat(process.stdout.columns) + '\r');
  }
}