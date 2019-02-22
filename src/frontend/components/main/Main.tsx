import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
//import { EP } from '@common/interfaces';
import ImageGridViewer from '@components/imageCard/GridViewer';
import ImageModal from '@components/imageViewer/ImageModal';
import MainInformation from '@components/imageViewer/MainInformation';
import { QueryPhotos } from '@graphql/index';

const styles = ({  spacing }: Theme) => createStyles({
    icon: {
        marginRight: spacing.unit * 2,
    },
    heroContent: {
        maxWidth: 1000,
        height: 500,
        margin: `${spacing.unit * 6}px auto`,
        //margin: `${spacing.unit * 8}px auto ${spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: spacing.unit * 4,
    },
});
  

export interface Props extends WithStyles<typeof styles> {}

interface State {
    currentPhoto: QueryPhotos.Data | null;
}

class Main extends React.Component<Props, State> {
    state = {
        currentPhoto: null
    };

    setCurrentPhoto = (photo: QueryPhotos.Data) => {
        this.setState({ currentPhoto: photo });
    }

    unsetCurrentPhoto = () => { 
        this.setState({ currentPhoto: null });
    }

    render() {
        return (
            <main>
                <ImageModal 
                    cbModalClosed={this.unsetCurrentPhoto} 
                    currentPhoto={this.state.currentPhoto}
                />
                <MainInformation/>
                <ImageGridViewer cbGetSelectedPhoto={this.setCurrentPhoto}/>
            </main>
        );
    }
}

export default withStyles(styles)(Main);
