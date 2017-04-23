"use strict";

// Simulates the kind of delay we see with network or filesystem operations

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    // ******* this is where you do the database operations, callbacks are just for http
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insert(newTweet);
      callback(null, true);
      }
    ,

    // Get all tweets in `db`, sorted by newest first
    // ******* same here  , callback is where you passed back all the tweets
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err,tweets) => {
        if(err) {
          console.log("retreve failed");
        } else {
          callback(null, tweets);
        }
      })
    }



  }
}
