import { useState } from "react";
import axios from "axios";
import { useAppContext } from "../context/mealContext";

const useAxios = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { state } = useAppContext();

  const sendRequest = async (endPoint, body = null, method) => {
    let baseURL = "http://192.168.50.124:3000/";
    let url;

    if (endPoint) {
      url = baseURL + endPoint;
    }

    setLoading(true);
    setError(null);
    try {
      let axiosConfig = {
        method: method ? method : body ? "POST" : "GET",
        url,
        headers: { Authorization: `Bearer ${state?.token}` },
      };
      if (body) {
        axiosConfig = {
          ...axiosConfig,
          data: body,
        };
      }
      const response = await axios(axiosConfig);
      setData(response?.data);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, sendRequest };
};

export default useAxios;
