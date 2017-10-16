module.exports = function (req, res, next) {
  if(req.user.role === 'admin'){
    next();
  }
  else {
    res.send({ message: 'Unauthorized!' });
  }

};
