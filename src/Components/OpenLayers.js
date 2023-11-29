import React, { useEffect } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import GreenIcon from '../Images/GreenDotIcon.png';

const OpenLayersMap = () => {
  useEffect(() => {
    // Create a marker style
    const markerStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: GreenIcon, // Replace with the path to your marker image
      }),
    });

    // Create a vector source and layer for markers
    const markerSource = new VectorLayer({
      features: [
        new Feature({
          geometry: new Point(fromLonLat([0, 0])), // Set the initial marker position
        }),
        new Feature({
          geometry: new Point(fromLonLat([-74.006, 40.7128])), // Example marker at New York City
        }),
      ],
      style: markerStyle,
    });

    // Create a map
    const map = new Map({
      target: 'map', // The ID of the container element
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        markerSource,
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    return () => {
      // Clean up resources when the component is unmounted
      map.dispose();
    };
  }, []);

  return <div id='map' style={{ width: '100%', height: '100vh' }}></div>;
};

export default OpenLayersMap;
