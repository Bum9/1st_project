import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import "../../styles/rank.css";
import { TbChevronsUp, TbChevronsDown } from "react-icons/tb";
import { FcRight, FcUp, BiMinus } from "react-icons/fc";
const Movie1 = (props) => {
  const [data, setData] = useState([]);
  const [dataInValid, setDataInValid] = useState(false);

  const URL =
    "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json";

  // const movieDataHandler = () => {
  //   let p2 = data.slice(1);
  //   let p3 = data.shift();
  //   let p1 = p2.concat(p3);
  //   setData(p1);
  //   console.log(data);
  // };

  const date = new Date();
  const year = date.getFullYear().toString();
  const preMonth = date.getMonth() + 1;
  const month = preMonth.toString().padStart(2, 0);
  const day = date.getDate() - 2;
  const dday = day.toString();

  const Axios = async () => {
    await axios
      .get(URL, {
        params: {
          key: "d64ea69ed80bfb86019dd750a2a770ce",
          targetDt: `${year}${month}${day}`,
        },
      })
      .then((result) => {
        console.log(result);
        const response = result.data.boxOfficeResult.weeklyBoxOfficeList;
        console.log(dataInValid, data);

        setDataInValid(true);
        setData(response);
        console.log(data);
        console.log(year, month, dday);
        const SecMovieHandler = () => {
          const dataArray = data;
          const p2 = dataArray.splice(0, 1);
          dataArray.splice(dataArray.length, 0, p2[0]);
          setData(dataArray);
          setDataInValid(true);
        };

        return response;
      });

    // const dataArray = result;
    // const p2 = dataArray.splice(0, 1);
    // dataArray.splice(dataArray.length, 0, p2[0]);
    // setData(result);
    // setDataInValid(true);
  };

  const movieMap = data.map((value, index) => {
    return (
      <p>
        {index + 1}: {value.movieNm}
        {value.rankOldAndNew === "NEW" ? (
          <TbChevronsUp size="15" color="blue" />
        ) : (
          ""
        )}
      </p>
    );
  });

  useEffect(() => {
    Axios();
  }, []);

  return (
    <div className="rank-container">
      <h1>개봉 영화 순위</h1>
      {movieMap}
    </div>
  );
};

export default Movie1;
