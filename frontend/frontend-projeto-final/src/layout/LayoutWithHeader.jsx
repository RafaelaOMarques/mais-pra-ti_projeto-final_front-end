// LayoutWithHeader.jsx
import React, { useEffect, useState } from "react";
import { DarkModeProvider } from "../context/DarkModeContext/DarkModeContext";
import Header from "../components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Body from "../components/Body/Body";
import { fetchApis } from "../service/api/buscarApis";

const LayoutWithHeader = () => {
  const [apis, setApis] = useState([]);
  const [apisPopulares, setApisPopulares] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();

  useEffect(() => {
    const loadApis = async () => {
      const apisPopulares = await fetchApis(0, 5);
      const apisTotais = await fetchApis(0, 12);
      setApis(apisTotais);
      setApisPopulares(apisPopulares);
    };
    loadApis();
  }, []);

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const filteredApis = apis.filter(
    (api) =>
      api.nome.toLowerCase().includes(searchValue.toLowerCase()) ||
      api.descricao.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <DarkModeProvider>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Header onSearchChange={handleSearchChange} />
        {location.pathname === "/" ? (
          <Body apisPopulares={apisPopulares} apis={filteredApis} />
        ) : (
          <Outlet />
        )}
      </div>
    </DarkModeProvider>
  );
};

export default LayoutWithHeader;
