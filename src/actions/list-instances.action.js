import { Utils } from "../utils/utils.config.js";
import { listInstancesService } from "../services/list-instances.service.js";

export const listInstancesAction = async (options) => {
  const { env, name, ...defaults } = options;

  const config = await Utils.getConfig(env, defaults);
  const instances = await listInstancesService(config, name);

  console.log(instances);
}