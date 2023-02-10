import React from "react";
import useSWR from "swr";
import { fetcher, tmdbApi } from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from './../button/Button';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=7f6b99e3545a53bd76e1b58193b53d69`,
    fetcher
  );
  const movies = data?.results || [];
  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      <Swiper>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItems item={item}></BannerItems>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
function BannerItems({item}) {
    const {title, poster_path, id} = item;
    const navigate = useNavigate();
  return (
    <div className="w-full h-full rounded-lg relative">
      <div
        className="overlay absolute inset-0 bg-gradient-to-l from-[rgba(0,0,0,0.5)] 
          to-[rgba(0,0,0,0.5)] rounded-lg"
      ></div>
      <img
        src={`${tmdbApi.img500(poster_path)}`}
        alt=""
        className="w-full h-full object-cover rounded-lg object-top"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="py-2 px-4 border border-white rounded-md">
            Action
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Adventure
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Drama
          </span>
        </div>
        <Button bgColor='primary' onClick={() => navigate(`/movie/${id}`)}>Watch now</Button>
      </div>
    </div>
  );
}
export default Banner;
//213
