import express from 'express';
import TaskRoute from './task/task.route';
import MovieRoute from './movie/movie.routes';
import AuthRoute from './auth/auth.routes';
import FileRoute from './file/file.route';

const router = express.Router();

router.route('/health-check').get((req, res, next) => {
    res.json({
        msg: 'okk'
    })
});

router.use('/movie', MovieRoute);
router.use('/auth', AuthRoute);
router.use('/file', FileRoute);

router.use('/task', TaskRoute);


export default router;


