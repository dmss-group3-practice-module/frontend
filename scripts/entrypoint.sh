#!/bin/sh

# Create a config.js file with environment variables
cat <<EOF > /usr/share/nginx/html/config.js
window.RUNTIME_CONFIG = {
  VITE_PORT: "${VITE_PORT}",
  VITE_HOST: "${VITE_HOST}",
  VITE_BACKEND_AUTHENTICATE_URL: "${VITE_BACKEND_AUTHENTICATE_URL}",
  VITE_BACKEND_INGREDIENT_URL: "${VITE_BACKEND_INGREDIENT_URL}",
  VITE_BACKEND_RECIPE_URL: "${VITE_BACKEND_RECIPE_URL}",
  VITE_BACKEND_USER_URL: "${VITE_BACKEND_USER_URL}",
  VITE_BACKEND_NOTIFICATION_URL: "${VITE_BACKEND_NOTIFICATION_URL}",
  VITE_BACKEND_REVIEW_URL: "${VITE_BACKEND_REVIEW_URL}",
  VITE_BACKEND_AUTHENTICATE_PORT: "${VITE_BACKEND_AUTHENTICATE_PORT}",
  VITE_BACKEND_INGREDIENT_PORT: "${VITE_BACKEND_INGREDIENT_PORT}",
  VITE_BACKEND_RECIPE_PORT: "${VITE_BACKEND_RECIPE_PORT}",
  VITE_BACKEND_USER_PORT: "${VITE_BACKEND_USER_PORT}",
  VITE_BACKEND_NOTIFICATION_PORT: "${VITE_BACKEND_NOTIFICATION_PORT}"
  VITE_BACKEND_REVIEW_PORT: "${VITE_BACKEND_REVIEW_PORT}"
};
EOF

# Start Nginx
nginx -g 'daemon off;'