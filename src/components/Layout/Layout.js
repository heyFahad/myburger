import React from 'react';
import cssClasses from './Layout.css';

const Layout = (props) => {
    return (
        <React.Fragment>
            <div>Toolbar, Sidedrawer, Backdrop</div>
            <main className={cssClasses.Content}>
                {props.children}
            </main>
        </React.Fragment>
    );
}

export default Layout;
