import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from "@mui/material/grid";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React, {useState} from "react";

function AddToCast(props) {
    const context = props.context;
    const [name, setName] = useState("");
    
    
    return (
    <div>
    <Grid sx = {{position: 'flex', align: 'center'}} container spacing={2}>
    <Dialog open={props.open} onClose={() => props.setOpen(false)}>
        <Grid item xs={12}>
        <DialogTitle>
        <Typography variant="h4">
        {props.actor.name}
        </Typography>
        </DialogTitle>
        </Grid>
        
        <DialogContent>
        <Grid item xs={12}>
        <TextField sx = {{width: '100%',}} InputProps={{
            startAdornment: (
            <InputAdornment position="start">
                <AccountCircleIcon />
            </InputAdornment>
            ),
            }}
            value={name}
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
            label="Character Name"
            type='text'
        />
        </Grid>
        </DialogContent>
        
        <DialogActions>
            <Button onClick={() => props.setOpen(false)}>Cancel</Button>
            <Button onClick={() => {
            const obj = {
                id: props.actor.id,
                name: props.actor.name,
                character: name,
                imagePath: props.actor.profile_path,
            };
            context.addToCast(obj);
            props.setOpen(false);
    }}>Add to movie</Button>
        </DialogActions>
        
    </Dialog>
    </Grid>
    </div>
    );
}
export default AddToCast;