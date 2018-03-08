import express from 'express';
import TaskController from './controller/task.controller';
import jwt from 'express-jwt';
import config from './../../cofig/config';

const router = express.Router();

router.route('/')

    /** GET /api/movie - return movies lsit */
    .get(jwt({ secret: config.secret_key }), TaskController.list)

    /** POST /api/movie - create movie  */
    .post(jwt({ secret: config.secret_key }), TaskController.create);

// router.route('/:movieId')


    /** PUT /api/movie/movieid - update movie  */
    // .put(MovieController.update)

    /** DELETE /api/movie/movieId - delete movie */
    // .delete(MovieController.remove);


export default router;