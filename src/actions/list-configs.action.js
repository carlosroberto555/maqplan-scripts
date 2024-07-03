import { ConfigUtil } from "../utils/config.util.js";

function formatLine(config, greaterNameLength) {
  return `${config.name.padEnd(greaterNameLength, ' ')} (profile: ${config.profile})`;
}

function formatLines(configs) {
  const greaterNameLength = Math.max(...configs.map(config => config.name.length));

  return configs.map(config => formatLine(config, greaterNameLength)).join('\n');
}

export const listConfigsAction = async (options) => {
  try {
    const configs = await ConfigUtil.getAllConfigs();
    const configsArray = Object.values(configs);
  
    console.log(formatLines(configsArray));
  } catch (error) {
    console.error(error.message);
  }
}