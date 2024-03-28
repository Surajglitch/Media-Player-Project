import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Trending from './components/Trending';
import Popular from './components/Popular';
import Movie from './components/Movie';
import TvShows from './components/TvShows';
import People from './components/People';
import MovieDetails from './components/MovieDetails';
import TvDetails from './components/TvDetails';
import PersonDetails from './components/PersonDetails';
import Trailer from './components/templates/Trailer';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className='bg-[#1F1E24] w-full h-screen flex'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />

        <Route path="/movie" element={<Movie />}></Route>
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/tvshows" element={<TvShows />}></Route>
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/people" element={<People />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
