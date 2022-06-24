import React, { useState } from 'react';
import Avatar from '../../assets/images/user-icon.png';
//import Bell from '../../assets/images/bell-icon.png';
import { Flex, Text, Box } from '@blockstack/ui';

const Profile = ({ username, language, onLogout }) => {
  const [show,setShow] = useState('false');

  const onToggle = () => {
    if (show === 'true') setShow('false');
    else setShow('true');
  };

  return (
    <Flex>
	  <div  className="top-menu">
		<Text><span className="opacity-03">Back to </span><a href="http://minr.tech" target="_blank" rel="noreferrer" className="text-success bold">MINR TECH</a></Text>
		<div className="top-sub-menu">
		  {/* <Box className="bell-icon" as="img" src={Bell} alt="Notification" ></Box>
		  <Text className="language">{language}</Text>
		  <Text className="py-2 px-3">{username}</Text> */}
		  <Box cursor="pointer"    onClick={onToggle}>
			  <Box as="img" src={Avatar} alt="avatar" width="42px"></Box>
		  </Box>
		</div>
	  </div>
      <Flex className="logout"   height={show === 'true' ? '40px' : '0'}>
        <Box as="button"   _hover={{ backgroundColor: '#2DCE89', color: '#FFF' }}       onClick={onLogout}  >
          Log Out
        </Box>
      </Flex>
    </Flex>
  );
};

export default Profile;
