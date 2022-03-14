//import useState hook to create menu collapse state
import React, { useContext, useState } from "react"
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom'
import backend from '../../../services/ConnectWithBackend'
//import react pro sidebar components
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar"

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { BiCog } from "react-icons/bi";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./SideBarStyles.css";
import AuthContext from "../../../services/AuthContext";


const SideBar = ({ menuIndex }) => {
    const { checkLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const logout = () => {
        backend.logout('LaFrenchTechToken')
        checkLoggedIn()
    }

    const [menuCollapse, setMenuCollapse] = useState(false)

    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    return (
        <>
            <div id="header">
                <ProSidebar collapsed={menuCollapse}>
                    <SidebarHeader>
                        <div className="logotext">
                            <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
                        </div>
                        <div className="closemenu" onClick={menuIconClick}>
                            {menuCollapse ? (
                                <FiArrowRightCircle />
                            ) : (
                                <FiArrowLeftCircle />
                            )}
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem active={menuIndex === 0 ? true : false} icon={<FiHome />}>
                                Home
                                <NavLink to="/adminPanel" />
                            </MenuItem>
                            <MenuItem active={menuIndex === 1 ? true : false} icon={<FaList />}>
                                Events
                                <NavLink to="/adminPanel/events" />
                            </MenuItem>
                            <MenuItem icon={<FaRegHeart />}>Subscribers</MenuItem>
                            <MenuItem icon={<BiCog />}>Settings</MenuItem>
                            <MenuItem icon={<FiLogOut />}>Profile</MenuItem>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu iconShape="square">
                            <MenuItem icon={<FiLogOut />} onClick={logout}>Logout</MenuItem>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>
            </div>
        </>
    );
};

export default SideBar;