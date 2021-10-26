import React, { memo, useState } from "react";
import "./MapChart.css";
import geoData from "../assets/continents.json";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import Sidebar from "./Sidebar";

const MapChart = (props) => {
  const { setTooltipContent, setStart, continent, setContinent, storage, setCurrentUser, currentUser  } = props;

  const onContinentClick = (continentName) => {
    setContinent({
      name: continentName.continent,
      id: continentName.id,
    });
  };

  return (
    <>
      <Sidebar storage={storage} currentUser={currentUser} setCurrentUser={setCurrentUser}  setStart={setStart} continent={continent.name} />
      <ComposableMap data-tip="" projectionConfig={{ scale: 270 }}>
        <ZoomableGroup>
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isClicked = continent.name === geo.properties.continent;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { continent } = geo.properties;
                      setTooltipContent(`${continent}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    onClick={() => onContinentClick(geo.properties)}
                    style={{
                      default: {
                        fill: isClicked ? "#5D3FD3" : "#D6D6DA",
                        outline: "none",
                        stroke: "#fff",
                      },
                      hover: {
                        transition: "all .6s ease-out",
                        fill: "#5D3FD3",
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "#5D3FD3",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
