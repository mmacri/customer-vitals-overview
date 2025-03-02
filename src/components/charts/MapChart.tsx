
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { Tooltip } from "@/components/ui/tooltip";
import { scaleLinear } from "d3-scale";
import { formatCurrency } from "@/utils/formatters";

// World map topojson
const worldGeoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";
// US states topojson
const usaGeoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-states.json";

interface MapChartProps {
  data: {
    [key: string]: number;
  };
  geoType: 'world' | 'usa';
  title: string;
}

const MapChart = ({ data, geoType, title }: MapChartProps) => {
  // Find max value for color scale
  const maxValue = Math.max(...Object.values(data));
  
  // Create color scale
  const colorScale = scaleLinear<string>()
    .domain([0, maxValue])
    .range(["#E3F2FD", "#0277BD"]);
  
  // Get the appropriate projection settings and geo data URL
  const projectionConfig = geoType === 'world' 
    ? { scale: 140 } 
    : { scale: 800, center: [-96, 38] };
  
  const geoUrl = geoType === 'world' ? worldGeoUrl : usaGeoUrl;
  
  return (
    <div className="data-card">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      
      <div className="p-4" style={{ height: geoType === 'world' ? "400px" : "350px" }}>
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={projectionConfig}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const code = geoType === 'world' 
                    ? geo.properties.name 
                    : geo.properties.name;
                  const value = data[code] || 0;
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={value ? colorScale(value) : "#EEE"}
                      stroke="#FFF"
                      strokeWidth={0.5}
                      style={{
                        default: {
                          outline: "none",
                        },
                        hover: {
                          fill: "#90CAF9",
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: {
                          outline: "none",
                        },
                      }}
                      data-tooltip-id="map-tooltip"
                      data-tooltip-content={`${code}: ${formatCurrency(value)}`}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: colorScale(0) }} />
            <span className="text-xs text-gray-600">{formatCurrency(0)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: colorScale(maxValue / 2) }} />
            <span className="text-xs text-gray-600">{formatCurrency(maxValue / 2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: colorScale(maxValue) }} />
            <span className="text-xs text-gray-600">{formatCurrency(maxValue)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapChart;
