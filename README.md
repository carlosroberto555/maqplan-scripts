# Maqplan scripts

These scripts are used to manage AWS services, with external proxy, SSM access, and logs.  
To use any scripts here, you will need to install the `aws cli` before.

## Configure

When start to use a new enviroment, it's necessary to configure it.  
Just execute the configure command and answer the questions:

```bash
maq configure
```

All next commands can be passed the `--env` option. This option is the name of enviroment configured previously.

## List configs

List all enviroment names configured on your host:

```bash
maq list-configs
```

## List instances

List all EC2 instances on the AWS account.
> You can also filter by tag *Name* of instance

```bash
maq list-instances --env env-name

# filter by name
maq list-instances --env env-name --name 'EC2 Instance Name'
```

## SSH access

Acess the ssh from instance using AWS SSM authentication.
> The user need to have SSM role configured.

```bash
maq ssh --env env-name
```

## Proxy database

If you had configured the database proxy options, you can proxy database connection to access in localhost:
> The user need to have SSM role configured.

```bash
maq proxy-database --env env-name
```