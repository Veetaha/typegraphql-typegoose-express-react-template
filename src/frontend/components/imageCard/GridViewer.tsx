import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import ImageCard from '@components/imageCard/Card';
import Paginator from '@components/imageCard/Paginator';
import { PhotosState } from "../../actions/fetchPhotos";
import { connect } from 'react-redux';
import { ApplicationStore } from '@configs/configureReduxStore';
import { fetchPhotos, FetchPhotosThunkDispatch } from '@actions/fetchPhotos';
import EmotionFilter from '@components/imageCard/EmotionFiter';
import { EP } from '@common/interfaces';
import Typography from '@material-ui/core/Typography';
import { withSnackbar, InjectedNotistackProps } from 'notistack';
import LinearProgress from '@material-ui/core/LinearProgress';
import { QueryPhotos, Emotion } from '@graphql/index';

const styles = ({ spacing, breakpoints}: Theme) => createStyles({
    layout: {
        width: 'auto',
        marginLeft: spacing.unit * 3,
        marginRight: spacing.unit * 3,
        [breakpoints.up(1100 + spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `0 0 ${spacing.unit * 2}px 0`,
    },
    textInfo: {
        marginBottom: 20
    },
    progress: {
        marginTop: 20
    }
});


export interface Props extends WithStyles<typeof styles>, InjectedNotistackProps {
    photos: PhotosState;
    getAllPhotos: (page: number, emotions: Emotion[]) => void;
    cbGetSelectedPhoto: (photo: QueryPhotos.Data) => void;   
}

interface State {
    currentPhoto: QueryPhotos.Data | null;
    currentPage: number;
    currentEmotions: string[];
}

class ImageGridViewer extends React.Component<Props, State> {
    static mapStateToProps(store: ApplicationStore) {
        return { photos: store.photos };
    }

    static mapDispatchToProps(dispatch: FetchPhotosThunkDispatch) {
        return { 
            getAllPhotos: (page: number, emotions: Emotion[]) => (
                dispatch(fetchPhotos(page, emotions)) 
            )
        };
    }

    loadPage = (page: number) => {
        this.props.getAllPhotos(page, this.state.currentEmotions);
        this.setState({
            currentPage: page
        });
    }

    filterByEmotions = (emotions: Emotion[]) => {
        this.props.getAllPhotos(1, emotions);
        this.setState({
            currentPage: 1,
            currentEmotions: emotions
        });
    }

    state = {
        currentPhoto: null,
        currentPage: 0,
        currentEmotions: []
    };

    componentDidMount() {
        this.loadPage(1);
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.photos.lastErrorDate !== 0 && 
            prevProps.photos.lastErrorDate < this.props.photos.lastErrorDate) {
            this.props.enqueueSnackbar(this.props.photos.lastError, { variant: 'error' });
        }
    }
    
    handleClickNavigation = (_e: object, _offset: number, page: number) => {
        if (!this.props.photos.isFetching) {
            this.loadPage(page);
        }
    }

    handleChangeEmotions = (emotions: string[]) => {
        if (!this.props.photos.isFetching) {
            this.filterByEmotions(emotions as EP.Emotion[]);
        }
    }

    viewPhotos = () => {
        const { props: {classes, photos}, state: {currentEmotions}} = this;
        const { photosOnPage } = photos;
        if ((!photosOnPage || photosOnPage.length == 0) && 
            photos.isFetching                           &&
            !currentEmotions.length
        ) {
            return (
                <React.Fragment>
                    <Typography 
                        className={classes.textInfo} 
                        variant="h4" 
                        align="center" 
                        color="default" 
                        component="p"
                    >
                        Loading photos...
                    </Typography>
                    <LinearProgress color='secondary' className={classes.progress} />
                </React.Fragment>
            );
        } else if (!photosOnPage || photosOnPage.length == 0) {
            return (
                <React.Fragment>
                    <EmotionFilter 
                        currentEmotions={this.state.currentEmotions} 
                        isDisabled={photos.isFetching} 
                        onChangeEmotions={this.handleChangeEmotions} 
                    />
                    <Typography 
                        className={classes.textInfo} 
                        variant="h5"  
                        align="center" 
                        color="default" 
                        component="p"
                    >
                        There are no images
                    </Typography>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <EmotionFilter 
                        currentEmotions={this.state.currentEmotions} 
                        isDisabled={photos.isFetching} 
                        onChangeEmotions={this.handleChangeEmotions} 
                    />
                    <Grid container spacing={40}>
                        {photosOnPage.map((photo, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                <ImageCard 
                                    photo={photo} 
                                    cbGetSelectedPhoto={this.props.cbGetSelectedPhoto} 
                                />
                            </Grid>
                        ))} 
                    </Grid>
            </React.Fragment>
            );
        }
    }

    render() {
        const { props: {classes}} = this;
        return (
            <React.Fragment>
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    {this.viewPhotos()}
                </div>
                <Paginator 
                    currentPage={this.props.photos.currentPage} 
                    total={this.props.photos.countAllPhotos}
                    cbPageChanged={this.handleClickNavigation}
                    isDisabled={this.props.photos.isFetching}
                />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(
    connect(ImageGridViewer.mapStateToProps, ImageGridViewer.mapDispatchToProps)(
        withSnackbar(ImageGridViewer)
    )
);