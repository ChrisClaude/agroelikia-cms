FROM strapi/base

WORKDIR /

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

ENV NODE_ENV production

RUN yarn build

# Expose is NOT supported by Heroku
#EXPOSE 1337

# Run the app
CMD ["yarn", "start"]
