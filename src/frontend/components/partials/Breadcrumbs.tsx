import * as React from 'react';
import { NavLink } from 'react-router-dom';
import withBreadcrumbs, { InjectedProps } from 'react-router-breadcrumbs-hoc';

// used code from here: https://www.npmjs.com/package/react-router-breadcrumbs-hoc
 
// breadcrumbs can be any type of component or string
const UserBreadcrumb = () =>
  <span>Hmmm</span>; // use match param userId to fetch/display user name
 
// define some custom breadcrumbs for certain routes (optional)
const routes = [
  { path: '/users/:userId', breadcrumb: UserBreadcrumb },
  { path: '/example', breadcrumb: 'Custom Example' },
];

// map & render your breadcrumb components however you want.
// each `breadcrumb` has the props `key`, `location`, and `match` included!
class Breadcrumbs extends React.Component<InjectedProps> {
    render() {
        const breadcrumbs = this.props.breadcrumbs;
        return (
            <React.Fragment>
                 <div>
                    {breadcrumbs.map((breadcrumb, index) => (
                    <span key={breadcrumb.key}>
                        <NavLink to={breadcrumb.props.match.url}>
                        {breadcrumb}
                        </NavLink>
                        {(index < breadcrumbs.length - 1) && <i> / </i>}
                    </span>
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

export default withBreadcrumbs(routes)(Breadcrumbs);