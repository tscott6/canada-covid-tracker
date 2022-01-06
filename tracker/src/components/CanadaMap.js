import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import canada from '../data/canada.json';

const mapData = {canada};
//console.log(mapData.canada.objects.provinces.geometries);

const CanadaMap = ({setTooltipContent}) => {
    const [covidData, setCovidData] = useState([]);

    useEffect(() => {
        fetchCovidData();
    }, []);

    const fetchCovidData = () => {
        axios.get('https://api.opencovid.ca/summary')
            .then((res) => {
                setCovidData(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
                setCovidData([]);
            });
    };

    const setProvinceCaseCounts = () => {
        mapData.canada.objects.provinces.geometries[0].properties.caseNumber = covidData.summary[0].cases; //Alberta
        mapData.canada.objects.provinces.geometries[0].properties.activeCases = covidData.summary[0].active_cases;
        mapData.canada.objects.provinces.geometries[0].properties.deaths = covidData.summary[0].cumulative_deaths;

        mapData.canada.objects.provinces.geometries[1].properties.caseNumber = covidData.summary[12].cases; //Saskatchewan
        mapData.canada.objects.provinces.geometries[1].properties.activeCases = covidData.summary[12].active_cases;
        mapData.canada.objects.provinces.geometries[1].properties.deaths = covidData.summary[12].cumulative_deaths;

        mapData.canada.objects.provinces.geometries[2].properties.caseNumber = covidData.summary[2].cases; //Manitoba
        mapData.canada.objects.provinces.geometries[2].properties.activeCases = covidData.summary[2].active_cases;
        mapData.canada.objects.provinces.geometries[2].properties.deaths = covidData.summary[2].cumulative_deaths;

        mapData.canada.objects.provinces.geometries[3].properties.caseNumber = covidData.summary[4].cases; //NF & LB
        mapData.canada.objects.provinces.geometries[3].properties.activeCases = covidData.summary[4].active_cases;
        mapData.canada.objects.provinces.geometries[3].properties.deaths = covidData.summary[4].cumulative_deaths;

        mapData.canada.objects.provinces.geometries[4].properties.caseNumber = covidData.summary[9].cases; //PEI
        mapData.canada.objects.provinces.geometries[4].properties.activeCases = covidData.summary[9].active_cases;
        mapData.canada.objects.provinces.geometries[4].properties.deaths = covidData.summary[9].cumulative_deaths;

        mapData.canada.objects.provinces.geometries[5].properties.caseNumber = covidData.summary[5].cases; //Nova Scotia
        mapData.canada.objects.provinces.geometries[5].properties.activeCases = covidData.summary[5].active_cases;
        mapData.canada.objects.provinces.geometries[5].properties.deaths = covidData.summary[5].cumulative_deaths;

        mapData.canada.objects.provinces.geometries[6].properties.caseNumber = covidData.summary[7].cases; //Northwest Territories
        mapData.canada.objects.provinces.geometries[6].properties.activeCases = covidData.summary[7].active_cases;
        mapData.canada.objects.provinces.geometries[6].properties.deaths = covidData.summary[7].cumulative_deaths;

        mapData.canada.objects.provinces.geometries[7].properties.caseNumber = covidData.summary[6].cases; //Nunavut
        mapData.canada.objects.provinces.geometries[7].properties.activeCases = covidData.summary[6].active_cases;
        mapData.canada.objects.provinces.geometries[7].properties.deaths = covidData.summary[6].cumulative_deaths;

        mapData.canada.objects.provinces.geometries[8].properties.caseNumber = covidData.summary[8].cases; //Ontario
        mapData.canada.objects.provinces.geometries[8].properties.activeCases = covidData.summary[8].active_cases;
        mapData.canada.objects.provinces.geometries[8].properties.deaths = covidData.summary[8].cumulative_deaths;

        mapData.canada.objects.provinces.geometries[9].properties.caseNumber = covidData.summary[3].cases; //New Brunswick
        mapData.canada.objects.provinces.geometries[9].properties.activeCases = covidData.summary[3].active_cases;
        mapData.canada.objects.provinces.geometries[9].properties.deaths = covidData.summary[3].cumulative_deaths;

        mapData.canada.objects.provinces.geometries[10].properties.caseNumber = covidData.summary[13].cases; //Yukon
        mapData.canada.objects.provinces.geometries[10].properties.activeCases = covidData.summary[13].active_cases;
        mapData.canada.objects.provinces.geometries[10].properties.deaths = covidData.summary[13].cumulative_deaths;

        mapData.canada.objects.provinces.geometries[11].properties.caseNumber = covidData.summary[1].cases; //British Columbia
        mapData.canada.objects.provinces.geometries[11].properties.activeCases = covidData.summary[1].active_cases;
        mapData.canada.objects.provinces.geometries[11].properties.deaths = covidData.summary[1].cumulative_deaths;

        mapData.canada.objects.provinces.geometries[12].properties.caseNumber = covidData.summary[10].cases; //Quebec
        mapData.canada.objects.provinces.geometries[12].properties.activeCases = covidData.summary[10].active_cases;
        mapData.canada.objects.provinces.geometries[12].properties.deaths = covidData.summary[10].cumulative_deaths;
    };

    const centroid = (prov) => {
        var coords = geoCentroid(prov);

        if(prov.properties.NAME === "Nunavut") {
            coords[0] = coords[0] - 8;
            coords[1] = coords[1] - 6;
        }
        else if(prov.properties.NAME === "Northwest Territories") {
            coords[0] = coords[0] - 1;
            coords[1] = coords[1] - 2;
        }
        else if(prov.properties.NAME === "Newfoundland  & Labrador") {
            coords[0] = coords[0] - 1;
        }

        return coords;
    };

    const setCaseColour = (prov) => {
        var count = prov.properties.caseNumber;

        if (count < 100) {
            return "#ffebeb";
        } else if (count < 500) {
            return "#ffdede";
        } else if (count < 1000) {
            return "#ffabab";
        } else if (count <= 5000) {
            return "#fa7878";
        } else if (count > 5000) {
            return "#f55151";
        } else {
            return "#fffafa";
        }
    };

    if(covidData.length !== 0) {
        setProvinceCaseCounts();

        //console.log(mapData.canada.objects.provinces.geometries);

        return (
            <ComposableMap data-tip=""
                projection="geoAzimuthalEqualArea"
                projectionConfig={{
                    rotate: [100, -45, 0],
                    scale: 400
                }}
                style={{
                    width: "100%",
                    height: "auto"
                }}>
                <Geographies geography={mapData.canada}>
                    {({geographies}) => (
                        <>
                        {geographies.map(geo => (
                            <Geography key={geo.rsmKey}
                                   stroke="#000000"
                                   strokeWidth={0.5}
                                   fill={setCaseColour(geo)}
                                   geography={geo}
                                   style={{
                                       hover: {
                                           filter: "brightness(120%)"
                                       }    
                                   }}
                                   onMouseEnter={() => {
                                        const activeCases = geo.properties.activeCases;
                                        const deaths = geo.properties.deaths;

                                        setTooltipContent(`Active Cases: ${activeCases} Deaths: ${deaths}`);
                                   }}
                                   onMouseLeave={() => {
                                        setTooltipContent("");
                                   }}
                        />
                        ))}
    
                        {geographies.map(geo => {
                            return (
                                <Marker key={geo.rsmKey} coordinates={centroid(geo)} fill="black">
                                    <text fontSize="6px" textAnchor="middle">
                                        {geo.properties.caseNumber}
                                    </text>
                                </Marker>
                            );
                        })}
                        </>
                    )}
                </Geographies>
            </ComposableMap>
        );
    }
    else {
        return (
            <div><center>Loading</center></div>
        );
    }

}

export default memo(CanadaMap);