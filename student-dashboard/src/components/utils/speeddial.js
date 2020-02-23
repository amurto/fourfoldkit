import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import ChatIcon from '@material-ui/icons/Chat';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    position: 'fixed',
    bottom: theme.spacing(10),
    right: theme.spacing(6),
    marginRight: theme.spacing(1),
  },
}));

export default function FloatingActionButtons() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [placement, setPlacement] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handleClick = newPlacement => event => {
    setAnchorEl(event.currentTarget);
    setOpen(prev => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <div className={classes.root}>
        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
            {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
                <Paper>
                <Typography className={classes.typography}>
                <iframe
                    title="Student"
                    allow="microphone;"
                    width="350"
                    height="430"
                    src="https://console.dialogflow.com/api-client/demo/embedded/345b838a-078c-4928-abeb-ea65d265673e">
                </iframe>
                </Typography>
                </Paper>
            </Fade>
            )}
        </Popper>
      <Fab className={classes.extendedIcon} color="secondary" aria-label="add" onClick={handleClick('top-end')}>
        <ChatIcon />
      </Fab>
    </div>
  );
}