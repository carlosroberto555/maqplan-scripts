import { configureAsks } from "../asks/configure.asks.js"
import { Utils } from "../utils/utils.config.js";

export const configureAction = async () => {
  const options = await configureAsks();

  await Utils.writeConfig(options);

  console.log(`\nConfiguration '${options.name}' saved!`);
}