FROM --platform=linux/amd64 node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_PORT, VITE_HOST, VITE_BACKEND_AUTHENTICATE_URL, VITE_BACKEND_INGREDIENT_URL, VITE_BACKEND_RECIPE_URL, VITE_BACKEND_USER_URL, VITE_BACKEND_AUTHENTICATE_PORT, VITE_BACKEND_INGREDIENT_PORT, VITE_BACKEND_RECIPE_PORT, VITE_BACKEND_USER_PORT

ENV VITE_PORT=$VITE_PORT
ENV VITE_HOST=$VITE_HOST

ENV VITE_BACKEND_AUTHENTICATE_URL=$VITE_BACKEND_AUTHENTICATE_URL
ENV VITE_BACKEND_INGREDIENT_URL=$VITE_BACKEND_INGREDIENT_URL
ENV VITE_BACKEND_RECIPE_URL=$VITE_BACKEND_RECIPE_URL
ENV VITE_BACKEND_USER_URL=$VITE_BACKEND_USER_URL

ENV VITE_BACKEND_AUTHENTICATE_PORT=$VITE_BACKEND_AUTHENTICATE_PORT
ENV VITE_BACKEND_INGREDIENT_PORT=$VITE_BACKEND_INGREDIENT_PORT
ENV VITE_BACKEND_RECIPE_PORT=$VITE_BACKEND_RECIPE_PORT
ENV VITE_BACKEND_USER_PORT=$VITE_BACKEND_USER_PORT

RUN npm run build

FROM --platform=linux/amd64 nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/assets /usr/share/nginx/html/assets

# Copy the custom entrypoint script
COPY /scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

# Use the custom entrypoint
ENTRYPOINT ["/entrypoint.sh"]