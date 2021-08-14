import { Container, Grid, SnackbarContent } from '@material-ui/core';
import { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './About.scss';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 1200,
        padding: 20,
        '& > * + *': {
          marginTop: theme.spacing(3),
        },
      }
}));

export const About = (): ReactElement => {
    const classes = useStyles();

    return (
        <Container className='main-container'>
            <Grid container direction='row' className={classes.root}>
                <Grid id='div-info' item sm={12} lg={7} style={{display: 'flex'}} alignItems='center'>
                    <SnackbarContent
                        message={
                            <div style={{ lineHeight: 2, paddingTop: 60, paddingBottom: 60 }}>
                                <p>Hi everyone, I'm <span className='impo'>Vuong Nguyen</span> - creator of this page &nbsp; ^_^</p>
                                <p>This is the classical game for cracking your brain. Enjoy yourselves !</p>
                                <p>I also have another website for travelling online. You can find</p>
                                <p>
                                    <a href='https://travel-world-with-vuong.netlify.app/' rel="noreferrer" target='_blank'>
                                        Travel online around the world
                                    </a>&nbsp; here.
                                </p>
                            </div>
                        }
                    />
                </Grid>
                <Grid item sm={12} lg={5}>
                    <img alt='' src={process.env.PUBLIC_URL + '/img/conan.jpg'}
                        style={{ width: '100%', maxWidth: 500, maxHeight: 500, objectFit: 'cover' }} />
                </Grid>
            </Grid>
        </Container>
    )
}