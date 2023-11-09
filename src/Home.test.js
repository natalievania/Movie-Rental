import React from "react";
import { shallow, mount } from "enzyme";
import ListMovie from "./movie/ListMovie";
import App from "./App";
import Header from "./movie/Header";
import { BrowserRouter } from "react-router-dom";

describe("Test Home Page", function () {
  it("should match elements", function () {
    const wrapper = shallow(<App />);
    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it("should search movie", function () {
    const wrapper = mount(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const form = wrapper.find(".search-movie");
    form.simulate("click");
    expect(form.length).toEqual(1);
    form.simulate("change", { target: { value: "Star" } });
    expect(form.find(".search-movie").get(0).value).toEqual("Star");
  });
});
