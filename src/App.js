import React, {useState} from "react";
import ReactDataGrid from "react-data-grid";
import {Data, Filters, Toolbar} from "react-data-grid-addons";
import createRowData from "./createRowData";

import "./App.css";

const defaultColumnProperties = {
    filterable: true,
    width: 160
};

const selectors = Data.Selectors;
const {
    NumericFilter,
    AutoCompleteFilter,
    MultiSelectFilter,
    SingleSelectFilter
} = Filters;
const columns = [
    {
        key: "id",
        name: "ID",
        filterRenderer: NumericFilter
    },
    {
        key: "firstName",
        name: "First Name",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "lastName",
        name: "Last Name",
        filterRenderer: AutoCompleteFilter
    },
    {
        key: "jobTitle",
        name: "Job Title",
        filterRenderer: MultiSelectFilter
    },
    {
        key: "jobArea",
        name: "Job Area",
        filterRenderer: SingleSelectFilter
    },
    {
        key: "jobType",
        name: "Job Type"
    },
    {
        key: "email",
        name: "Email",
        editable: true,
    },
    {
        key: "street",
        name: "Street"
    },
    {
        key: "zipCode",
        name: "ZipCode"
    },
    {
        key: "date",
        name: "Date"
    },
    {
        key: "catchPhrase",
        name: "Catch Phrase"
    }
].map(c => ({...c, ...defaultColumnProperties}));

const ROW_COUNT = 50;

const handleFilterChange = filter => filters  => {
    const newFilters = {...filters};
    if (filter.filterTerm) {
        newFilters[filter.column.key] = filter;
    } else {
        delete newFilters[filter.column.key];
    }
    return newFilters;
};

function getValidFilterValues(rows, columnId) {
    return rows
        .map(r => r[columnId])
        .filter((item, i, a) => {
            return i === a.indexOf(item);
        });
}

function getRows(rows, filters) {
    return selectors.getRows({rows, filters});
}

const rows = createRowData(10);

function App() {
    const [filters, setFilters] = useState({});

    const filteredRows = getRows(rows, filters);
    return (
        <ReactDataGrid
            style={{}}
            columns={columns}
            rowGetter={i => filteredRows[i]}
            rowsCount={filteredRows.length}
            minHeight={500}
            toolbar={<Toolbar enableFilter={true}/>}
            onAddFilter={filter => setFilters(handleFilterChange(filter))}
            onClearFilters={() => setFilters({})}
            getValidFilterValues={columnKey => getValidFilterValues(rows, columnKey)}
        />
    );
}

export default App
