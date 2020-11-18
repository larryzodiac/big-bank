import React, { useState, useEffect } from 'react';
// Carbon

function Dashboard(props) {

    useEffect(() => {
        if(!props.loginStatus) {
            props.history.push('/');
        }
    }, [props.loginStatus]);

    return (
        <React.Fragment>
            Welcome to the Dashboard!
        </React.Fragment>
    );
}

export default Dashboard;