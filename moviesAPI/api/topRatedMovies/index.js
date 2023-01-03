import express from 'express';
import topRatedMoviesModel from './topRatedMoviesModel';

const router = express.Router();
router.get('/', (req, res, next) => {
  topRatedMoviesModel.find().then(topRatedMovies => res.status(200).send(topRatedMovies)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  topRatedMoviesModel.findByMovieDBId(id).then(topRatedMovies => res.status(200).send(topRatedMovies)).catch(next);
});

export default router;