const aws = require('aws-sdk');
const cognito = new aws.CognitoIdentity({region: process.env.COGNITO_REGION});

module.exports.handler = (event, content, callback) => {
  cognito.getId({
    IdentityPoolId: process.env.IDENTITY,
    Logins: {
      "api.twitter.com": `${process.env.ACCESS_TOKEN};${process.env.ACCESS_SECRET}`
    }
  }, (err, res) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, {id: res.IdentityId});
  });
};
