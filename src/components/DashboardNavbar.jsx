import React, { memo, useContext, useLayoutEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { Nav, Avatar } from 'rsuite';
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
// import { fetchLastImage } from '../hooks/imagesFuncion';
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






  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchLastImage().then(img => {
  //       if (img !== image) setImage(img);
  //     });
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [image]);


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




  const {logout} = useAuth()


  return (
    <div className={theme === "black"
      ? "!bg-[rgba(0,0,0,.9)] shadow-md shadow-gray-700 h-[110px] md:h-[64px]   flex flex-col gap-2 "
      : "!bg-white shadow-sm h-[110px] md:h-[64px]   flex flex-col gap-2 "
    }>

      <div className=" flex px-2 md:px-5 mt-2 w-full justify-end md:flex-row  md:justify-between items-center">
        {/* Chap tomon –  menyu */}


        <InputGroup style={styles} className='hidden! md:flex!'>
          <Input className={theme === "black" ? "bg-gray-500! text-blue-100! " : "bg-gray-100!"} />
          <InputGroup.Button className={theme === "black"
            ? 'bg-gray-600! '
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

          <Nav pullRight>
            <Nav.Menu title={<FaEarthAmericas color={iconColor} size={15} />} placement="bottomEnd" className={theme === "black"
                ? "border border-gray-700 bg-gray-600 rounded-sm mr-2"
                : "border border-gray-300 rounded-sm mr-2"
              }>
              <Nav.Item onClick={() => handleLanguageChange('uz')}>O'zbek</Nav.Item>
              <Nav.Item onClick={() => handleLanguageChange('en')}>English</Nav.Item>
              <Nav.Item onClick={() => handleLanguageChange('ru')}>Русский</Nav.Item>
            </Nav.Menu>

            <Nav.Menu
              title={<Avatar circle src={image} alt="User" className='w-7! h-7! md:w-10 md:h-8' />}
              placement="bottomEnd"
              className={theme === "black"
                ? "border w-17 md:w-auto border-gray-700 bg-gray-600  rounded-sm"
                : "border w-17 md:w-auto border-gray-300  rounded-sm"
              }
            >
              <Nav.Item as={Link} to='/profile-setting' icon={<UserInfoIcon />}>Profile</Nav.Item>
              <Nav.Item as={Link} to='/site-setting' icon={<CogIcon />}>Settings</Nav.Item>
              <Nav.Item divider />
              <Nav.Item as={Link} to='/login' onClick={logout} icon={<SignOutIcon />}>Logout</Nav.Item>
            </Nav.Menu>
          </Nav>

        </div>

      </div>

      <InputGroup className='flex! md:hidden! max-w-[80%] mx-auto '>
        <Input className={theme === "black"
          ? "bg-gray-500! text-blue-100! "
          : "bg-gray-100!"
        } />
        <InputGroup.Button className='bg-gray-300!'>
          <SearchIcon />
        </InputGroup.Button>
      </InputGroup>

    </div>
  );
};

export default memo(DashboardNavbar);