import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, {useEffect, useState} from "react";
import { logInWithEmailAndPassword, signInWithGoogle } from "../../../firebase";
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import { Typography } from '@mui/material';
import Grid from "@mui/material/grid";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';

function LoginModal(props) {
    const context = props.context;;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setVisibility] = useState(false);
    
    useEffect(() => {
        if (context.user) {props.setIndex(0)};
    }, [context.user, props]);
    
    const handleClickShowPassword = () => {
        setVisibility(!showPassword);
    };
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const login = () => {
        context.setEmail(email);
        context.setPassword(password);
        if (!context.name) alert("Please enter name");
        logInWithEmailAndPassword(context.email, context.password);
    };

    return (
    <div>
    <Grid sx = {{position: 'flex', align: 'center'}} container spacing={2}>
    <Dialog open={(props.index === 1)} onClose={() => props.setIndex(0)}>
        <Grid item xs={12}>
        <DialogTitle>
        <Typography variant="h4">
        Login
        </Typography>
        </DialogTitle>
        </Grid>
        
        <DialogContent>
        <Grid item xs={12}>
        <TextField sx = {{width: '100%',}} InputProps={{
            startAdornment: (
            <InputAdornment position="start">
                <EmailIcon />
            </InputAdornment>
            ),
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="E-mail"
            type='email'
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
        
        <Grid item xs={12}>
        <Button sx = {{width: '100%',}} onClick={login}>
            Login
        </Button>
        </Grid>
        <Button sx = {{width: '100%',}}
            onClick={signInWithGoogle}
        >
            <GoogleIcon /> Login with Google
        </Button>
        </DialogContent>
        
        <DialogContent>
        <Button onClick={() => props.setIndex(2)}>Don't have an account? Register now.</Button>
        </DialogContent>
        
    </Dialog>
    </Grid>
    </div>
    );
}
export default LoginModal;