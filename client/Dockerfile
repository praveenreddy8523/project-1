# Stage 1: Build the React (Vite) app
FROM node:18 AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Optional: Copy assets manually to public if needed
RUN mkdir -p public/assets && cp -r src/assets/* public/assets/ || true

# Build the app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# 🔥 This is where you copy the nginx.conf from the client folder
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
