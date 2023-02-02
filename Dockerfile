FROM ruby:2.7.6

ENV NODE_VERSION=14.21.1
ENV YARN_VERSION=1.22.19

USER root

WORKDIR /app

RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

RUN npm install -g yarn@${YARN_VERSION}

COPY package.json ./

COPY Gemfile ./

RUN bundle install && yarn install

COPY . ./

RUN rails webpacker:compile