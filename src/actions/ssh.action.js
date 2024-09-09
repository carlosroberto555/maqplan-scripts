import { spawn } from 'node:child_process';

import { ConfigUtil } from '../utils/config.util.js';
import { ec2InstanceAsks } from '../asks/ec2-instance.asks.js';

export const sshAction = async (options) => {
  const { env, ...defaults } = options;

  try {
    const config = await ConfigUtil.getConfig(env, defaults);
  
    if (!options.instance) {
      const result = await ec2InstanceAsks(config);
      config.instance = result.instance;
    }

    const params = [
      'ssm', 'start-session',
      '--region', config.region,
      '--profile', config.profile,
      '--target', config.instance,
      '--document-name', 'AWS-StartInteractiveCommand',
      '--parameters', '{"command": ["cd $HOME && bash -l"]}'
    ];
  
    process.stdin.setRawMode(true);
    spawn("aws", params, { stdio: "inherit" });
  } catch (error) {
    console.error(error.message);
  }
}
