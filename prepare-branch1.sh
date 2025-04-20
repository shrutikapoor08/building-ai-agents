#!/bin/bash

# Create backup directory
mkdir -p .branch_backups

# Backup and remove convex directory
if [ -d "convex" ]; then
  cp -r convex .branch_backups/convex
  rm -rf convex
  echo "Backed up and removed convex directory"
fi

# Backup and remove Recommendations component
if [ -d "src/components/Recommendations" ]; then
  mkdir -p .branch_backups/src/components
  cp -r src/components/Recommendations .branch_backups/src/components/
  rm -rf src/components/Recommendations
  echo "Backed up and removed Recommendations component"
fi

# Backup and remove RealEstateAgent component
if [ -d "src/components/RealEstateAgent" ]; then
  mkdir -p .branch_backups/src/components
  cp -r src/components/RealEstateAgent .branch_backups/src/components/
  rm -rf src/components/RealEstateAgent
  echo "Backed up and removed RealEstateAgent component"
fi

# Backup and remove API directory
if [ -d "src/api" ]; then
  cp -r src/api .branch_backups/src/
  rm -rf src/api
  echo "Backed up and removed API directory"
fi

# Backup and remove store directory
if [ -d "src/store" ]; then
  cp -r src/store .branch_backups/src/
  rm -rf src/store
  echo "Backed up and removed store directory"
fi

echo "Branch 1 preparation complete. Removed directories are backed up in .branch_backups/"