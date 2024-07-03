import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * @typedef {{ host: string, localPort: number, remotePort: number }} DatabaseConfig
 * @typedef {{ profile: string, region: string, name: string, instanceName: string, instance: string, database?: DatabaseConfig }} Config
 */

export class Utils {
  /**
   * @returns {Promise<Config[]>}
   */
  static async getAllConfigs() {
    const config = await fs.readFile(`${__dirname}../../.config.json`, 'utf-8');
    return JSON.parse(config) || {};
  }

  /**
   * @param {Config['name']} env 
   * @param {Config} defaults 
   * @returns {Promise<Config>}
   */
  static async getConfig(env, defaults = {}) {
    const configs = await Utils.getAllConfigs();

    return {
      ...configs[env],
      ...defaults
    };
  }

  static async writeConfig(config) {
    if (!config.name) {
      config.name = 'default';
    }

    const configs = await Utils.getAllConfigs();
    configs[config.name] = config;
    
    await fs.writeFile(`${__dirname}../../.config.json`, JSON.stringify(configs, null, 2));
  }

  static async getAwsProfiles() {
    const awsProfiles = await fs.readFile(`${process.env.HOME}/.aws/credentials`, "utf8");
    const profiles = awsProfiles.match(/\[(.*?)\]/g);
    return profiles.map(profile => profile.replace("[", "").replace("]", ""));
  }
}