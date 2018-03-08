import express from 'express';
import MovieController from './controllers/movie.controller';
import jwt from 'express-jwt';
import config from './../../cofig/config';

const router = express.Router();

router.route('/')

    /** GET /api/movie - return movies lsit */
    .get(jwt({ secret: config.secret_key }), MovieController.list)

    /** POST /api/movie - create movie  */
    .post(jwt({ secret: config.secret_key }), MovieController.create);

router.route('/:movieId')


    /** PUT /api/movie/movieid - update movie  */
    .put(MovieController.update)

    /** DELETE /api/movie/movieId - delete movie */
    .delete(MovieController.remove);


export default router;
