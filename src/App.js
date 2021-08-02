import React, {useState} from "react";
import ReactDataGrid from "react-data-grid";
import createRowData from "./createRowData";
import './App.css'
const {
    Filters, Toolbar, Data,
    DraggableHeader: {DraggableContainer}
} = require("react-data-grid-addons");

const defaultColumnProperties = {
    resizable: true,
    filterable: true,
    width: 120,
    draggable: true,
    sortable: true,
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
        sortDescendingFirst: true,
        filterRenderer: NumericFilter
    },
    {
        key: "firstName",
        name: "First Name",
        filterRenderer: AutoCompleteFilter,
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
        key: "catchPhrase",
        name: "Catch Phrase"
    }
].map(c => ({...c, ...defaultColumnProperties}));

const ROW_COUNT = 50;

const sortRows = (initialRows, sortColumn, sortDirection) => {
    const comparer = (a, b) => {
        if (sortDirection === "ASC") {
            return a[sortColumn] > b[sortColumn] ? 1 : -1;
        } else if (sortDirection === "DESC") {
            return a[sortColumn] < b[sortColumn] ? 1 : -1;
        }
    };
    return sortDirection === "NONE" ? initialRows : [...initialRows].sort(comparer);
};


const createRows = () => {
    let rows = [];
    for (let i = 1; i < 1000; i++) {
        rows.push({
            id: i,
            title: "Title " + i,
            count: i * 1000
        });
    }
    return rows;
};

export default function App() {

    const [state, setState] = useState({columns, rows: createRowData(30)})

    const [filters, setFilters] = useState({});
    const [rows, setRows] = useState(createRowData(30));


    const onHeaderDrop = (source, target) => {
        let stateCopy = state;
        console.log(stateCopy);
        const columnSourceIndex = columns.findIndex(i => i.key === source);
        const columnTargetIndex = columns.findIndex(i => i.key === target);

        stateCopy.columns.splice(
            columnTargetIndex,
            0,
            stateCopy.columns.splice(columnSourceIndex, 1)[0]
        );

        const emptyColumns = {
            ...stateCopy, columns: []
        }
        setState(emptyColumns)
        const reorderedColumns = {
            ...state,
            columns: stateCopy.columns
        }
        setState(reorderedColumns)
    };

    const handleFilterChange = filter => filters => {
        const newFilters = {...filters};
        if (filter.filterTerm) {
            newFilters[filter.column.key] = filter;
        } else {
            delete newFilters[filter.column.key];
        }
        return newFilters;
    };

    function getValidFilterValues(rows, columnId) {
        return rows.map(r => r[columnId])
            .filter((item, i, a) => {
                return i === a.indexOf(item);
            });
    }

    function getRows(rows, filters) {
        return selectors.getRows({rows, filters});
    }

    const filteredRows = getRows(state.rows, filters);
    console.log('state.rows')
    console.log(state.rows)
    console.log('filteredRows')
    console.log(filteredRows)

    return (
        <DraggableContainer onHeaderDrop={onHeaderDrop}>
            <ReactDataGrid
                toolbar={<Toolbar enableFilter={true}/>}
                columns={state.columns}
                rowGetter={i => filteredRows[i]}
                rowsCount={filteredRows.length}
                minHeight={500}
                getValidFilterValues={columnKey => getValidFilterValues(state.rows, columnKey)}
                onClearFilters={() => setFilters({})}
                onAddFilter={filter => setFilters(handleFilterChange(filter))}
                onGridSort={(sortColumn, sortDirection) => {
                    setState({
                        ...state,
                        rows: sortRows(state.rows, sortColumn, sortDirection),
                    })
                }}
            />
        </DraggableContainer>
    );
}
