import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import SwitchCoordinatesIcon from '@rsuite/icons/SwitchCoordinates';
import CreditCardMinusIcon from '@rsuite/icons/CreditCardMinus';
import RelatedMapIcon from '@rsuite/icons/RelatedMap';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import TagNumberIcon from '@rsuite/icons/TagNumber';
import OperatePeopleIcon from '@rsuite/icons/OperatePeople';
import MessageIcon from '@rsuite/icons/Message';



import 'rsuite/dist/rsuite.min.css';
import React, { forwardRef, useState } from 'react';
import Logo from '../assets/icons/logo.png';
import { Link, NavLink } from 'react-router-dom';

const DashboardSideBar = () => {
    const [expanded, setExpanded] = useState(true);
    const [activeKey, setActiveKey] = useState('1');

    // this is for React Router DOM to work with rsuite
    const NavLink = forwardRef(({ href, children, ...rest }, ref) => (
        <Link ref={ref} to={href} {...rest}>
            {children}
        </Link>
    ));

    return (

        <Sidenav expanded={expanded} className='max-w-[15vw]! z-20 shadow-lg  transition-all duration-100 ease-in-out' >
            <Sidenav.Header>
                <div className="flex items-center justify-between h-16">
                    <Link to="/" >
                        {expanded && (
                            <img src={Logo} className="w-[50%] " alt="Logo" />
                        )}
                    </Link>
                    <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} className='border-t-0!' />
                </div>
            </Sidenav.Header>
            <hr className='my-0!' />

            <Sidenav.Body>
                <Nav activeKey={activeKey} onSelect={setActiveKey}>
                    <Nav.Item eventKey="1" as={NavLink} href="/" icon={<DashboardIcon />}>
                        Dashboard
                    </Nav.Item>

                    <Nav.Menu placement="" eventKey="2" title="Products" icon={<CreditCardMinusIcon />}>
                        <Nav.Item eventKey="2-1"
                            as={NavLink} href="/products" >Product List</Nav.Item>
                        <Nav.Item eventKey="2-2"
                            as={NavLink} href="/categories" >Categories</Nav.Item>
                    </Nav.Menu>
                    <Nav.Menu
                        placement=""
                        eventKey="3"
                        title="Orders"
                        icon={<SwitchCoordinatesIcon />}
                    >
                        <Nav.Item eventKey="3-1"
                            as={NavLink} href="/order-list" >Order List</Nav.Item>
                        <Nav.Item eventKey="3-2"
                            as={NavLink} href="/order-details" >Order Detail</Nav.Item>

                    </Nav.Menu>


                    <Nav.Menu
                        placement=""
                        eventKey="4"
                        title="Sellers"
                        icon={<RelatedMapIcon />}
                    >
                        <Nav.Item eventKey="4-1"
                            as={NavLink} href="/seller-list" >Sellers List</Nav.Item>
                        <Nav.Item eventKey="4-2"
                            as={NavLink} href="/seller-profile" >Sellers Profile</Nav.Item>

                    </Nav.Menu>

                    <Nav.Menu
                        placement=""
                        eventKey="5"
                        title="Add Product"
                        icon={<AddOutlineIcon />}
                    >
                        <Nav.Item eventKey="5-1"
                            as={NavLink} href="/addproduct" >Add Product 1</Nav.Item>
                        <Nav.Item eventKey="5-2"
                            as={NavLink} href="/" >Add Product 2</Nav.Item>

                    </Nav.Menu>

                    <Nav.Item eventKey="6" icon={<TagNumberIcon />}
                        as={NavLink} href="/transactions" >
                        Transactions
                    </Nav.Item>

                    <Nav.Menu
                        placement=""
                        eventKey="7"
                        title="Account"
                        icon={<OperatePeopleIcon />}
                    >
                        <Nav.Item eventKey="7-1"
                            as={NavLink} href="/profile-setting" >Profile Settings</Nav.Item>
                        <Nav.Item eventKey="7-2"
                            as={NavLink} href="/site-setting" >Site Settings</Nav.Item>

                    </Nav.Menu>





                    <Nav.Item eventKey="8" icon={<MessageIcon />}
                        as={NavLink} href="/reviews" >
                        Reviews
                    </Nav.Item>



                </Nav>
            </Sidenav.Body>
        </Sidenav>


    );
};


export default DashboardSideBar;