const auth = (req, res, next) => {
  if(!req.session.member_id) {
      res.redirect('/login');
  } else {
      next();
  }
};

module.exports = auth;