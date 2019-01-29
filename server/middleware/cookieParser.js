const parseCookies = (req, res, next) => {
  if (!req.headers.cookie) {
    next();
    return;
  }
  var array = req.headers.cookie.split('; ');
  var parsedCookies = array.reduce((result, cookie) => {
    var parsedCookie = cookie.split('=');
    result[parsedCookie[0]] = parsedCookie[1];
    return result;
  }, {});
  req.cookies = parsedCookies;
  next();
};

module.exports = parseCookies;