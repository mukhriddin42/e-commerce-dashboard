import React, { memo, use, useContext, useEffect, useLayoutEffect, useState } from 'react';
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
import { IoMdMoon, IoIosSunny } from "react-icons/io";
import { FaBell } from "react-icons/fa";


import 'rsuite/dist/rsuite.min.css';
import { Link } from 'react-router-dom';
import { fetchLastImage } from '../hooks/imagesFuncion';
import { ThemeContext } from '../hooks/useContext';
import { LanguageContext } from '../hooks/useLanguageContext';

const styles = {
  width: 300,
};

const DashboardNavbar = () => {
  const [image, setImage] = useState()

  const { setLanguage } = useContext(LanguageContext)
  // Tarjima funksiyasi
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };



  useEffect(() => {
    const interval = setInterval(() => {
      fetchLastImage().then(img => {
        if (img !== image) setImage(img);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [image]);


  // DARK mode 
  const { theme, setTheme } = useContext(ThemeContext);

  const [iconColor, setIconColor] = useState("white")

  const handleMode = () => {
    if (theme === "light") {
      setTheme("black")
    } else {
      setTheme("light")
    }
  }

  useLayoutEffect(() => {
    if (theme === "light") {
      setIconColor("black")
    } else {
      setIconColor("white")
    }

  }, [theme])







  return (
    <div className={theme === "black"
      ? "!bg-[rgba(0,0,0,.9)] shadow-md shadow-gray-700 h-[110px] md:h-[64px]   flex flex-col gap-2 "
      : "!bg-white shadow-sm h-[110px] md:h-[64px]   flex flex-col gap-2 "
    }>

      <div className=" flex px-2 md:px-5 mt-2 w-full justify-end md:flex-row  md:justify-between items-center">
        {/* Chap tomon –  menyu */}


        <InputGroup style={styles} className='hidden! md:flex!'>
          <Input className={theme === "black" ? "bg-gray-400! text-blue-900! " : "bg-gray-100!"} />
          <InputGroup.Button className={theme === "black"
            ? 'bg-gray-600!'
            : "bg-gray-200!"
          }>
            <SearchIcon color={iconColor} />
          </InputGroup.Button>
        </InputGroup>


        {/* O'ng tomon – foydalanuvchi menyusi */}
        <div className='flex gap-1 md:gap-3 mt-2 items-center'>

          <Badge content={3}>
            <Button className={theme === "black"
              ? "bg-gray-600!"
              : "bg-gray-100!"
            } >
              <FaBell color={iconColor} size={15} />

            </Button>
          </Badge>
          <Button className={theme === "black"
            ? "bg-gray-600!"
            : "bg-gray-100!"
          } onClick={() => handleMode()}>
            {theme === "black" ? <IoIosSunny color={iconColor} size={15} /> : <IoMdMoon color={iconColor} size={15} />}

          </Button>

          <Button className={theme === "black"
            ? "bg-gray-600!"
            : "bg-gray-100!"
          } >
            <IoTvSharp color={iconColor} size={15} />
          </Button>
          <Nav pullRight className=''>
            <Dropdown
              placement="bottomEnd"
              className={theme === "black"
                ? "border border-gray-700 bg-gray-600 rounded-sm mr-2"
                : "border border-gray-300 rounded-sm mr-2"
              }
              title={
                <FaEarthAmericas color={iconColor} size={15} />

              }
            >
              <Dropdown.Item onClick={() => handleLanguageChange('uz')}>O'zbek</Dropdown.Item>
              <Dropdown.Item onClick={() => handleLanguageChange('en')}>English</Dropdown.Item>
              <Dropdown.Item onClick={() => handleLanguageChange('ru')}>Русский</Dropdown.Item>

            </Dropdown>
            <Dropdown
              placement="bottomEnd"
              className={theme === "black"
                ? "border w-17 md:w-auto border-gray-700 bg-gray-600  rounded-sm"
                : "border w-17 md:w-auto border-gray-300  rounded-sm"
              }
              title={
                <Avatar
                  circle
                  src={image}
                  alt="User"
                  className='w-5! h-5! md:w-8! md:h-8! '
                />
              }
            >
              <Link to='/profile-setting'> <Dropdown.Item icon={<UserInfoIcon />}>Profile</Dropdown.Item></Link>
              <Link to='/site-setting'><Dropdown.Item icon={<CogIcon />}>Settings</Dropdown.Item></Link>
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