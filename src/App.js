import React, {useState} from "react";
import ReactDataGrid from "react-data-grid";

const {
    DraggableHeader: {DraggableContainer}
} = require("react-data-grid-addons");

const columns = [
    {
        key: "id",
        name: "ID",
        width: 50,
        draggable: true
    },
    {
        key: "title",
        name: "Title",
        draggable: true,
        resizable: true
    },
    {
        key: "count",
        name: "Count",
        draggable: true,
        resizable: true
    }
];


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


    const [state, setState] = useState({
        columns,
        rows: createRows(10),
    })

    const rowGetter = i => {
        return state.rows[i];
    };

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


    return (
        <DraggableContainer onHeaderDrop={onHeaderDrop}>
            <ReactDataGrid
                columns={state.columns}
                rowGetter={rowGetter}
                rowsCount={state.rows.length}
                minHeight={500}
            />
        </DraggableContainer>
    );
}
