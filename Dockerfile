FROM keymetrics/pm2:latest-strecth

# Bundle APP files
RUN mkdir -p /src/app

WORKDIR /src/app

COPY package.json /src/app/package.json

RUN npm install

COPY . /src/app
# Show current folder structure in logs

RUN ls -al -R

CMD [ "pm2-runtime", "start", "pm2.json" ]