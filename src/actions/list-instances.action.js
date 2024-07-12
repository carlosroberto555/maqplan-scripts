import { ConfigUtil } from "../utils/config.util.js";
import { listInstancesService } from "../services/list-instances.service.js";
import { loader } from "../prompts/loader.prompt.js";

export const listInstancesAction = async (options) => {
  const { env, name, ...defaults } = options;

  try {
    const config = await ConfigUtil.getConfig(env, defaults);
    const instances = await loader("Loading instances...", async () => {
      return listInstancesService(config);
    });
  
    console.log(instances);
  } catch (error) {
    console.error(error.message);
  }
}