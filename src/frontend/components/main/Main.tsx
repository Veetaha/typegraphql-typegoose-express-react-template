import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Router from '@router/root';
import Breadcrumbs from '@components/partials/Breadcrumbs';

const styles = ({  spacing }: Theme) => createStyles({
    icon: {
        marginRight: spacing.unit * 2,
    },
    heroContent: {
        maxWidth: 1000,
        height: 500,
        margin: `${spacing.unit * 6}px auto`,
    },
    heroButtons: {
        marginTop: spacing.unit * 4,
    },
});
  

export interface Props extends WithStyles<typeof styles> {}

interface State {
    //currentPhoto: QueryPhotos.Data | null;
}

class Main extends React.Component<Props, State> {
    state = {
        currentPhoto: null
    };

    // setCurrentPhoto = (photo: QueryPhotos.Data) => {
    //     this.setState({ currentPhoto: photo });
    // }

    unsetCurrentPhoto = () => { 
        this.setState({ currentPhoto: null });
    }

    render() {
        return (
            <main>
                <Breadcrumbs />
                <Router />
            </main>
        );
    }
}

export default withStyles(styles)(Main);
