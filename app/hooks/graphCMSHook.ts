import { useEffect, useState } from "react";

export const useGraphCMS: any = (
  GRAPHCMS_ENDPOINT: string,
  GRAPHCMS_API_KEY: string,
  schema: any,
  argument?: any,
) => {
  const [graphCMSData, setGraphCMSData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetch(GRAPHCMS_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GRAPHCMS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: schema,
          variables: argument,
        }),
      }).then((res) => res.json());

      setGraphCMSData(data);
    };
    fetchData();
  }, [
    GRAPHCMS_API_KEY,
    GRAPHCMS_ENDPOINT,
    argument,
    schema,
  ]);

  return { graphCMSData };
};
