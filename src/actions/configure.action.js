import { configureAsks } from "../asks/configure.asks.js"
import { ConfigUtil } from "../utils/config.util.js";

export const configureAction = async () => {
  const options = await configureAsks();

  await ConfigUtil.writeConfig(options);

  console.log(`\nConfiguration '${options.name}' saved!`);
}