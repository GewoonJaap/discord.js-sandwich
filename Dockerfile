FROM node:18

# Create app directory
WORKDIR /app

COPY . /app/

# Install app dependencies
RUN yarn install

CMD [ "yarn", "start" ]


