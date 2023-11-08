import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as Icons from "heroicons-react";
import Character from "./Character";
import ModalCart from "./ModalCart";
import { CartContext } from "src/App";
import Loading from "../components/Loading";

const Detail = () => {
  const { cart, setCart } = useContext<any>(CartContext);
  const { state } = useLocation();
  const [film, setFilm] = useState<any>({});
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchDetailFilm = async () => {
    setIsLoading(true);
    let results = await fetch(state?.detailUrl);
    const data = await results.json();
    setFilm(data);
    setIsLoading(false);
  };

  const _handleChange = (sel: any) => {
    let newSelectedValue = [...cart];
    if (!newSelectedValue.some((value: any) => value?.title === sel?.title)) {
      newSelectedValue.push({ ...sel, price: 123000 });
    }
    setCart(newSelectedValue);
  };

  const handleOpenModal = (data: any) => {
    if (isOpen) {
      document.body.style.overflow = "unset";
    } else {
      _handleChange(data);
      if (typeof window != "undefined" && window.document) {
        document.body.style.overflow = "hidden";
      }
    }

    setOpen(!isOpen);
  };

  useEffect(() => {
    fetchDetailFilm();
  }, []);
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="divide-y divide-dashed">
          <div className="p-6 flex">
            <div>
              <img
                src="https://www.originalfilmart.com/cdn/shop/products/Star_wars_last_jedi_2017_advance_intl_original_film_art_a.jpg?v=1551894963"
                className="h-[500px] rounded-md flex-shrink-0"
              />
            </div>
            <div className="flex flex-col px-12 max-w-3xl">
              <p className="text-5xl">{film?.title}</p>
              <p className="text-lg mt-6  text-justify">
                {film?.opening_crawl}
              </p>
              <div className="flex justify-between mt-12">
                <p>
                  <span className="font-bold">Language</span>: English
                </p>
                <p>
                  <span className="font-bold">Quality:</span> HD
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <p>
                  <span className="font-bold">Director:</span> {film?.director}
                </p>
                <p>
                  <span className="font-bold">Language:</span> English
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <p>
                  <span className="font-bold">Producer:</span> {film?.producer}
                </p>
                <p>
                  <span className="font-bold">Price:</span> IDR 123.000
                </p>
              </div>

              <div className="flex justify-end w-full mt-4">
                <button
                  onClick={() => handleOpenModal(film)}
                  className="flex gap-1 rounded-lg px-4 py-2 bg-gray-600 text-gray-100 hover:bg-gray-700 duration-300"
                >
                  <Icons.ShoppingBag />
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="video-responsive">
              <p className="text-3xl mb-4">Watch the Trailer</p>
              <iframe
                width="315"
                height="180"
                src="https://www.youtube.com/embed/sGbxmsDFVnE?si=ezIIb2yISO3BofI0"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            </div>
          </div>
          <div className="flex flex-col p-6">
            <p className="text-xl font-bold">Characters</p>
            <div className="grid grid-cols-7 items-center mt-6 gap-6">
              {film?.characters?.map((data, index) => {
                return <Character key={index} characterUrl={data} />;
              })}
            </div>
          </div>
        </div>
      )}
      {isOpen && <ModalCart handleModal={handleOpenModal} />}
    </>
  );
};

export default Detail;
