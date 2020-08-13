const {
    check
} = require('express-validator');
exports.validSign = [
    check('name', 'Nom requis').notEmpty()
    .isLength({
        min: 4,
        max: 32
    }).withMessage('le nom doit être au moins 3 caractères'),
    check('email')
    .isEmail()
    .withMessage('l\'adresse email doit être valide'),
    check('password', 'mot de passe requis').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('le mot de passe doit contenir au moins 6 caractères').matches(/\d/).withMessage('mot de passe doit contenir au moins un chiffre')
]

exports.validLogin = [
    check('email')
    .isEmail()
    .withMessage('l\'addresse email doit être valide'),
    check('password', 'mot de passe requis').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('Le mot de passe doit contenir au moinns 6 caractères').matches(/\d/).withMessage('Le mot de passe doit contenir au moins un chiffre')
]


exports.forgotPasswordValidator = [
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('l\'adresse email doit être valide'  )
];

exports.resetPasswordValidator = [
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Le mot de passe doit contenir au moins 6 caractères')
];