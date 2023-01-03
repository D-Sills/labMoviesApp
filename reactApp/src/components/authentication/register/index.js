import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Grid from "@mui/material/grid";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from "react";
import { registerWithEmailAndPassword } from "../../../firebase";
import { Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function RegisterModal(props) {
    const context = props.context;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setVisibility] = useState(false);
    const [name, setName] = useState("");
    
    useEffect(() => {
        if (context.user) {props.setIndex(0)};
    }, [context.user, props]);
    
    const handleClickShowPassword = () => {
        setVisibility(!showPassword);
    };
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const register = () => {
    context.setName(name);
    context.setEmail(email);
    context.setPassword(password);
    context.register(name, password);
    if (!context.name) alert("Please enter name");
        registerWithEmailAndPassword(context.name, context.email, context.password);
    };

    return (
    <div>
    <Grid sx = {{position: 'flex', align: 'center'}} container spacing={2}>
    <Dialog open={(props.index === 2)} onClose={() => props.setIndex(0)}>
        <Grid item xs={12}>
        <DialogTitle>
        <Typography variant="h4" >
        Register
        </Typography>
        </DialogTitle>
        </Grid>
        
        <DialogContent >
        <Grid item xs={12}>
        <TextField sx = {{width: '100%',}} InputProps={{
            startAdornment: (
            <InputAdornment position="start">
                <AccountCircle />
            </InputAdornment>
            ),
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
            type='text'
        />
        </Grid>
        <Grid item xs={12}>
        <TextField sx = {{width: '100%',}} InputProps={{
            startAdornment: (
            <InputAdornment position="start">
                <EmailIcon />
            </InputAdornment>
            ),
            }}
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="E-mail"
        />
        </Grid>
        <Grid item xs={12}>
        <TextField sx = {{width: '100%',}} InputProps={{
            startAdornment: (
            <InputAdornment position="start">
                <HttpsIcon />
            </InputAdornment>
            ),
            endAdornment: (
            <InputAdornment position="end">
                <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                >
                {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
            )
            }}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
        />
        </Grid>
        <Grid item xs={12} >
        <Button  sx = {{width: '100%',}}onClick={register}>
            Sign Up
        </Button>
        </Grid>
        </DialogContent>
        
        <DialogContent>
        <Button sx={{width: '100%',}} onClick={() => props.setIndex(1)}>Already have an account? Login now.</Button>
        </DialogContent>
    </Dialog>
    </Grid>
    </div>
    );
}
export default RegisterModal;