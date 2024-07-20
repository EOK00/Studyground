import React, { useState, useEffect } from 'react';
import './ProfileHeader.css';
import Avatar from 'antd/es/avatar/avatar';
import { BellOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ProfileHeader = () => {
  const [userId, setUserId] = useState('찐감자');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserId(storedUser.uId); // Retrieve uId from localStorage
      console.log('User data retrieved from localStorage:', storedUser); 
    } else {
      console.log('No user data found in localStorage. Redirecting to login page.');
      navigate('/#'); 
    }
  }, [navigate]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    console.log('User logged out.');
    navigate('/#');
  };

  return (
    <div className="header-container">
      <div className="profile-container" onClick={toggleDropdown}>
        <div className="profile-img">
          <Avatar groupBorderColors />
        </div>
        <div className="profile">
          {/* {userName}님 */}
          찐감자님
          <CaretDownOutlined />
        </div>
        {dropdownVisible && (
          <div className="dropdown-menu">
            <ul>
              <li onClick={handleProfileClick}>프로필 보기</li>
              <li>설정</li>
              <li onClick={handleLogout}>로그아웃</li>
            </ul>
          </div>
        )}
      </div>
      <div className="alarm-container">
        <BellOutlined style={{ fontSize: '25px' }} />
      </div>
    </div>
  );
};

export default ProfileHeader;