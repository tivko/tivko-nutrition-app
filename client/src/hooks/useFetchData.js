import { useState, useEffect } from "react";
import useAxios from "./useAxios";

const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const { data: result, loading, error, sendRequest } = useAxios();

  const fetchData = () => {
    sendRequest(endpoint);
  };

  useEffect(() => {
    sendRequest(endpoint);
  }, []);

  useEffect(() => {
    if (result) {
      setOriginalData(result?.result);
    }
  }, [result]);

  return {
    data,
    originalData,
    setData,
    loading,
    error,
    fetchData,
  };
};

export default useFetchData;
