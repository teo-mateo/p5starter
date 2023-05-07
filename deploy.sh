#!/bin/bash 

set -e // Exit immediately if a command exits with a non-zero status
set -x // Print commands and their arguments as they are executed

# Set variables
storage_account_name="tbdxtbdisa"
resource_group_name="tbdxtbdi-rg"
location="westeurope"
account_key=""

# read account key from stdin, asking for it
echo "Enter the storage account key:"
read account_key


az storage blob delete-batch --account-name $storage_account_name \
--source \$web --pattern "*" --auth-mode key --account-key $account_key


# Upload all files from current folder to the $web container
az storage blob upload-batch --destination \$web \
  --account-name $storage_account_name \
  --source ./src/public \
  --destination-path "/" \
  --auth-mode key \
  --account-key $account_key

# Get the primary endpoint URL for the static website
az storage account show --name $storage_account_name \
  --query "primaryEndpoints.web" \
  --output tsv
