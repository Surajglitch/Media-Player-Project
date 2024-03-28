import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpeg";

function Topnav() {
  const [query, setQuery] = useState("");
  const [searches, setsearches] = useState([]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  return (
    <div className="w-[80%] mx-auto h-[10vh] relative flex items-center  ">
      <i className="text-3xl text-zinc-400 ri-search-fill"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[50%] mx-10 p-5 text-xl outline-none border-none bg-transparent text-white"
        type="text"
        placeholder="search anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="ri-close-fill text-zinc-400 text-2xl"
        ></i>
      )}
      <div className="w-[50%] z-[100] absolute bg-zinc-200 max-h-[50vh] top-[90%] overflow-auto">
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="w-full inline-block w-full p-10 text-zinc-800 hover:text-black duration-3 hover:bg-zinc-300 font-semibold flex justify-start border-b-2 border-zinc-100 items-center"
          >
            <img
              className="w-[10vh] h-[10vh] object-cover rounded-md mr-10 shadow-lg"
              src={
                s.backdrop_path || s.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      s.backdrop_path || s.profile_path
                    }`
                  : noimage
              }
              alt=""
            />
            <span>
              {s.title || s.original_name || s.name || s.original_title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Topnav;
