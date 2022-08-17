import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {LoginTC, LogoutTC} from "../../features/Login/auth-reducer";

export default function ButtonAppBar() {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    let dispatch = useAppDispatch()

    const loginHandler = () => {
        isLoggedIn && dispatch(LogoutTC())
    }


    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Link style={linkStyle} to={'/IT-Kamasutra_Todolist'}>Todolists</Link>
                    </Typography>
                    <Button color="inherit" onClick={loginHandler}>
                        {isLoggedIn
                            ? <Link style={linkStyle} to={'/login'}>Logout</Link>
                            : <Link style={linkStyle} to={'/login'}>Login</Link>}
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

const linkStyle = {
    textDecoration: "none",
    color: 'white'
};