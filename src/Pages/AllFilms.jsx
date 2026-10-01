import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

function AllFilms() {
  const [Films, SetFilms] = useState([]);
  const { search } = useOutletContext();

  useEffect(() => {
    async function fetchFilms() {
      try {
        const response = await fetch("https://api.tvmaze.com/shows");
        const data = await response.json();

        console.log(data);

        SetFilms(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchFilms();
  }, []);

  // SEARCH MOVIES
  const searchedFilms = Films.filter((film) =>
    film.name.toLowerCase().includes(search.toLowerCase()),
  );

  const dramaFilms = searchedFilms.filter((film) =>
    film.genres?.includes("Drama"),
  );

  const actionFilms = searchedFilms.filter((film) =>
    film.genres?.includes("Action"),
  );

  const comedyFilms = searchedFilms.filter((film) =>
    film.genres?.includes("Comedy"),
  );

  const shortFilms = searchedFilms.filter(
    (film) => film.runtime && film.runtime <= 30,
  );

  function MovieRow({ title, films }) {
    return (
      <section className="mb-14 w-full">
        {/* SECTION HEADER */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{title}</h2>

          <button className="text-sm font-medium text-gray-300 hover:text-purple-400">
            See all
          </button>
        </div>

        {/* MOVIE ROW */}
        <div
          style={{
            width: "100%",
            overflowX: "auto",
            overflowY: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              gap: "20px",
              width: "max-content",
            }}
          >
            {films.slice(0, 12).map((film) => (
              <Link
                key={film.id}
                to={`/movie/${film.id}`}
                onClick={() =>
                  console.log("CLICKED MOVIE:", film.id, film.name)
                }
                style={{
                  width: "180px",
                  minWidth: "180px",
                  flexShrink: 0,
                  textDecoration: "none",
                }}
                className="overflow-hidden rounded-xl bg-slate-900 shadow-lg transition duration-300 hover:-translate-y-2"
              >
                {/* MOVIE IMAGE */}
                <div className="relative">
                  <img
                    src={film.image?.medium}
                    alt={film.name}
                    className="h-[260px] w-full object-cover"
                  />

                  {/* RATING */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent p-3 pt-10">
                    <div className="flex items-center gap-1 text-sm text-yellow-400">
                      ⭐
                      <span className="text-white">
                        {film.rating?.average || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* MOVIE DETAILS */}
                <div className="bg-slate-900 p-3">
                  <h3 className="truncate text-base font-semibold text-white">
                    {film.name}
                  </h3>

                  <p className="mt-1 truncate text-xs text-purple-300">
                    {film.genres?.join(" • ") || "Movie"}
                  </p>

                  <p className="mt-2 text-xs text-gray-300">
                    {film.premiered?.slice(0, 4) || "Unknown year"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-8 py-10">
      <div className="w-full">
        {/* PAGE HEADER */}
        <div className="mb-12">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-purple-400">
            Discover
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white">
            All Films
          </h1>

          <p className="mt-3 max-w-2xl text-gray-300">
            Discover movies and shows across different genres.
          </p>
        </div>

        {/* SEARCH RESULT MESSAGE */}
        {search && (
          <p className="mb-8 text-lg text-purple-300">
            Search results for:{" "}
            <span className="font-bold text-white">{search}</span>
          </p>
        )}

        {/* MOVIE ROWS */}
        <MovieRow title="Drama" films={dramaFilms} />

        <MovieRow title="Action" films={actionFilms} />

        <MovieRow title="Comedy" films={comedyFilms} />

        <MovieRow title="Short Movies" films={shortFilms} />

        {/* NO RESULTS */}
        {search && searchedFilms.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-5xl">🎬</p>

            <h2 className="mt-5 text-2xl font-bold text-white">
              No movies found
            </h2>

            <p className="mt-2 text-gray-300">
              Try searching for another movie.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default AllFilms;
