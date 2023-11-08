import React, { useState } from "react";
import * as Icons from "heroicons-react";
import { createSearchParams, useNavigate } from "react-router-dom";
import ModalCart from "./ModalCart";

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <>
      <div className="header flex bg-black-800 w-full px-[24px] py-[16px] items-center justify-between flex-3">
        <img
          onClick={() => navigate("/home")}
          src="https://www.freepnglogos.com/uploads/star-wars-logo-0.png"
          className="w-[7%] cursor-pointer"
        />
        <div className="grid grid-cols-4 gap-20">
          <p className="text-white">Title</p>
          <p className="text-white">Movies</p>
          <p className="text-white">Top IMDB</p>
          <p className="text-white">Other</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative w-[300px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Icons.Search />
            </div>
            <input
              type="text"
              onInput={(e: any) => setSearch(e.target.value)}
              onKeyDown={(e: any) =>
                e.key == "Enter" &&
                navigate({
                  pathname: "/home",
                  search:
                    search !== ""
                      ? `?${createSearchParams({
                          search: search,
                        })}`
                      : undefined,
                })
              }
              id="movie-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search movie name..."
            />
          </div>
          <Icons.ShoppingBag
            className="border border-white p-1 rounded-lg cursor-pointer"
            width={38}
            height={38}
            onClick={() => setOpen(true)}
          />
        </div>
      </div>
      {isOpen && <ModalCart handleModal={setOpen} />}
    </>
  );
};

export default Header;
