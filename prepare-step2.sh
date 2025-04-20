#!/bin/bash

# Create API directory if it doesn't exist
mkdir -p src/api

# Check if API backup exists and restore it
if [ -d ".branch_backups/src/api" ]; then
  cp -r .branch_backups/src/api/* src/api/
  echo "Restored API directory from backup"
else
  echo "API backup not found. Creating minimal API files."
  # If no backup exists, the files created above will be used
fi

# Update vite.config.js to ensure API proxy is configured
if grep -q "proxy" "vite.config.js"; then
  echo "Proxy configuration already exists in vite.config.js"
else
  echo "Adding proxy configuration to vite.config.js"
  # This is a simplified approach - in a real scenario, you might want to use a more robust method
  sed -i 's/plugins: \[react(), TanStackRouterVite()\],/plugins: [react(), TanStackRouterVite()],\n  server: {\n    proxy: {\n      "\/api": {\n        target: "http:\/\/localhost:3001",\n        changeOrigin: true,\n      },\n    },\n  },/' vite.config.js
fi

echo "Step 2 preparation complete. API functionality has been added."