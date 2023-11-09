import React, { useEffect, useState } from "react";
import * as Icons from "heroicons-react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const ListMovie = () => {
  const history = useNavigate();
  const usp =
    window.location.search.replace("?search=", "") == ""
      ? ""
      : window.location.search;
  const [listFilm, setListFilm] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchFilms = async () => {
    setIsLoading(true);
    let results = await fetch(`https://swapi.dev/api/films/${usp}`);
    const data = await results.json();
    setListFilm(data?.results);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFilms();
  }, [usp]);

  return (
    <div
      className="movie-list px-[24px] flex overflow-x-auto space-x-8"
      id="movie-list"
    >
      {isLoading && <Loading />}
      {!isLoading &&
        listFilm?.map((data: any, index) => {
          return (
            <div
              className="group flex flex-col items-center w-[245px] cursor-pointer flex-shrink-0"
              key={index}
              onClick={() =>
                history("/detail", { state: { detailUrl: data?.url } })
              }
            >
              <div className="h-[400px] relative">
                <img
                  src="https://www.originalfilmart.com/cdn/shop/products/Star_wars_last_jedi_2017_advance_intl_original_film_art_a.jpg?v=1551894963"
                  className="h-[400px] rounded-md group-hover:opacity-30"
                />
                <Icons.PlayOutline
                  width={70}
                  height={70}
                  className="absolute inset-0 mx-auto my-auto group-hover:visible invisible"
                />
                <p className="absolute top-0 right-0 p-1 bg-black rounded-sm">
                  HD
                </p>
                <p className="absolute top-0 left-0 p-1 bg-slate-800 rounded-sm">
                  Episode {data?.episode_id}
                </p>
              </div>
              <p className="title transform group-hover:scale-150 group-hover:underline transition duration-500 ease-in-out text-lg font-bold py-1 px-4 rounded-lg">
                {data?.title}
              </p>
              <div className="flex justify-between w-full items-center">
                <p className="p-1 text-sm">
                  {data?.release_date.substring(0, 4)}
                </p>
                <span className="border-solid rounded-lg border-2 border-white p-1 text-center text-sm">
                  IDR 123.000
                </span>
              </div>
              <p className="text-sm text-justify line-clamp-3 w-full mt-2">
                {data?.opening_crawl}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default ListMovie;
