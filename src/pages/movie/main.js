import axios from "axios";
import React, { useState, useEffect, useCallback, ReactDOM } from "react";
import "./main.css";
import "antd/dist/antd.css";
import { Button, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "remixicon/fonts/remixicon.css";

const Main = () => {
  const movie = { title: "", pubDate: "", image: "", userRating: "" };
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [FirstData] = data;
  const handleBlur = (e) => {
    setInputValue(e.target.value);
  };

  const mainPosterHandler = () => {
    // 데이터가 바뀌고 난 후에 실행되게 하려면 useEffect 클린업 함수를 사용? 실패
  };

  const movieData = async () => {
    const URL = "/v1/search/movie.json";
    const ClientID = "v0P0YovymSRK9SO27ZIJ";
    const ClientSecret = "m1qxpaYzkC";

    axios // api 에서 데이터 송신
      .get(URL, {
        params: {
          query: inputValue, // 영화제목
          display: 6,
        },
        headers: {
          "X-Naver-Client-Id": ClientID,
          "X-Naver-Client-Secret": ClientSecret,
        },
      })
      .then((res) => {
        setData(res.data.items);
        setMainData(res.data.items[0]);
        setIsValid(true);
      })

      .catch((e) => {
        console.log("error발생 ");
      });
  };

  useEffect(() => {
    movieData();
    console.log(data);
  }, [inputValue]);

  // const p1 = data[0].title;
  const datamap = data.map((data, index) => {
    return (
      <div key={index} id={index}>
        <img
          src={data.image.replace("mit110", "mit500")}
          className="hello"
          alt="이미지가 없습니다."
        />
        <br></br>
        {/* title 을 출력하면 html 테그가 그대로 string 으로 처리되어 dangerouslySetInnerHTML 를 사용했다. 보안상의 문제가 있다. */}
      </div>
    );
  });

  const oneData = data.filter((data, index) => {
    return index < 1;
  });

  const oneDataMap = oneData.map((data, index) => {
    return (
      <div key={index} id={index} className="mainImage">
        <div>
          <a href={data.link} target="_blank">
            <img
              className="image"
              src={data.image.replace("mit110", "mit500")} //
              alt="이미지가 없습니다!"
            />
          </a>
        </div>

        <div className="InnerText">
          <h1>
            제목 : &nbsp;
            <span dangerouslySetInnerHTML={{ __html: FirstData.title }}></span>
          </h1>

          <h2>출연 배우 : {data.actor.replaceAll("|", "/")}</h2>

          <h2>개봉 연도 : {data.pubDate}</h2>

          <h2> 평점 : {data.userRating}</h2>
          <div className="datamap">{datamap}</div>
        </div>
        {/* title 을 출력하면 html 테그가 그대로 string 으로 처리되어 dangerouslySetInnerHTML 를 사용했다. 보안상의 문제가 있다. , 해결 => input에 쿼리값을 이상한거 날리면
        데이터에 객체가 담기지 않아 image , title 출력이 되지 않아 계속 오류가 생겨 2시간 동안 고민하다 map 을 한번 써보라 해서 맵을 사용하기전에 filter 로 첫번재 값을 뽑아내려고 index < 1 을 써 첫번쨰
        값을 뽑아내서  */}
      </div>
    );
  });

  return (
    <div className="container">
      <div className="inner_input">
        <i class="ri-home-line"></i>
        <p className="container_input">
          <input onBlur={handleBlur} />
          <Tooltip title="search">
            <Button
              type="primary"
              shape="circle"
              icon={<SearchOutlined />}
              onClick={mainPosterHandler}
            />
          </Tooltip>
        </p>
      </div>
      <>{oneDataMap}</>
    </div>
  );
};
export default Main;
