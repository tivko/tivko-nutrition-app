import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import renderer from "react-test-renderer";
import SubmitFormButton from "../components/Form/SubmitFormButton";

const mockOnPress = jest.fn();

describe("SubmitFormButton", () => {
  it("Рендериться зі стандартними параметрами", () => {
    const component = renderer.create(
      <SubmitFormButton onPress={mockOnPress} text="Submit" />
    );
    const button = component.root.findByType(Pressable);
    const styles = button.props.style({ pressed: false }) || {};

    // Check for specific styles
    expect(styles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          alignItems: "center",
          borderRadius: 5,
          justifyContent: "center",
          marginVertical: 5,
        }),
      ])
    );
  });

  it("Рендериться з переданими параметрами", () => {
    const customStyle = StyleSheet.create({
      container: {
        backgroundColor: "red",
        borderRadius: 10,
      },
    });
    const component = renderer.create(
      <SubmitFormButton
        onPress={mockOnPress}
        text="Submit"
        width={300}
        height={60}
        style={customStyle.container}
      />
    );
    const button = component.root.findByType(Pressable);
    const stylesArray = button.props.style
      ? button.props.style({ pressed: false })
      : {};

    const flattenedStyles = stylesArray.reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});

    expect(flattenedStyles).toEqual(
      expect.objectContaining({
        alignItems: "center",
        borderRadius: 5,
        height: 60,
        justifyContent: "center",
        marginVertical: 5,
        width: 300,
      })
    );
  });

  it("Коректно застосовує стилі тексту", () => {
    const component = renderer.create(
      <SubmitFormButton onPress={mockOnPress} text="Submit" />
    );
    const textStyles = component.root.findByType(Text).props.style;

    expect(textStyles).toEqual(
      expect.objectContaining({ fontSize: 26.5, color: "#ffff" })
    );
  });
});
