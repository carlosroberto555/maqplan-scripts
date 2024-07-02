import { input, confirm } from "@inquirer/prompts";
import { awsProfileAsks } from "./aws-profile.asks.js";

export const configureAsks = async (options) => {
  const config = {};
  const awsProfile = await awsProfileAsks();

  config.name = await input({
    message: "Name of configuration (without spaces or special chars):",
    default: config.profile,
  });

  const configureDatabaseProxy = await confirm({
    message: "Do you want to configure a database proxy?",
  });

  if (configureDatabaseProxy) {
    config.database = await configureDatabaseProxyAsks();
  }

  return {
    ...awsProfile,
    ...config,
  };
}

const validatePortNumber = (input) => {
  if (isNaN(parseInt(input))) {
    return "Please provide a valid port number";
  }

  return true
}

const configureDatabaseProxyAsks = async () => {
  const host = await input({
    message: "Database Host:",
    default: "localhost",
  });

  const localPort = await input({
    message: "Database local Port:",
    default: "5432",
    validate: validatePortNumber,
    transformer: (input) => input && parseInt(input),
  });

  const remotePort = await input({
    message: "Database remote Port:",
    default: "5432",
    validate: validatePortNumber,
    transformer: (input) => input && parseInt(input),
  });

  return {
    host,
    localPort,
    remotePort,
  };
}
