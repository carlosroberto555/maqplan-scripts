import { input, select } from "@inquirer/prompts";
import { Utils } from "../utils/utils.config.js";

export const awsProfileAsks = async () => {
  const config = {};
  const profiles = await Utils.getAwsProfiles();

  config.profile = await select({
    message: "What the AWS profile?",
    choices: profiles.map(profile => ({ name: profile, value: profile })),
  });

  config.region = await input({
    message: "What the AWS region?",
    default: "us-east-1",
  });

  return config;
}