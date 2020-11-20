import React from 'react';
// Carbon
import { Search, Form } from 'carbon-components-react';

function SearchBar(props) {
    <Form>
        <Search
            className="top-layout-02"
            labelText="a"
            id="search-1"
            value={props.searchQuery}
            // onChange={e => props.setsearchquery(e.target.value)}
            placeHolderText="Search symbols, e.g IBM"
        />
    </Form>
}

export default SearchBar;