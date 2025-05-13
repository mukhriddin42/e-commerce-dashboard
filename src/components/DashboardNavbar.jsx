import React from 'react';
import { Navbar, Nav, Dropdown, Avatar } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import SignOutIcon from '@rsuite/icons/legacy/SignOut';
import UserInfoIcon from '@rsuite/icons/legacy/UserInfo';
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

import 'rsuite/dist/rsuite.min.css';


const styles = {
  width: 300,
  marginBottom: 10
};

const DashboardNavbar = () => {
  return (
    <div  className="shadow-sm  py-1 flex justify-around items-center">

      {/* Chap tomon –  menyu */}

      <InputGroup style={styles}>
        <Input />
        <InputGroup.Button>
          <SearchIcon />
        </InputGroup.Button>
      </InputGroup>


      {/* O'ng tomon – foydalanuvchi menyusi */}
      <Nav pullRight>
        <Dropdown
          placement="bottomEnd"
          title={
            <Avatar
              circle
              src="https://i.pravatar.cc/40" // Bu avatar o‘rniga o‘zingizning rasm URL’ingizni qo‘yishingiz mumkin
              alt="User"
            />
          }
        >
          <Dropdown.Item icon={<UserInfoIcon />}>Profile</Dropdown.Item>
          <Dropdown.Item icon={<CogIcon />}>Settings</Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item icon={<SignOutIcon />}>Logout</Dropdown.Item>
        </Dropdown>
      </Nav>
    </div>
  );
};

export default DashboardNavbar;
