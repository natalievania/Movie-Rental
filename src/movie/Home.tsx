import React from "react";

import ListMovie from "./ListMovie";
import ModalCart from "./ModalCart";

function Home({ openModal, setOpenModal }) {
  return (
    <div className="wrapper bg-black">
      <ListMovie />
      {openModal && <ModalCart handleModal={setOpenModal} />}
    </div>
  );
}

export default Home;
