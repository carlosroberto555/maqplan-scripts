import path from 'node:path';
import fs from 'node:fs/promises';

const CONFIG_PATH = path.resolve(process.env.HOME, '.maqplan');
const CONFIG_FILE = path.resolve(CONFIG_PATH, 'config.json');
const AWS_CREDENTIALS_PATH = path.resolve(process.env.HOME, '.aws/credentials');

/**
 * @typedef {{ host: string, localPort: number, remotePort: number }} DatabaseConfig
 * @typedef {{ profile: string, region: string, name: string, instanceName: string, instance: string, database?: DatabaseConfig }} Config
 */

export class ConfigUtil {
  /**
   * @returns {Promise<Config[]>}
   */
  static async getAllConfigs(throwError = true) {
    try {
      await fs.mkdir(CONFIG_PATH, { recursive: true });
    } catch (error) {
      console.error(error);
    }

    try {
      const config = await fs.readFile(CONFIG_FILE, 'utf-8');
      return JSON.parse(config) || {};
    } catch (error) {
      if (throwError) {
        console.error('There is no config file.\nPlease run `maqplan configure` to create one.');
        process.exit(1);
      }
    }

    return {};
  }

  /**
   * @param {Config['name']} env 
   * @param {Config} defaults 
   * @returns {Promise<Config>}
   */
  static async getConfig(env, defaults = {}) {
    const configs = await ConfigUtil.getAllConfigs();

    return {
      ...configs[env],
      ...defaults
    };
  }

  static async writeConfig(config) {
    if (!config.name) {
      config.name = 'default';
    }

    const configs = await ConfigUtil.getAllConfigs(false);
    configs[config.name] = config;
    
    await fs.writeFile(CONFIG_FILE, JSON.stringify(configs, null, 2));
  }

  static async getAwsProfiles() {
    const awsProfiles = await fs.readFile(AWS_CREDENTIALS_PATH, "utf8");
    const profiles = awsProfiles.match(/\[(.*?)\]/g);
    return profiles.map(profile => profile.replace("[", "").replace("]", ""));
  }
}