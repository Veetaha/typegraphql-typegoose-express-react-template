import * as React from 'react';
import { createStyles, withStyles, WithStyles,  Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import classNames from 'classnames';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Info from '@material-ui/icons/InfoOutlined';
import PhotoAlbum from '@material-ui/icons/PhotoAlbumOutlined';
import { EP } from '@common/interfaces';
import { QueryPhotos } from '@graphql/index';

// const descriptionHeight = 50;
const styles = ({ palette }: Theme) => createStyles({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        paddingTop: '75%', // 4:3 <-- now  // 16:9
    },
    cardContent: {
        padding: "2px 10px",
        flexGrow: 1,
        backgroundColor: palette.grey[200]
    },
    infoIcon: {
        float: "left",
        display: "block",
        marginRight: 2
    },
    cardText: {
        display: "flex",
        alignItems: "center"
    },
    iconHashTag: {
        fontWeight: "bold",
        color: palette.secondary.main,
        marginRight: 3
    }
});

export interface Props extends WithStyles<typeof styles> {
    photo: QueryPhotos.Data;
    cbGetSelectedPhoto: (photo: QueryPhotos.Data) => void; 
}

class ImageCard extends React.Component<Props> {
    renderAlbum() {
        return (
            <div title="was found from album">
                <PhotoAlbum className="iconFloat" fontSize="small" color="secondary"/>
                <Typography className="d-inline-block">
                    INT20h 
                </Typography>
            </div>
        );
    } 

    renderTag(clasIcon: string) {
        return (
            <div title="was found by tag" className="f-right">
                <i className={clasIcon}>#</i>
                <Typography className="d-inline-block">
                    int20h
                </Typography>
            </div>
        );
    }

    handleClick = () => void this.props.cbGetSelectedPhoto(this.props.photo);

    render() {
        const { classes, photo } = this.props;
        return (
            <Card 
                onClick={this.handleClick} 
                className={classNames(classes.card, "imageCard")}
            >
                <CardMedia
                    className={classes.cardMedia}
                    image={EP.photoToUrl(photo, EP.PhotoSize._320)}
                    title={photo.title}
                />
                <CardContent className={classNames(classes.cardContent, "cardContent")}> 
                    <div className={classes.cardText}>    
                        <Info className={classes.infoIcon} color="primary"/>
                        <Typography className="cardText" variant="h5" component="h5">
                        { photo.title }
                        </Typography>
                    </div>
                    <div>
                        {photo.tag      && this.renderTag(classes.iconHashTag)}
                        {photo.photoset && this.renderAlbum()}
                    </div>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(ImageCard);