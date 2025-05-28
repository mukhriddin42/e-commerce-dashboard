import { Sidenav, Nav } from "rsuite";
import { CustomProvider } from 'rsuite';

import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import SwitchCoordinatesIcon from "@rsuite/icons/SwitchCoordinates";
import CreditCardMinusIcon from "@rsuite/icons/CreditCardMinus";
import RelatedMapIcon from "@rsuite/icons/RelatedMap";
import AddOutlineIcon from "@rsuite/icons/AddOutline";
import TagNumberIcon from "@rsuite/icons/TagNumber";
import OperatePeopleIcon from "@rsuite/icons/OperatePeople";
import MessageIcon from "@rsuite/icons/Message";

import "rsuite/dist/rsuite.min.css";
import React, { forwardRef, memo, use, useContext, useEffect, useLayoutEffect, useState } from "react";
import Logo from "../assets/icons/logo.png";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../hooks/useContext";

const DashboardSideBar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [myAppearance, setMyappearance] = useState("");
  const [activeKey, setActiveKey] = useState("1");
  const [lastViewedOrderId, setLastViewedOrderId] = useState(localStorage.getItem("lastId"));


  const {theme} = useContext(ThemeContext)

  useLayoutEffect(() => {
    const screenW = window.innerWidth;
    
    if (screenW < 1080) {
        setExpanded(false)
    }

}, [])

  const hasValidLastOrderId = lastViewedOrderId && /^\d+$/.test(lastViewedOrderId);

  useEffect(() => {
    setLastViewedOrderId(localStorage.getItem("lastId"));
  }, [location]);

  useEffect(() => {
  const path = location.pathname;

  if (path === "/") setActiveKey("1");
  else if (path === "/products") setActiveKey("2-1");
  else if (path === "/categories") setActiveKey("2-2");
  else if (path === "/order-list") setActiveKey("3-1");
  else if (path.startsWith("/order-details/")) setActiveKey("3-2");
  else if (path === "/seller-list") setActiveKey("4-1");
  else if (path === "/seller-profile") setActiveKey("4-2");
  else if (path === "/addproduct") setActiveKey("5-1");
  else if (path === "/addproducttwo") setActiveKey("5-2");
  else if (path === "/transactions") setActiveKey("6");
  else if (path === "/profile-setting") setActiveKey("7-1");
  else if (path === "/site-setting") setActiveKey("7-2");
  else if (path === "/reviews") setActiveKey("8");
  else setActiveKey(null);
}, [location.pathname]);

  // NavLink remains same
  const NavLink = forwardRef(({ href, children, ...rest }, ref) => (
    <Link ref={ref} to={href} {...rest}>
      {children}
    </Link>
  ));

  useEffect(() => {
    if (theme === "light") {
      setMyappearance("light");
    } else {  
      setMyappearance("dark");
    }
  }, [theme])

  return (
    <CustomProvider theme={myAppearance}>
      <Sidenav
        
        expanded={expanded}
        className="w-[50vw] absolute md:relative md:max-w-[15vw]! z-20 shadow-lg  transition-all duration-100 ease-in-out"
      >
        <Sidenav.Header>
          <div className="flex items-center justify-between h-16">
            <Link to="/">
              {expanded && <img src={Logo} className="w-[50%] " alt="Logo" />}
            </Link>
            <Sidenav.Toggle
              onToggle={(expanded) => setExpanded(expanded)}
              className="border-t-0!"
            />
          </div>
        </Sidenav.Header>
        <hr className="my-0!" />

        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item eventKey="1" as={NavLink} href="/" icon={<DashboardIcon />}>
              Dashboard
            </Nav.Item>

            <Nav.Menu
              placement="rightStart"
              eventKey="2"
              title="Products"
              icon={<CreditCardMinusIcon />}
            >
              <Nav.Item eventKey="2-1" as={NavLink} href="/products">
                Product List
              </Nav.Item>
              <Nav.Item eventKey="2-2" as={NavLink} href="/categories">
                Categories
              </Nav.Item>
            </Nav.Menu>
            <Nav.Menu
              eventKey="3"
              title="Orders"
              placement="rightStart"
              icon={<SwitchCoordinatesIcon />}
            >
              <Nav.Item eventKey="3-1" as={NavLink} href="/order-list">
                Order List
              </Nav.Item>
              {hasValidLastOrderId && (
                <Nav.Item
                  eventKey="3-2"
                  as={NavLink}
                  href={`/order-details/${lastViewedOrderId}`}
                >
                  Order Detail
                </Nav.Item>
              )}
            </Nav.Menu>

            <Nav.Menu
              placement="rightStart"
              eventKey="4"
              title="Sellers"
              icon={<RelatedMapIcon />}
            >
              <Nav.Item eventKey="4-1" as={NavLink} href="/seller-list">
                Sellers List
              </Nav.Item>
              <Nav.Item eventKey="4-2" as={NavLink} href="/seller-profile">
                Sellers Profile
              </Nav.Item>
            </Nav.Menu>

            <Nav.Menu
              placement="rightStart"
              eventKey="5"
              title="Add Product"
              icon={<AddOutlineIcon />}
            >
              <Nav.Item eventKey="5-1" as={NavLink} href="/addproduct">
                Add Product 
              </Nav.Item>
              <Nav.Item eventKey="5-2" as={NavLink} href="/addproducttwo">
                Add Order
              </Nav.Item>
            </Nav.Menu>

            <Nav.Item
              eventKey="6"
              icon={<TagNumberIcon />}
              as={NavLink}
              href="/transactions"
            >
              Transactions
            </Nav.Item>

            <Nav.Menu
              placement="rightStart"
              eventKey="7"
              title="Account"
              icon={<OperatePeopleIcon />}
            >
              <Nav.Item eventKey="7-1" as={NavLink} href="/profile-setting">
                Profile Settings
              </Nav.Item>
              <Nav.Item eventKey="7-2" as={NavLink} href="/site-setting">
                Site Settings
              </Nav.Item>
            </Nav.Menu>

            <Nav.Item
              eventKey="8"
              icon={<MessageIcon />}
              as={NavLink}
              href="/reviews"
            >
              Reviews
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>

    </CustomProvider>
  );
};

export default DashboardSideBar;