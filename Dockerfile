# Use the official Node.js image as the base image
FROM node:20 as build

# Set the working directory
WORKDIR /app

# Copy package.json 
COPY package.json ./

# Install the dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN yarn build

# Use the official nginx image for the production server
FROM nginx:alpine

# Copy the build output to the nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
