# Use stable Node version
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining project files
COPY . .

# Environment variables
ENV MONGO_DB_USERNAME=delta_admin
ENV MONGO_DB_PWD=delta_password

# Expose port (change if your app uses different port)
EXPOSE 5000

# Start app
CMD ["node", "app.js"]
