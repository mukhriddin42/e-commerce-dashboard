import React, { memo, useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Avatar, Input, InputGroup, Badge, Button } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import SignOutIcon from '@rsuite/icons/legacy/SignOut';
import UserInfoIcon from '@rsuite/icons/legacy/UserInfo';
import SearchIcon from '@rsuite/icons/Search';

import { IoTvSharp } from "react-icons/io5";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoMdMoon } from "react-icons/io";
import { FaBell } from "react-icons/fa";

import 'rsuite/dist/rsuite.min.css';
import { Link } from 'react-router-dom';
import { fetchLastImage } from '../hooks/imagesFuncion';
import { ThemeContext } from '../hooks/useContext';

const styles = {
  width: 300,
};

const DashboardNavbar = () => {
  const [image, setImage] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLastImage().then(img => {
        if (img !== image) setImage(img);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [image]);

  const { theme, setTheme } = useContext(ThemeContext);

  const handleMode = () => {
    setTheme(theme === 'light' ? 'black' : 'light');
  };

  return (
    <div className="shadow-sm h-[110px] md:h-[64px] flex flex-col gap-2">
      <div className="flex px-2 md:px-5 mt-2 w-full justify-end md:flex-row md:justify-between items-center">

        {/* Chap tomon – Qidiruv */}
        <InputGroup style={styles} className='hidden! md:flex!'>
          <Input className='bg-gray-100!' />
          <InputGroup.Button className='bg-gray-200!'>
            <SearchIcon />
          </InputGroup.Button>
        </InputGroup>

        {/* O‘ng tomon */}
        <div className='flex gap-1 md:gap-3 mt-2 items-center'>
          <Badge content={3}>
            <Button><FaBell size={15} /></Button>
          </Badge>
          <Button onClick={handleMode}>
            <IoMdMoon size={15} />
          </Button>
          <Button>
            <IoTvSharp color='red' size={15} />
          </Button>

          <Nav pullRight>
            {/* Earth Icon Menu */}
            <Nav.Menu
              title={<FaEarthAmericas size={15} />}
              placement="bottomEnd"
              className='border border-gray-300 rounded-sm mr-2'
            >
              <Nav.Item icon={<UserInfoIcon />}>Profile</Nav.Item>
              <Nav.Item icon={<CogIcon />}>Settings</Nav.Item>
              <Nav.Item divider />
              <Link to='login'>
                <Nav.Item icon={<SignOutIcon />}>Logout</Nav.Item>
              </Link>
            </Nav.Menu>

            {/* Avatar Menu */}
            <Nav.Menu
              title={
                <Avatar
                  circle
                  src={image}
                  alt="User"
                  className='w-5! h-5! md:w-8! md:h-8!'
                />
              }
              placement="bottomEnd"
              className='border w-17 md:w-auto border-gray-300 rounded-sm'
            >
              <Link to='/profile-setting'>
                <Nav.Item icon={<UserInfoIcon />}>Profile</Nav.Item>
              </Link>
              <Link to='/site-setting'>
                <Nav.Item icon={<CogIcon />}>Settings</Nav.Item>
              </Link>
              <Nav.Item divider />
              <Link to='login'>
                <Nav.Item icon={<SignOutIcon />}>Logout</Nav.Item>
              </Link>
            </Nav.Menu>
          </Nav>
        </div>
      </div>

      {/* Mobilda qidiruv */}
      <InputGroup className='flex! md:hidden! max-w-[80%] mx-auto'>
        <Input className='bg-gray-50!' />
        <InputGroup.Button className='bg-gray-200!'>
          <SearchIcon />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default memo(DashboardNavbar);
