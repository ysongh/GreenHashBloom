import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Card, Table, Typography, Tag, Spin, Empty } from 'antd';
import { TreeDeciduous, Leaf } from 'lucide-react';
import { useAccount, useReadContract } from 'wagmi';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import GreenHashBloomABI from '../artifacts/contracts/TreeShop.sol/TreeShop.json';
import { CONTRACT_ADDRESS } from '../config';

const { Title, Text } = Typography;

const getTreeName = (treeType) => {
  return treeType === 0 ? 'Red Oak' : 'Maple';
};

const getTreeIcon = (treeType) => {
  return treeType === 0 ? '🍂' : '🍁';
};

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
  const { address, isConnected } = useAccount();
  const [center] = useState([40.7128, -74.0060]);
  const [zoom] = useState(13);
  const [forestData, setForestData] = useState([]);
  const [isLoadingTrees, setIsLoadingTrees] = useState(false);

  // Get user's tree IDs
  const { data: treeIds, isLoading: isLoadingIds, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: GreenHashBloomABI.abi,
    functionName: 'getUserTrees',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected,
    }
  });

  console.log(treeIds)

  // Fetch details for all trees
  useEffect(() => {
    
    const fetchTreeDetails = async () => {
      if (!treeIds || treeIds.length === 0) {
        setForestData([]);
        return;
      }

      setIsLoadingTrees(true);
      const trees = [];

      try {
        // Fetch details for each tree
        for (const treeId of treeIds) {
          const response = await fetch('/api/read-contract', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              address: CONTRACT_ADDRESS,
              abi: GreenHashBloomABI.abi,
              functionName: 'getTreeDetails',
              args: [treeId]
            })
          });

          if (response.ok) {
            const details = await response.json();
            const [treeType, age, co2AbsorptionRate, harvestTime, grassGrowth] = details;
            
            trees.push({
              key: treeId.toString(),
              treeName: getTreeName(Number(treeType)),
              treeId: Number(treeId),
              age: Number(age),
              co2Absorption: `${Number(co2AbsorptionRate) / 1000} ton/year`,
              icon: getTreeIcon(Number(treeType)),
              harvestTime: Number(harvestTime),
              grassGrowth: Number(grassGrowth),
            });
          }
        }

        setForestData(trees);
      } catch (error) {
        console.error('Error fetching tree details:', error);
      } finally {
        setIsLoadingTrees(false);
      }
    };

    fetchTreeDetails();
  }, [treeIds]);

  // Sample markers (you can make these dynamic based on tree locations if you add location data to your contract)
  const markers = [
    { id: 1, position: [40.7589, -73.9851], popup: "Times Square" },
    { id: 2, position: [40.7484, -73.9857], popup: "Empire State Building" },
    { id: 3, position: [40.7614, -73.9776], popup: "Central Park" },
  ];

  // Carbon Credit NFT Data (placeholder - implement based on your contract)
  const nftData = [
    // Add your NFT data here when you implement the carbon credit minting
  ];

  const forestColumns = [
    {
      title: '',
      dataIndex: 'icon',
      key: 'icon',
      width: 60,
      render: (icon) => <span className="text-3xl">{icon}</span>,
    },
    {
      title: <span className="font-semibold">Tree Name</span>,
      dataIndex: 'treeName',
      key: 'treeName',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: <span className="font-semibold">Tree ID</span>,
      dataIndex: 'treeId',
      key: 'treeId',
      align: 'center',
    },
    {
      title: <span className="font-semibold">Age</span>,
      dataIndex: 'age',
      key: 'age',
      align: 'center',
      render: (age) => <span>{age} years</span>,
    },
    {
      title: <span className="font-semibold">CO2 Absorption per Tree</span>,
      dataIndex: 'co2Absorption',
      key: 'co2Absorption',
      render: (text) => <Tag color="green" className="font-semibold">{text}</Tag>,
    },
  ];

  const nftColumns = [
    {
      title: <span className="font-semibold">ID</span>,
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: <span className="font-semibold">Tree ID</span>,
      dataIndex: 'treeId',
      key: 'treeId',
      align: 'center',
    },
    {
      title: <span className="font-semibold">CO2 Credit</span>,
      dataIndex: 'co2Credit',
      key: 'co2Credit',
      render: (text) => <Tag color="blue" className="font-semibold">{text}</Tag>,
    },
    {
      title: <span className="font-semibold">Year</span>,
      dataIndex: 'year',
      key: 'year',
      align: 'center',
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <TreeDeciduous size={32} />
            <h1 className="text-3xl font-bold">Tree Map</h1>
          </div>
          <p className="text-sm text-green-50">Click anywhere on the map to add a marker</p>
        </div>
      </div>
      
      <div className="h-[500px] relative shadow-lg">
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

      {/* My Forest and Carbon Credit Sections */}
      <div className="max-w-7xl mx-auto w-full p-6 space-y-6">
        {/* My Forest Section */}
        <Card 
          className="rounded-xl shadow-lg border-2 border-gray-200"
          title={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
                  <TreeDeciduous size={24} color="white" />
                </div>
                <Title level={3} className="m-0">My Forest</Title>
              </div>
              {isConnected && (
                <Text type="secondary">
                  {forestData.length} tree{forestData.length !== 1 ? 's' : ''}
                </Text>
              )}
            </div>
          }
        >
          {!isConnected ? (
            <Empty 
              description="Please connect your wallet to view your trees"
              className="py-8"
            />
          ) : isLoadingIds || isLoadingTrees ? (
            <div className="text-center py-12">
              <Spin size="large" />
              <p className="mt-4 text-gray-500">Loading your forest...</p>
            </div>
          ) : forestData.length === 0 ? (
            <Empty 
              description="You don't have any trees yet. Purchase your first tree to start your forest!"
              className="py-8"
            />
          ) : (
            <Table 
              dataSource={forestData} 
              columns={forestColumns} 
              pagination={false}
              className="custom-table"
            />
          )}
        </Card>

        {/* Carbon Credit NFT Section */}
        <Card 
          className="rounded-xl shadow-lg border-2 border-gray-200"
          title={
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
                <Leaf size={24} color="white" />
              </div>
              <Title level={3} className="m-0">Carbon Credit NFT</Title>
            </div>
          }
        >
          {nftData.length === 0 ? (
            <Empty 
              description="No carbon credits minted yet"
              className="py-8"
            />
          ) : (
            <Table 
              dataSource={nftData} 
              columns={nftColumns} 
              pagination={false}
              className="custom-table"
            />
          )}
        </Card>
      </div>

      <style>{`
        .custom-table .ant-table {
          background: transparent;
        }
        .custom-table .ant-table-thead > tr > th {
          background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
          font-weight: 600;
        }
        .custom-table .ant-table-tbody > tr:hover > td {
          background: #f0fdf4 !important;
        }
      `}</style>
    </div>
  );
}
