import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import shape from "../../../public/bg-shape.png";
import bs from "../../../public/banner-shape.png";
import bt from "../../../public/banner-thumb.png";

// import fwb from "../../images/fwb.png";

function AnotherBrands({
  newUrl,
  ipDataCode,
  currentLanguage,
  source,
  selectedCountry,
}) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [otherData, setOtherData] = useState([]);
  const [visibleBrands, setVisibleBrands] = useState(8);

  const handleShowMore = () => {
    setVisibleBrands((prevVisibleBrands) => prevVisibleBrands + 8);
  };

  const apiOld = "https://pickbonus.myawardwallet.com/api/brands/read.php";
  const apiNew = "https://pickbonus.myawardwallet.com/api/brands/read2.php";
  const api1043 = "https://pickbonus.myawardwallet.com/api/brands/read3.php";
  const api1044 = "https://pickbonus.myawardwallet.com/api/brands/read4.php";

  function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  useEffect(() => {
    const geo = selectedCountry.toUpperCase();

    const fetchData = async () => {
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

          let filteredDataOther = [];

          if (geo) {
            filteredDataOther = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === geo &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["Segment2"] === "Premium"
            );
          } else {
            filteredDataOther = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === ipDataCode &&
                rowData["Current Status"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["Segment2"] === "Premium"
            );
          }

          // Перемешиваем данные перед отображением
          setOtherData(shuffleArray(filteredDataOther));
          setLoading(false);

          // Если нет брендов, вызывать setSelectedCountry
          // if (filteredDataOther.length === 0) {
          //   setSelectedCountry("all");
          // }
        } else {
          console.error("Failed to fetch data:", res.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setLoading(false);
      }
    };

    if ((ipDataCode && currentLanguage) || (geo && currentLanguage)) {
      fetchData();
    }
  }, [ipDataCode, currentLanguage, selectedCountry, source]);

  // ...

  return (
    <section className="banner__section" id="home">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-xl-6 col-lg-5">
            <div className="banner__content wow fadeInUp" data-wow-delay="0.1s">
              <h1> {t("Catch the")} </h1>
              <h1>{t("winning spirit!")}</h1>
              <p>{t("Light Up Your Future with Unbeatable Bonuses!")}</p>
              <div className="button__grp">
                {otherData.length > 0 ? (
                  otherData.slice(0, 1).map((rowData, index) => (
                    <a
                      key={index}
                      target="_blank"
                      href={rowData["GoBig"] + newUrl + "L_cyber-spin_random"}
                      className="cmn--btn"
                      data-bs-toggle="modal"
                      data-bs-target="#login"
                    >
                      <span>{t("Play Now!")}</span>
                    </a>
                  ))
                ) : (
                  <p className="ti"></p>
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-7">
            <div className="banner__table wow fadeInDown" data-wow-delay="0.1s">
              <div className="description-table">
                <table>
                  <tbody>
                    <tr>
                      <th>{t("Brand")}</th>
                      <th></th>
                      <th>{t("Bonus")}</th>
                      <th>{t("Name")}</th>
                    </tr>
                    {otherData.length > 0 ? (
                      otherData.slice(0, 5).map((rowData, index) => (
                        <tr key={index} className="tb1">
                          <td className="tdfirst">
                            <a target="_blank" href={rowData["GoBig"] + newUrl + "L_cyber-spin_1"}>
                              <div className="icon">
                                <img
                                  src={rowData["LinkImg"]}
                                  alt={rowData["LinkImg"]}
                                />
                              </div>
                            </a>
                          </td>
                          <td className="tdfirst">
                            <a
                              target="_blank"
                              href={rowData["GoBig"] + newUrl + "L_cyber-spin_1"}
                              className="cmn--btn"
                            >
                              <span>{t("Play")}</span>
                            </a>
                          </td>
                          <td className="tdfirst">
                            <span>{rowData["OurOfferContent"]}</span>
                          </td>
                          <td>{rowData["CasinoBrand"]}</td>
                        </tr>
                      ))
                    ) : (
                      <p className="ti"></p>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnotherBrands;
