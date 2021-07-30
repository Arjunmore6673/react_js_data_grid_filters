import React, {useState} from "react";
import ReactDataGrid from "react-data-grid";
import {Data, Toolbar} from "react-data-grid-addons";
import createRowData from "./createRowData";

const defaultColumnProperties = {
    filterable: true,
    width: 120
};

const selectors = Data.Selectors;

const columns = [
    {
        key: "id",
        name: "ID"
    },
    {
        key: "title",
        name: "Title"
    },
    {
        key: "firstName",
        name: "First Name"
    },
    {
        key: "lastName",
        name: "Last Name"
    },
    {
        key: "email",
        name: "Email"
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
        key: "jobTitle",
        name: "Job Title"
    },
    {
        key: "catchPhrase",
        name: "Catch Phrase"
    },
    {
        key: "jobArea",
        name: "Job Area"
    },
    {
        key: "jobType",
        name: "Job Type"
    }
].map(c => ({...c, ...defaultColumnProperties}));

const ROW_COUNT = 50;

const handleFilterChange = filter => filters => {
    const newFilters = {...filters};
    console.log('---')
    console.log(filters)
    console.log(filter)
    if (filter.filterTerm) {
        newFilters[filter.column.key] = filter;
    } else {
        delete newFilters[filter.column.key];
    }
    return newFilters;
};

function getRows(rows, filters) {
    return selectors.getRows({rows, filters});
}

const rows = createRowData(10);

export default function App() {
    const [filters, setFilters] = useState({});
    const filteredRows = getRows(rows, filters);
    return (
        <ReactDataGrid
            columns={columns}
            rowGetter={i => filteredRows[i]}
            rowsCount={filteredRows.length}
            minHeight={500}
            toolbar={<Toolbar
                filterRowsButtonText={"Filter"}
                enableFilter={true}/>}
            onAddFilter={filter => setFilters(handleFilterChange(filter))}
            onClearFilters={() => setFilters({})}
        />
    );
}
