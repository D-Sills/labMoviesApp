import express from 'express';
import popularMoviesModel from './popularMoviesModel';

const router = express.Router();
router.get('/', (req, res, next) => {
  popularMoviesModel.find().then(popularMovies => res.status(200).send(popularMovies)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  popularMoviesModel.findByMovieDBId(id).then(popularMovies => res.status(200).send(popularMovies)).catch(next);
});

export default router;