import React from "react";
import { FlatList, ActivityIndicator, Text, View } from "react-native";
import FoodListItem from "../../components/FoodSearch/FoodListItem";
import { fontsSize } from "../../styles/base";

const FoodList = ({
  data,
  menuOptions,
  info,
  ell,
  handleRemoveItem,
  addToDaily,
  loading,
}) => {
  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <>
      {!loading && data?.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: fontsSize.md }}>Даних немає</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <FoodListItem
                MenuOptions={menuOptions}
                item={item}
                info={info}
                ell={ell}
                key={item.id}
                keyExtractor={(item) => item.id}
                onRemoveItem={handleRemoveItem}
                addToDaily={addToDaily}
              />
            )}
            contentContainerStyle={{ gap: 5 }}
          />
        </>
      )}
    </>
  );
};

export default FoodList;
