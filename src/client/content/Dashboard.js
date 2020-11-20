import React, { useState, useEffect } from 'react';
// Axios
import axios from 'axios';
// Carbon
import {
    ContentSwitcher,
    Switch,
    Row,
    Column,
    Search,
    Tile,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    DataTableSkeleton,
} from 'carbon-components-react';
import { GlobalAnalytics } from '@carbon/pictograms-react';

function Dashboard(props) {
    const [user, setUser] = useState({});
    const [name, setName] = useState(undefined);
    const [symbols, setSymbols] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const headers = ['Symbol', 'High', 'Low', 'Close', 'Volume', 'Change', 'Action'];

    useEffect(() => {
        if(!props.loginStatus) {
            props.history.push('/');
        }
    }, [props.loginStatus]);

    const getWatchedSymbols = async (data) => {
        let symbols = [];
        await data.symbols.forEach( async (symbol) => {
            await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`)
            .then((response) => {
                // const d = response.data['Global Quote'];
                // console.log(d['01. symbol']); // IBM
                symbols.push(response.data['Global Quote']);
            })
            .catch((error) => {
                console.log('alpha - error');
                console.log(error);
            });
        });
        return symbols;
    }

    const getUse = () => {
        axios.get('/api/getuser')
        .then((response) => {
            setName(response.data.username);
            // setSymbols
        })
        .catch((error) => {
            console.log('/api/getuser - error');
            console.log(error);
        })
        .then(() => {
            console.log(symbols);
            setLoadingStatus(false);
        })
    }

    useEffect(() => {
        if(props.loginStatus) {
            const getUser = async () => {
                await axios.get('/api/getuser')
                .then((response) => {
                    console.log(response.data);
                    setUser(response.data);
                    // setSymbols
                    setLoadingStatus(false);
                })
                .catch((error) => {
                    console.log('/api/getuser - error');
                    console.log(error);
                })
            };
            getUser();
        }
    }, []);

    const renderDataTable = () => {
        if(loadingStatus) {
            return <DataTableSkeleton className="top-layout-04" />
        } else {
            if (!Array.isArray(user.symbols) || !user.symbols.length) {
                // array does not exist, is not an array, or is empty
                // ⇒ do not attempt to process array
                return (
                    <Tile className="top-layout-04">
                        <h3>No Symbols found</h3>
                        <p>Start by searching for symbols above</p>
                        <GlobalAnalytics aria-label="Pictogram" className="pictogram" />
                    </Tile>
                );
            } else {
                return (
                    <TableContainer className="top-layout-04" title="Watchlist" description="Symbols you follow">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {headers.map((header) => (
                                        <TableHeader key={header}>{header}</TableHeader>
                                    ))}
                                </TableRow>
                            </TableHead>
                            {/* <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {Object.keys(row).filter((key) => key !== 'id')
                                        .map((key) => {
                                            return <TableCell key={key}>{row[key]}</TableCell>;
                                        })}
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell>{symbols[0]["01. symbol"]}</TableCell>
                                </TableRow>
                            </TableBody> */}
                        </Table>
                    </TableContainer>
                );
            }
        }
    }

    const handleSearch = () => {
        event.preventDefault();
    }
    
    return (
        <React.Fragment>
            <Row>
                <Column sm={4} md={8} lg={16}>
                    <h1 className="top-layout-06">{`Welcome back ${user.username}`}</h1>
                </Column>
            </Row>
            <Row>
                <Column sm={4} md={8} lg={16}>
                    <Search
                        className="top-layout-02"
                        labelText=""
                        id="search-1"
                        placeHolderText="Search symbols, e.g IBM"
                    />
                </Column>
            </Row>
            <Row>
                {/* User data */}
                <Column sm={4} md={8} lg={8}>
                    {/* <Row>
                        <Column>
                            <h6>Diagnostics</h6>
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
                    </Row> */}
                    <Row>
                        <Column>
                            <React.Fragment>
                                {renderDataTable()}
                            </React.Fragment>
                        </Column>
                    </Row>
                </Column>
                {/* News */}
                <Column sm={4} md={8} lg={8}></Column>
            </Row>
        </React.Fragment>
    );
}

export default Dashboard;