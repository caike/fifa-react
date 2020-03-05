import React from "react";
import { render, cleanup, act } from "@testing-library/react";
import App from "./../App.js";

import { loadUser, fetchList } from "./../utils";

jest.mock("./../utils");

beforeEach(cleanup);

describe("Not logged in", () => {
  beforeEach(() => {
    const userNotLoggedIn = new Promise(resolve => resolve(false));
    loadUser.mockResolvedValue(userNotLoggedIn);
  });

  it("sees Login option", async () => {
    const { getByText } = render(<App />);
    expect(getByText("Login")).toBeInTheDocument();
  });
});

describe("Logged in", () => {
  beforeEach(() => {
    const userLoggedIn = new Promise(resolve => resolve(true));
    loadUser.mockResolvedValue(userLoggedIn);
    const emptyList = new Promise(resolve =>
      resolve({
        json: function() {
          return { winners: [] };
        }
      })
    );
    fetchList.mockResolvedValue(emptyList);
  });

  it("does not see Login option", async () => {
    let queryByText;
    await act(async () => {
      ({ queryByText } = render(<App />));
    });
    expect(queryByText("Login")).not.toBeInTheDocument();
  });
});
