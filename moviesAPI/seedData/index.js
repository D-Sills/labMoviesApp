import userModel from '../api/users/userModel';
import users from './users';
import dotenv from 'dotenv';
import movieModel from '../api/movies/movieModel';
import movies from './movies.js';
import genreModel from '../api/genres/genreModel';
import genres from './genres';
import nowPlayingModel from '../api/nowPlaying/nowPlayingModel';
import nowPlaying from './nowPlaying';
import upcomingModel from '../api/upcomingMovies/upcomingModel';
import upcoming from './upcoming';
import topMoviesModel from '../api/topMovies/topMoviesModel';
import topMovies from './topMovies';

dotenv.config();

// deletes all user documents in collection and inserts test data
export async function loadUsers() {
  console.log('load user Data');
  try {
    await userModel.deleteMany();
    await users.forEach(user => userModel.create(user));
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
}

// deletes all movies documents in collection and inserts test data
export async function loadMovies() {
  console.log('load seed data');
  console.log(movies.length);
  try {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}

// deletes all movies documents in collection and inserts test data
export async function loadTopMovies() {
  console.log('load seed data');
  console.log(topMovies.length);
  try {
    await topMoviesModel.deleteMany();
    await topMoviesModel.collection.insertMany(topMovies);
    console.info(`${topMovies.length} Top Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}

// deletes all movies documents in collection and inserts test data
export async function loadUpcomingMovies() {
  console.log('load seed data');
  console.log(upcoming.length);
  try {
    await upcomingModel.deleteMany();
    await upcomingModel.collection.insertMany(upcoming);
    console.info(`${upcoming.length} Upcoming Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}


// deletes all movies documents in collection and inserts test data
export async function loadInCinemaMovies() {
  console.log('load seed data');
  console.log(nowPlaying.length);
  try {
    await nowPlayingModel.deleteMany();
    await nowPlayingModel.collection.insertMany(nowPlaying);
    console.info(`${nowPlaying.length} In Cinema Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}


export async function loadGenres() {
  console.log('load seed data');
  console.log(genres.length);
  try {
    await genreModel.deleteMany();
    await genreModel.collection.insertMany(genres);
    console.info(`${genres.length} Genres were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load Genre Data: ${err}`);
  }
}

if (process.env.SEED_DB) {
  loadUsers();
  loadMovies();
  loadGenres();//you may not need this line if you skipped the exercises

  loadInCinemaMovies();
  loadTopMovies();
  loadUpcomingMovies();
  
}