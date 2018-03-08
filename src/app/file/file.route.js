

import express from 'express';
import FileController from './file.controller';

const router = express.Router();


router.route('/movie-poster')

    /** POSt /api/file/movie-poster */
    .post(FileController.uploadMoviePoster);


export default router;