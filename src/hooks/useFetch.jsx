import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";

const useFetch = (url,dependency=[]) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!url) {
       
        setError("URL not provided");
        setIsLoading(false);
        return;
      }
    let isMounted = true; 

    async function fetchData() {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: url,
        });
        if (isMounted) {
          setData(response?.data?.data); 
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err); 
        }
      } finally {
        if (isMounted) {
          setIsLoading(false); 
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false; 
    };
  }, [url,...dependency]);

  return [data, error, isLoading];
};

export default useFetch;
