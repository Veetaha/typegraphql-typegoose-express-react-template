import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Pagination from "material-ui-flat-pagination";
import withWidth, { WithWidthProps } from '@material-ui/core/withWidth';

export const IMAGES_PER_PAGE = 12;

const styles = ({ spacing }: Theme) => createStyles({
    navBarBottom: {
        paddingBottom: spacing.unit * 3,
        boxSizing: "content-box",
        display: "flex", 
        alignItems: "center",
        justifyContent: "center"
    },
    description: {
        marginTop: 8
    }
});

export interface Props extends WithStyles<typeof styles>, WithWidthProps {
    currentPage:   number;
    total:         number;
    cbPageChanged: (e: object, offset: number, page: number) => void;   
    isDisabled:    boolean; 
}

class Paginator extends React.Component<Props> {
    
    getText(currentPage: number, total: number, offset: number) {
        return (currentPage * IMAGES_PER_PAGE > total && total - offset === 1)
            ? 'image was'
            : 'images were';

    }

    getSizePaginator = () => this.props.width == 'xs' ? 'medium' : 'large';

    render() {
        const { classes } = this.props;
        const { currentPage, total, isDisabled, cbPageChanged } = this.props;
        const offset = (currentPage - 1) * IMAGES_PER_PAGE;
        if (total === 0) return <div />;
        return (
            <React.Fragment>
                <Typography 
                    className={classnames("m-y", classes.description)} 
                    variant="subtitle1" 
                    align="center" 
                    color="default" 
                    paragraph
                >
                    {currentPage * IMAGES_PER_PAGE > total ? total - offset : IMAGES_PER_PAGE} 
                    {this.getText(currentPage, total, offset)} viewed on this page from {total} avaliable.<br/>
                    You are on {currentPage} page of {Math.ceil(this.props.total / IMAGES_PER_PAGE)}.
                </Typography>
                <div className={classes.navBarBottom}>
                    {this.props.total / IMAGES_PER_PAGE > 1.0 && 
                        <Pagination
                            limit={IMAGES_PER_PAGE}
                            offset={offset}
                            total={total}
                            onClick={cbPageChanged}
                            currentPageColor="default"
                            otherPageColor="secondary"
                            size={this.getSizePaginator()}
                            outerButtonCount={this.getSizePaginator() === 'large'?  2 : 1}
                            innerButtonCount={this.getSizePaginator() === 'large'?  2 : 1}
                            disabled={isDisabled}
                        />
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(withWidth()((Paginator)));