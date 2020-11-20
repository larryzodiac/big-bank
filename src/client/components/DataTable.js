/*
  DataTable.js
  ============
*/
import React, { useContext } from 'react';
// Context
import { UserContext } from '../App';
// Axios
import axios from 'axios';
// Carbon
import {
    Button,
    Tile,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    Form,
    TableCell,
    DataTableSkeleton
} from 'carbon-components-react';
// Icons
import { Add16 } from '@carbon/icons-react';
// Pictograms
import { GlobalAnalytics } from '@carbon/pictograms-react';

function DataTable(props) {
    const { getUser } = useContext(UserContext);

    const handleWatch = async (symbol) => {
        await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`)
        .then((response) => {
            axios.post('/api/addSymbol', {response})
            .then((response) => {
                if (response.status === 200) {
                    // Change button to unwatch
                    getUser();
                }
            });
        })
        .catch((error) => console.log(error));
    }

    const handleUnwatch = () => {
        
    }

    if(props.loadingStatus) {
        return <DataTableSkeleton className="top-layout-04" />
    } else {
        if (!Array.isArray(props.symbols) || !props.symbols.length) {
            // array does not exist, is not an array, or is empty
            // ⇒ do not attempt to process array
            console.log('found nothing')
            return (
                <Tile>
                    <h3>Hello</h3>
                    <GlobalAnalytics aria-label="Pictogram" className="pictogram" />
                </Tile>
            );
        } else {
            return (
                <Table>
                    <TableHead>
                        <TableRow>
                            {props.headers.map((header) => (
                                <TableHeader key={header}>{header}</TableHeader>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {rows.map((row) => (
                            <TableRow key={row.id}>
                                {Object.keys(row).filter((key) => key !== 'id')
                                .map((key) => {
                                    return <TableCell key={key}>{row[key]}</TableCell>;
                                })}
                            </TableRow>
                        ))} */}
                        {props.symbols.map((symbol) => (
                            <TableRow key={symbol['1. symbol']}>
                                {Object.keys(symbol).filter((key) => (
                                    key !== '5. marketOpen'
                                    && key !== '6. marketClose'
                                    && key !== '7. timezone'
                                    && key !== '7. timezone'
                                    && key !== '9. matchScore'
                                ))
                                .map((key) => {
                                    return <TableCell key={key}>{symbol[key]}</TableCell>;
                                })}
                                <TableCell key={symbol['1. symbol']}>
                                    {/*
                                        PROBLEM
                                        If there is a match from Dashbaord user
                                        Display watch / unwatch button
                                        Not always availible here
                                        Need to setup a Provider
                                    */}
                                    <Button
                                        renderIcon={Add16}
                                        kind='ghost'
                                        onClick={() => handleWatch(symbol['1. symbol'])}
                                    >Watch</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {/* <TableRow>
                            <TableCell>{props.symbols[0]["1. symbol"]}</TableCell>
                        </TableRow> */}
                    </TableBody>
                </Table>
            );
        }
    }
}

export default DataTable;