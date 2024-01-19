# Use an official Node.js runtime as a base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Expose a port (if your application listens on a specific port)
# EXPOSE 8000 6379 27017

# Define the command to run your application
CMD ["npm", "start"]