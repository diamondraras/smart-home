
### Installation
There are three application who needs to be installed

# Clone the application
```shell
git clone https://github.com/smartminds/smart-home.git
cd smart-home
```
# I. The API
### Install the core dependencies.

```shell
sudo apt-get install python3-pip python3-dev python3-venv
```
### In order to run script/setup below you will need some more dependencies.

```shell
sudo apt-get install libssl-dev libxml2-dev libxslt1-dev libjpeg-dev libffi-dev libudev-dev zlib1g-dev
```
### Setting up virtual environment
### To isolate your environment from the rest of the system, set up a venv. Within the home-api directory, create and activate your virtual environment.

```shell
cd api
python3 -m venv .
source bin/activate
```
### Install the requirements with a provided script named setup.

```shell
script/setup
```
# II. The NodeJS backend + Angular Frontend

```shell
npm install
```
Configure .env file , an example file example.env can be used, just rename it

### Running
```shell
npm run dev
```
### Credentials 
### Home Assistant Web
username : user
password : 1234user
### Home Assistant legacy
password : 1234

# NB
Angular and NodeJS are in the same root folder
You can edit angular files inside "src" folder
The Home Assistant files are in "api" folder
