import React, { useState } from 'react';
import { Card, Button, Input, Typography, Row, Col, Space, Tag, Avatar, Divider, message } from 'antd';
import { Leaf, TrendingUp, Wallet, Building2, DollarSign, Package } from 'lucide-react';

const { Title, Text } = Typography;

const CarbonCreditMarketplace = () => {
  const [balance] = useState({
    carbonCredits: 100,
    usdt: 20
  });

  const [buyers] = useState([
    {
      id: 1,
      name: 'XYZ Factory',
      offerPrice: 100,
      avatar: '🏭',
      verified: true,
      totalPurchased: '15,000 tokens'
    },
    {
      id: 2,
      name: 'GreenTech Corp',
      offerPrice: 95,
      avatar: '🌿',
      verified: true,
      totalPurchased: '8,500 tokens'
    },
    {
      id: 3,
      name: 'EcoSolutions Ltd',
      offerPrice: 98,
      avatar: '♻️',
      verified: false,
      totalPurchased: '5,200 tokens'
    }
  ]);

  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (buyerId, value) => {
    setQuantities({ ...quantities, [buyerId]: value });
  };

  const handleSell = (buyer) => {
    const quantity = quantities[buyer.id] || 0;
    if (quantity <= 0) {
      message.warning('Please enter a valid quantity');
      return;
    }
    if (quantity > balance.carbonCredits) {
      message.error('Insufficient carbon credits');
      return;
    }
    message.success(`Successfully sold ${quantity} credits to ${buyer.name}! 🎉`);
    console.log('Selling to:', buyer, 'Quantity:', quantity);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-[slideIn_0.6s_ease-out]">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-2xl shadow-lg">
              <TrendingUp size={32} color="white" />
            </div>
            <Title level={1} className="m-0 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Carbon Credit Marketplace
            </Title>
          </div>
          <Text className="text-gray-600 text-base">
            Trade your carbon credits with verified buyers worldwide
          </Text>
        </div>

        {/* Balance Cards */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} md={12}>
            <Card className="rounded-2xl shadow-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-gray-600 text-sm block mb-1">Carbon Credit Token Balance</Text>
                  <Title level={2} className="m-0 text-green-600 font-bold">
                    {balance.carbonCredits}
                  </Title>
                  <Text className="text-gray-500 text-xs">Available to sell</Text>
                </div>
                <div className="bg-green-500 p-4 rounded-2xl">
                  <Leaf size={40} color="white" />
                </div>
              </div>
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card className="rounded-2xl shadow-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-gray-600 text-sm block mb-1">USDT Balance</Text>
                  <Title level={2} className="m-0 text-blue-600 font-bold">
                    ${balance.usdt}
                  </Title>
                  <Text className="text-gray-500 text-xs">Available funds</Text>
                </div>
                <div className="bg-blue-500 p-4 rounded-2xl">
                  <Wallet size={40} color="white" />
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Marketplace */}
        <Card 
          className="rounded-2xl shadow-2xl border-none"
          title={
            <div className="flex items-center gap-3 py-2">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
                <Package size={24} color="white" />
              </div>
              <Title level={3} className="m-0">Active Buyers</Title>
            </div>
          }
        >
          <div className="space-y-4">
            {buyers.map((buyer) => (
              <Card 
                key={buyer.id}
                className="rounded-xl hover:shadow-lg transition-all duration-300 border-2 border-gray-100 hover:border-green-300"
              >
                <Row gutter={[16, 16]} align="middle">
                  {/* Buyer Info */}
                  <Col xs={24} sm={6}>
                    <div className="flex items-center gap-3">
                      <div className="text-5xl">{buyer.avatar}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Text strong className="text-base">{buyer.name}</Text>
                          {buyer.verified && (
                            <Tag color="green" className="text-xs">✓ Verified</Tag>
                          )}
                        </div>
                        <Text type="secondary" className="text-xs flex items-center gap-1">
                          <Building2 size={12} />
                          {buyer.totalPurchased}
                        </Text>
                      </div>
                    </div>
                  </Col>

                  {/* Offer Price */}
                  <Col xs={12} sm={5}>
                    <div>
                      <Text type="secondary" className="text-xs block mb-1">Offer Price Per Token</Text>
                      <div className="flex items-center gap-2">
                        <DollarSign size={20} className="text-green-600" />
                        <Text strong className="text-2xl text-green-600">${buyer.offerPrice}</Text>
                      </div>
                    </div>
                  </Col>

                  {/* Quantity Input */}
                  <Col xs={12} sm={5}>
                    <div>
                      <Text type="secondary" className="text-xs block mb-2">Quantity</Text>
                      <Input
                        size="large"
                        type="number"
                        min="0"
                        max={balance.carbonCredits}
                        placeholder="0"
                        value={quantities[buyer.id] || ''}
                        onChange={(e) => handleQuantityChange(buyer.id, e.target.value)}
                        className="rounded-lg hover:border-green-500 focus:border-green-500"
                      />
                    </div>
                  </Col>

                  {/* Total Value */}
                  <Col xs={12} sm={5}>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-lg">
                      <Text type="secondary" className="text-xs block mb-1">Total Value</Text>
                      <Text strong className="text-lg text-purple-600">
                        ${((quantities[buyer.id] || 0) * buyer.offerPrice).toLocaleString()}
                      </Text>
                    </div>
                  </Col>

                  {/* Sell Button */}
                  <Col xs={12} sm={3}>
                    <Button
                      type="primary"
                      size="large"
                      block
                      onClick={() => handleSell(buyer)}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 border-none hover:from-green-600 hover:to-emerald-700 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all h-12"
                    >
                      SELL
                    </Button>
                  </Col>
                </Row>
              </Card>
            ))}
          </div>
        </Card>

        {/* Market Stats */}
        <Card className="mt-6 rounded-xl shadow-lg border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <div className="text-center">
                <Text className="text-gray-600 text-sm block mb-1">Market High</Text>
                <Title level={4} className="m-0 text-indigo-600">$105</Title>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className="text-center">
                <Text className="text-gray-600 text-sm block mb-1">24h Volume</Text>
                <Title level={4} className="m-0 text-indigo-600">45,300</Title>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className="text-center">
                <Text className="text-gray-600 text-sm block mb-1">Active Buyers</Text>
                <Title level={4} className="m-0 text-indigo-600">{buyers.length}</Title>
              </div>
            </Col>
          </Row>
        </Card>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CarbonCreditMarketplace;
