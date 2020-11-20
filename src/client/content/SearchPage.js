/*
  SearchPage.js
  =============
*/
import React, { useState, useContext, useEffect } from 'react';
// Context
import { UserContext } from '../App';
// Axios
import axios from 'axios';
// Carbon
import {
    Row,
    Column,
    Search,
    Form,
} from 'carbon-components-react';
// My Components
import DataTable from '../components/DataTable';

function SearchPage(props) {
    const { loginStatus } = useContext(UserContext);
    const [symbols, setSymbols] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [searchQuery, setSearchQuery] = useState(props.match.params.query);
    const headers = ['Symbol', 'Name', 'Type', 'Region', 'Currency', ''];

    useEffect(() => {
        if(!loginStatus) {
            props.history.push('/');
        }
    }, [loginStatus]);

    const getSearch = async () => {
        await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${process.env.REACT_APP_API_KEY}`)
        .then((response) => {
            setSymbols(response.data.bestMatches);
            setLoadingStatus(false);
        })
        .catch((error) => console.log(error));
    };

    useEffect(() => {
        if(loginStatus) {
            getSearch();
        }
    },[]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(searchQuery) {
            setLoadingStatus(true);
            getSearch();
        }
    }

    return (
        <React.Fragment>
            <Row>
                <Column sm={4} md={8} lg={16}>
                    <Form onSubmit={handleSubmit}>
                        <Search
                            className="top-layout-02  bottom-layout-04"
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
                <Column sm={4} md={8} lg={16}>
                    <h5 className="bottom-layout-01">Results</h5>
                </Column>
            </Row>
            <Row>
                <Column sm={4} md={8} lg={16}>
                    <DataTable loadingStatus={loadingStatus} headers={headers} symbols={symbols} />
                </Column>
            </Row>
        </React.Fragment>
    );
}

export default SearchPage;