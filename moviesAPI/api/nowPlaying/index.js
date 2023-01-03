import express from 'express';
import nowPlayingModel from './nowPlayingModel';

const router = express.Router();
router.get('/', (req, res, next) => {
  nowPlayingModel.find().then(InCinemaMovies => res.status(200).send(InCinemaMovies)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  nowPlayingModel.findByMovieDBId(id).then(InCinemaMovies => res.status(200).send(InCinemaMovies)).catch(next);
});

export default router;