import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();

  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFilm() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);

        if (!response.ok) {
          throw new Error("Movie could not be found.");
        }

        const data = await response.json();

        setFilm(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load this movie.");
      } finally {
        setLoading(false);
      }
    }

    fetchFilm();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-white">
        <p className="text-xl">Loading movie...</p>
      </main>
    );
  }

  if (error || !film) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-white">
        <Link to="/" className="text-purple-400 transition hover:text-white">
          ← Back to Movies
        </Link>

        <h1 className="mt-8 text-2xl font-bold">
          {error || "Movie not found"}
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-8 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        {/* BACK BUTTON */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-purple-400 transition hover:text-white"
        >
          ← Back to Movies
        </Link>

        {/* MOVIE DETAILS */}
        <div className="grid gap-10 md:grid-cols-[320px_1fr]">
          {/* MOVIE POSTER */}
          <div>
            <img
              src={film.image?.original || film.image?.medium}
              alt={film.name}
              className="w-full rounded-2xl object-cover shadow-2xl"
            />
          </div>

          {/* MOVIE INFORMATION */}
          <div className="flex flex-col justify-center">
            {/* TITLE */}
            <h1 className="text-5xl font-extrabold tracking-tight">
              {film.name}
            </h1>

            {/* RATING / YEAR / RUNTIME */}
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold">
                ⭐ {film.rating?.average || "N/A"}
              </span>

              <span className="rounded-full bg-slate-800 px-4 py-2 text-sm">
                📅 {film.premiered?.slice(0, 4) || "Unknown"}
              </span>

              <span className="rounded-full bg-slate-800 px-4 py-2 text-sm">
                ⏱ {film.runtime || "N/A"} min
              </span>
            </div>

            {/* GENRES */}
            <div className="mt-6 flex flex-wrap gap-2">
              {film.genres?.map((genre) => (
                <span
                  key={genre}
                  className="rounded-md border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* DESCRIPTION */}
            <div
              className="mt-7 max-w-3xl text-lg leading-8 text-gray-300"
              dangerouslySetInnerHTML={{
                __html: film.summary || "No description available.",
              }}
            />

            {/* ACTION BUTTONS */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to={`/watch/${film.id}`}
                className="rounded-lg bg-purple-600 px-7 py-3 font-semibold transition hover:bg-purple-500"
              >
                ▶ Watch Now
              </Link>

              <button className="rounded-lg border border-slate-600 bg-slate-800 px-7 py-3 font-semibold transition hover:bg-slate-700">
                ♡ Add to Favorites
              </button>
            </div>

            {/* OFFICIAL WEBSITE */}
            {film.officialSite && (
              <a
                href={film.officialSite}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block text-purple-400 hover:text-purple-300"
              >
                Visit Official Website →
              </a>
            )}
          </div>
        </div>

        {/* ABOUT MOVIE */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold">About {film.name}</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {/* LANGUAGE */}
            <div className="rounded-xl bg-slate-900 p-6">
              <p className="text-sm text-gray-400">Language</p>

              <p className="mt-2 font-semibold">{film.language || "Unknown"}</p>
            </div>

            {/* STATUS */}
            <div className="rounded-xl bg-slate-900 p-6">
              <p className="text-sm text-gray-400">Status</p>

              <p className="mt-2 font-semibold">{film.status || "Unknown"}</p>
            </div>

            {/* TYPE */}
            <div className="rounded-xl bg-slate-900 p-6">
              <p className="text-sm text-gray-400">Type</p>

              <p className="mt-2 font-semibold">{film.type || "Unknown"}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default MovieDetails;
