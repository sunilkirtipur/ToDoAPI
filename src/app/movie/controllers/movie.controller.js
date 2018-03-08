
import Movie from './../models/movie.model';

/**
 * Create movie
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function create(req, res, next) {

    let movie = new Movie();
    movie.createdBy = req.user._id;
    if (req.body.title)
        movie.title = req.body.title;
    if (req.body.language)
        movie.language = req.body.language
    if (req.body.poster)
        movie.poster = req.body.poster;

    movie.save()
        .then(movie => res.json(movie))
        .catch(e => res.json(e));

}

/**
 * List movies
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function list(req, res, next) {

    let query = { isDelete: false };

    Movie.find(query)
        .sort({ createdAt: 1 })
        .populate('createdBy')
        .then(movies => res.json(movies))
        .catch(e => res.json(e));
}

/**
 * Remove movie
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function remove(req, res, next) {

    Movie.findById(req.params.movieId)
        .then(movie => {
            movie.isDelete = true;
            return movie.save();
        })
        .then(movie => {
            res.json(movie);
        })
        .catch(e => res.json(e))
}


/**
 * Update movie
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function update(req, res, next) {
    Movie.findById(req.params.movieId)
        .then(movie => {
            if (req.body.title)
                movie.title = req.body.title;
            if (req.body.language)
                movie.language = req.body.language;
            if (req.body.poster)
                movie.poster = req.body.poster;

            return movie.save();
        })
        .then(movie => {
            res.json(movie);
        })
        .catch(e => res.json(e))
}

export default {
    create,
    list,
    remove,
    update
}