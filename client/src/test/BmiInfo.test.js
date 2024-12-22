import React from "react";
import renderer from "react-test-renderer";
import BmiInfo from "../components/Form/BmiInfo";

describe("<BmiInfo />", () => {
  it("renders correctly with given props", () => {
    const mockRecomendations = {
      bmi: 22,
      recommendedWeight: {
        lowerWeight: 50,
        upperWeight: 70,
      },
    };

    const tree = renderer
      .create(<BmiInfo totalRecomendations={mockRecomendations} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly without props", () => {
    const tree = renderer.create(<BmiInfo />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
