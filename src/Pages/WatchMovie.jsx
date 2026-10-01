import { Link, useParams } from "react-router-dom";

function WatchMovie() {
  const { id } = useParams();

  return (
    <main className="min-h-screen bg-slate-950 px-8 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        {/* BACK BUTTON */}
        <Link
          to={`/movie/${id}`}
          className="mb-8 inline-block text-purple-400 hover:text-white"
        >
          ← Back to Movie
        </Link>

        <div className="rounded-2xl bg-slate-900 p-8">
          <h1 className="text-3xl font-bold">Watch Trailer</h1>

          <p className="mt-3 text-gray-400">Trailer for movie ID: {id}</p>

          {/* VIDEO PLAYER */}
          <div className="mt-8 overflow-hidden rounded-xl bg-black">
            <video
              controls
              className="h-auto w-full"
              poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
            >
              <source
                src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
                type="video/mp4"
              />
              Your browser does not support video playback.
            </video>
          </div>
        </div>
      </div>
    </main>
  );
}

export default WatchMovie;
