import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbApi } from "./../config";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbApi.getMovieDetails(movieId), fetcher);
  if (!data) return null;
  console.log(data);
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative mb-10">
        <div className="absolute inset-0 bg-black bg-opacity-25"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${tmdbApi.imgOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto relative z-10 -mt-[200px] pb-10">
        <img
          src={`${tmdbApi.imgOriginal(poster_path)}`}
          alt=""
          className="w-full h-full object-cover rounded-xl object-center"
        />
      </div>
      <h1 className="text-white text-4xl text-center font-bold mb-10">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {genres.map((item) => (
            <span
              className="py-2 px-4 border border-primary text-primary"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-sm text-center max-w-[800px] mx-auto mb-10">
        {overview}
      </p>
      <MovieMeta type="credits"></MovieMeta>
      <MovieMeta type="videos"></MovieMeta>
      <MovieMeta type="similar"></MovieMeta>
    </div>
  );
};

function MovieMeta({ type = "videos" }) {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbApi.getMeta(movieId, type), fetcher);
  if (!data) return null;
  if ((type === "credits")) {
    const { cast } = data;
    console.log(cast)
    if (!cast && cast.length <= 0) return null;
    return (
      <div className="py-10">
        <h1 className="text-3xl text-center mb-10">Casts</h1>
        <div className="grid grid-cols-4 gap-5">
          {cast.splice(0, 4).map((item) => (
            <div className="cast-item rounded-lg" key={item.id}>
              <img
                src={`${tmdbApi.imgOriginal(item.profile_path)}`}
                className="w-full h-[350px] object-cover mb-3 rounded-lg"
                alt=""
              />
              <h3 className="text-xl font-medium">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    const { results } = data;
    if (!results || results.length <= 0) return null;
    if ((type === "videos"))
      return (
        <div className="py-10">
          <div className="flex flex-col gap-10">
            {results.splice(0, 2).map((item) => (
              <div key={item.id}>
                <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block">
                  {item.name}
                </h3>
                <div key={item.id} className="w-full aspect-video">
                  <iframe
                    width="885"
                    height="498"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title="s"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full object-fill"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    if ((type === "similar"))
      return (
        <div className="py-10">
          <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
          <div className="movie-list">
            <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
              {results.length > 0 &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item}></MovieCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );
  }
  return null;
}
// function MovieCredits() {
//   const { movieId } = useParams();
//   const { data } = useSWR(tmdbApi.getMeta(movieId, "credits"), fetcher);
//   if (!data) return null;
//   const { cast } = data;
//   if (!cast && cast.length <= 0) return null;

//   return (
//     <div className="py-10">
//       <h1 className="text-3xl text-center mb-10">Casts</h1>
//       <div className="grid grid-cols-4 gap-5">
//         {cast.splice(0, 4).map((item) => (
//           <div className="cast-item" key={item.id}>
//             <img
//               src={`${tmdbApi.imgOriginal(item.profile_path)}`}
//               className="w-full h-[350px] object-cover mb-3"
//               alt=""
//             />
//             <h3 className="text-xl font-medium">{item.name}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function MovieVideos() {
//   const { movieId } = useParams();
//   const { data } = useSWR(tmdbApi.getMeta(movieId, "videos"), fetcher);
//   if (!data) return null;
//   const { results } = data;
//   console.log("results", results);
//   if (!results || results.length <= 0) return null;
//   return (
//     <div className="py-10">
//       <div className="flex flex-col gap-10">
//         {results.splice(0, 2).map((item) => (
//           <div key={item.id}>
//             <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block">
//               {item.name}
//             </h3>
//             <div key={item.id} className="w-full aspect-video">
//               <iframe
//                 width="885"
//                 height="498"
//                 src={`https://www.youtube.com/embed/${item.key}`}
//                 title="s"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                 allowFullScreen
//                 className="w-full h-full object-fill"
//               ></iframe>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function MovieSimilar() {
//   const { movieId } = useParams();
//   const { data } = useSWR(tmdbApi.getMeta(movieId, "similar"), fetcher);
//   if (!data) return null;
//   const { results } = data;
//   if (!results || results.length <= 0) return null;
//   return (
//     <div className="py-10">
//       <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
//       <div className="movie-list">
//         <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
//           {results.length > 0 &&
//             results.map((item) => (
//               <SwiperSlide key={item.id}>
//                 <MovieCard item={item}></MovieCard>
//               </SwiperSlide>
//             ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// }

export default MovieDetailsPage;
