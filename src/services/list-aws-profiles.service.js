import child_process from "node:child_process";
import util from "node:util";

const exec = util.promisify(child_process.exec);

export const listAwsProfilesService = async () => {
  const result = await exec("aws configure list-profiles");
  const profiles = result.stdout.split("\n").filter(Boolean);

  return profiles;
}