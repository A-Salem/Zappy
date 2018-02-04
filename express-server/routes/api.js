// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/zappy';

//config data
let config = {};
try {
  config = require('./../config.json');
} catch(e){
  console.log('\x1b[31m', `Error when importing config.json file, make sure that you added it with required values, e: ${e}`)
}
let pusherCred = config.pusher || {}

// Connect to mongodb
mongoose.connect(dbHost);

// create mongoose schema
const tweetSchema = new mongoose.Schema({
  id: String,
  text: String,
  date: Date
});

// create mongoose model
const Tweet = mongoose.model('Tweet', tweetSchema);

// pusher for publish data to the client in real time mode
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: pusherCred.appId,
  key: pusherCred.key,
  secret: pusherCred.secret,
  cluster: pusherCred.cluster,
  encrypted: true
});

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

/* Create a tweet. */
router.post('/tweets', (req, res) => {
  let tweet = new Tweet({
    id: req.body.id,
    text: req.body.text,
    date: req.body.date
  })

  tweet.save(error => {
    if(error) res.status(500).send(error)

    res.status(201).json({
      message: 'Tweet created successfully'
    });
  });
});

/* Get all tweets. */
router.get('/tweets', (req, res) => {
  Tweet.find({}, null, {sort: '-date'}, (err, tweets) => {
    if(err) res.status(500).send(error)

    res.status(200).json(tweets);
  })
})

var findTweet = (id) => {
  let tweet = new Promise ((resolve, reject) => {
    Tweet.findOne({id: id}, (err, tweet) => {
        if(err){
          console.log(`Error when call findTweet: ${err}`);
          resolve(null)
        }
        resolve(tweet)
      });
  }).then(console.resolve)
    .catch(console.error)

  return tweet
}

var findTweets = () => {
  let tweets = new Promise ((resolve, reject) => {
    Tweet.find({}, null, {sort: '-date'}, (err, tweets) => {
        if(err){
          console.log(`Error when call findTweets: ${err}`);
          resolve([])
        }
        resolve(tweets)
      });
  }).then(console.resolve)
    .catch(console.error)

  return tweets
}

var saveTweet = (twt) => {
  let tweet = new Tweet({
    id: twt.id,
    text: twt.text,
    date: new Date(twt.date)
  })

  let tweetSaved = new Promise ((resolve, reject) => {
    tweet.save(err => {
      if(err){
        console.log(`Error when save tweet of id(${twt.id}): ${err}`);
        resolve(true)
      }
      resolve(true)
    });
  }).then(console.resolve)
    .catch(console.error)

  return tweetSaved
}

var pushTweets = async () => {
  let twts = await findTweets();
  pusher.trigger('tweets', 'newTrigger', {
    "tweets": twts
  });
}

module.exports = {
  router,
  findTweet,
  findTweets,
  saveTweet,
  pushTweets
}
