import { ConfigUtil } from "../utils/config.util.js";
import { listInstancesService } from "../services/list-instances.service.js";

export const listInstancesAction = async (options) => {
  const { env, name, ...defaults } = options;

  const config = await ConfigUtil.getConfig(env, defaults);
  const instances = await listInstancesService(config, name);

  console.log(instances);
}