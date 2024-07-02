import React, { useState } from 'react';
import { IconButton, Avatar, Menu, MenuItem } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import {setUser} from '../redux/actions/userAction'
const UserAvatar = () => {
    
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const logout =()=>{
        dispatch(setUser({}))
        localStorage.setItem('token', "");
    }
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

                <MenuItem onClick={() => { handleMenuClose(); logout();  window.location.href = '/' }}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default UserAvatar