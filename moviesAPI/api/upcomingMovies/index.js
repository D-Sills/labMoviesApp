import express from 'express';
// import { movieReviews } from './moviesData';
import upcomingMoviesModel from './upcomingMoviesModel';
// import uniqid from 'uniqid';

const router = express.Router();
router.get('/', (req, res, next) => {
  upcomingMoviesModel.find().then(upcomingMovies => res.status(200).send(upcomingMovies)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  upcomingMoviesModel.findByMovieDBId(id).then(upcomingMovies => res.status(200).send(upcomingMovies)).catch(next);
});

// // Get movie reviews
// router.get('/:id/reviews', (req, res) => {
//     const id = parseInt(req.params.id);
//     // find reviews in list
//     if (movieReviews.id == id) {
//         res.status(200).json(movieReviews);
//     } else {
//         res.status(404).json({
//             message: 'The resource you requested could not be found.',
//             status_code: 404
//         });
//     }
// });

// //Post a movie review
// router.post('/:id/reviews', (req, res) => {
//     const id = parseInt(req.params.id);

//     if (movieReviews.id == id) {
//         req.body.created_at = new Date();
//         req.body.updated_at = new Date();
//         req.body.id = uniqid();
//         movieReviews.results.push(req.body); //push the new review onto the list
//         res.status(201).json(req.body);
//     } else {
//         res.status(404).json({
//             message: 'The resource you requested could not be found.',
//             status_code: 404
//         });
//     }
// });

export default router;