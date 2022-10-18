import axios from "axios";
import React, { useState, useEffect, useCallback, ReactDOM } from "react";
import "./main.css";
import "antd/dist/antd.css";
import { Button, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "remixicon/fonts/remixicon.css";
import { Link, Routes, Route } from "react-router-dom";

const Main = () => {
  const movie = { title: "", pubDate: "", image: "", userRating: "" };
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(0);
  const [FirstData] = data;
  const [image, setImage] = useState("");

  const handleBlur = (e) => {
    setInputValue(e.target.value);
    setNumber(0);
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
          display: 5,
        },
        headers: {
          "X-Naver-Client-Id": ClientID,
          "X-Naver-Client-Secret": ClientSecret,
        },
      })
      .then((res) => {
        setData(res.data.items);
        console.log(res.data);
        setIsValid(true);
      })

      .catch((e) => {
        console.log("error발생 ");
      });
  };

  useEffect(() => {
    movieData();
    console.log(data, "-----");
  }, [inputValue]);

  // const p1 = data[0].title;
  const datamap = data.map((data, index) => {
    return (
      <div key={index} id={index} className="datamap_image">
        <img
          src={data.image.replace("mit110", "mit500")}
          className="hello"
          alt="이미지가 없습니다."
          onClick={() => {
            setNumber(index);
            setImage(data.image); // 클릭하면 메인 이미지가 변경되고 설명도 변경되기 하기 위해서 number 라는 변수를 하나 선언 그래서 위 필터값에 number라는 변수를 선언한 후
            // number 변수가 변경되서 메인이미지가 변경되게 만듬
          }}
        />
        <br></br>
        {/* title 을 출력하면 html 테그가 그대로 string 으로 처리되어 dangerouslySetInnerHTML 를 사용했다. 보안상의 문제가 있다. */}
      </div>
    );
  });

  const oneData = data.filter((data, index) => {
    return index === number;
  });

  const oneDataMap = oneData.map((data, index) => {
    return (
      <div key={index} id={index} className="mainImage ">
        <div>
          <a href={data.link} target="_blank">
            <img
              className="image"
              src={data.image.replace("mit110", "mit500")} //
              alt="이미지가 없습니다!"
            />
          </a>
        </div>

        <div className="container_inner">
          <div className="inner_text">
            <h1>
              제목 : &nbsp;
              <span
                dangerouslySetInnerHTML={{ __html: FirstData.title }}
              ></span>
            </h1>

            <h2>출연 배우 : {data.actor.replaceAll("|", "/")}</h2>

            <h2>개봉 연도 : {data.pubDate}</h2>

            <h2> 평점 : {data.userRating}</h2>
          </div>
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
        <Link to={"/"}>
          <h2 className="h2_text">Home</h2>
        </Link>
        <Link to={"/test"}>
          <h2 className="h2_text">영화 일간 순위(전날 기준 )</h2>
        </Link>
        <h2 className="h2_text">영화 주간 순위</h2>
        <h2 className="h2_text">Login/Logout</h2>
      </div>
      <div className="container_input">
        <Tooltip title="search">
          <Button
            className="button"
            type="primary"
            shape="circle"
            icon={<SearchOutlined />}
            onClick={mainPosterHandler}
          />
        </Tooltip>
        <input
          onBlur={handleBlur}
          className="Input"
          placeholder="영화를 입력해주세요!"
          autoFocus
        />
      </div>
      <>{oneDataMap}</>
    </div>
  );
};
export default Main;
