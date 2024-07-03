import { input, select } from "@inquirer/prompts";
import { ConfigUtil } from "../utils/config.util.js";

export const awsProfileAsks = async () => {
  const config = {};
  const profiles = await ConfigUtil.getAwsProfiles();

  config.profile = await select({
    message: "What the AWS profile?",
    choices: profiles.map(profile => ({ name: profile, value: profile })),
    default: "default",
  });

  config.region = await input({
    message: "What the AWS region?",
    default: "us-east-1",
  });

  return config;
}