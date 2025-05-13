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

import Logo from '../../assets/logo.png';

const DashboardSideBar = () => {
    const [expanded, setExpanded] = useState(true);
    const [activeKey, setActiveKey] = useState('1');
    return (
        


            <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']} className='max-w-[15vw]!'>
                <Sidenav.Header>
                    <div className="flex items-center justify-between h-16">
                        {expanded && (
                            <img src={Logo} className="w-[50%]" alt="Logo" />
                        )}
                        <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} className='border-t-0!'/>
                    </div>
                </Sidenav.Header>
                <hr className='my-0!'/>

                <Sidenav.Body>
                    <Nav activeKey={activeKey} onSelect={setActiveKey}>
                        <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                            Dashboard
                        </Nav.Item>
                        
                        <Nav.Menu placement="rightStart" eventKey="2" title="Products" icon={<CreditCardMinusIcon />}>
                            <Nav.Item eventKey="2-1">Product List</Nav.Item>
                            <Nav.Item eventKey="2-2">Categories</Nav.Item>
                        </Nav.Menu>
                        <Nav.Menu
                            placement="rightStart"
                            eventKey="3"
                            title="Orders"
                            icon={<SwitchCoordinatesIcon />}
                        >
                            <Nav.Item eventKey="3-1">Order List</Nav.Item>
                            <Nav.Item eventKey="3-2">Order Detail</Nav.Item>
                            
                        </Nav.Menu>

                        
                        <Nav.Menu
                            placement="rightStart"
                            eventKey="4"
                            title="Sellers"
                            icon={<RelatedMapIcon />}
                        >
                            <Nav.Item eventKey="4-1">Sellers List</Nav.Item>
                            <Nav.Item eventKey="4-2">Sellers Profile</Nav.Item>
                            
                        </Nav.Menu>

                        <Nav.Menu
                            placement="rightStart"
                            eventKey="5"
                            title="Add Product"
                            icon={<AddOutlineIcon />}
                        >
                            <Nav.Item eventKey="5-1">Add Product 1</Nav.Item>
                            <Nav.Item eventKey="5-2">Add Product 2</Nav.Item>
                            
                        </Nav.Menu>

                        <Nav.Menu
                            placement="rightStart"
                            eventKey="6"
                            title="Transactions"
                            icon={<TagNumberIcon />}
                        >
                            <Nav.Item eventKey="6-1">Transactions List</Nav.Item>
                            <Nav.Item eventKey="6-2">Transactions Detail</Nav.Item>
                            
                        </Nav.Menu>

                        <Nav.Menu
                            placement="rightStart"
                            eventKey="7"
                            title="Account"
                            icon={<OperatePeopleIcon />}
                        >
                            <Nav.Item eventKey="7-1">Profile Settings</Nav.Item>
                            <Nav.Item eventKey="7-2">Site Settings</Nav.Item>
                            
                        </Nav.Menu>





                        <Nav.Item eventKey="8" icon={<MessageIcon />}>
                            Reviews
                        </Nav.Item>

                        
                        
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
       
    );
};


export default DashboardSideBar;