const User = require('../models/auth.model');
const expressJwt = require('express-jwt');

exports.readController = (req, res) => {
    const userId = req.params.id;
    User.findById(userId).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Utilisateur non trouvé'
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
};

exports.updateController = (req, res) => {
    
    // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
    const { name, password } = req.body;

    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Utilisateur non trouvé'
            });
        }
        if (!name) {
            return res.status(400).json({
                error: 'Nom requis'
            });
        } else {
            user.name = name;
        }

        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    error: 'Le mot de passe doit être au moins 6 caractères'
                });
            } else {
                user.password = password;
            }
        }

        user.save((err, updatedUser) => {
            if (err) {
                console.log('Echec mis à jour du compte', err);
                return res.status(400).json({
                    error: 'Echec mis à jour du compte'
                });
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;
            res.json(updatedUser);
        });
    });
};