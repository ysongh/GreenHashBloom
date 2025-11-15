import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Typography, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined, WalletOutlined  } from '@ant-design/icons';
import { TreeDeciduous } from 'lucide-react';

const { Text } = Typography;

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAddress, setUserAddress] = useState('');

  const handleConnect = () => {
    // Simulate wallet connection
    setIsLoggedIn(true);
    setUserAddress('0x742d...5f3a');
  };

  const handleDisconnect = () => {
    setIsLoggedIn(false);
    setUserAddress('');
  };

  const menuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'wallet',
      icon: <WalletOutlined />,
      label: 'My Wallet',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Disconnect',
      danger: true,
      onClick: handleDisconnect,
    },
  ];

  return (
    <div className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-12 flex justify-between items-center h-20">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
              <TreeDeciduous size={24} color="white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Green Hash Bloom
            </span>
          </div>
          
          <div className="flex gap-8">
            <Link 
              to="/" 
              className="text-gray-700 text-base font-medium no-underline transition-all hover:text-green-600 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full"></span>
            </Link>
             <Link 
              to="/treeshop" 
              className="text-gray-700 text-base font-medium no-underline transition-all hover:text-green-600 relative group"
            >
              Buy Tree
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              to="/map" 
              className="text-gray-700 text-base font-medium no-underline transition-all hover:text-green-600 relative group"
            >
              Map
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full"></span>
            </Link>
          </div>
        </div>
        
        {/* User Section */}
        {isLoggedIn ? (
          <Dropdown 
            menu={{ items: menuItems }} 
            trigger={['click']}
            placement="bottomRight"
          >
            <div className="flex items-center gap-3 cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-50 transition-all">
              <div className="flex flex-col items-end">
                <Text className="font-semibold text-sm text-gray-800">My Account</Text>
                <Text className="text-xs text-gray-500 font-mono">{userAddress}</Text>
              </div>
              <Avatar 
                size={40} 
                className="bg-gradient-to-br from-green-500 to-emerald-600"
                icon={<UserOutlined />}
              />
            </div>
          </Dropdown>
        ) : (
          <div className="flex flex-col items-end gap-1">
            <Button 
              type="primary"
              icon={<WalletOutlined />}
              onClick={handleConnect}
              className="bg-gradient-to-r from-green-500 to-emerald-600 border-none hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all h-9 font-semibold"
            >
              Connect Wallet
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
