const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  // Access the  parse cookies on the request
  // Assign an object to the session property on the request
  // containing relevant user information
  // Look up user data related to that session
  console.log(req);
  console.log('RESPONSEPPPPPPPPPPPPPPPPP',res);
  // User has not been associated with user
  if (Object.keys(req.cookies).length === 0) {
    var newHash = models.Sessions.create();
    req.session = { hash: newHash };
    res.cookies = { shortlyid: { value: newHash } };
  } else {
    var currentHash = req.cookies.shortlyid.value;
  }
  next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

