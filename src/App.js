import React, { useEffect, useState } from 'react';
import ipData from './Dataset/dataset.json';

import GreenDotIcon from './Images/GreenDotIcon.png';
import RedDotIcon from './Images/RedDotIcon.png';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css'; // Import the CSS file for styling

const IpMap = ({ map }) => {
  const createIconGreen = () => {
    return new L.Icon({
      iconUrl: GreenDotIcon,
      iconSize: [16, 16],
      iconAnchor: [8, 16],
    });
  };

  const createIconRed = () => {
    return new L.Icon({
      iconUrl: RedDotIcon,
      iconSize: [16, 16],
      iconAnchor: [8, 16],
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (map && ipData.length > 0) {
      // Clear existing markers
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      // Add markers for each IP address
      ipData.forEach((ipInfo) => {
        const { loc, isActive } = ipInfo;
        const [lat, lon] = loc.split(',').map(Number);

        const latOffset = (Math.random() - 0.5) * 0.01;
        const lonOffset = (Math.random() - 0.5) * 0.01;

        const markerIcon = isActive ? createIconGreen() : createIconRed();

        const marker = L.marker([lat + latOffset, lon + lonOffset], {
          icon: markerIcon,
        }).addTo(map);
        marker.bindPopup(` <div class='tooltip-wrapper '>
        <div class='infowrapper'>
          <h4>Ip</h4>
          <p>${ipInfo?.ip}</p>
        </div>
        <div class='infowrapper'>
          <h4>City</h4>
          <p>${ipInfo?.city}</p>
        </div>
        <div class='infowrapper'>
          <h4>Region</h4>
          <p>${ipInfo?.region}</p>
        </div>
        <div class='infowrapper'>
          <h4>Country</h4>
          <p>${ipInfo?.country}</p>
        </div>
        <div class='infowrapper'>
          <h4>Location</h4>
          <p>${ipInfo?.loc}</p>
        </div>
        <div class='infowrapper'>
          <h4>Postal</h4>
          <p>${ipInfo?.postal}</p>
        </div>
        <div class='infowrapper'>
          <h4>Time Zone</h4>
          <p>${ipInfo?.timezone}</p>
        </div>
        <div class='infowrapper'>
          <h4>Active</h4>
          <p>${ipInfo?.isActive || false}</p>
        </div>
      </div>`);
      });
    }
  }, [map]);

  return null;
};

const App = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const mapInstance = L.map('map', {
      preferCanvas: true,
      center: [0, 0], // Center the map at the equator and prime meridian
      zoom: 2,
      minZoom: 3,
      maxZoom: 17,
      maxBounds: [
        [-90, -180], // Southwest
        [90, 180], // Northeast
      ],
      maxBoundsViscosity: 1.0, // Elastic dragging within bounds
      zoomControl: false, // Disable the zoom control
    });
    if (!map) {
      // CartoDB:
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
      ).addTo(mapInstance);

      setMap(mapInstance);
    }

    return () => mapInstance.remove();
  }, []);

  return (
    <div id='map' style={{ height: '1000px' }}>
      <IpMap map={map} />
    </div>
  );
};

export default App;
