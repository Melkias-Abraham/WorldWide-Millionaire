import React, { memo, useContext } from "react";
import "./MapChart.css";
import geoData from "../assets/continents.json";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import Sidebar from "./Sidebar";
import { stateContext } from "../providers/StateProvider";
import DrawerProvider from "../providers/DrawerProvider";

const MapChart = (props) => {
  const { setTooltipContent } = props;
  const { getContinent, state } = useContext(stateContext);

  const onContinentClick = (continentName) => {
    getContinent(continentName);
  };

  return (
    <>
      <DrawerProvider>
        <Sidebar />
      </DrawerProvider>
      <ComposableMap data-tip="" projectionConfig={{ scale: 270 }}>
        <ZoomableGroup>
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isClicked =
                  state.continent &&
                  state.continent.name === geo.properties.continent;
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
