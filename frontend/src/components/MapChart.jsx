import React, { memo, useState } from "react";
import './MapChart.css';
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
      <ComposableMap data-tip="" projectionConfig={{ scale: 270 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const isClicked = continent === geo.properties.continent;
                 return <Geography
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
                  stroke="#5D3FD3"
                  style={{
                    default: {
                      fill: isClicked ? '#5D3FD3' : "#D6D6DA",
                      outline: "none",
                    },
                    hover: {
                      transition: "all .6s ease-out",
                      fill: "#5D3FD3",
                      outline: "none",
                      cursor: "pointer"
                    },
                    pressed: {
                      fill: "#5D3FD3",
                      outline: "none"
                    }
                  }}
                />
                }
              )
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
