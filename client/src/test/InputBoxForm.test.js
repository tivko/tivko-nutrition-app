import React from "react";
import { TextInput, TouchableOpacity, Text } from "react-native";
import renderer from "react-test-renderer";
import InputBoxForm from "../components/Form/InputBoxForm";

jest.mock("../help/namesInUkrainian", () => ({
  bodyFatInfo: "Mocked Body Fat Info",
}));

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: jest.fn(() => ({
    control: {
      _names: {},
    },
  })),
  Controller: jest.fn(({ render }) =>
    render({
      field: {
        value: "",
        onChange: jest.fn(),
        onBlur: jest.fn(),
      },
      fieldState: {},
    })
  ),
}));

describe("InputBoxForm", () => {
  it("Рендериться коректно зі стандартними параметрами", () => {
    const component = renderer.create(
      <InputBoxForm name="test" placeholder="Test Input" />
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Перемикає видимість пароля", () => {
    const component = renderer.create(
      <InputBoxForm name="password" placeholder="Password" />
    );
    const instance = component.root;
    const input = instance.findByType(TextInput);
    const toggleButton = instance.findByProps({ testID: "passwordToggle" });
    toggleButton.props.onPress();
    expect(input.props.secureTextEntry).toBe(false);
    toggleButton.props.onPress();
    expect(input.props.secureTextEntry).toBe(true);
  });

  it("відкриває модальне вікно при натисканні на іконку інформації про відсоток жиру", () => {
    const component = renderer.create(
      <InputBoxForm name="bodyfat" placeholder="Body Fat" />
    );
    const instance = component.root;
    const infoButton = instance.findByProps({ testID: "infoButton" });
    infoButton.props.onPress();
  });
});
