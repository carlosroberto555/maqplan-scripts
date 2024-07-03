import { spawn } from "node:child_process";

import { Utils } from "../utils/utils.config.js";
import { ec2InstanceAsks } from "../asks/ec2-instance.asks.js";

export const proxyDatabaseAction = async (options) => {
  const { env, ...defaults } = options;
  const config = await Utils.getConfig(env, defaults);

  if (!options.instance) {
    const result = await ec2InstanceAsks(config);
    config.instance = result.instance;
  }

  const params = [
    "ssm", "start-session",
    "--region", config.region,
    "--profile", config.profile,
    "--target", config.instance,
    "--document-name", "AWS-StartPortForwardingSessionToRemoteHost",
    "--parameters", `host="${config.database.host}",portNumber="${config.database.remotePort}",localPortNumber="${config.database.localPort}"`,
  ];

  spawn("aws", params, { stdio: "inherit" });
}