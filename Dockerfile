# Use Node official LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy entire project
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
