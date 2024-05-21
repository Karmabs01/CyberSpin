import { Outlet } from "react-router-dom";

import ChildComponent from "../../dataBrands/Data";
import Header from "../../dataBrands/Header";
import logo from "../../../src/logo.png";
import plus from "../../../src/18plus.png";
import gamblers from "../../../src/gamblers.png";
import layer from "../../../src/layer.png";
// import softswiss from "../../../src/softswiss.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Home() {
  const { t } = useTranslation();

  return (
    <>
      <div className="App">
        <Header />

        <div className="wrapper">
          <ChildComponent />
        </div>
        {/* <div className="container mobile-cont">
          <div className="banner">
            <p>
              Get Paid <span>Real Cash</span> for Your Daily Activities!
            </p>
            <Link
              className="btn btn-primary"
              target="_blank"
              to={`https://myawardwallet.com/`}
            >
              Ask support
            </Link>
          </div>
        </div> */}
        <footer>
          <div className="wrapper">
            <div className="container flex-column">
              <div className="top-footer">
                <img className="logo" src={`.${logo}`} />
              </div>
              <div className="center-footer">
                <div className="images">
                  <img src={`.${plus}`} alt="" />
                  {/* <img src={`.${gamblers}`} alt="" /> */}
                  <img src={`.${layer}`} alt="" />
                  {/* <img src={`.${softswiss}`} alt="" /> */}
                </div>

                <p>{t("footerText")}</p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="bottom-footer">
              {t("copyright")}{" "}
              <a target="_blank" href="https://topbon.us/">
              topbon.us.
              </a>{" "}
              {t("copyright2")}
            </div>
          </div>
        </footer>
      </div>
      <Outlet />
    </>
  );
}

export default { Home };
