# Rest Api Node and Mongo Play Services

## Description
This is an Restful API for Node.js and Mongo. This is in the MVC format,
except because it is an API there are no views, just models and controllers.

##### Routing         : Express
##### ODM Database    : Mongoose
##### Authentication  : Passport, JWT

## Installation

#### Donwload Code | Clone the Repo

```
git clone {repo_name}
```

#### Install Node Modules
```
npm install
```

#### Create .env File
You will find a example.env file in the home directory. Paste the contents of that into a file named .env in the same directory. 
Fill in the variables to fit your application

#### Run your database
#### We're currently running mongodb with docker container

#### Start your application
```
npm start
```

Current routes are in 'v1' so all routes will be nested with v1 : http://base-url/v1/....

Live docs can be viewed with : http://base-url/v1/docs