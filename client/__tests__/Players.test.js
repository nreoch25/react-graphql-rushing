import React from "react";
import { shallow, mount } from "enzyme";
import { MockedProvider, wait } from "@apollo/react-testing";
import toJson from "enzyme-to-json";
import { act } from "react-dom/test-utils";
import Players from "../components/Players";
import PLAYERS_QUERY from "../graphql/players.query";

const playersMock = {
  request: { query: PLAYERS_QUERY },
  result: {
    data: {
      players: [
        {
          _id: "5f81fc9cc8d1690bd9a0f15f",
          team: "DAL",
          name: "Ezekiel Elliott",
          position: "RB",
          attempts: 322,
          attemptsPerGame: 21.5,
          yards: "1,631",
          averagePerCarry: 5.1,
          yardsPerGame: 108.7,
          td: 15,
          longRush: "60T",
          firstDowns: 91,
          firstDownPercentage: 28.3,
          twentyPlus: 14,
          fortyPlus: 3,
          fumbles: 5,
          __typename: "Player",
        },
      ],
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

    expect(wrapper.contains(<th>Ezekiel Elliott</th>)).toEqual(true);
  });
});
