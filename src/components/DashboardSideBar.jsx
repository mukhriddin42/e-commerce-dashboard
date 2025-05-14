import { Sidenav, Nav, Toggle } from 'rsuite';
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
import React, { useState } from 'react';
import Logo from '../assets/icons/logo.png';
import {  NavLink } from 'react-router-dom';

const DashboardSideBar = () => {
    const [expanded, setExpanded] = useState(true);
    // const [activeKey, setActiveKey] = useState('1');
    return (



        <Sidenav expanded={expanded} className='max-w-[15vw]!'>
            <Sidenav.Header>
                <div className="flex items-center justify-between h-16">
                    {expanded && (
                        <img src={Logo} className="w-[50%]" alt="Logo" />
                    )}
                    <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} className='border-t-0!' />
                </div>
            </Sidenav.Header>
            <hr className='my-0!' />

            <Sidenav.Body>
                <Nav  >
                    <Nav.Item  icon={<DashboardIcon />}>
                        <NavLink to="/" >Dashboard</NavLink>
                    </Nav.Item>

                    <Nav.Menu placement="rightStart"  title="Products" icon={<CreditCardMinusIcon />}>

                        <Nav.Item>
                            <NavLink className="hover:text-green-600! no-underline!" to="/products">Products list</NavLink>
                        </Nav.Item>

                        <Nav.Item>
                            <NavLink  to="/categories">Categories</NavLink>
                        </Nav.Item>
                    </Nav.Menu>
                    <Nav.Menu
                        placement="rightStart"
                        
                        title="Orders"
                        icon={<SwitchCoordinatesIcon />}
                    >
                        <Nav.Item >
                            <NavLink to="/order-list">Order List</NavLink>
                        </Nav.Item>
                        <Nav.Item >
                            <NavLink to="/order-details">Order Details</NavLink>
                        </Nav.Item>

                    </Nav.Menu>


                    <Nav.Menu
                        placement="rightStart"
                        title="Sellers"
                        icon={<RelatedMapIcon />}
                    >
                        <Nav.Item>
                            <NavLink to="/seller-list">Sellers List</NavLink>
                        </Nav.Item>
                        <Nav.Item eventKey="4-2">
                            <NavLink to="/seller-profile">Sellers Profile</NavLink>
                        </Nav.Item>

                    </Nav.Menu>

                    <Nav.Menu
                        placement="rightStart"
                        eventKey="5"
                        title="Add Product"
                        icon={<AddOutlineIcon />}
                    >
                        <Nav.Item>
                            <NavLink to="/addproduct">Add Product</NavLink>
                        </Nav.Item>
                        <Nav.Item>Add Product 2</Nav.Item>

                    </Nav.Menu>

                    <Nav.Menu
                        placement="rightStart"
                        title="Transactions"
                        icon={<TagNumberIcon />}
                    >
                        <Nav.Item >
                            <NavLink to="/transactions">Transactions List</NavLink>
                        </Nav.Item>

                    </Nav.Menu>

                    <Nav.Menu
                        placement="rightStart"
                        eventKey="7"
                        title="Account"
                        icon={<OperatePeopleIcon />}
                    >
                        <Nav.Item eventKey="7-1">
                            <NavLink to="/profile-setting">Profile settings</NavLink>
                        </Nav.Item>
                        <Nav.Item eventKey="7-2">
                            <NavLink to="/site-setting">Site settings</NavLink>
                        </Nav.Item>

                    </Nav.Menu>





                    <Nav.Item eventKey="8" icon={<MessageIcon />}>
                        <NavLink to="/reviews">Reviews</NavLink>
                    </Nav.Item>



                </Nav>
            </Sidenav.Body>
        </Sidenav>

    );
};


export default DashboardSideBar;