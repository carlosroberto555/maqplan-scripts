import { spawn } from 'node:child_process';
import { Utils } from '../utils/utils.config.js';

export const sshAction = async (options) => {
    const { env, ...defaults } = options;
    const config = await Utils.getConfig(env, defaults);

    console.log("SSH session into: %s (profile: %s)", config.instance, config.profile);

    spawn("aws", ["ssm", "start-session", "--region", config.region, "--profile", config.profile, "--target", config.instance], { stdio: "inherit" });
}
