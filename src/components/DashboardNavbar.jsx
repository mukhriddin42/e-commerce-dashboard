import React, { memo } from 'react';
import { Navbar, Nav, Dropdown, Avatar } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import SignOutIcon from '@rsuite/icons/legacy/SignOut';
import UserInfoIcon from '@rsuite/icons/legacy/UserInfo';
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { Badge, Button } from 'rsuite';

// react-icons
import { IoTvSharp } from "react-icons/io5";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoMdMoon } from "react-icons/io";
import { FaBell } from "react-icons/fa";


import 'rsuite/dist/rsuite.min.css';
import { Link } from 'react-router-dom';


const styles = {
  width: 300,
};

const DashboardNavbar = () => {
  const img = localStorage.getItem('photo')
  console.log(img);
  
  return (
    <div className=" shadow-sm h-[110px] md:h-[64px]   flex flex-col gap-2 ">

      <div className=" flex px-2 md:px-5 mt-2 w-full justify-end md:flex-row  md:justify-between items-center">
        {/* Chap tomon –  menyu */}


        <InputGroup style={styles} className='hidden! md:flex!'>
          <Input className='bg-gray-100!' />
          <InputGroup.Button className='bg-gray-200!'>
            <SearchIcon />
          </InputGroup.Button>
        </InputGroup>


        {/* O'ng tomon – foydalanuvchi menyusi */}
        <div className='flex gap-1 md:gap-3 mt-2 items-center'>

          <Badge content={3}>
            <Button>
              <FaBell size={15} />

            </Button>
          </Badge>
          <Button>
            <IoMdMoon size={15} />

          </Button>

          <Button>
            <IoTvSharp size={15} />
          </Button>
          <Nav pullRight className=''>
            <Dropdown
              placement="bottomEnd"
              className='border border-gray-300 rounded-sm mr-2'
              title={
                <FaEarthAmericas size={15} />

              }
            >
              <Dropdown.Item icon={<UserInfoIcon />}>Profile</Dropdown.Item>
              <Dropdown.Item icon={<CogIcon />}>Settings</Dropdown.Item>
              <Dropdown.Separator />
              <Link to='login'>
                <Dropdown.Item icon={<SignOutIcon />}> Logout </Dropdown.Item>
              </Link>
            </Dropdown>
            <Dropdown
              placement="bottomEnd"
              className='border w-17 md:w-auto border-gray-300  rounded-sm '
              title={
                <Avatar 
                  circle
                  src={img} 
                  alt="User"
                  className='w-5! h-5! md:w-8! md:h-8! '
                />
              }
            >
              <Dropdown.Item icon={<UserInfoIcon />}>Profile</Dropdown.Item>
              <Dropdown.Item icon={<CogIcon />}>Settings</Dropdown.Item>
              <Dropdown.Separator />
              <Link to='login'>
                <Dropdown.Item icon={<SignOutIcon />}> Logout </Dropdown.Item>
              </Link>
            </Dropdown>
          </Nav>
        </div>

      </div>

      <InputGroup className='flex! md:hidden! max-w-[80%] mx-auto '>
        <Input className='bg-gray-50!' />
        <InputGroup.Button className='bg-gray-200!'>
          <SearchIcon />
        </InputGroup.Button>
      </InputGroup>

    </div>
  );
};

export default memo(DashboardNavbar);
