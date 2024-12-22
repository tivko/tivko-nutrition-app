import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Alert,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { removeValue } from "../../../storage";
import { Ionicons } from "@expo/vector-icons";
import UserImg from "../../../components/Profile/UserImg";
import EditButtons from "../../../components/Profile/EditButtons";
import {
  setMealProgram,
  setRegData,
  setTempId,
  setToken,
  setUser,
  setUserId,
  useAppContext,
} from "../../../context/mealContext";
import {
  useDailyFoodContext,
  refreshAll,
} from "../../../context/dailyFoodContext";
import { colors, hp, wp } from "../../../styles/base";
import { LineChart } from "react-native-gifted-charts";
import useAxios from "../../../hooks/useAxios";
import {
  months,
  monthsChart,
  shortMonthNames,
} from "../../../help/namesInUkrainian";
import moment from "moment";
import LineChartWeight from "../../../components/Profile/Charts/LineChartWeight";
import AlertComponent from "../../../components/Layout/AlertComponent";

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const ref = useRef(null);
  const { state, dispatch } = useAppContext();
  const profieldata = state?.user;
  const [lineData, setLineData] = useState([]);
  const { dispatch: dispatchDailyInfo } = useDailyFoodContext();
  const {
    data: result,
    loading: axiosLoading,
    error: requestError,
    sendRequest,
  } = useAxios();

  useEffect(() => {
    if (state?.mealProgram !== null) {
      sendRequest(
        `dailyinfo/weight-data?mealProgramId=${state?.mealProgram?.id}`
      );
    }
  }, []);

  useEffect(() => {
    if (result) {
      const formatDateArray = (data) => {
        return data.map((item) => {
          const date = moment(item.label);
          const day = date.date();
          const month = monthsChart[date.month()];
          return {
            value: item.value,
            label: `${day} ${month}`,
          };
        });
      };
      const formattedData = formatDateArray(result);

      setLineData(formattedData);
    }
  }, [result]);

  const handleSignOut = async () => {
    dispatch(setUser(null));
    dispatch(setUserId(null));
    dispatch(setTempId(null));
    dispatch(setToken(null));
    dispatch(setRegData(null));
    dispatch(setMealProgram(null));
    dispatchDailyInfo(refreshAll());
    await removeValue("LOGGEDIN");
  };

  const showOrHidePointer = (ind) => {
    ref.current?.scrollTo({
      x: ind * 200 - 25,
    });
  };

  return (
    <>
      <ScrollView style={styles.main}>
        <View style={styles.headerContainer}>
          <View style={styles.coverPhoto}>
            <View
              style={{
                flex: 1,
                flexDirection: "row-reverse",
                paddingTop: hp(2),
                paddingRight: hp(2),
              }}
            >
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Ionicons name="exit-outline" size={hp(5)} color="#ffff" />
              </TouchableOpacity>
            </View>
          </View>
          <UserImg profieldata={profieldata} />
        </View>
        <EditButtons mealProgram={state.mealProgram !== null} />
        {lineData.length >= 3 && (
          <View style={{ flexDirection: "row", paddingTop: hp(2) }}>
            <LineChartWeight lineData={lineData} />
          </View>
        )}
      </ScrollView>

      <AlertComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        info={"Ви впевнені що хочете вийти?"}
        title={"Вихід"}
        showContinue={true}
        onContinue={handleSignOut}
      />
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    alignItems: "center",
  },
  coverPhoto: {
    width: wp(100),
    height: hp(30),
    backgroundColor: colors.primary,
  },

  statsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  statContainer: {
    alignItems: "center",
    flex: 1,
  },
  statCount: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 16,
    color: "#999",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    // textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  mealcontainer: {
    height: 70,
    width: "100%",
    backgroundColor: "#FCFAEF",
    borderBottomWidth: 1,
    borderColor: "lightgray",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
  },
});
