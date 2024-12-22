import React from "react";
import { TouchableOpacity } from "react-native";
import renderer from "react-test-renderer";
import BottomText from "../components/Form/BottomText";

describe("BottomText", () => {
  it("Рендериться коректно з параметром firstText", () => {
    const component = renderer.create(
      <BottomText firstText="First Text" screenName="ScreenName" />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Рендериться коректно з параметрами secondText та thirdText", () => {
    const mockPushButton = jest.fn();
    const component = renderer.create(
      <BottomText
        secondText="Second Text"
        thirdText="Third Text"
        pushButton={mockPushButton}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Викликає функцію pushButton при натисканні на thirdText", () => {
    const mockPushButton = jest.fn();
    const component = renderer.create(
      <BottomText
        secondText="Second Text"
        thirdText="Third Text"
        pushButton={mockPushButton}
      />
    );
    const instance = component.root;
    const touchableOpacity = instance.findByType(TouchableOpacity);
    expect(touchableOpacity).toBeDefined();
    if (touchableOpacity) {
      touchableOpacity.props.onPress();
    }
    expect(mockPushButton).toHaveBeenCalledTimes(1);
  });
});
