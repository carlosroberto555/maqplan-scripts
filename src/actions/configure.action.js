import { configureAsks } from "../asks/configure.asks.js"
import { ConfigUtil } from "../utils/config.util.js";

export const configureAction = async () => {
  try {
    const options = await configureAsks();
    await ConfigUtil.writeConfig(options);

    console.log(`\nConfiguration '${options.name}' saved!`);
  } catch (error) {
    console.error(error.message);
  }
}