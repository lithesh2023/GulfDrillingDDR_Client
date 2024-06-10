import React, { useState } from 'react';
import { IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
const UserAvatar = (props) => {
    const { logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()
    const user = props.user
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const openProfile = () => {
        navigate('/Profile')
        setAnchorEl(null);
    }
    return (
        <div>
            <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
                <Avatar alt="User Avatar" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >

                <MenuItem >{user.name}</MenuItem>
                <MenuItem onClick={openProfile}>Profile</MenuItem>

                <MenuItem onClick={() => { handleMenuClose(); logout(); localStorage.setItem('token', ""); window.location.href = '/' }}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default UserAvatar