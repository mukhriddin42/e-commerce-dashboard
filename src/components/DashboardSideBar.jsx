import { Sidenav, Nav } from "rsuite";
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
import React, { forwardRef, useContext, useEffect, useLayoutEffect, useState } from "react";
import Logo from "../assets/icons/logo.png";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../hooks/useContext";

const getActiveKeyFromPath = (pathname) => {
  if (pathname === "/") return "1";
  else if (pathname.startsWith("/products")) return "2-1";
  else if (pathname.startsWith("/categories")) return "2-2";
  else if (pathname.startsWith("/order-list")) return "3-1";
  else if (pathname.startsWith("/order-details")) return "3-2";
  else if (pathname.startsWith("/seller-list")) return "4-1";
  else if (pathname.startsWith("/seller-profile")) return "4-2";
  else if (pathname.startsWith("/addproduct")) return "5-1";
  else if (pathname.startsWith("/addproducttwo")) return "5-2";
  else if (pathname.startsWith("/transactions")) return "6";
  else if (pathname.startsWith("/profile-setting")) return "7-1";
  else if (pathname.startsWith("/site-setting")) return "7-2";
  else if (pathname.startsWith("/reviews")) return "8";
  return null;
};

// Custom NavLink component (to avoid naming conflict)
const CustomNavLink = forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
));

const DashboardSideBar = () => {
  const { theme } = useContext(ThemeContext);

  const location = useLocation();
  
  const [expanded, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState(getActiveKeyFromPath(location.pathname));
  const [lastViewedOrderId, setLastViewedOrderId] = useState(localStorage.getItem("lastId"));

  useLayoutEffect(() => {
    if (window.innerWidth < 1080) {
      setExpanded(false);
    }
  }, []);

  useEffect(() => {
    setLastViewedOrderId(localStorage.getItem("lastId"));
  }, [location]);

  useEffect(() => {
    const newActiveKey = getActiveKeyFromPath(location.pathname);
    if (newActiveKey !== activeKey) {
      setActiveKey(newActiveKey);
    }
  }, [location.pathname]); // activeKey ni dependencydan olib tashladim

  const hasValidLastOrderId = lastViewedOrderId && /^\d+$/.test(lastViewedOrderId);

  return (
    <Sidenav
      expanded={expanded}
      className="w-[50vw] absolute md:relative md:max-w-[15vw] z-20 shadow-lg transition-all duration-100 ease-in-out"
    >
      <Sidenav.Header>
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            {expanded && <img src={Logo} className="w-[50%]" alt="Logo" />}
          </Link>
          <Sidenav.Toggle onToggle={setExpanded} />
        </div>
      </Sidenav.Header>
      <hr className="my-0" />

      <Sidenav.Body>
        <Nav activeKey={activeKey} onSelect={setActiveKey}>
          <Nav.Item eventKey="1" as={CustomNavLink} href="/" icon={<DashboardIcon />}>
            Dashboard
          </Nav.Item>

          <Nav.Menu eventKey="2" title="Products" icon={<CreditCardMinusIcon />}>
            <Nav.Item eventKey="2-1" as={CustomNavLink} href="/products">
              Product List
            </Nav.Item>
            <Nav.Item eventKey="2-2" as={CustomNavLink} href="/categories">
              Categories
            </Nav.Item>
          </Nav.Menu>

          <Nav.Menu eventKey="3" title="Orders" icon={<SwitchCoordinatesIcon />}>
            <Nav.Item eventKey="3-1" as={CustomNavLink} href="/order-list">
              Order List
            </Nav.Item>
            {hasValidLastOrderId && (
              <Nav.Item
                eventKey="3-2"
                as={CustomNavLink}
                href={`/order-details/${lastViewedOrderId}`}
              >
                Order Detail
              </Nav.Item>
            )}
          </Nav.Menu>

          <Nav.Menu eventKey="4" title="Sellers" icon={<RelatedMapIcon />}>
            <Nav.Item eventKey="4-1" as={CustomNavLink} href="/seller-list">
              Sellers List
            </Nav.Item>
            <Nav.Item eventKey="4-2" as={CustomNavLink} href="/seller-profile">
              Sellers Profile
            </Nav.Item>
          </Nav.Menu>

          <Nav.Menu eventKey="5" title="Add Product" icon={<AddOutlineIcon />}>
            <Nav.Item eventKey="5-1" as={CustomNavLink} href="/addproduct">
              Add Product 1
            </Nav.Item>
            <Nav.Item eventKey="5-2" as={CustomNavLink} href="/addproducttwo">
              Add Product 2
            </Nav.Item>
          </Nav.Menu>

          <Nav.Item eventKey="6" icon={<TagNumberIcon />} as={CustomNavLink} href="/transactions">
            Transactions
          </Nav.Item>

          <Nav.Menu eventKey="7" title="Account" icon={<OperatePeopleIcon />}>
            <Nav.Item eventKey="7-1" as={CustomNavLink} href="/profile-setting">
              Profile Settings
            </Nav.Item>
            <Nav.Item eventKey="7-2" as={CustomNavLink} href="/site-setting">
              Site Settings
            </Nav.Item>
          </Nav.Menu>

          <Nav.Item eventKey="8" icon={<MessageIcon />} as={CustomNavLink} href="/reviews">
            Reviews
          </Nav.Item>
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  );
};
export default DashboardSideBar;
