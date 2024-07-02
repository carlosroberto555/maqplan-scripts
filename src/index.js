#!/usr/bin/env node
import { Command } from "commander";
import pkg from "../package.json" assert { type: "json" };

import { configureAction } from "./actions/configure.action.js";
import { sshAction } from "./actions/ssh.action.js";

const program = new Command();

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
	.command("ssh")
	.description("Connect to a EC2 instance via SSH")
	.option("--env <string>", "Env with configurations (default instance, profile, region). If not provided, will need to provide all options", "qas")
	.option("--instance <string>", "Instance ID to connect. If not provided, will find the instance by the tag Name")
	.option("--profile <string>", "The name of AWS Profile")
	.option("--region <string>", "The region on AWS")
  .action(sshAction)

program
	.command("proxy-database")
	.description("Create a proxy to connect to a database")
	.option("--env <string>", "Env with configurations (default instance, profile, region). If not provided, will need to provide all options", "qas")
	.option("--instance <string>", "Instance ID to connect. If not provided, will find the instance by the tag Name")
	.option("--local-port <number>", "Local port to connect to the database")
	.option("--remote-port <number>", "Remote port to connect to the database")
	.option("--host <string>", "Host of the database")

program.parse();