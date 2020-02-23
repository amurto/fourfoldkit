import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { useHistory } from 'react-router-dom';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHttpClient } from '../hooks/http-hook';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const SimpleCard = props => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
      setOpen(!open)
  }
  let history = useHistory();
  
  // eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  return (
    <Card style={{ marginBottom: "30px" }} className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.org}
          
          
        </Typography>
        <hr></hr>
          <h3 style={{ fontWeight: "500" }}>{props.designation}</h3>
        <Typography variant="body2" component="p">
          Apply by {props.deadline}
          <br />
          
        </Typography>
      </CardContent>
      <CardActions>
        <a style={{ backgroundColor: "red", color: "white", textDecoration: "none", padding: "10px", margin: "20px" }} href="http://localhost:5000">Upload Resume</a>
        <Button variant="contained" color="secondary" onClick={handleOpen}>
          Show more
        </Button>
      </CardActions>
      {open && (
        <div style={{ margin: "20px" }}>
          <h4>About</h4>
          <h4 style={{ fontWeight: "400" }}>{props.info}</h4>
          <List component="nav" className={classes.root} aria-label="mailbox folders">
      <ListItem button>
        <ListItemText primary="Address" />
        {props.address}
      </ListItem>
      <ListItem button>
        <ListItemText primary="Contact" />
        +91-{props.phone}
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="Salary" />
        {props.salary} &#8377; 
      </ListItem>
      <ListItem button>
        <ListItemText primary="Skills required" />
        {props.skills[0]},&nbsp;
        {props.skills[1]},&nbsp;
        {props.skills[2]},&nbsp;
        {props.skills[3]}
      </ListItem>
      <ListItem button>
        <ListItemText primary="Perks" />
        {props.perks[0]},&nbsp;
        {props.perks[1]},&nbsp;
        {props.perks[2]},&nbsp;
        {props.perks[3]}
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary="Openings Available" />
        {props.openings}
      </ListItem>
    </List>
        </div>
      )}
    </Card>
  );
}

export default SimpleCard;