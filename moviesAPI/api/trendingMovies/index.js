import express from 'express';
import trendingMoviesModel from './trendingMoviesModel';

const router = express.Router();
router.get('/', (req, res, next) => {
  trendingMoviesModel.find().then(trendingMovies => res.status(200).send(trendingMovies)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  trendingMoviesModel.findByMovieDBId(id).then(trendingMovies => res.status(200).send(trendingMovies)).catch(next);
});

export default router;