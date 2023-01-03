import express from 'express';
import upcomingModel from './upcomingModel';

const router = express.Router();
router.get('/', (req, res, next) => {
  upcomingModel.find().then(popularMovies => res.status(200).send(popularMovies)).catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  upcomingModel.findByMovieDBId(id).then(popularMovies => res.status(200).send(popularMovies)).catch(next);
});

export default router;