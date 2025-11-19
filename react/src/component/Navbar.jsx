import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, Typography, Dropdown, Tag } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined, WalletOutlined } from '@ant-design/icons';
import { TreeDeciduous } from 'lucide-react';
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";

const { Text } = Typography;

const Navbar = () => {
  const navigate = useNavigate();
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  // Format address for display
  const formatAddress = (addr) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleSwitchToHedera = () => {
    switchChain({ chainId: 296 }); // Hedera Testnet
  };

  const menuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate("/userprofile")
    },
    {
      key: 'wallet',
      icon: <WalletOutlined />,
      label: 'My Wallet',
    },
    {
      key: 'network',
      label: (
        <div>
          <div className="text-xs text-gray-500 mb-1">Current Network</div>
          <div className="font-medium">{chain?.name || 'Unknown'}</div>
          {chain?.id !== 296 && (
            <Button 
              size="small" 
              type="link" 
              onClick={handleSwitchToHedera}
              className="p-0 h-auto mt-1"
            >
              Switch to Hedera Testnet
            </Button>
          )}
        </div>
      ),
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
      onClick: () => disconnect(),
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
          </div>
        </div>
        
        {/* User Section */}
        {isConnected && address ? (
          <Dropdown 
            menu={{ items: menuItems }} 
            trigger={['click']}
            placement="bottomRight"
          >
            <div className="flex items-center gap-3 cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-50 transition-all">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <Text className="font-semibold text-sm text-gray-800">My Account</Text>
                  {chain?.testnet && (
                    <Tag color="orange" className="text-xs m-0">Testnet</Tag>
                  )}
                </div>
                <Text className="text-xs text-gray-500 font-mono">{formatAddress(address)}</Text>
              </div>
              <Avatar 
                size={40} 
                className="bg-gradient-to-br from-green-500 to-emerald-600"
                icon={<UserOutlined />}
              />
            </div>
          </Dropdown>
        ) : (
          <div className="flex flex-col gap-2">
            <appkit-button />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
