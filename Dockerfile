FROM node:5

MAINTAINER Eric Liao <eric@edlio.com>

# Create user other than root user
ENV user node
RUN groupadd -r $user && useradd -r -g $user $user

# Create app directory
RUN mkdir -p /$user/src/chat
WORKDIR /$user/src/chat

# Create log directory
RUN mkdir -p /$user/src/chat/logs
# Create temp image directory
RUN mkdir -p /$user/src/chat/temp

# Npm install to install dependencies
COPY package.json /$user/src/chat
RUN npm install

# Copy source code over
COPY . /$user/src/chat

# Change the owner of app and user
RUN chown -R $user:$user /$user/src/chat/
USER $user

EXPOSE 3000
CMD node index.js
