## Zappy
Integration tool between slack and twitter


## Technologies
>Zappy is a NodeJS App. Using ExpressJS for backend and AngularJS for frontend and MongoDB as a database


## Core
It is an integration tool between twitter and slack. When any user on the marketing channel on slack add any text contain the word ‘go’ (case insensitive) twitter tweets of a defined account will be fetched to the angular client in a real time without no need for refreshing the page.


## How it works
1. Make sure that you have docker installed in your machine by type ``` docker -v``` in your terminal and that docker-compose is working properly by type ```docker-compose -v```as we use it for starting our app. If not installed install first then complete the steps.

2. you should add config data in express-server directory for working properly “Config data of Slack bot and channel which bot integrates with and Twitter app credentials and Pusher service credentials which we use for real time in our app”

3. In the directory of our app simply run this command: ```docker-compose up --build -d```. Server will work on port 3000 and Angular on port 4200

4. Go to twitter and add tweets and go to slack channel and hit on Marketing channel any text contain “go” word and you will see the tweets appear in our angular app

5. To stop the containers type ```docker-compose down``` in the directory of the project

## Testing
>To run test on our express server. In the directory of your app run:

    docker-compose run express mocha


## Hints
**After done**

>For deleting all docker containers run:

    docker rm $(docker ps -a -q)


>For deleting all docker images run:

    docker rmi $(docker images -q)


>For rerunning ```docker-compose up --build``` without conflicts run this command in the directory of the app:

    docker-compose rm

----
