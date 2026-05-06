# server/Dockerfile
FROM node:18
WORKDIR /app

# Install backend deps
COPY package*.json ./
RUN npm install

# Copy backend code
COPY . .

# Expose backend port and run app
EXPOSE 5000
CMD ["node", "app.js"]
