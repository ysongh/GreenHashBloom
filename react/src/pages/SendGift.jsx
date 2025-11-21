import React, { useState } from 'react';
import { Card, Input, Button, Typography, Row, Col, message } from 'antd';
import { Heart, Smile, Trophy, Gift, Send, RotateCcw } from 'lucide-react';

const { Title, Text } = Typography;
const { TextArea } = Input;

const SendGift = () => {
  const [selectedOccasion, setSelectedOccasion] = useState('just-for-you');
  const [formData, setFormData] = useState({
    recipientEmail: '',
    recipientName: '',
    giftAmount: '',
    yourName: '',
    yourEmail: '',
    giftMessage: ''
  });

  const occasions = [
    { id: 'just-for-you', icon: Heart, label: 'Just for you', color: 'from-pink-500 to-rose-500' },
    { id: 'thank-you', icon: Smile, label: 'Thank you', color: 'from-yellow-400 to-orange-500' },
    { id: 'congratulations', icon: Trophy, label: 'Congratulations', color: 'from-blue-500 to-indigo-600' }
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSend = () => {
    console.log('Sending gift:', formData);
    message.success('Gift sent successfully! 🎁');
  };

  const handleReset = () => {
    setFormData({
      recipientEmail: '',
      recipientName: '',
      giftAmount: '',
      yourName: '',
      yourEmail: '',
      giftMessage: ''
    });
    setSelectedOccasion('just-for-you');
    message.info('Form reset');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-[slideIn_0.6s_ease-out]">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg">
              <Gift size={48} color="white" />
            </div>
          </div>
          <Title level={1} className="m-0 mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Send a Tree Gift
          </Title>
          <Text className="text-lg text-gray-600">
            Share the gift of nature and make someone's day special 🌳
          </Text>
        </div>

        {/* Main Card */}
        <Card className="rounded-2xl shadow-2xl border-none overflow-hidden">
          <div className="p-8">
            {/* Occasion Selection */}
            <div className="mb-8">
              <Title level={4} className="mb-4">What's the Occasion?</Title>
              <Row gutter={[16, 16]}>
                {occasions.map((occasion) => {
                  const IconComponent = occasion.icon;
                  const isSelected = selectedOccasion === occasion.id;
                  return (
                    <Col xs={24} sm={8} key={occasion.id}>
                      <div
                        onClick={() => setSelectedOccasion(occasion.id)}
                        className={`
                          cursor-pointer rounded-xl p-6 text-center transition-all duration-300
                          ${isSelected 
                            ? `bg-gradient-to-br ${occasion.color} text-white shadow-xl scale-105` 
                            : 'bg-gray-50 hover:bg-gray-100 hover:scale-102 shadow-md'
                          }
                        `}
                      >
                        <IconComponent 
                          size={48} 
                          className={`mx-auto mb-3 ${isSelected ? 'animate-bounce' : ''}`}
                          color={isSelected ? 'white' : '#6b7280'}
                        />
                        <Text className={`font-semibold text-base ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                          {occasion.label}
                        </Text>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>

            {/* Form */}
            <Row gutter={24}>
              {/* Left Column */}
              <Col xs={24} md={12}>
                <div className="space-y-5">
                  <div>
                    <label className="block mb-2">
                      <Text className="text-gray-700 font-semibold">
                        <span className="text-red-500">* </span>Recipient Email
                      </Text>
                    </label>
                    <Input
                      size="large"
                      placeholder="recipient@example.com"
                      value={formData.recipientEmail}
                      onChange={(e) => handleInputChange('recipientEmail', e.target.value)}
                      className="rounded-lg hover:border-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <Text className="text-gray-700 font-semibold">
                        <span className="text-red-500">* </span>Recipient Name
                      </Text>
                    </label>
                    <Input
                      size="large"
                      placeholder="John Doe"
                      value={formData.recipientName}
                      onChange={(e) => handleInputChange('recipientName', e.target.value)}
                      className="rounded-lg hover:border-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <Text className="text-gray-700 font-semibold">
                        <span className="text-red-500">* </span>Gift Amount
                      </Text>
                    </label>
                    <Input
                      size="large"
                      placeholder="$50"
                      prefix="$"
                      type="number"
                      value={formData.giftAmount}
                      onChange={(e) => handleInputChange('giftAmount', e.target.value)}
                      className="rounded-lg hover:border-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <Text className="text-gray-700 font-semibold">
                        <span className="text-red-500">* </span>Your Name
                      </Text>
                    </label>
                    <Input
                      size="large"
                      placeholder="Jane Smith"
                      value={formData.yourName}
                      onChange={(e) => handleInputChange('yourName', e.target.value)}
                      className="rounded-lg hover:border-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2">
                      <Text className="text-gray-700 font-semibold">
                        <span className="text-red-500">* </span>Your Email
                      </Text>
                    </label>
                    <Input
                      size="large"
                      placeholder="your@example.com"
                      value={formData.yourEmail}
                      onChange={(e) => handleInputChange('yourEmail', e.target.value)}
                      className="rounded-lg hover:border-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </Col>

              {/* Right Column */}
              <Col xs={24} md={12}>
                <div>
                  <label className="block mb-2">
                    <Text className="text-gray-700 font-semibold">
                      <span className="text-red-500">* </span>Gift Message
                    </Text>
                  </label>
                  <TextArea
                    rows={20}
                    placeholder="Write a heartfelt message to accompany your gift..."
                    value={formData.giftMessage}
                    onChange={(e) => handleInputChange('giftMessage', e.target.value)}
                    className="rounded-lg hover:border-green-500 focus:border-green-500"
                  />
                </div>
              </Col>
            </Row>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              <Button
                type="primary"
                size="large"
                icon={<Send size={18} />}
                onClick={handleSend}
                className="bg-gradient-to-r from-green-500 to-emerald-600 border-none hover:from-green-600 hover:to-emerald-700 font-semibold px-8 h-12 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Send Gift
              </Button>
              <Button
                size="large"
                icon={<RotateCcw size={18} />}
                onClick={handleReset}
                className="font-semibold px-8 h-12 rounded-lg hover:border-gray-400 transition-all"
              >
                Reset
              </Button>
            </div>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 rounded-xl shadow-lg border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-start gap-4">
            <div className="bg-green-500 p-3 rounded-lg">
              <Gift size={24} color="white" />
            </div>
            <div>
              <Title level={5} className="m-0 mb-2 text-green-800">How it works</Title>
              <Text className="text-gray-700">
                Your recipient will receive an email with your personalized message and instructions to claim their tree gift. 
                They can choose which trees to plant and watch them grow in their own virtual forest! 🌲
              </Text>
            </div>
          </div>
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

export default SendGift;
