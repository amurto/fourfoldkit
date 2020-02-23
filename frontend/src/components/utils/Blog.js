import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
// import GitHubIcon from '@material-ui/icons/GitHub';
// import FacebookIcon from '@material-ui/icons/Facebook';
// import TwitterIcon from '@material-ui/icons/Twitter';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
// import Sidebar from './Sidebar';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const mainFeaturedPost = {
  title: 'Welcome To The Future Of Education System',
  description:
    "Here We Ease Your Work And Make Your Life Better",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Grow Faster',
    date: 'Nov 12',
    description:
      'Lets develop our minds.',
    image: 'https://thumbs.dreamstime.com/b/web-141154710.jpg',
    imageText: 'Image Text',
  },
  {
    title: 'Lets Get Ahead',
    date: 'Nov 11',
    description:
      'Lets get to the top and shine bright',
    image: 'https://i.pinimg.com/originals/e5/aa/97/e5aa977fe2b95c999a4987ad0fe82c32.jpg',
    imageText: 'Image Text',
  },
];

const posts = [post1, post2, post3];


export default function Blog() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map(post => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}