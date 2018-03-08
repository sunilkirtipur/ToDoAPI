
import Task from './../model/Task.model';

/**
 * Create movie
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function create(req, res, next) {

    let task = new Task();
    task.createdBy = req.user._id;
    if (req.body.title)
        task.title = req.body.title;
    if (req.body.date)
        task.date = req.body.date
    if (req.body.status)
        task.status = req.body.status;

    task.save()
        .then(task => res.json(task))
        .catch(e => next(e));

}

/**
 * List movies
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function list(req, res, next) {

    // res.send('pugyooo..');
    // let query = { isDelete: false };

    Task.find({})
        .sort({ createdAt: 1 })
        .populate('createdBy')
        .then(tasks => res.json(tasks))
        .catch(e => next(e));
}

/**
 * Remove movie
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
// function remove(req, res, next) {

//     Movie.findById(req.params.movieId)
//         .then(movie => {
//             movie.isDelete = true;
//             return movie.save();
//         })
//         .then(movie => {
//             res.json(movie);
//         })
//         .catch(e => res.json(e))
// }


/**
 * Update movie
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
// function update(req, res, next) {
//     Movie.findById(req.params.movieId)
//         .then(movie => {
//             if (req.body.title)
//                 movie.title = req.body.title;
//             if (req.body.language)
//                 movie.language = req.body.language;
//             if (req.body.poster)
//                 movie.poster = req.body.poster;

//             return movie.save();
//         })
//         .then(movie => {
//             res.json(movie);
//         })
//         .catch(e => res.json(e))
// }

export default {
    create,
    list
    // remove,
    // update
}