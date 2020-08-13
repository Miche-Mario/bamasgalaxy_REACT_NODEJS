const User = require('../models/auth.model');
const expressJwt = require('express-jwt');
const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');

const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const { errorHandler } = require('../helpers/dbErrorHandling');
const nodemailer = require('nodemailer');




exports.registerController = (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    User.findOne({
      email
    }).exec((err, user) => {
      if (user) {
        return res.status(400).json({
          errors: 'Email déjà utilisé'
        });
      }
    });

    const token = jwt.sign(
      {
        name,
        email,
        password
      },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: '5m'
      }
    );

   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS
      }
    });
    
    var emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Lien d\activation de votre compte',
      html: `
      <h1>Merci d'utiliser le lien suivant pour activer votre compte</h1>
      <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
      <hr />
      <p>Cet email contient des informations sensibles</p>
      <p>${process.env.CLIENT_URL}</p>
      <p style="text-align: center;"><strong>Copyrights 2020 Bamasgalaxy</strong><p>
    `
    };
    
    transporter.sendMail(emailData, function(error, info){
      if (error) {
        return res.status(400).json({
            success: false,
            errors: errorHandler(error)
        });
      } else {
        return res.json({
            message: `Email envoyé à ${email}`
          });
      }
    });
  }
};

exports.activationController = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
      if (err) {
        console.log('Activation error');
        return res.status(401).json({
          errors: 'Lien expiré. Inscrivez vous de nouveau'
        });
      } else {
        const { name, email, password } = jwt.decode(token);

        console.log(email);
        const user = new User({
          name,
          email,
          password
        });

        user.save((err, user) => {
          if (err) {
            console.log('Save error', errorHandler(err));
            return res.status(401).json({
              errors: errorHandler(err)
            });
          } else {
            return res.json({
              success: true,
              message: user,
              message: 'Inscription réussi'
            });
          }
        });
      }
    });
  } else {
    return res.json({
      message: 'Erreur, merci de réessayer'
    });
  }
};

exports.signinController = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    // check if user exist
    User.findOne({
      email
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          errors: 'Cet utilisateur n\'existe pas. Merci de vous inscire'
        });
      }
      // authenticate
      if (!user.authenticate(password)) {
        return res.status(400).json({
          errors: 'Erreur, vérifier l\Email et/ou le Mot de passe'
        });
      }
      // generate a token and send to client
      const token = jwt.sign(
        {
          _id: user._id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d'
        }
      );
      const { _id, name, email, role } = user;

      return res.json({
        token,
        user: {
          _id,
          name,
          email,
          role
        }
      });
    });
  }
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET // req.user._id
});

exports.adminMiddleware = (req, res, next) => {
  User.findById({
    _id: req.user._id
  }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'utilistaeur non trouvé'
      });
    }

    if (user.role !== 'admin') {
      return res.status(400).json({
        error: 'Erreur. Réservé aux administrateurs.'
      });
    }

    req.profile = user;
    next();
  });
};

exports.forgotPasswordController = (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    User.findOne(
      {
        email
      },
      (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: 'Cet utilisateur n\'existe pas. Merci de vous inscire'
          });
        }

        const token = jwt.sign(
          {
            _id: user._id
          },
          process.env.JWT_RESET_PASSWORD,
          {
            expiresIn: '10m'
          }
        );
////////////////////////////////////////////////transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_PASS
        }
      });

      const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Lien de changement de mot de passe',
        html: `
            <h1>Merci d'utiliser ce lien pour changer votre mot de passe</h1>
            <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
            <hr />
            <p>Cet email contient des informations sensibles</p>
            <p>${process.env.CLIENT_URL}</p>
            <p style="text-align: center;"><strong>Copyrights 2020 Bamasgalaxy</strong><p>
      `
      };

        return user.updateOne(
          {
            resetPasswordLink: token
          },
          (err, success) => {
            if (err) {
              console.log('RESET PASSWORD LINK ERROR', err);
              return res.status(400).json({
                error:
                  'Database connection error on user password forgot request'
              });
            } else {
///////////////////////////////////////////////////////////////////////              
                transporter.sendMail(emailData, function(error, info){
                  if (error) {
                    // console.log('SIGNUP EMAIL SENT ERROR', err)
                    return res.json({
                      message: error.message
                    });
                  } else {
                    // console.log('SIGNUP EMAIL SENT', sent)
                    return res.json({
                      message: `Email envoyé à ${email}. Merci de suivre les instructions pour activer votre compte`
                      });
                  }
                });
            }
          }
        );
      }
    );
  }
};

exports.resetPasswordController = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    if (resetPasswordLink) {
      jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(
        err,
        decoded
      ) {
        if (err) {
          return res.status(400).json({
            error: 'Lien expiré. Merci de réessayer'
          });
        }

        User.findOne(
          {
            resetPasswordLink
          },
          (err, user) => {
            if (err || !user) {
              return res.status(400).json({
                error: 'Oups! erreur. Merci de réessayer plus tard'
              });
            }

            const updatedFields = {
              password: newPassword,
              resetPasswordLink: ''
            };

            user = _.extend(user, updatedFields);

            user.save((err, result) => {
              if (err) {
                return res.status(400).json({
                  error: 'Erreur pendant changement de mot de passe'
                });
              }
              res.json({
                message: `Génial! Vous pouvez maintenant vous connecter avec votre mot de passe`
              });
            });
          }
        );
      });
    }
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
// Google Login
exports.googleController = (req, res) => {
  const { idToken } = req.body;

  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
    .then(response => {
      // console.log('GOOGLE LOGIN RESPONSE',response)
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: '7d'
            });
            const { _id, email, name, role } = user;
            return res.json({
              token,
              user: { _id, email, name, role }
            });
          } else {
            let password = email + process.env.JWT_SECRET;
            user = new User({ name, email, password });
            user.save((err, data) => {
              if (err) {
                console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                return res.status(400).json({
                  error: 'Echec de connexion avec google'
                });
              }
              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
              );
              const { _id, email, name, role } = data;
              return res.json({
                token,
                user: { _id, email, name, role }
              });
            });
          }
        });
      } else {
        return res.status(400).json({
          error: 'Echec de connexion avec google. Merci de réessayer'
        });
      }
    });
};

exports.facebookController = (req, res) => {
  console.log('FACEBOOK LOGIN REQ BODY', req.body);
  const { userID, accessToken } = req.body;

  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

  return (
    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      // .then(response => console.log(response))
      .then(response => {
        const { email, name } = response;
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: '7d'
            });
            const { _id, email, name, role } = user;
            return res.json({
              token,
              user: { _id, email, name, role }
            });
          } else {
            let password = email + process.env.JWT_SECRET;
            user = new User({ name, email, password });
            user.save((err, data) => {
              if (err) {
                console.log('Echec de connexion avec facebook', err);
                return res.status(400).json({
                  error: 'Echec d\'inscription avec google'
                });
              }
              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
              );
              const { _id, email, name, role } = data;
              return res.json({
                token,
                user: { _id, email, name, role }
              });
            });
          }
        });
      })
      .catch(error => {
        res.json({
          error: 'Echec de connexion avec google. Merci de réessayer'
        });
      })
  );
};
