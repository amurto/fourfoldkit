import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: 'black',
    color: 'white'
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div style={{ marginTop: '20vh'}}>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">Copyright &copy; 2020 All Rights Reserved by FourFoldKit</Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}