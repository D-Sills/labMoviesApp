import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, {useEffect} from "react";
import { registerWithEmailAndPassword, signInWithGoogle } from "../../../firebase";

function RegisterModal(props) {
    const context = props.context;

    useEffect(() => {
        if (context.user) {props.setIndex(0)};
    }, [context.user, props]);
    
    const register = () => {
    if (!context.name) alert("Please enter name");
        registerWithEmailAndPassword(context.name, context.email, context.password);
    };

    return (
    <div>
        <Dialog open={(props.index === 2)} onClose={() => props.setIndex(0)}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
        <TextField
            value={context.name}
            onChange={(e) => context.setName(e.target.value)}
            label="Name"
        />
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
        <Button onClick={register}>
            Register
        </Button>
        <Button
            onClick={signInWithGoogle}
        >
            Register with Google
        </Button>
        </DialogContent>
        
        <DialogContent>
        <Button onClick={() => props.setIndex(1)}>Already have an account? Login now.</Button>
        </DialogContent>
        
        <DialogActions>
            <Button onClick={() => props.setIndex(0)}>Cancel</Button>
            <Button onClick={() => props.setIndex(0)}>Subscribe</Button>
        </DialogActions>
        </Dialog>
    </div>
    );
}
export default RegisterModal;