import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { TreeDeciduous } from 'lucide-react';
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

export default function TreeMap({ forestData }) {
  const [center] = useState([42.3024, -107.6089]);
  const [zoom] = useState(7);

  // Sample markers (you can make these dynamic based on tree locations if you add location data to your contract)
  const markers = [
    { id: 1, position: [42.1024, -107.2089], popup: "Tree #1" },
    { id: 2, position: [42.4524, -106.5089], popup: "Tree #2" },
    { id: 3, position: [42.7024, -106.9089], popup: "Tree #3" },
    { id: 4, position: [42.4024, -105.6089], popup: "Tree #4" },
    { id: 5, position: [42.4024, -107.6089], popup: "Tree #5" },
  ];

  return (
    <div>
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <TreeDeciduous size={32} />
            <h1 className="text-2xl font-bold">Tree Map</h1>
          </div>
        </div>
      </div>
      
      <div className="h-[300px] relative shadow-lg">
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
          {forestData.map((forest, id) => (
            <Marker key={id} position={markers[id].position}>
              <Popup>{markers[id].popup}</Popup>
            </Marker>
          ))}
          
          {/* Click to add marker */}
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
}
