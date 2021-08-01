import { ReactElement } from 'react';
import { Typography } from '@material-ui/core';
import './About.scss';

export const About = (): ReactElement => {
    return (
        <div id='main'>
            <Typography align='left'>
                <p>Welcome to N Queens puzzle</p>
                <p>I'm Vuong Nguyen, the creator. This is a project in my Github repo.</p>
            </Typography>
        </div>
    )
}