import * as React from "react";
import { BrowserRouter } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';

export default class RouterConfig extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <ScrollContext>
                    <>{this.props.children}</>
                </ScrollContext>
            </BrowserRouter>
        );
    }
}