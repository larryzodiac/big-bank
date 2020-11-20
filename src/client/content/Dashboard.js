import React, { useState, useEffect } from 'react';
// Axios
import axios from 'axios';
// Carbon
import {
    Row,
    Column,
    Search,
    Form
} from 'carbon-components-react';
// My Components
import DataTable from '../components/DataTable';

function Dashboard(props) {
    const [user, setUser] = useState({});
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const headers = ['Symbol', 'High', 'Low', 'Close', 'Volume', 'Change', ''];

    useEffect(() => {
        if(!props.loginStatus) {
            props.history.push('/');
        }
    }, [props.loginStatus]);

    useEffect(() => {
        if(props.loginStatus) {
            const getUser = async () => {
                await axios.get('/api/getuser')
                .then((response) => {
                    setUser(response.data);
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

    const handleSubmit = (event) => {
        event.preventDefault();
        if(searchQuery) {
            props.history.push(`/search/${searchQuery}`);
        }
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
                                <DataTable loadingStatus={loadingStatus} headers={headers} symbols={user.symbols} />
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