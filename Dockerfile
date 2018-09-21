# what node version to use
FROM node:8

# RUN mkdir /app
# create app directory
# All commands will use this as root directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Copy everything in local directory to WORKDIR
COPY . .

# create data directory for mongo container to handle
# RUN mkdir ./data/db

# Install app dependencies
# If you are building your code for production
# RUN npm install --only=production
RUN npm install --production

# Build webpack bundle
# RUN npm run build:prod

EXPOSE 5000

CMD ["npm", "start"]