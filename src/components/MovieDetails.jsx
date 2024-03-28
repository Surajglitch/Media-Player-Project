import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import Loading from "./Loading";
import HorizontalCards from "./templates/HorizontalCards";
import Trailer from "./templates/Trailer";

function MovieDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.movie);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, []);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.8)) , 
      url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path}) `,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[200vh] px-[10%] "
    >
      {/* //part 1 navigtion */}
      <nav className="w-full h-[10vh] text-zinc-100 flex items-center gap-10 text-xl ">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[violet] ri-arrow-left-line"
        ></Link>

        <a target="_blank" href={info.details.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>

        <a
          target="_blank"
          href={`https://m.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill "></i>
        </a>

        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          {" "}
          imdb
        </a>
      </nav>

      {/* part2 poster and details */}
      <div className="w-full flex h-[40vh] mb-[22%] ">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]  object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.details.backdrop_path || info.details.poster_path
          }`}
          alt=""
        />

        <div className="content text-white ml-[5%]  ">
          <h1 className="text-3xl font-black text-white ">
            {info.details.title ||
              info.details.original_name ||
              info.details.name ||
              info.details.original_title}
            <span className="text-xl font-bold text-zinc-200 ">
              ({info.details.release_date.split("-")[0]})
            </span>
          </h1>

          <div className="flex mt-5 mb-3 text-white items-center gap-x-5 gap-y-10 ">
            <span className="text-white flex text-[1rem] items-center justify-center bg-yellow-600 h-[7vh] rounded-full  w-[7vh] ">
              {(info.details.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <h1 className="font-semibold w-[50px] leading-6 ">User Score</h1>
            <h1 className="">{info.details.release_date.split("-")[0]}</h1>
            <h1 className="info">
              {info.details.genres.map((g) => g.name).join(",")}
            </h1>
            <h1>{info.details.runtime}min</h1>
          </div>

          <h1 className="text-xl font-semibold italic text-zinc-200 ">
            {info.details.tagline}
          </h1>
          <h1 className="text-xl font-semibold mt-3 text-zinc-200 mb-2 ">
            Overview
          </h1>
          <p className="text-sm">{info.details.overview}</p>

          <h1 className="text-xl font-semibold mt-3 text-zinc-200 mb-2 ">
            Translations
          </h1>
          <p className="text-sm mb-5 ">{info.translations.join(" ")}</p>

          <Link
            className="bg-violet-400 rounded-lg px-4 py-3 "
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-fill mr-2 "></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* part 3 available on platform */}
      <div className="w-[20%] flex flex-col mt-[-20%]">
        <div className="top-0">
          {/* Available on Flatrate */}
          {info.watchprovider && info.watchprovider.flatrate && (
            <div className="flex gap-x-10 items-center text-white">
              <h1>Available on Platform</h1>
              {info.watchprovider.flatrate.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}

          {/* Available on Rent */}
          {info.watchprovider && info.watchprovider.rent && (
            <div className="flex gap-x-10 items-center text-white">
              <h1>Available on Rent</h1>
              {info.watchprovider.rent.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] object-cover rounded-md mt-3"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}

          {/* Available to Buy */}
          {info.watchprovider && info.watchprovider.buy && (
            <div className="flex gap-x-10 items-center text-white mt-3">
              <h1>Available to Buy</h1>
              {info.watchprovider.buy.map((w, i) => (
                <img
                  key={i}
                  title={w.provider_name}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* part 4 recommendations */}
      <div className=" mt-[20%]">
        <h1 className="text-xl font-semibold text-white ">Recommendations</h1>
        <HorizontalCards
          data={
            info.recommendations.length > 0
              ? info.recommendations
              : info.similar
          }
        />
      </div>
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
}

export default MovieDetails;
