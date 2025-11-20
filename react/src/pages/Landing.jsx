import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col, Card, Typography } from 'antd';
import { SmileOutlined, GlobalOutlined, FileTextOutlined, DollarOutlined, GiftOutlined, RightOutlined } from '@ant-design/icons';
import { TreeDeciduous, Sparkles } from 'lucide-react';

const { Title, Text, Paragraph } = Typography;

const Landing = () => {
  const navigate = useNavigate();

  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      icon: <SmileOutlined className="text-5xl" />,
      title: 'Innovative',
      description: 'Each tree is an NFT. You own it and earn CO2 credit as NFT annually.',
      color: 'from-blue-500 to-cyan-500',
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500'
    },
    {
      icon: <GlobalOutlined className="text-5xl" />,
      title: 'Reduce CO2',
      description: 'We need more forests to capture carbon and combat climate change.',
      color: 'from-green-500 to-emerald-500',
      iconBg: 'bg-gradient-to-br from-green-500 to-emerald-500'
    },
    {
      icon: <FileTextOutlined className="text-5xl" />,
      title: 'Biodiversity',
      description: 'Your trees fosters a vibrant ecosystems for wildlife.',
      color: 'from-purple-500 to-pink-500',
      iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500'
    },
    {
      icon: <DollarOutlined className="text-5xl" />,
      title: 'Rewarding',
      description: "Once carbon contribution of your trees decline, it's cut for timber - All the profit goes to you.",
      color: 'from-orange-500 to-red-500',
      iconBg: 'bg-gradient-to-br from-orange-500 to-red-500'
    },
  ];
  
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .gradient-text {
          background: linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.7;
          animation: float 20s infinite ease-in-out;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-10">
        <div className="blob bg-green-300 w-96 h-96 -top-48 -left-48" style={{ animationDelay: '0s' }}></div>
        <div className="blob bg-emerald-300 w-80 h-80 top-1/3 -right-40" style={{ animationDelay: '5s' }}></div>
        <div className="blob bg-teal-300 w-72 h-72 bottom-0 left-1/4" style={{ animationDelay: '10s' }}></div>
        
        <div className="max-w-7xl mx-auto px-8 py-24 relative z-10">
          <Row gutter={[64, 48]} align="middle">
            <Col xs={24} lg={12}>
              <div className="space-y-8 animate-slide-in-left">
                <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                  <Sparkles size={16} className="text-green-600" />
                  <Text className="text-green-700 font-semibold text-sm">Join the Green Revolution</Text>
                </div>
                
                <Title level={1} className="text-6xl font-black m-0 leading-tight text-gray-900">
                  Build Your <span className="gradient-text">Forest</span>
                </Title>
                
                <Paragraph className="text-xl text-gray-600 leading-relaxed">
                  Own real trees as NFTs, combat climate change, and earn rewards. Every tree makes a difference.
                </Paragraph>
                
                <div className="flex gap-4">
                  <Button
                    onClick={() => navigate("/treeshop")}
                    type="primary" 
                    size="large"
                    icon={<RightOutlined />}
                    iconPosition="end"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 border-none h-14 px-10 text-lg font-bold shadow-2xl hover:shadow-green-500/50 transition-all hover:-translate-y-1 hover:scale-105"
                  >
                    Get STARTED
                  </Button>
                  <Button 
                    size="large"
                    className="h-14 px-8 text-lg font-semibold border-2 border-green-600 text-green-600 hover:bg-green-50 transition-all hover:-translate-y-1"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </Col>
            
            <Col xs={24} lg={12}>
              <div className="flex justify-center animate-slide-in-right">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                  <div className="relative text-center">
                    <div className="text-[12rem] leading-none" style={{ animation: 'float 6s infinite ease-in-out' }}>
                      🌍
                    </div>
                    <div className="absolute -top-8 -right-8 text-7xl" style={{ animation: 'float 4s infinite ease-in-out' }}>🌳</div>
                    <div className="absolute -top-8 -left-8 text-6xl" style={{ animation: 'float 5s infinite ease-in-out', animationDelay: '0.5s' }}>🌱</div>
                    <div className="absolute -bottom-4 right-12 text-7xl" style={{ animation: 'float 4.5s infinite ease-in-out', animationDelay: '1s' }}>🍃</div>
                    <div className="absolute top-1/4 -left-12 text-5xl" style={{ animation: 'float 5.5s infinite ease-in-out', animationDelay: '1.5s' }}>💚</div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <Title level={2} className="text-5xl font-black m-0">
              Why Choose <span className="gradient-text">Green Hash Bloom</span>?
            </Title>
            <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine cutting-edge blockchain technology with environmental impact
            </Paragraph>
          </div>
          
          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card 
                  className="h-full text-center border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer overflow-hidden group"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ 
                    animation: `fadeIn 0.6s ease-out ${index * 0.1}s forwards`,
                    opacity: 0
                  }}
                >
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                    <div className="flex flex-col items-center space-y-6 p-4 relative z-10">
                      <div className={`${feature.iconBg} w-20 h-20 rounded-2xl flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        {feature.icon}
                      </div>
                      <Title level={4} className="font-bold m-0 text-xl">
                        {feature.title}
                      </Title>
                      <Text className="text-gray-600 text-base leading-relaxed">
                        {feature.description}
                      </Text>
                      {hoveredCard === index && (
                        <div className="w-12 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
                      )}
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Gift Section */}
      <div id="gift" className="relative overflow-hidden py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
        <div className="blob bg-purple-300 w-96 h-96 -top-48 -right-48" style={{ animationDelay: '2s' }}></div>
        <div className="blob bg-pink-300 w-80 h-80 bottom-0 -left-40" style={{ animationDelay: '7s' }}></div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <Row gutter={[64, 48]} align="middle">
            <Col xs={24} lg={12} className="order-2 lg:order-1">
              <div className="flex justify-center animate-slide-in-left">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-red-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                  <div className="relative text-[10rem]" style={{ animation: 'float 5s infinite ease-in-out' }}>🎄</div>
                  <div className="absolute -top-8 -right-12 text-8xl" style={{ animation: 'float 3s infinite ease-in-out' }}>🎁</div>
                  <div className="absolute -bottom-8 -left-12 text-7xl" style={{ animation: 'float 4s infinite ease-in-out', animationDelay: '0.5s' }}>🎁</div>
                  <div className="absolute top-8 -right-20 text-5xl text-yellow-400" style={{ animation: 'float 3.5s infinite ease-in-out', animationDelay: '0.3s' }}>✨</div>
                  <div className="absolute top-20 -left-16 text-5xl text-orange-400" style={{ animation: 'float 4.5s infinite ease-in-out', animationDelay: '0.7s' }}>✨</div>
                  <div className="absolute -bottom-4 right-8 text-5xl text-red-400" style={{ animation: 'float 3.8s infinite ease-in-out', animationDelay: '1s' }}>✨</div>
                </div>
              </div>
            </Col>
            
            <Col xs={24} lg={12} className="order-1 lg:order-2">
              <div className="space-y-6 animate-slide-in-right">
                <div className="inline-flex items-center gap-2 bg-pink-100 px-4 py-2 rounded-full">
                  <GiftOutlined className="text-pink-600" />
                  <Text className="text-pink-700 font-semibold text-sm">Spread the Love</Text>
                </div>
                
                <Title level={2} className="text-5xl font-black m-0 leading-tight">
                  Are you in a <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">giving mood</span>?
                </Title>
                
                <Title level={3} className="text-2xl font-bold text-green-600 m-0">
                  Send Trees as a gift to your family and friends!
                </Title>
                
                <Paragraph className="text-lg text-gray-600 leading-relaxed">
                  After your tree purchase, you can send it as a gift. Give the gift of sustainability and watch their forest grow.
                </Paragraph>
                
                <div className="flex gap-4">
                  <Button 
                    type="primary"
                    size="large"
                    icon={<GiftOutlined />}
                    className="bg-gradient-to-r from-pink-500 to-red-500 border-none h-14 px-10 text-lg font-bold shadow-2xl hover:shadow-pink-500/50 transition-all hover:-translate-y-1 hover:scale-105"
                  >
                    Gift a Tree
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-8 text-center space-y-8 relative z-10">
          <div className="animate-fade-in">
            <Title level={2} className="text-white text-5xl font-black m-0 mb-4">
              Ready to Make a Difference?
            </Title>
            <Paragraph className="text-white text-xl opacity-95 leading-relaxed">
              Join thousands of people building their forests and fighting climate change. Start your journey today!
            </Paragraph>
          </div>
          
          <div className="flex gap-6 justify-center flex-wrap animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Button
              onClick={() => navigate("/treeshop")}
              size="large"
              icon={<TreeDeciduous size={20} />}
              className="bg-white text-green-600 hover:bg-gray-50 border-none h-16 px-12 text-lg font-bold shadow-2xl transition-all hover:-translate-y-1 hover:scale-105 rounded-xl"
            >
              Browse Trees
            </Button>
            <Button 
              size="large"
              className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-green-600 h-16 px-12 text-lg font-bold transition-all hover:-translate-y-1 hover:scale-105 rounded-xl"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;