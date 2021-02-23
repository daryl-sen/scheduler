import React from "react";
import { render } from "@testing-library/react";
import Application from "components/Application";

it.skip("renders without crashing", () => {
  render(<Application />);
});