import React from "react";
import { shallow, mount } from "enzyme";
import { MockedProvider, wait } from "@apollo/react-testing";
import toJson from "enzyme-to-json";
import { act } from "react-dom/test-utils";
import Players from "../components/Players";
import PLAYERS_QUERY from "../graphql/players.query";
import { playersData } from "./mock/players";

const playersMock = {
  request: { query: PLAYERS_QUERY },
  result: {
    data: {
      players: playersData,
    },
  },
};

describe("Players", () => {
  it("matches the snapshot", () => {
    const wrapper = shallow(
      <MockedProvider addTypename={false} mocks={[]} resolvers={{}}>
        <Players />
      </MockedProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it("shows loading element while fetching players", async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(
        <MockedProvider addTypename={false} mocks={[playersMock]} resolvers={{}}>
          <Players />
        </MockedProvider>
      );
    });

    expect(wrapper).toBeTruthy();
    expect(wrapper.contains(<p id="loading">Loading...</p>)).toEqual(true);
  });
  it("should fetch and display players data", async () => {
    let wrapper;
    await act(async () => {
      // Mount the component
      wrapper = mount(
        <MockedProvider addTypename={false} mocks={[playersMock]} resolvers={{}}>
          <Players />
        </MockedProvider>
      );

      // Wait until the query is resolved
      await wait(0);
      wrapper.update();
    });

    // console.log(wrapper.html());

    expect(wrapper.contains(<th>Ezekiel Elliott</th>)).toEqual(true);
    expect(wrapper.contains(<th>Derrick Henry</th>)).toEqual(true);
  });
  it("should go to page 2 of pagination when Next button is clicked", async () => {
    let wrapper;
    await act(async () => {
      // Mount the component
      wrapper = mount(
        <MockedProvider addTypename={false} mocks={[playersMock]} resolvers={{}}>
          <Players />
        </MockedProvider>
      );

      // Wait until the query is resolved
      await wait(0);
      wrapper.update();
    });

    let activeLink = wrapper.find("li.page-item.active");
    // Starts on pagination page 1
    expect(activeLink.contains(1)).toEqual(true);

    const nextButton = wrapper.find('[aria-label="Next"]');
    const previousButton = wrapper.find('[aria-label="Previous"]');

    nextButton.simulate("click");

    activeLink = wrapper.find("li.page-item.active");
    // Clicking nextButton moves pagination to page 2
    expect(activeLink.contains(2)).toEqual(true);

    previousButton.simulate("click");

    activeLink = wrapper.find("li.page-item.active");
    // Clicking previousButton moves pagination back to page 1
    expect(activeLink.contains(1)).toEqual(true);
  });
});
