import React from "react";
import { create } from "react-test-renderer";
import Details from "../details";

test("snapshot", () => {
  const c = create(<Details />);
  expect(c.toJSON()).toMatchSnapshot();
});

test("showModalState", () => {
  const c = create(<Details />);
  const instance = c.getInstance();
  expect(instance.state.showModal).toBe(false);
  instance.toggleModal();
  expect(instance.state.showModal).toBe(true);
});
