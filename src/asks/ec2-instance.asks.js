import { select } from "@inquirer/prompts";

import { loader } from "../prompts/loader.prompt.js";
import { listInstancesService } from "../services/list-instances.service.js";

export const ec2InstanceAsks = async (config) => {
  const instances = await loader("Loading instances...", async () => {
    return listInstancesService(config);
  });

  const instance = await select({
    message: "Select an EC2 instance you want to connect to:",
    choices: instances.map(instance => ({
      name: `${instance.InstanceID} (${instance.Name})`,
      value: instance.InstanceID
    })),
  });

  return {
    instance,
  };
}