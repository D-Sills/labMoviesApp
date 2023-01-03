import express from 'express';
import topMoviesModel from './topMoviesModel';

const router = express.Router();
router.get('/', (req, res, next) => {
  topMoviesModel.find().then(topMovies => res.status(200).send(topMovies)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  topMoviesModel.findByMovieDBId(id).then(topMovies => res.status(200).send(topMovies)).catch(next);
});

export default router;