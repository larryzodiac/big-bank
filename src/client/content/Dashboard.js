/*
  Dashboard.js
  ============
*/
import React, { useState, useEffect, useContext } from 'react';
// Context
import { UserContext } from '../App';
// Carbon
import {
    Row,
    Column,
    Search,
    Form,
    ContentSwitcher,
    Switch,
    ClickableTile,
} from 'carbon-components-react';
// Charts
import { LineChart } from "@carbon/charts-react";
// Icons
import { Launch20 } from '@carbon/icons-react';
// My Components
import DataTable from '../components/DataTable';

function Dashboard(props) {
    const { user, loginStatus } = useContext(UserContext);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const headers = ['Symbol', 'High', 'Low', 'Volume', 'Close', 'Change', '%', ''];
    // Charts
    const [data, setData] = useState([
        {
            "group": "Watchlist Total",
            "date": "2019-01-01T00:00:00.000Z",
            "value": 10000
        },
        {
            "group": "Watchlist Total",
            "date": "2019-01-01T05:00:00.000Z",
            "value": 12000
        },
        {
            "group": "Watchlist Total",
            "date": "2019-01-01T10:00:00.000Z",
            "value": 14000
        },
        {
            "group": "Watchlist Total",
            "date": "2019-01-02T00:00:00.000Z",
            "value": 25000
        },
        {
            "group": "Watchlist Total",
            "date": "2019-01-02T02:00:00.000Z",
            "value": 26000
        },
        {
            "group": "Watchlist Total",
            "date": "2019-01-03T00:00:00.000Z",
            "value": 10000
        },
        {
            "group": "Watchlist Total",
            "date": "2019-01-03T05:00:00.000Z",
            "value": 10000
        },
        {
            "group": "Watchlist Total",
            "date": "2019-01-03T10:00:00.000Z",
            "value": 12000
        },
        {
            "group": "Watchlist Total",
            "date": "2019-01-05T00:00:00.000Z",
            "value": 45000
        },
        {
            "group": "Watchlist Total",
            "date": "2019-01-07T00:00:00.000Z",
            "value": 49000
        },
        {
            "group": "Watchlist Total",
            "date": "2019-01-07T15:00:00.000Z",
            "value": 45000
        },
        {
            "group": "Watchlist Total",
            "date": "2019-01-09T00:00:00.000Z",
            "value": 50000
        },
        {
            "group": "Watchlist Total",
            "date": "2019-01-09T05:00:00.000Z",
            "value": 52000
        },
        {
            "group": "Watchlist Total",
            "date": "2019-01-09T15:00:00.000Z",
            "value": 55000
        },
        {
            "group": "Watchlist Total",
            "date": "2019-01-10T00:00:00.000Z",
            "value": 50000
        },
        {
            "group": "Watchlist Total",
            "date": "2019-01-12T00:00:00.000Z",
            "value": 65000
        },
        {
            "group": "Watchlist Total",
            "date": "2019-01-13T00:00:00.000Z",
            "value": 80000
        },
        {
            "group": "Watchlist Total",
            "date": "2019-01-14T10:00:00.000Z",
            "value": 85000
        },
        {
            "group": "Watchlist Total",
            "date": "2019-01-15T07:00:00.000Z",
            "value": 90000
        },
        {
            "group": "Watchlist Total",
            "date": "2019-01-15T18:00:00.000Z",
            "value": 70000
        }
    ]);
    const [options, setOptions] = useState({
        axes: {
            bottom: {
                mapsTo: "date",
                scaleType: "time"
            },
            left: {
                // "mapsTo": "value",
                // "title": "Conversion rate",
                // "scaleType": "linear"
                visible: false,
                // includeZero: true,
                // truncation: standardTruncationOptions
            },
        },
        grid: {
            x: { enabled: false },
            y: { enabled: true, numberOfTicks: 10 }
        },
        curve: "curveMonotoneX",
        height: "400px",
        legend: { enabled: false }
    });

    useEffect(() => {
        if(!loginStatus) {
            props.history.push('/');
        }
    }, [loginStatus]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(searchQuery) props.history.push(`/search/${searchQuery}`);
    }
    
    return (
        <React.Fragment>
            <Row>
                <Column sm={4} md={8} lg={12}>
                    <h1 className="top-layout-06">{`Welcome back ${user.username}`}</h1>
                </Column>
            </Row>
            <Row>
                <Column sm={4} md={8} lg={12}>
                    <Form onSubmit={handleSubmit}>
                        <Search
                            className="top-layout-02 bottom-layout-04"
                            labelText=""
                            id="search-1"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeHolderText="Search symbols, e.g IBM"
                        />
                    </Form>
                </Column>
            </Row>
            <Row>
                {/* User data */}
                <Column sm={4} md={8} lg={9} className="bottom-layout-04">
                    {(!Array.isArray(user.symbols) || !user.symbols.length) ? (
                        <Row>
                            <Column>
                                <h4 style={{ paddingTop: "0.25rem" }}>Watchlist Total</h4>
                            </Column>
                        </Row>
                    ) : (
                        <React.Fragment>
                            <Row className="bottom-layout-01">
                                <Column>
                                    <h4 style={{ paddingTop: "0.25rem" }}>Watchlist Total</h4>
                                </Column>
                                <Column>
                                    <ContentSwitcher onChange={console.log}>
                                        <Switch name={'1D'} text='1D' />
                                        <Switch name={'1W'} text='1W' />
                                        <Switch name={'1M'} text='1M' />
                                        <Switch name={'3M'} text='3M' />
                                        <Switch name={'1Y'} text='1Y' />
                                        <Switch name={'3Y'} text='3Y' />
                                    </ContentSwitcher>
                                </Column>
                            </Row>
                            <Row>
                                <Column>
                                    <LineChart
                                        data={data}
                                        options={options}>
                                    </LineChart>
                                </Column>
                            </Row>
                        </React.Fragment>
                    )}
                    <Row>
                        <Column>
                            <React.Fragment>
                                <DataTable 
                                    loadingStatus={loadingStatus}
                                    headers={headers}
                                    symbols={user.symbols}/>
                            </React.Fragment>
                        </Column>
                    </Row>
                </Column>
                {/* News */}
                <Column sm={4} md={8} lg={3}>
                    <Row className="bottom-layout-01">
                        <Column>
                            <h4 style={{ paddingTop: "0.25rem" }}>Broker Feed</h4>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <ClickableTile href="#" style={{ height: "272.1px" }}>
                                <Row className="bottom-spacing-09">
                                    <Column>
                                        {/* <h5 className="bx--resource-card__subtitle">No reports found</h5> */}
                                        <h5 className="bx--resource-card__subtitle bottom-spacing-09">Connect with a Broker</h5>
                                        {/* <h4 className="bx--resource-card__title bottom-spacing-09">Connect with your broker to start displaying monthly reports and news</h4> */}
                                    </Column>
                                </Row>
                                <Row className="top-spacing-09">
                                    <Column>
                                        <div className="bx--resource-card__icon--img" />
                                        <div className="bx--resource-card__icon--action">
                                            <Launch20 aria-label="Launch" className="" />
                                        </div>
                                    </Column>
                                </Row>
                            </ClickableTile>
                        </Column>
                    </Row>
                </Column>
            </Row>
        </React.Fragment>
    );
}

export default Dashboard;