import * as React from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const styles = ({ spacing }: Theme) => createStyles({
    content: { 
    backgroundColor: "inherit",//palette.background.paper,
      maxWidth: 650,
      margin: '0 auto',
      padding: `${spacing.unit * 8}px 10px ${spacing.unit * 6}px`,
    }
});

export interface Props extends WithStyles<typeof styles> {
}

class MainInformation extends React.Component<Props>{
    render() {
        const { classes } = this.props;
        return( 
            <div className={classes.content}>
                <Typography 
                    variant="h1" 
                    align="center" 
                    color="textPrimary"
                >
                    Emotion picker
                </Typography>
                <br/>
                <Typography 
                    variant="h6" 
                    align="center" 
                    color="textSecondary" 
                    paragraph
                >
                    Welcome everyone! Our site allows you to get pictures, 
                    which are related to INT20H-2019 from Flickr and to sort
                    them by emotions on people's faces. Have a great fun using it!
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles)(MainInformation);