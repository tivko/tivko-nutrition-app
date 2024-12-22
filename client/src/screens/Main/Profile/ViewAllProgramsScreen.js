import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import useAxios from "../../../hooks/useAxios";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/mealContext";
import { MaterialIcons } from "../../../styles/icons";
import { colors, fontsSize, hp, wp } from "../../../styles/base";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { compareDatesWithoutTime, formatDate } from "../../../help/utils";
import ModalFilterComponent from "../../../components/MealPlanner/ModalFilterComponent";
import { useMealProgramsContext } from "../../../context/mealProgramsContext";
import LoadingComponent from "../../../components/Layout/LoadingComponent";

const ViewAllProgramsScreen = () => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [goalsCriterias, setGoalsCriterias] = useState([]);
  const [dietaCriterias, setDietaCriterias] = useState([]);
  const navigation = useNavigation();
  const { state } = useAppContext();
  const { state: filterState, dispatch: filterDispatch } =
    useMealProgramsContext();

  const {
    data: result,
    loading: axiosLoading,
    error: axiosError,
    sendRequest: sendRequest,
  } = useAxios();

  const {
    data: goals,
    loading: goalsLoading,
    error: goalsError,
    sendRequest: sendRequestGoals,
  } = useAxios();

  const {
    data: dieta,
    loading: dietaLoading,
    error: dietaError,
    sendRequest: sendRequestDiet,
  } = useAxios();

  useEffect(() => {
    const fetchGoals = async () => {
      await sendRequestGoals("goals");
      await sendRequestDiet("macrosplit");
    };
    fetchGoals();
  }, []);

  useEffect(() => {
    const fetchMealPrograms = async () => {
      await sendRequest("mealprogram/allusermealprograms");
    };
    fetchMealPrograms();
  }, [state.mealProgram]);

  useEffect(() => {
    if (goals) {
      setGoalsCriterias(goals?.result);
    }
    if (dieta) {
      setDietaCriterias(dieta);
    }
  }, [goals, dieta]);

  useEffect(() => {
    if (result) {
      setPrograms(result?.result);
    }
  }, [result]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [programs, filterState]);

  const applyFiltersAndSort = () => {
    let filtered = programs;

    // Filter by goals
    if (filterState?.goals.length > 0) {
      filtered = filtered.filter((program) => {
        return filterState?.goals.some((goal) => program.goal.id === goal);
      });
    }

    // Filter by start date
    if (filterState?.startDate) {
      filtered = filtered.filter((program) => {
        return compareDatesWithoutTime(
          program.startDate,
          filterState.startDate
        );
      });
    }

    // Filter by end date
    if (filterState?.endDate) {
      filtered = filtered.filter((program) => {
        return (
          !program.endDate ||
          compareDatesWithoutTime(program.endDate, filterState.endDate)
        );
      });
    }

    // Filter by status
    if (filterState?.status.length > 0) {
      filtered = filtered.filter((program) => {
        return filterState?.status.some((status) => program.status === status);
      });
    }

    // Sort by start weight
    if (filterState?.sortOption) {
      filtered.sort((a, b) => {
        if (filterState.sortOption === "desc") {
          return b.startWeight - a.startWeight;
        } else {
          return a.startWeight - b.startWeight;
        }
      });
    }

    setFilteredPrograms(filtered);
  };

  if (!programs || axiosLoading) {
    <LoadingComponent />;
  }

  return (
    <View style={{ backgroundColor: "#ffff", flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: colors.primary,
          paddingVertical: hp(1.8),
          paddingHorizontal: wp(5),
          alignItems: "center",
          gap: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <AntDesign
              name="arrowleft"
              size={fontsSize.lg}
              color={colors.default}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.mainTextContainer}>
          <Text style={styles.mainText}>Архів програм</Text>
        </View>
      </View>

      <Pressable onPress={() => setModalVisible(true)}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            paddingTop: 10,
          }}
        >
          <Text style={{ fontSize: fontsSize.md }}>Застосувати фільтри</Text>
          <MaterialIcons
            name="filter-list-alt"
            size={fontsSize.lg}
            color="black"
          />
        </View>
      </Pressable>

      <FlatList
        data={filteredPrograms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.programItem}>
            <View style={styles.container}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  Період: {formatDate(item.startDate)} -{" "}
                  {item.endDate !== null
                    ? formatDate(item.endDate)
                    : "не визначено"}
                </Text>
                <Text style={styles.text}>Ціль: {item?.goal?.name}</Text>
                <Text style={styles.text}>Статус: {item.status}</Text>
                <Text style={styles.text}>
                  Початкова вага: {item.startWeight}кг.
                </Text>
                {item.expectedWeight && (
                  <Text style={styles.text}>
                    Очікувана вага: {item.expectedWeight}кг.
                  </Text>
                )}
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ViewPlanInfo", {
                      idPlan: item.id,
                      dietaValues: dietaCriterias?.result,
                    })
                  }
                >
                  <AntDesign name="eyeo" size={hp(3)} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <ModalFilterComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        goals={goalsCriterias}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  programItem: {
    padding: 15,
    borderBottomWidth: 1,
  },
  container: {
    backgroundColor: "#f6f6f8",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: fontsSize.md,
    marginBottom: 2,
  },
  mainText: {
    fontSize: fontsSize.lg,
    color: colors.default,
  },
  mainTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
});

export default ViewAllProgramsScreen;
