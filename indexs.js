const Twitter = require("twitter-lite");
require('dotenv').config()
const twitterClient = new Twitter({
  subdomain: "api", // "api" is the default (change for other subdomains)
  version: "1.1", // version "1.1" is the default (change for other subdomains)
  consumer_key: process.env.twitter_consumer_key, // from Twitter.
  consumer_secret: process.env.twitter_consumer_secret, // from Twitter.
  access_token_key: process.env.twitter_access_token_key, // from your User (oauth_token)
  access_token_secret: process.env.twitter_access_token_secret, // from your User (oauth_token_secret)
});


module.exports = (req, res) => {
console.log('IN');
    let httpResponse = res;
    twitterClient.get('account/verify_credentials')
            .then((res) => {
                if(!res){
                    httpResponse.status(500).send("Error fetching Twitter Client");
                }
                const followerCount = res.followers_count;
                const userName = `${name}|${followerCount}`;
                return userName;
            }).then((user_name) => {
                const response = twitterClient.post("account/update_profile", { name: user_name });
                response.then((res) => {
                    if(!res){
                        httpResponse.status(500).send("Update error");
                    }else{
                        httpResponse.status(200).send(`Update ${user_name} Success!`);
                    }
                })
                .catch((err) => {
                   httpResponse.status(500).send(err);
                });
            })
            .catch((err) => {
                httpResponse.status(500).send(err);
            });

};
