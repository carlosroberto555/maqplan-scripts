import { Command } from "commander";
import { createRequire } from "node:module";
// import pkg from "../package.json" with { type: "json" };

import { sshAction } from "./actions/ssh.action.js";
import { configureAction } from "./actions/configure.action.js";
import { listInstancesAction } from "./actions/list-instances.action.js";
import { proxyDatabaseAction } from "./actions/proxy-database.action.js";
import { listConfigsAction } from "./actions/list-configs.action.js";

const require = createRequire(import.meta.url);
const program = new Command();
const pkg = require("../package.json");

program
  .option("--profile <string>", "The name of AWS Profile")
  .option("--region <string>", "The region on AWS")
  .enablePositionalOptions(true);

program
  .name("maqplan-scripts")
  .description(pkg.description)
  .version(pkg.version, "-v, --version");

program
  .command("configure")
  .description("Configure an env to use with the other commands")
  .action(configureAction)
  .passThroughOptions(true);

program
  .command("list-configs")
  .description("List all the configured envs")
  .action(listConfigsAction);

program
  .command("list-instances")
  .description("List EC2 instances in the AWS account")
  .option("-n, --name <string>", "Filter by tag Name of the instance")
  .option("-e, --env <string>", "Env with configurations (default instance, profile, region). If not provided, will need to provide all next options", "default")
  .option("-p, --profile <string>", "The name of AWS Profile")
  .option("-r, --region <string>", "The region on AWS")
  .action(listInstancesAction)

program
  .command("ssh")
  .description("Connect to a EC2 instance via SSH")
  .option("-e, --env <string>", "Env with configurations (default instance, profile, region). If not provided, will need to provide all next options", "default")
  .option("-i, --instance <string>", "Instance ID to connect. If not provided, will find the instance by the tag Name")
  .option("-p, --profile <string>", "The name of AWS Profile")
  .option("-r, --region <string>", "The region on AWS")
  .action(sshAction)

program
  .command("proxy-database")
  .description("Create a proxy to connect to a database")
  .option("-e, --env <string>", "Env with configurations (default instance, profile, region). If not provided, will need to provide all next options", "default")
  .option("-i, --instance <string>", "Instance ID to connect. If not provided, will find the instance by the tag Name")
  .option("--local-port <number>", "Local port to connect to the database")
  .option("--remote-port <number>", "Remote port to connect to the database")
  .option("--host <string>", "Host of the database")
  .action(proxyDatabaseAction)

program.parse();