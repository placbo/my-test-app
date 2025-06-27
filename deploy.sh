#!/bin/bash

# Exit immediately if any command fails
set -e

echo "Starting deployment process..."

# Navigate to project directory (uncomment and modify if needed)
# cd /path/to/your/project

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the React application
echo "Building application..."
npm run build

# Create destination directory if it doesn't exist
echo "Preparing destination directory..."
sudo mkdir -p /var/www/html/mytestapp

# Copy build files to the destination
echo "Copying build files to server directory..."
sudo cp -r ./dist/* /var/www/html/mytestapp/

# Set proper permissions
echo "Setting permissions..."
sudo chown -R www-data:www-data /var/www/html/mytestapp
sudo chmod -R 755 /var/www/html/mytestapp

echo "Deployment completed successfully!"