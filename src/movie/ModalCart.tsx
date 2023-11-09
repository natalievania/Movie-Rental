import React, { useContext } from "react";
import * as Icons from "heroicons-react";
import { CartContext } from "src/App";

const ModalCart = ({
  handleModal,
}: {
  handleModal: (value: boolean) => void;
}) => {
  const { cart, setCart } = useContext<any>(CartContext);

  const sum = cart.reduce((accumulator, object) => {
    return accumulator + object.price;
  }, 0);

  const _handleChange = (sel: any) => {
    let newSelectedValue = [...cart];
    if (!newSelectedValue.some((value: any) => value?.title === sel?.title)) {
      newSelectedValue.push(sel);
    } else {
      newSelectedValue = newSelectedValue.filter(
        (newSelected: any) => newSelected?.title !== sel.title
      );
    }
    setCart(newSelectedValue);
  };
  return (
    <>
      <div className="bg-black bg-opacity-80 fixed inset-0 mx-auto my-auto p-4 flex justify-center">
        <div className="fixed inset-0 mt-8 my-auto p-4 flex justify-center">
          <div className="relative w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Your Cart
                </p>
                <Icons.X
                  onClick={() => handleModal(false)}
                  className="cursor-pointer"
                  width={20}
                  height={20}
                />
              </div>
              <div className="p-4 space-y-6 max-h-[400px] overflow-y-auto">
                {cart?.length > 0 && (
                  <button
                    onClick={() => setCart([])}
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Clear Cart
                  </button>
                )}
                {cart?.length > 0 &&
                  cart?.map((data, index) => {
                    return (
                      <div
                        className="cart-movie flex justify-between gap-4 w-full"
                        key={index}
                      >
                        <div className="flex gap-4 w-full">
                          <img
                            src="https://www.originalfilmart.com/cdn/shop/products/Star_wars_last_jedi_2017_advance_intl_original_film_art_a.jpg?v=1551894963"
                            className="h-[150px] rounded-md"
                          />
                          <div className="flex flex-col gap-2">
                            <p>IDR {data?.price}</p>
                            <p className="text-xl font-bold">{data?.title}</p>
                            <p className="text-sm">
                              <span className="font-bold">Language: </span>
                              English
                            </p>
                            <p className="text-sm">Until December 2023</p>
                          </div>
                        </div>
                        <Icons.MinusCircleOutline
                          className="cursor-pointer"
                          width={30}
                          height={30}
                          onClick={() => _handleChange(data)}
                        />
                      </div>
                    );
                  })}
                {cart?.length == 0 && (
                  <div className="flex w-full h-[200px] justify-center items-center">
                    <p className="text-xl">No Movie on your Cart</p>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <div className="flex gap-16">
                  <p className="">Total</p>
                  <p className="">IDR {sum}</p>
                </div>
                {cart?.length > 0 && (
                  <button
                    onClick={() => handleModal(false)}
                    type="button"
                    className="text-white disabled:bg-red bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Checkout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCart;
