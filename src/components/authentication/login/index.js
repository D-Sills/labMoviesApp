import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, {useEffect} from "react";
import { logInWithEmailAndPassword, signInWithGoogle } from "../../../firebase";


function LoginModal(props) {
    const context = props.context;;

    useEffect(() => {
        if (context.user) {props.setIndex(0)};
    }, [context.user, props]);

    const login = () => {
        if (!context.name) alert("Please enter name");
        logInWithEmailAndPassword(context.email, context.password);
    };

    return (
    <div>
        <Dialog open={(props.index === 1)} onClose={() => props.setIndex(0)}>
        <DialogTitle>Log In</DialogTitle>
        <DialogContent>
        <TextField
            value={context.email}
            onChange={(e) => context.setEmail(e.target.value)}
            label="E-mail"
        />
        <TextField
            value={context.password}
            onChange={(e) => context.setPassword(e.target.value)}
            label="Password"
        />
        <Button onClick={login}>
            Login
        </Button>
        <Button
            onClick={signInWithGoogle}
        >
            Login with Google
        </Button>
        </DialogContent>
        
        <DialogContent>
        <Button onClick={() => props.setIndex(2)}>Don't have an account? Register now.</Button>
        </DialogContent>
        
        <DialogActions>
            <Button onClick={() => props.setIndex(0)}>Cancel</Button>
            <Button onClick={() => props.setIndex(0)}>Subscribe</Button>
        </DialogActions>
        </Dialog>
    </div>
    );
}
export default LoginModal;