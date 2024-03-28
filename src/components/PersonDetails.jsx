import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import Loading from "./Loading";
import HorizontalCards from "./templates/HorizontalCards";
import Trailer from "./templates/Trailer";
import { asyncloadperson } from "../store/actions/PersonAction";
import { removeperson } from "../store/reducers/personSlice";
import Dropdown from "./templates/Dropdown";

function PersonDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.person);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [category, setcategory] = useState("Movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, []);

  return info ? (
    <div className="px-[10%] w-screen h-[220vh] bg-zinc-900 ">
      {" "}
      <nav className="w-full h-[10vh] text-zinc-100 flex items-center gap-10 text-xl ">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[violet] ri-arrow-left-line"
        ></Link>
      </nav>
      {/* part 2 left poster and details */}
      <div className="w-full  flex ">
        <div className=" w-[20%] ">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh]   
           "
            src={`https://image.tmdb.org/t/p/original/${info.details.profile_path}`}
            alt=""
          />
          <hr className="w-[88%] mt-5 " />
          <div className="text-white flex gap-5 mt-5 ">
            <a
              target="_blank"
              href={`https://m.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill "></i>
            </a>

            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-earth-fill "></i>
            </a>

            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-facebook-circle-fill "></i>
            </a>

            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-fill "></i>
            </a>
          </div>

          <h1 className="text-xl text-zinc-400 font-semibold ">
            personal info
          </h1>
          <h1 className=" text-zinc-400 font-semibold ">Known for</h1>
          <h1 className="  text-zinc-400 font-semibold ">
            {info.details.known_for_department}
          </h1>
          <h1 className=" text-zinc-400 mt-3 font-semibold ">Gender</h1>
          <h1 className="text-zinc-400 font-semibold ">
            {info.details.gender === 2 ? "Male" : "Female"}
          </h1>
          <h1 className=" text-zinc-400 mt-3 font-semibold ">Birth Day</h1>
          <h1 className=" text-zinc-400 font-semibold ">
            {info.details.birthday}
          </h1>
          <h1 className=" text-zinc-400 mt-3 font-semibold ">Death Day</h1>
          <h1 className=" text-zinc-400 font-semibold ">
            {info.details.deathday ? info.details.deathday : "Alive"}
          </h1>
          <h1 className=" text-zinc-400 mt-3 font-semibold ">Place of birth</h1>
          <h1 className=" text-zinc-400 font-semibold ">
            {info.details.place_of_birth ? info.details.deathday : "Alive"}
          </h1>
          <h1 className=" text-zinc-400 mt-3 font-semibold ">Also Known As</h1>
          <h1 className=" text-zinc-400 font-semibold ">
            {info.details.also_known_as}
          </h1>
        </div>

        {/* part 3details an informations  */}

        <div className="w-[80%] ml-[5%] text-zinc-400 ">
          <h1 className="text-4xl text-zinc-400 font-semibold ">
            {info.details.name}
          </h1>
          <h1 className="text-xl text-zinc-400 font-semibold ">Known for </h1>
          <h1 className=" text-zinc-400 font-semibold ">
            {info.details.known_for_department}
          </h1>
          <h1 className=" text-zinc-400 font-semibold ">Biography</h1>
          <p>{info.details.biography}</p>

          <h1 className="text-lg text-zinc-400 mt-5 font-semibold ">
            Movies and TvShows
          </h1>
          <HorizontalCards data={info.CombinedCredits.cast} />

          <div className="w-full flex justify-between ">
            <h1 className="text-xl text-zinc-400 mt-5 font-semibold ">
              Actings
            </h1>
            <Dropdown
              title="category"
              options={["Tv", "Movie"]}
              func={(e) => e.target.value}
            />
          </div>
          <div className="list-disc text-zinc-400 w-full h-[50vh] overflow-x-hidden shadow-[rgba(255,255,255,.3)]  border-2 border-zinc-700 overflow-y-auto shadow-xl ">
            {info[category + "Credits"].cast.map((c, i) => (
              <li className="hover:text-white duration:300 cursor-pointer">
                <Link to={`/${category}/details/${c.id}`} className="">
                  {" "}
                  <span>
                    {c.title || c.original_name || c.name || c.original_title}
                  </span>
                  <span className="block"> Character Name: {c.character}</span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
}

export default PersonDetails;
