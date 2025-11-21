import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Table, Typography, Tag, Spin, Empty, Statistic, message, Space } from 'antd';
import { TreeDeciduous, Leaf, Clock, Gift, ShoppingBag } from 'lucide-react';
import { useAccount, useConfig, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { readContract } from "@wagmi/core";

import TreeMap from '../component/TreeMap';
import GreenHashBloomABI from '../artifacts/contracts/TreeShop.sol/TreeShop.json';
import CarbonOffsetABI from '../artifacts/contracts/CarbonOffset.sol/CarbonOffset.json';
import { CONTRACT_ADDRESS, ERC20_CONTRACT_ADDRESS } from '../config';
import { calculateTreeAge } from '../utils/format';

const { Title, Text } = Typography;
const { Countdown } = Statistic;

const getTreeName = (treeType) => {
  return treeType === 0 ? 'Red Oak' : 'Maple';
};

const getTreeIcon = (treeType) => {
  return treeType === 0 ? '🍂' : '🍁';
};

export default function UserProfile() {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();

  const [forestData, setForestData] = useState([]);
  const [carbonCreditData, setCarbonCreditData] = useState([]);
  const [isLoadingTrees, setIsLoadingTrees] = useState(false);
  const [isLoadingCarbonCredit, setIsLoadingCarbonCredit] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  // Calculate end of year countdown
  const getEndOfYear = () => {
    const now = new Date();
    const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
    return endOfYear.getTime();
  };

  const [deadline, setDeadline] = useState(getEndOfYear());

  const config = useConfig();

  // Get user's tree IDs
  const { data: treeIds = [], isLoading: isLoadingIds } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: GreenHashBloomABI.abi,
    functionName: 'getUserTrees',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected,
    }
  });

  const { data: carbonCreditsIds = [], isLoading: isLoadingCCIds} = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: GreenHashBloomABI.abi,
    functionName: 'getUserCarbonCredits',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected,
    }
  });

  const { data: carbonCreditToken = 0 } = useReadContract({
    address: ERC20_CONTRACT_ADDRESS,
    abi: CarbonOffsetABI.abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected,
    }
  });

  console.log(carbonCreditToken);

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
          const response = await readContract(config, {
            address: CONTRACT_ADDRESS,
            abi: GreenHashBloomABI.abi,
            functionName: "getTreeDetails",
            args: [treeId]
          });

          trees.push({
            key: treeId.toString(),
            treeName: getTreeName(Number(response[0])),
            treeId: Number(treeId),
            age: Number(response[1]),
            co2Absorption: `${Number(response[2]) / 10 ** 18} ton/year`,
            icon: getTreeIcon(Number(response[0])),
            harvestTime: Number(response[3]),
            grassGrowth: Number(response[4]),
          });
        }

        setForestData(trees);
      } catch (error) {
        console.error('Error fetching tree details:', error);
      } finally {
        setIsLoadingTrees(false);
      }
    };

    fetchTreeDetails();
  }, [isLoadingIds]);

  useEffect(() => {
    const fetchCarbonCreditsDetails = async () => {
      if (!carbonCreditsIds || carbonCreditsIds.length === 0) {
        setCarbonCreditData([]);
        return;
      }

      setIsLoadingCarbonCredit(true);
      const carbonCredits = [];

      try {
        // Fetch details for each tree
        for (const carbonCreditsId of carbonCreditsIds) {
          const response = await readContract(config, {
            address: CONTRACT_ADDRESS,
            abi: GreenHashBloomABI.abi,
            functionName: "getCarbonCreditDetails",
            args: [carbonCreditsId]
          });

          console.log(response);

          carbonCredits.push({
            key: carbonCreditsId.toString(),
            treeId: Number(response[0]),
            co2Credit: `${Number(response[1]) / 10 ** 18} ton/year`,
            year: Number(response[2]),
            isClaimed: response[4]
          });
        }

        setCarbonCreditData(carbonCredits);
      } catch (error) {
        console.error('Error fetching tree details:', error);
      } finally {
        setIsLoadingCarbonCredit(false);
      }
    };

    fetchCarbonCreditsDetails();
  }, [isLoadingCCIds]);

  const { 
    data: hash, 
    writeContract, 
    isPending,
    error 
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleMintCarbonCredit = async (data) => {
    if (!isConnected) {
      messageApi.error('Please connect your wallet first');
      return;
    }

    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: GreenHashBloomABI.abi,
        functionName: 'mintCarbonCredit',
        args: [data.treeId, 2024],
      });
      messageApi.loading('Transaction pending...', 0);
    } catch (err) {
      console.error('Mint Carbon Credit error:', err);
      messageApi.error('Failed to mint carbon credit');
    }
  };

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
      render: (age) => <span>{calculateTreeAge(age)}</span>,
    },
    {
      title: <span className="font-semibold">CO2 Absorption per Tree</span>,
      dataIndex: 'co2Absorption',
      key: 'co2Absorption',
      render: (text) => <Tag color="green" className="font-semibold">{text}</Tag>,
    },
    {
      title: <span className="font-semibold">Action</span>,
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="small" className="flex justify-center">
          <button
            onClick={() => handleMintCarbonCredit(record)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 mx-auto"
          >
            <Leaf size={16} />
            Collect Carbon Credit
          </button>
          <button
            onClick={() => navigate("/sendgift")}
            className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <Gift size={16} />
            Send as Gift
          </button>
        </Space>
      ),
    },
  ];

  const nftColumns = [
    {
      title: <span className="font-semibold">ID</span>,
      dataIndex: 'key',
      key: 'key',
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

  if (isConfirming) {
    messageApi.loading('Confirming transaction...', 0);
  }

  if (isSuccess) {
    messageApi.destroy();
    messageApi.success('Tree purchased successfully! 🌳');
  }

  if (error) {
    messageApi.destroy();
    messageApi.error(`Error: ${error.message}`);
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {contextHolder}
      <TreeMap forestData={forestData} />

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
              footer={() => 
                <div className="max-w-xs flex items-center gap-3 bg-gradient-to-br from-orange-50 to-red-50 px-6 py-3 rounded-lg border-2 border-orange-200">
                  <Clock size={24} className="text-orange-600" />
                  <div className="flex flex-col items-center">
                    <Text className="text-xs text-gray-600 mb-1">Time Until New Year</Text>
                    <Text className="text-xs text-gray-600 mb-1">For credit tokens </Text>
                    <Countdown 
                      value={deadline} 
                      format="D[d] H[h] m[m] s[s]"
                      valueStyle={{ 
                        fontSize: '18px', 
                        fontWeight: 'bold',
                        color: '#ea580c'
                      }}
                    />
                  </div>
                </div>
              }
            />
          )}
        </Card>

        <div></div>

        {/* Carbon Credit NFT Section */}
        <Card 
          className="rounded-xl shadow-lg border-2 border-gray-200"
          title={
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
                <Leaf size={24} color="white" />
              </div>
              <Title level={3} className="m-0">Carbon Credit Token</Title>
              <button
                onClick={() => navigate("/ccmarketplace")}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 mx-auto"
              >
                <ShoppingBag size={16} />
                SELL Your Carbon Credit Token
              </button>
            </div>
          }
        >
          {carbonCreditData.length === 0 ? (
            <Empty 
              description="No carbon credits minted yet"
              className="py-8"
            />
          ) : (
            <Table 
              dataSource={carbonCreditData} 
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
