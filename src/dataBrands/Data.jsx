import { useEffect, useState, useRef } from "react";

import OtherBrands from "../otherBrands/otherBrands";
import TopBrands from "../topBrands/topBrands";
import NewBrands from "../components/NewBrands/NewBrands";
import AnotherBrands from "../components/AnotherBrands/AnotherBrands";

import ModalWindow from "../components/modalWindow/ModalWindow";
import { useTranslation } from "react-i18next";
import twemoji from "twemoji";
import TopBrandsOfYear from "../components/TopBrandsOfYear/TopBrandsOfYear";
import DoubleBrands from "../components/DoubleBrands/DoubleBrands";
import DoubleBrands2 from "../components/DoubleBrands2/DoubleBrands2";
import CountryBanner from "../components/CountryBanner/CountryBanner";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function ChildComponent() {
  const [ipData, setIpData] = useState(null);
  const [ipDataCode, setIpDataCode] = useState(null);
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");

  const { t, i18n } = useTranslation();
  const selectRef = useRef(null);

  const countryOptions = [
    { code: "au", name: "Australia", flag: "🇦🇺" },
    { code: "at", name: "Austria", flag: "🇦🇹" },
    { code: "be", name: "Belgium", flag: "🇧🇪" },
    { code: "bg", name: "Bulgaria", flag: "🇧🇬" },
    { code: "ca", name: "Canada", flag: "🇨🇦" },
    { code: "cz", name: "Czech", flag: "🇨🇿" },
    { code: "dk", name: "Denmark", flag: "🇩🇰" },
    { code: "fi", name: "Finland", flag: "🇫🇮" },
    { code: "fr", name: "France", flag: "🇫🇷" },
    { code: "de", name: "Germany", flag: "🇩🇪" },
    { code: "gr", name: "Greece", flag: "🇬🇷" },
    { code: "hu", name: "Hungary", flag: "🇭🇺" },
    { code: "ie", name: "Ireland", flag: "🇮🇪" },
    { code: "it", name: "Italy", flag: "🇮🇹" },
    { code: "nl", name: "Netherlands", flag: "🇳🇱" },
    { code: "nz", name: "New Zealand", flag: "🇳🇿" },
    { code: "no", name: "Norway", flag: "🇳🇴" },
    { code: "pl", name: "Poland", flag: "🇵🇱" },
    { code: "pt", name: "Portugal", flag: "🇵🇹" },
    { code: "sk", name: "Slovakia", flag: "🇸🇰" },
    { code: "es", name: "Spain", flag: "🇪🇸" },
    { code: "se", name: "Sweden", flag: "🇸🇪" },
    { code: "ch", name: "Switzerland", flag: "🇨🇭" },
    { code: "tr", name: "Turkey", flag: "🇹🇷" },
    { code: "gb", name: "United Kingdom", flag: "🇬🇧" },
    { code: "all", name: "World", flag: "🌍" },
  ];
  const countryOptions1043 = [
    { code: "all", name: "World", flag: "🌍" },
    { code: "ca", name: "Canada", flag: "🇨🇦" },
    { code: "us", name: "United States", flag: "🇺🇸" },
  ];
  const countryOptions1044 = [
    { code: "au", name: "Australia", flag: "🇦🇺" },
    { code: "at", name: "Austria", flag: "🇦🇹" },
    { code: "be", name: "Belgium", flag: "🇧🇪" },
    { code: "ca", name: "Canada", flag: "🇨🇦" },
    { code: "cz", name: "The Czech Republic", flag: "🇨🇿" },
    { code: "dk", name: "Denmark", flag: "🇩🇰" },
    { code: "fi", name: "Finland", flag: "🇫🇮" },
    { code: "fr", name: "France", flag: "🇫🇷" },
    { code: "de", name: "Germany", flag: "🇩🇪" },
    { code: "gb", name: "Great Britain", flag: "🇬🇧" },
    { code: "gr", name: "Greece", flag: "🇬🇷" },
    { code: "ie", name: "Ireland", flag: "🇮🇪" },
    { code: "it", name: "Italy", flag: "🇮🇹" },
    { code: "nl", name: "Netherlands", flag: "🇳🇱" },
    { code: "no", name: "Norway", flag: "🇳🇴" },
    { code: "nz", name: "New Zealand", flag: "🇳🇿" },
    { code: "pl", name: "Poland", flag: "🇵🇱" },
    { code: "se", name: "Sweden", flag: "🇸🇪" },
    { code: "za", name: "South Africa", flag: "🇿🇦" },
    { code: "ch", name: "Switzerland", flag: "🇨🇭" },
    { code: "us", name: "USA", flag: "🇺🇸" },
    { code: "all", name: "World", flag: "🌍" },
  ];


  useEffect(() => {
    // Запрос к API с использованием fetch
    fetch(
      "https://ipapi.co/json/?key=YD0x5VtXrPJkOcFQMjEyQgqjfM6jUcwS4J54b3DI8ztyrFpHzW"
    )
      .then((response) => response.json())
      .then((data) => {
        setIpData(data.country_name);
        setIpDataCode(data.country);
        setSelectedCountry(data.country.toLowerCase());
      })
      .catch((error) => {
        console.error("Ошибка при запросе к API:", error);
      });
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    // Удаляем параметр 'brand', если он есть
    searchParams.delete("brand");

    // Получаем параметр 'keyword'
    const currentSource = searchParams.get("keyword");
    let sourceValue = "0"; // Значение по умолчанию для 'source'

    // Проверяем, содержит ли 'keyword' идентификатор партнера
    if (currentSource) {
      const match = currentSource.match(/partner(_)?\d+/);
      if (match) {
        sourceValue = match[0]; // Извлекаем идентификатор партнера
        setSource(sourceValue); // Обновляем состояние 'source' с найденным значением
      } else {
        setSource("0"); // Обновляем состояние 'source', если идентификатор партнера не найден
      }
    } else {
      setSource("0"); // Обновляем состояние 'source', если параметр 'keyword' отсутствует
    }

    // На этом этапе 'sourceValue' уже содержит корректное значение, поэтому устанавливаем его в параметры
    searchParams.set("source", sourceValue);

    // Устанавливаем параметр 'creative_id' с пустым значением
    searchParams.set("creative_id", "");

    // Формируем строку запроса
    const queryString = `?${searchParams.toString()}`;

    // Обновляем URL с новой строкой запроса
    setNewUrl(queryString);
  }, []);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    localStorage.setItem("selectedCountry", country);
    document.documentElement.classList.remove("fixed-position");
    console.log("handleCountryChange")

  };

  const handleMouseDown = () => {
    document.documentElement.classList.add("fixed-position");
    console.log("handleMouseDown")

  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      document.documentElement.classList.remove("fixed-position");
      console.log("handleClickOutside")
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <AnotherBrands
        newUrl={newUrl}
        ipDataCode={ipDataCode}
        currentLanguage={i18n.language}
        source={source}
        selectedCountry={selectedCountry}
      />
      {source === "partner1043" && (
        <div className="select-brand container">
          <Box sx={{ m: 1, minWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel>{t("select")}</InputLabel>
              <Select
                id="countrySelect"
                value="CA"
                label={t("select")}
                ref={selectRef}
                onMouseDown={handleMouseDown}
                onChange={(e) => handleCountryChange(e.target.value)}
              >
                {countryOptions.map((country, index) => (
                  <MenuItem
                    key={index}
                    value={country.code}
                    selected={country.code === ipDataCode}
                  >
                    <div className={country.code}></div>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
      )}
      {source === "partner1044" && (
        <div className="select-brand container">

          <Box sx={{ m: 1, minWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel>{t("select")}</InputLabel>
              <Select
                id="countrySelect"
                value={selectedCountry}
                label={t("select")}
                ref={selectRef}
                onMouseDown={handleMouseDown}
                onChange={(e) => handleCountryChange(e.target.value)}
              >
                {countryOptions.map((country, index) => (
                  <MenuItem
                    key={index}
                    value={country.code}
                    selected={country.code === ipDataCode}
                  >
                    <div className={country.code}></div>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
      )}
      {source !== "partner1044" && source !== "partner1043" && (
        <div className="select-brand container">
          <Box sx={{ m: 1, minWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel>{t("select")}</InputLabel>
              <Select
                id="countrySelect"
                value={selectedCountry}
                label={t("select")}
                ref={selectRef}
                onMouseDown={handleMouseDown}
                onChange={(e) => handleCountryChange(e.target.value)}
              >
                {countryOptions.map((country, index) => (
                  <MenuItem
                    key={index}
                    value={country.code}
                    selected={country.code === ipDataCode}
                  >
                    <div className={country.code}></div>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
      )}
      {/* 
      {(selectedCountry === "au" ||
        selectedCountry === "ca" ||
        selectedCountry === "nz") && (
        <CountryBanner
          newUrl={newUrl}
          ipDataCode={ipDataCode}
          currentLanguage={i18n.language}
          source={source}
          selectedCountry={selectedCountry}
        />
      )} */}
      <OtherBrands
        newUrl={newUrl}
        ipData={ipData}
        ipDataCode={ipDataCode}
        currentLanguage={i18n.language}
        source={source}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      <NewBrands
        newUrl={newUrl}
        ipDataCode={ipDataCode}
        currentLanguage={i18n.language}
        source={source}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      {/* <TopBrands
        newUrl={newUrl}
        ipDataCode={ipDataCode}
        currentLanguage={i18n.language}
        source={source}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
   
      <NewBrands
        newUrl={newUrl}
        ipDataCode={ipDataCode}
        currentLanguage={i18n.language}
        source={source}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />

      */}
    </div>
  );
}

export default ChildComponent;
