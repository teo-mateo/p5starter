# Set variables
storage_account_name="tbdxtbdisa"
resource_group_name="tbdxtbdi-rg"
location="westeurope"

# Create a resource group
az group create --name $resource_group_name \
  --location $location

# Create an Azure Storage account
az storage account create --name $storage_account_name \
  --resource-group $resource_group_name \
  --location $location \
  --sku Standard_LRS \
  --kind StorageV2

# Enable static website hosting with default error and index documents
az storage blob service-properties update --account-name $storage_account_name \
  --static-website --404-document error.html --index-document index.html

# Upload all files from current folder to the $web container
az storage blob upload-batch --destination \$web \
  --account-name $storage_account_name \
  --source ./src/public \
  --destination-path "/"

# Get the primary endpoint URL for the static website
az storage account show --name $storage_account_name \
  --query "primaryEndpoints.web" \
  --output tsv
