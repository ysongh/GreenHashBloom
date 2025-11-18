import React, { useState } from 'react';
import { Card, Button, InputNumber, Typography, Space, Divider, Row, Col, Badge, Tag, message } from 'antd';
import { ShoppingCartOutlined, MinusOutlined, PlusOutlined, ClockCircleOutlined, CloudOutlined } from '@ant-design/icons';
import { Leaf, Sprout } from 'lucide-react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseEther } from 'viem';

import GreenHashBloomABI from '../artifacts/contracts/TreeShop.sol/TreeShop.json';
import { CONTRACT_ADDRESS } from '../config';

const { Title, Text } = Typography;

const TreeShop = () => {
  const { isConnected } = useAccount();

  const [basket, setBasket] = useState({
    redOak: 1,
    maple: 2
  });

  const trees = {
    redOak: {
      name: 'Red Oak',
      key: 0,
      price: "1",
      age: 'Under 1 year old',
      harvestTime: '60 years',
      co2: '0.25 ton/year',
      grass: '50t',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
    },
    maple: {
      name: 'Maple',
      key: 1,
      price: "2",
      age: 'Under 1 year old',
      harvestTime: '70 years',
      co2: '0.35 ton/year',
      grass: '60t',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop'
    }
  };

  const { 
    data: hash, 
    writeContract, 
    isPending,
    error 
  } = useWriteContract();

  const updateQuantity = (tree, value) => {
    if (value >= 0) {
      setBasket({ ...basket, [tree]: value });
    }
  };

  const calculateTotal = () => {
    return basket.redOak * trees.redOak.price + basket.maple * trees.maple.price;
  };

  const handlePurchase = async (treeData) => {
    if (!isConnected) {
      return;
    }

    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: GreenHashBloomABI.abi,
        functionName: 'purchaseTree',
        args: [treeData.key],
        value: parseEther(treeData.price),
      });
    } catch (err) {
      console.error('Purchase error:', err);
    }
  };

  const TreeCard = ({ treeKey, treeData }) => (
    <Card
      hoverable
      cover={
        <div style={{ 
          height: 240, 
          background: treeKey === 'redOak' 
            ? 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)' 
            : 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 16,
            right: 16,
          }}>
            <Tag color={treeKey === 'redOak' ? 'red' : 'green'} style={{ fontWeight: 'bold' }}>
              NEW
            </Tag>
          </div>
          <div style={{ 
            fontSize: 80, 
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
            animation: 'float 3s ease-in-out infinite'
          }}>
            {treeKey === 'redOak' ? '🍂' : '🍁'}
          </div>
        </div>
      }
      style={{ 
        marginBottom: 24,
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
      }}
      styles={{
        body: { padding: '24px' }
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <Title level={3} style={{ margin: 0, marginBottom: 4 }}>{treeData.name}</Title>
          <Space size={4}>
            <ClockCircleOutlined style={{ color: '#8c8c8c', fontSize: 12 }} />
            <Text type="secondary" style={{ fontSize: 12 }}>{treeData.age}</Text>
          </Space>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Title level={2} style={{ margin: 0, color: '#52c41a', fontWeight: 700 }}>${treeData.price}</Title>
          <Text type="secondary" style={{ fontSize: 12 }}>per tree</Text>
        </div>
      </div>
      
      <div style={{ 
        background: '#f5f5f5', 
        padding: '12px 16px', 
        borderRadius: 8, 
        marginBottom: 16 
      }}>
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ClockCircleOutlined style={{ color: '#1890ff' }} />
            <Text style={{ fontSize: 13 }}>
              <Text strong>Harvest:</Text> {treeData.harvestTime}
            </Text>
          </div>
        </Space>
      </div>
      
      <div style={{ marginBottom: 20 }}>
        <Text strong style={{ color: '#52c41a', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <Sprout size={16} /> Environmental Benefits
        </Text>
        <Space direction="vertical" size={6} style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CloudOutlined style={{ color: '#1890ff', fontSize: 16 }} />
            <Text style={{ fontSize: 13 }}>
              CO₂ absorption: <strong>{treeData.co2}</strong>
            </Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Leaf size={16} color="#52c41a" />
            <Text style={{ fontSize: 13 }}>
              Grass growth: <strong>{treeData.grass}</strong>
            </Text>
          </div>
        </Space>
      </div>

      <Space.Compact style={{ width: '100%' }}>
        {/* <Button 
          icon={<MinusOutlined />} 
          onClick={() => updateQuantity(treeKey, basket[treeKey] - 1)}
          size="large"
          style={{ borderRadius: '8px 0 0 8px' }}
        />
        <InputNumber 
          min={0} 
          value={basket[treeKey]} 
          onChange={(value) => updateQuantity(treeKey, value)}
          size="large"
          style={{ width: '70px', textAlign: 'center' }}
          controls={false}
        />
        <Button 
          icon={<PlusOutlined />} 
          onClick={() => updateQuantity(treeKey, basket[treeKey] + 1)}
          size="large"
        /> */}
        <Button 
          onClick={() => handlePurchase(treeData)}
          type="primary" 
          size="large"
          style={{ 
            marginLeft: 8, 
            flex: 1, 
            background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
            borderColor: '#52c41a',
            borderRadius: '0 8px 8px 0',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(82, 196, 26, 0.3)'
          }}
          icon={<ShoppingCartOutlined />}
        >
          PURCHASE
        </Button>
      </Space.Compact>
    </Card>
  );

  return (
    <div style={{ 
      padding: '40px 24px', 
      maxWidth: 1400, 
      margin: '0 auto', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh' 
    }}>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      
      <div style={{ 
        textAlign: 'center', 
        marginBottom: 48,
        animation: 'slideIn 0.6s ease-out'
      }}>
        <Title level={1} style={{ 
          margin: 0, 
          marginBottom: 8,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: 48,
          fontWeight: 800
        }}>
          🌳 Plant Your Future
        </Title>
        <Text style={{ fontSize: 16, color: '#666' }}>
          Choose premium trees and make a positive environmental impact
        </Text>
        <button onClick={() => handlePurchase(trees.redOak)}>test</button>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <TreeCard treeKey="redOak" treeData={trees.redOak} />
            </Col>
            <Col xs={24} md={12}>
              <TreeCard treeKey="maple" treeData={trees.maple} />
            </Col>
          </Row>
        </Col>

        {/* <Col xs={24} lg={8}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Badge count={basket.redOak + basket.maple} showZero color="#52c41a">
                  <ShoppingCartOutlined style={{ fontSize: 20 }} />
                </Badge>
                <span style={{ fontWeight: 600 }}>My Basket</span>
              </div>
            }
            style={{ 
              position: 'sticky', 
              top: 24,
              borderRadius: 12,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              border: '2px solid #f0f0f0'
            }}
          >
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              {basket.redOak > 0 && (
                <div style={{ 
                  padding: '16px',
                  background: 'linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%)',
                  borderRadius: 8,
                  animation: 'slideIn 0.4s ease-out'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <Space>
                      <div style={{ fontSize: 24 }}>🍂</div>
                      <Text strong style={{ fontSize: 16 }}>Red Oak</Text>
                    </Space>
                    <Space size="small">
                      <Button 
                        size="small" 
                        icon={<MinusOutlined />} 
                        onClick={() => updateQuantity('redOak', basket.redOak - 1)}
                        shape="circle"
                      />
                      <Text strong style={{ fontSize: 16, minWidth: 24, textAlign: 'center', display: 'inline-block' }}>
                        {basket.redOak}
                      </Text>
                      <Button 
                        size="small" 
                        icon={<PlusOutlined />} 
                        onClick={() => updateQuantity('redOak', basket.redOak + 1)}
                        shape="circle"
                        type="primary"
                        style={{ background: '#ff4d4f', borderColor: '#ff4d4f' }}
                      />
                    </Space>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text type="secondary">Price Per Unit</Text>
                    <Text strong>${trees.redOak.price}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text strong>Total</Text>
                    <Text strong style={{ color: '#ff4d4f', fontSize: 16 }}>
                      ${basket.redOak * trees.redOak.price}
                    </Text>
                  </div>
                </div>
              )}

              {basket.maple > 0 && (
                <div style={{ 
                  padding: '16px',
                  background: 'linear-gradient(135deg, #f6ffed 0%, #d9f7be 100%)',
                  borderRadius: 8,
                  animation: 'slideIn 0.4s ease-out'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <Space>
                      <div style={{ fontSize: 24 }}>🍁</div>
                      <Text strong style={{ fontSize: 16 }}>Maple</Text>
                    </Space>
                    <Space size="small">
                      <Button 
                        size="small" 
                        icon={<MinusOutlined />} 
                        onClick={() => updateQuantity('maple', basket.maple - 1)}
                        shape="circle"
                      />
                      <Text strong style={{ fontSize: 16, minWidth: 24, textAlign: 'center', display: 'inline-block' }}>
                        {basket.maple}
                      </Text>
                      <Button 
                        size="small" 
                        icon={<PlusOutlined />} 
                        onClick={() => updateQuantity('maple', basket.maple + 1)}
                        shape="circle"
                        type="primary"
                        style={{ background: '#52c41a', borderColor: '#52c41a' }}
                      />
                    </Space>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text type="secondary">Price Per Unit</Text>
                    <Text strong>${trees.maple.price}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text strong>Total</Text>
                    <Text strong style={{ color: '#52c41a', fontSize: 16 }}>
                      ${basket.maple * trees.maple.price}
                    </Text>
                  </div>
                </div>
              )}

              {basket.redOak === 0 && basket.maple === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
                  <Text type="secondary">Your basket is empty</Text>
                </div>
              )}

              {(basket.redOak > 0 || basket.maple > 0) && (
                <>
                  <Divider style={{ margin: 0 }} />

                  <div style={{ 
                    textAlign: 'center', 
                    padding: '24px 0',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: 8,
                    margin: '0 -24px',
                  }}>
                    <Text style={{ color: 'white', fontSize: 14, display: 'block', marginBottom: 4 }}>
                      Total Amount
                    </Text>
                    <Title level={1} style={{ margin: 0, color: 'white', fontWeight: 800 }}>
                      ${calculateTotal()}
                    </Title>
                  </div>

                  <Button 
                    type="primary" 
                    size="large" 
                    block 
                    style={{ 
                      background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
                      borderColor: '#52c41a',
                      fontWeight: 700,
                      height: 56,
                      fontSize: 16,
                      borderRadius: 8,
                      boxShadow: '0 4px 12px rgba(82, 196, 26, 0.4)',
                      transition: 'all 0.3s ease'
                    }}
                    icon={<ShoppingCartOutlined />}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(82, 196, 26, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(82, 196, 26, 0.4)';
                    }}
                  >
                    COMPLETE PURCHASE
                  </Button>

                  <Text type="secondary" style={{ fontSize: 12, textAlign: 'center', display: 'block' }}>
                    🌱 Every tree helps fight climate change
                  </Text>
                </>
              )}
            </Space>
          </Card>
        </Col> */}
      </Row>
    </div>
  );
};

export default TreeShop;
