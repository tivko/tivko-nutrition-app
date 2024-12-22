import { StyleSheet, Text, View } from "react-native";
import React from "react";
import EditButton from "./EditButton";

const EditButtons = ({ mealProgram = false }) => {
  const pages = [
    { title: "Редагувати профіль", pageName: "EditProfileScreen" },
    { title: "Архів програм", pageName: "ViewAllProgramsScreen" },
    ...(mealProgram
      ? [
          {
            title: "Програма харчування",
            pageName: "ViewPlanInfoScreen",
          },
        ]
      : []),
  ];

  return (
    <View style={{ gap: 5 }}>
      {pages.map((page, index) => (
        <EditButton key={index} pageName={page.pageName} title={page.title} />
      ))}
    </View>
  );
};

export default EditButtons;

const styles = StyleSheet.create({});
