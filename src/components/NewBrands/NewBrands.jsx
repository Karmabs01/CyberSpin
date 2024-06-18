import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import Loader from "../Loader/Loader";

// import all from "../../all.png";

import allEn from "../../all_en.png";
import allPl from "../../all_pl.png";
import allEs from "../../all_es.png";
import allAll from "../../all_all.png";
import allBe from "../../all_be.png";
import allBg from "../../all_bg.png";
import allCz from "../../all_cz.png";
import allDe from "../../all_de.png";
import allDk from "../../all_dk.png";
import allFi from "../../all_fi.png";
import allFr from "../../all_fr.png";
import allGr from "../../all_gr.png";
import allHu from "../../all_hu.png";
import allIt from "../../all_it.png";
import allNl from "../../all_nl.png";
import allNo from "../../all_no.png";
import allPt from "../../all_pt.png";
import allSe from "../../all_se.png";
import allSk from "../../all_sk.png";
import allTr from "../../all_tr.png";

function NewBrands({
  newUrl,
  ipDataCode,
  currentLanguage,
  source,
  selectedCountry,
  setSelectedCountry, // Функция для обновления selectedCountry
}) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [topData, setTopData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //   const urlParams = new URLSearchParams(window.location.search);
  //   const brandValue = urlParams.get("brand");

  const apiOld = "https://bonusnumber1.com/api/brands/read.php";
  const apiNew = "https://bonusnumber1.com/api/brands/read2.php";
  const api1043 = "https://bonusnumber1.com/api/brands/read3.php";
  const api1044 = "https://bonusnumber1.com/api/brands/read4.php";

  function shuffleArray(array) {
    const shuffledArray = array.slice(); // Создаем копию массива
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  console.log("============", source);
  useEffect(() => {
    const geo = selectedCountry.toUpperCase();
    console.log("GEO", geo);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let url;
        switch (source) {
          case "partner1039":
            url = apiNew; // Для partner1039
            break;
          case "partner1043":
            url = api1043; // Для partner1043
            break;
          case "partner1044":
            url = api1044; // Для partner1044
            break;
          default:
            url = apiOld; // Для всех остальных случаев
        }

        const res = await fetch(url);
        if (res.ok) {
          const responseData = await res.json();
          // const dataArray = Object.values(responseData);

          let filteredData = [];

          if (geo) {
            filteredData = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === geo &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["Casino brand"] !== "Mirax (FS)" &&
                rowData["Casino brand"] !== "Katsubet (FS)" &&
                rowData["Casino brand"] !== "7Bit (FS)" &&
                rowData["Trendsetting"] === "1"
            );
          } else {
            filteredData = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === ipDataCode &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["Casino brand"] !== "Mirax (FS)" &&
                rowData["Casino brand"] !== "Katsubet (FS)" &&
                rowData["Casino brand"] !== "7Bit (FS)" &&
                rowData["Trendsetting"] === "1"
            );
          }

          // Фильтрация объектов в массиве data
          const filteredDataWithTopData = filteredData.filter((dataItem) => {
            // Проверка, есть ли объект с таким же Casino brand в topData
            const existsInTopData = topData.some(
              (topDataItem) =>
                topDataItem["Casino brand"] === dataItem["Casino brand"]
            );

            // Возвращаем true только для объектов, которые не совпадают
            return !existsInTopData;
          });

          // Перемешиваем данные перед отображением
          setData(shuffleArray(filteredDataWithTopData));
          setTopData([...topData]);
          setIsLoading(false);
        } else {
          console.error("Failed to fetch data:", res.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    if ((geo && currentLanguage) || (!geo && ipDataCode && currentLanguage)) {
      fetchData();
    }
  }, [ipDataCode, currentLanguage, selectedCountry, source]);

  const combinedData = [...topData, ...data];

  const allImages = {
    en: allEn,
    pl: allPl,
    es: allEs,
    all: allAll,
    be: allBe,
    bg: allBg,
    cz: allCz,
    de: allDe,
    dk: allDk,
    fi: allFi,
    fr: allFr,
    gr: allGr,
    hu: allHu,
    it: allIt,
    nl: allNl,
    no: allNo,
    pt: allPt,
    se: allSe,
    sk: allSk,
    tr: allTr,
    // Добавьте другие языки по необходимости
  };

  const allImageSrc = allImages[currentLanguage] || allImages.en;

  return (
    <div className="wins__section__tab pt-120" id="wins">
      {data.length > 0 && (
        <div className="container">
          <div
            className="section-header pb-40 wow fadeInDown"
            data-wow-delay="0.2s"
          >
            <h3 className="text-white">{t("Tomorrow's Top Deals")}</h3>
          </div>
          <div className="wins__wrap">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="homeone"
                role="tabpanel"
              >
                <div className="wins__table">
                  <table>
                    <tbody>
                      <tr>
                        <th>{t("Brand")}</th>
                        <th></th>
                        <th>{t("Bonus")}</th>
                        <th></th>
                        <th>{t("Name")}</th>
                        <th></th>
                      </tr>
                      {data.length > 0 ? (
                        data.slice(0, 5).map((rowData, index) => (
                          <tr
                            className="tb1 wow fadeInDown"
                            data-wow-delay="0.2s"
                            key={index}
                          >
                            <td className="tdfirst">
                              <a
                                target="_blank"
                                href={rowData["GoBig"] + newUrl + "L_cyber-spin_3"}
                              >
                                <div className="icon">
                                  <img
                                    src={rowData["LinkImg"]}
                                    alt={rowData["LinkImg"]}
                                  />
                                </div>
                              </a>
                            </td>
                            <td className="">
                              {" "}
                              <a
                                target="_blank"
                                href={rowData["GoBig"] + newUrl + "L_cyber-spin_3"}
                                className="cmn--btn"
                              >
                                <span>{t("Play")}</span>
                              </a>
                            </td>
                            <td className="offercon">
                              {rowData["OurOfferContent"]}
                            </td>
                            <td></td>
                            <td>{rowData["CasinoBrand"]}</td>
                            <td></td>
                           
                          </tr>
                        ))
                      ) : (
                        <p className="ti">
                          No brands available for your country
                        </p>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewBrands;
