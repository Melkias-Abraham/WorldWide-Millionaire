import React, { memo, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import Sidebar from './Sidebar';


const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json";


const MapChart = ({ setTooltipContent }) => {

  const [continent, setContinent] = useState("")  

  const onContinentClick = (continentName) => {
      setContinent(continentName)
  }
    
  return (
    <>
    <Sidebar continent={continent} />
      <ComposableMap data-tip="" projectionConfig={{ scale: 250 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
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
                  onClick={() => onContinentClick(geo.properties.continent)}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none",
                    
                    },
                    hover: {
                    transition: "all .6s ease-out",
                      fill: "#5D3FD3",
                      outline: "none",
                      cursor: "pointer"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
