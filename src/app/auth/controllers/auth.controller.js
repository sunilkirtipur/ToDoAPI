import User from './../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from './../../../cofig/config';

/**
 * Register user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function register(req, res, next) {

    let user = new User();
    if (req.body.name)
        user.name = req.body.name;
    if (req.body.email)
        user.email = req.body.email;
    if (req.body.password)
        user.password = bcrypt.hashSync(req.body.password, 10);

    user.save()
        .then(user => res.json(user))
        .catch(e => next(e));
}


/**
 * Login user.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function login(req, res, next) {

    User.findOne({ email: req.body.email })
        .then(user => {

            if (!user)
                return next(new Error('Email not found.'));

            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return next(new Error('Worng password'));
            }

            const token = jwt.sign(
                {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                },
                config.secret_key);

            res.json({
                user: user,
                token: token
            })

        })
        .catch(e => next(e));
}


export default {
    register,
    login
}
