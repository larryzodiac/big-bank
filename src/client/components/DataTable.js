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
    DataTableSkeleton,
    Row,
    Column
} from 'carbon-components-react';
// Icons
import { Add16, Subtract16 } from '@carbon/icons-react';
// Pictograms
import { GlobalAnalytics } from '@carbon/pictograms-react';

function DataTable(props) {
    const { user, getUser } = useContext(UserContext);

    const handleWatch = async (symbol) => {
        await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`)
        .then((response) => {
            /*
                Problem : Mongodb does not support accessing obj property names with dots(.)
                e.g '01. symbols' from alpha vantage
                Also some GLOBAL_QUOTEs from alpha vantage are null
                Need to check if Null & edit the object before sending.

                Solution :
                1. Create a new object
                2. Loop through GLOBAL_QOUTE object
                3. Use define property rewrite GLOBAL_QOUTE 
                ---
                Fail
                Couldn't edit property names so had to create a new object with other names
            */
            const symbolObject = response.data['Global Quote']
            if(!(Object.keys(symbolObject).length === 0 && symbolObject.constructor === Object)) {
                const newSymbolObject = {}
                const newProps = {
                    "01. symbol": "symbol",
                    "02. open": "open",
                    "03. high": "high",
                    "04. low": "low",
                    "05. price": "price",
                    "06. volume": "volume",
                    "07. latest trading day": "latestTradingDay",
                    "08. previous close": "previousClose",
                    "09. change": "change",
                    "10. change percent": "changePercent"
                }
                for (const property in symbolObject) {
                    const oldKey = property;
                    const newKey = `${newProps[property]}`;
                    Object.defineProperty(
                        newSymbolObject,
                        newKey,
                        Object.getOwnPropertyDescriptor(symbolObject, oldKey)
                    );
                }
                axios.post('/api/addSymbol', {symbol: newSymbolObject})
                .then((response) => {
                    if (response.status === 200) {
                        // Change button to unwatch
                        getUser();
                    }
                });
            } else {
                console.log(`Selected symbol ${symbol} from alpha vantage api has returned NULL. This symbol cannot be watched.`)
            }
        })
        .catch((error) => console.log(error));
    }

    const handleUnwatch = async (symbol) => {
        axios.post('/api/removeSymbol', {symbol})
        .then((response) => {
            if (response.status === 200) {
                // Change button to watch
                getUser();
            }
        });
    }

    const checkWatch = (checkSymbol) => {
        for (let i = 0; i < user.symbols.length; i++) {
            if (user.symbols[i]['symbol'] === checkSymbol) {
                return (
                    <Button
                        renderIcon={Subtract16}
                        kind='ghost'
                        onClick={() => handleUnwatch(checkSymbol)}
                        className="unwatch-button"
                    >Unwatch</Button>
                )
            }
        }
        return (
            <Button
                renderIcon={Add16}
                kind='ghost'
                onClick={() => handleWatch(checkSymbol)}
            >Watch</Button>
        );
    }

    if(props.loadingStatus) {
        return <DataTableSkeleton className="top-layout-04" />
    } else {
        if (!Array.isArray(props.symbols) || !props.symbols.length) {
            // array does not exist, is not an array, or is empty
            // ⇒ do not attempt to process array
            return (
                <Tile className="top-layout-01">
                    <h5 className="bx--resource-card__subtitle">No symbols found</h5>
                    <h4 className="bx--resource-card__title bottom-spacing-09">Get started by searching for stocks above</h4>
                    <Row>
                        <Column className="top-spacing-09">
                            <GlobalAnalytics aria-label="Pictogram" className="pictogram" />
                        </Column>
                    </Row>
                </Tile>
                
            );
        } else {
            return (
                <Table className="top-layout-04">
                    <TableHead>
                        <TableRow>
                            {props.headers.map((header) => (
                                <TableHeader key={header}>{header}</TableHeader>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.symbols.map((symbol) => (
                            /*
                                Alpha vantage returns objs with numebered properties
                                But some are '1.' and others '01.'
                                symbol[Object.keys(symbol)[0]] is workaround but inefficient
                            */
                            <TableRow key={symbol[Object.keys(symbol)[0]]}>
                                {Object.keys(symbol).filter((key) => (
                                    key !== '5. marketOpen'
                                    && key !== '6. marketClose'
                                    && key !== '7. timezone'
                                    && key !== '7. timezone'
                                    && key !== '9. matchScore'
                                    && key !== 'open'
                                    && key !== 'price'
                                    && key !== 'latestTradingDay'
                                ))
                                .map((key) => {
                                    return <TableCell key={key}>{symbol[key]}</TableCell>;
                                })}
                                <TableCell key={symbol[Object.keys(symbol)[0]]}>
                                    {/* Check which button to display */}
                                    {checkWatch(symbol[Object.keys(symbol)[0]])}
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