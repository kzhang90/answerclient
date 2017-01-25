// check for token whenever a protected route is requested.
import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user';

export default (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(" ")[1];
  }

  if (token) {
    // verify token if we have it.
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        // invalid jwt token
        res.status(401).json({ erro: "Failed to authenticate" });
      } else {
        // find user by id from token and add it to current request.

        // user query is a lot safer: no password digest.
        User.query({
          where: { id: decoded.id },
          select: [ 'email', 'id', 'username' ]
        }).fetch().then(user => {
          if (!user) {
            // if can't find user.
            res.status(404).json({ error: "No such user" });
          } else {
            req.currentUser = user;
          // call next only if there is a user and there is a valid token associated with this user.
            next();
          }
        });
      }
    })
  } else {
    res.status(403).json({
      error: "No token provided"
    });
  }
}