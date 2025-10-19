#!/bin/bash

# Exit immediately if any command fails
set -e

echo "Starting deployment process..."

# Navigate to project directory (uncomment and modify if needed)
# cd /path/to/your/project

echo "[1/6] removing package-lock.json and pulling from github"
rm -f package-lock.json # Remove lockfile on private network
git pull

# Install dependencies
echo "[2/6] Installing dependencies..."
npm install --verbose

# Build the React application
echo "[3/6] Building application..."
npm run build

# Create destination directory if it doesn't exist
echo "[4/6] Preparing destination directory..."
sudo mkdir -p /var/www/html/mytestapp

# Copy build files to the destination
echo "[5/6] Copying build files to server directory..."
sudo cp -r ./dist/* /var/www/html/mytestapp/

# Set proper permissions
echo "[6/6] Setting permissions..."
sudo chown -R www-data:www-data /var/www/html/mytestapp
sudo chmod -R 755 /var/www/html/mytestapp

echo "Deployment completed successfully!"