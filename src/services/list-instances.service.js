import child_process from "node:child_process";
import util from "node:util";

const exec = util.promisify(child_process.exec);

export const listInstancesService = async (config, name = '') => {
  const command = [
    "aws ec2 describe-instances",
    "--profile", config.profile,
    "--region", config.region,
    "--query", "'Reservations[].Instances[].{Name:[Tags[?Key==`Name`].Value][0][0], InstanceID:InstanceId, LaunchTime:LaunchTime, State:State.Name, Type:InstanceType}'",
  ];

  if (name) {
    command.push("--filters", `Name=tag:Name,Values=*${name}*`);
  }

  const result = await exec(command.join(" "));

  return JSON.parse(result.stdout);
}