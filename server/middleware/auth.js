const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  Promise.resolve(req.cookies.shortlyid)
    .then(hash => {
      if (!hash) {
        throw hash;
      }
      return models.Sessions.get({ hash });
    }).tap(session => {
      if (!session) {
        throw session;
      }
    }).catch(() => {
      return models.Sessions.create()
        .then(results => {
          return models.Sessions.get({ id: results.insertId });
        })
        .tap(session => {
          res.cookie('shortlyid', session.hash);
        });
    }).then(session => {
      req.session = session;
      next();
    });

  // Access the  parse cookies on the request
  // Assign an object to the session property on the request
  // containing relevant user information
  // Look up user data related to that session
  // console.log(req);
  // console.log('RESPONSEPPPPPPPPPPPPPPPPP',res);
  // User has not been associated with user

  // console.log('request session', req.session);
  // console.log('request cookies', req.cookies);


  // if (Object.keys(req.cookies).length === 0) {
  //   return new Promise()
  //   return models.Sessions.create().then(queryResult => {
  //     console.log('new session id', queryResult.insertId);
  //     return models.Sessions.get({ id: queryResult.insertId })
  //       .then(result => {
  //         console.log(result.hash);
  //         req.session = { hash: result.hash };
  //         res.cookies = { shortlyid: { value: result.hash } };
  //         next();
  //       });
  //   });

  // } else {
  //   // console.log(req);
  //   // var cookieHash = req.cookies.shortlyid.value;
  //   // req.session = { hash: '' };
  //   console.log('inside else block', req.cookies);
  //   return models.Sessions.get({ hash: req.cookies.shortlyid })
  //     .then(res => {
  //       console.log('ELSE',res);
  //       next();
  //     });
  //   // console.log('SESS:',sess);
  //   // First req has no cookies
  //     // We create hash and store in session object of req
  //     // Use new hash as val for cookie
  //   // Requests with cookies
  //     // Hash must exist in sessions table
  //     // Get the cookie from teh request
  //     // Get user ID associated with hash
  //     // Update the
  //   /*
  //     session: {
  //       hash: '',
  //       user: {
  //         username: ''
  //       },
  //       userId: ''
  //     }
  //   */
  // }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

