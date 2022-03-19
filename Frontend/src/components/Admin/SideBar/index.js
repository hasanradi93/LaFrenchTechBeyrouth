//import useState hook to create menu collapse state
import React, { useContext, useState } from "react"
import { NavLink } from 'react-router-dom'
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
import { FaAt, FaList, FaMendeley } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { BiCog } from "react-icons/bi"


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css"
import "./SideBarStyles.css"
import AuthContext from "../../../services/AuthContext";


const SideBar = ({ menuIndex }) => {
    const { checkLoggedIn } = useContext(AuthContext)
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
                            <p>
                                {
                                    menuCollapse
                                        ?
                                        <img src={process.env.PUBLIC_URL + '/assets/images/logo.png'} alt='La French Tech logo' width='64px' height='64px' style={{ marginLeft: '-15px' }} />
                                        :
                                        <img src={process.env.PUBLIC_URL + '/assets/images/logo-Big.png'} alt='La French Tech logo' width='128px' height='128px' style={{ marginLeft: '-15px' }} />
                                }
                            </p>
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
                            <MenuItem title='Home Page' active={menuIndex === 0 ? true : false} icon={<FiHome />}>
                                Home
                                <NavLink to="/adminPanel" />
                            </MenuItem>
                            <MenuItem title='Events Page' active={menuIndex === 1 ? true : false} icon={<FaList />}>
                                Events
                                <NavLink to="/adminPanel/events" />
                            </MenuItem>
                            <MenuItem title='Subscribers Page' active={menuIndex === 2 ? true : false} icon={<FaAt />}>
                                Subscribers
                                <NavLink to="/adminPanel/subscribers" />
                            </MenuItem>
                            <MenuItem title='Members Page' active={menuIndex === 3 ? true : false} icon={<FaMendeley />}>
                                Members
                                <NavLink to="/adminPanel/members" />
                            </MenuItem>
                            <MenuItem title='Profile Page' active={menuIndex === 4 ? true : false} icon={<CgProfile />}>
                                Profile
                                <NavLink to="/adminPanel/profile" />
                            </MenuItem>
                            <MenuItem title='Settings Page' active={menuIndex === 5 ? true : false} icon={<BiCog />}>
                                Settings
                                <NavLink to="/adminPanel/settings" />
                            </MenuItem>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu iconShape="square">
                            <MenuItem title='Logout' icon={<FiLogOut />} onClick={logout}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>
            </div>
        </>
    );
};

export default SideBar;