import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map clicks
function LocationMarker() {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You clicked here! <br /> Lat: {position.lat.toFixed(4)}, Lng: {position.lng.toFixed(4)}</Popup>
    </Marker>
  );
}

export default function TreeMap() {
  // Default center: New York City
  const [center] = useState([40.7128, -74.0060]);
  const [zoom] = useState(13);

  // Sample markers
  const markers = [
    { id: 1, position: [40.7589, -73.9851], popup: "Times Square" },
    { id: 2, position: [40.7484, -73.9857], popup: "Empire State Building" },
    { id: 3, position: [40.7614, -73.9776], popup: "Central Park" },
  ];

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Tree Map</h1>
        <p className="text-sm mt-1">Click anywhere on the map to add a marker</p>
      </div>
      
      <div className="flex-1 relative">
        <MapContainer
          center={center}
          zoom={zoom}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Predefined markers */}
          {markers.map(marker => (
            <Marker key={marker.id} position={marker.position}>
              <Popup>{marker.popup}</Popup>
            </Marker>
          ))}
          
          {/* Click to add marker */}
          <LocationMarker />
        </MapContainer>
      </div>

    </div>
  );
}