import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { useTranslation } from "react-i18next";

import cmn1 from "../../public/cmn1.png";
import play from "../../public/play.png";

function OtherBrands({
  newUrl,
  ipData,
  ipDataCode,
  currentLanguage,
  country,
  source,
  selectedCountry,
  setSelectedCountry,
}) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [otherData, setOtherData] = useState([]);
  const [visibleBrands, setVisibleBrands] = useState(8);

  const handleShowMore = () => {
    setVisibleBrands((prevVisibleBrands) => prevVisibleBrands + 8);
  };

  const apiOld = "https://bonusnumber1.com/api/brands/read.php";
  const apiNew = "https://bonusnumber1.com/api/brands/read2.php";
  const api1043 = "https://bonusnumber1.com/api/brands/read3.php";
  const api1044 = "https://bonusnumber1.com/api/brands/read4.php";

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
                rowData["Segment2"] === "Sandbox"
            );
          } else {
            filteredDataOther = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === ipDataCode &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["Segment2"] === "Sandbox"
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
    <div>
      {otherData.length > 0 && (
        <section className="jacpot__section" id="jackpot">
          <div className="container">
            <div className="jackpot__wrap">
              <div className="jackpot__head">
                {/* <h5 className="wow fadeInUp" data-wow-delay="0.2s">
                  Current jackpot for
                </h5> */}
                <h2 className="wow fadeInUp" data-wow-delay="0.4s">
                  <span className="text-base">{t("Galactic")} </span> {t("Bonuses")}
                </h2>
              </div>
              <div className="row g44 g-4 justify-content-center">
                {otherData.length > 0 ? (
                  otherData.slice(0, 6).map((rowData, index) => (
                    <div
                      key={index}
                      className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 wow fadeInDown"
                      data-wow-delay="0.2s"
                    >
                      <div className="jack__items">
                        <a target="_blank" href={rowData["GoBig"] + newUrl + "L_cyber-spin_2"}>
                          <img
                            src={rowData["LinkImg"]}
                            alt={rowData["LinkImg"]}
                          />
                          <div className="offercont">
                            <p>{rowData["OurOfferContent"]}</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="ti"></p>
                )}
              </div>
              <div className="jackpot__btn wow fadeInUp" data-wow-delay="0.5s">
                <a
                  target="_blank"
                  href={`https://pickbonus.myawardwallet.com/${newUrl}`}
                  className="cmn--btn"
                  data-bs-toggle="modal"
                  data-bs-target="#login"
                >
                  <span>{t("More Offers")}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default OtherBrands;
