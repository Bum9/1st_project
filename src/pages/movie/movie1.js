import axios from "axios";
import React, { useEffect, useState } from "react";
import OneMovie from "./oneMovie";

const Movie1 = (props) => {
  const [data, setData] = useState();
  const [mvName, setMvName] = useState("");
  const date = new Date();
  const year = date.getFullYear().toString();
  const preMonth = date.getMonth() + 1;
  const month = preMonth.toString().padStart(2, 0);
  const day = date.getDay().toString().padStart(2, 0);
  const test1 = async () => {
    await axios
      .get(
        "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json",
        {
          params: {
            key: "4ff5341f4fd2a08bb0b89782e12870c8",
            targetDt: `${year}${month}${day}`,
          },
        }
      )
      .then((value) => {
        const weekly = value.data.boxOfficeResult.weeklyBoxOfficeList;
        setData(weekly);
      })
      .catch((error) => {
        new Error(error);
      });
  };

  useEffect(() => {
    test1();
  }, []);

  return <div className="test">{data && <OneMovie movie={data} />}</div>;
};

export default Movie1;
