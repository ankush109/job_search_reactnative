import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
      ...query,
    },
    headers: {
      "X-RapidAPI-Key": "e5d18a5de9msh6ad77ce245bd0ecp14eac2jsnef482c55cf85",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };
  const fetchdata = async () => {
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
      alert(error);
      setLoading(false);
    } finally {
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  const refetch = () => {
    setLoading(true);
    fetchdata();
  };
  return { data, loading, error, refetch };
};
export default useFetch;
