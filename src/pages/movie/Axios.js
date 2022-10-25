import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import "../../styles/test.css";
import Movie1 from "./movie1";

const Axios = (props) => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const preMonth = date.getMonth() + 1;
  const month = preMonth.toString().padStart(2, 0);
  const day = date.getDay().toString().padStart(2, 0);
  const [data, setData] = useState([]);
  const [dataInValid, setDataInValid] = useState(false);

  axios
    .get(
      "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json",
      {
        params: {
          key: "d64ea69ed80bfb86019dd750a2a770ce",
          targetDt: `${year}${month}${day}`,
        },
      }
    )
    .then((result) => {
      setData(result.data.boxOfficeResult.weeklyBoxOfficeList);
    });

  return (
    <>
      <Movie1 movie={data} />
    </>
  );
};
export default Axios;
