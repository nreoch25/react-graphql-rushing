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
  let graphQLWrapper;
  beforeEach(async () => {
    await act(async () => {
      // Mount the component
      graphQLWrapper = mount(
        <MockedProvider addTypename={false} mocks={[playersMock]} resolvers={{}}>
          <Players />
        </MockedProvider>
      );

      // Wait until the query is resolved
      await wait(0);
      graphQLWrapper.update();
    });
  });

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
    expect(graphQLWrapper.contains(<th>Ezekiel Elliott</th>)).toEqual(true);
    expect(graphQLWrapper.contains(<th>Derrick Henry</th>)).toEqual(true);
  });

  it("should go to page 2 of pagination when Next button is clicked", async () => {
    let activeLink = graphQLWrapper.find("li.page-item.active");
    // Starts on pagination page 1
    expect(activeLink.contains(1)).toEqual(true);

    const nextButton = graphQLWrapper.find('[aria-label="Next"]');
    const previousButton = graphQLWrapper.find('[aria-label="Previous"]');

    nextButton.simulate("click");

    activeLink = graphQLWrapper.find("li.page-item.active");
    // Clicking nextButton moves pagination to page 2
    expect(activeLink.contains(2)).toEqual(true);

    previousButton.simulate("click");

    activeLink = graphQLWrapper.find("li.page-item.active");
    // Clicking previousButton moves pagination back to page 1
    expect(activeLink.contains(1)).toEqual(true);
  });

  it("should filter players by name", async () => {
    const event = { target: { value: "Ezekiel" } };
    const event2 = { target: { value: "Derrick" } };
    const inputForm = graphQLWrapper.find("input.form-control");
    const submitButton = graphQLWrapper.find('button[type="submit"]');

    inputForm.simulate("change", event);
    submitButton.simulate("submit");

    expect(graphQLWrapper.contains(<th>Ezekiel Elliott</th>)).toEqual(true);
    expect(graphQLWrapper.contains(<th>Derrick Henry</th>)).toEqual(false);
    expect(graphQLWrapper.contains(<th>David Johnson</th>)).toEqual(false);

    inputForm.simulate("change", event2);
    submitButton.simulate("submit");

    expect(graphQLWrapper.contains(<th>Derrick Henry</th>)).toEqual(true);
    expect(graphQLWrapper.contains(<th>Ezekiel Elliott</th>)).toEqual(false);
    expect(graphQLWrapper.contains(<th>David Johnson</th>)).toEqual(false);
  });
});
