import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AllFilms from "./Pages/AllFilms";
import Shorts from "./Pages/Shorts";
import TvShows from "./Pages/TvShows";
import MovieDetails from "./Pages/MovieDetails";
import WatchMovie from "./Pages/WatchMovie";

function App() {
  return (
    <Routes>
      <Route element={<Dashboard />} path="/">
        <Route element={<AllFilms />} index />
        <Route element={<Shorts />} path="shorts" />
        <Route element={<TvShows />} path="tv-Shows" />
        <Route element={<MovieDetails />} path="movie/:id" />
        <Route element={<WatchMovie />} path="watch/:id" />
      </Route>
    </Routes>
  );
}

export default App;
