'use client';

import { useState, useEffect } from 'react';
import { fetchDataToTable, searchDataToTable } from '../_lib/query-helpers';
import ExistingTable from '../_components/existing-table';
import NewTable from '../_components/new-table';
import RemoveId from '../_components/remove-id';
import SearchTable from '../_components/search-table';

export default function Address() {
    const tableName = 'Address';
    const tableDescription = 'Stores address details for each dog.';
    const idName = 'addressID';
    const selectAllQuery = `select * from ${tableName}`;
    const defaultSearchType = 'addressStreet';

    interface Entity {
        addressID: string;
        addressStreet: string;
        addressCity: string;
        addressState: string;
        addressZip: string;
    }

    interface Table {
        label: string;
        key: keyof Entity;
    }

    const tableHeaders: Table[] = [
        { label: 'ID', key: 'addressID' },
        { label: 'Street', key: 'addressStreet' },
        { label: 'City', key: 'addressCity' },
        { label: 'State', key: 'addressState' },
        { label: 'Zip', key: 'addressZip' },
    ];

    type EntityNoID = Omit<Entity, 'addressID'>;

    const searchDefaultPlaceholder = [
        {
            addressID: '',
            addressStreet: '',
            addressCity: '',
            addressState: '',
            addressZip: '',
        },
    ];

    const addNewPlaceholder = searchDefaultPlaceholder.map(
        ({ addressID, ...rest }) => rest
    );

    const [defaultTable, setDefaultTable] = useState<Entity[]>([]);
    const [editTable, setEditTable] = useState<Entity[]>([]);
    const [addNewEntity, setNewEntity] =
        useState<EntityNoID[]>(addNewPlaceholder);
    const [searchTable, setSearchTable] = useState<Entity[]>(
        searchDefaultPlaceholder
    );
    const [searchType, setSearchType] = useState(defaultSearchType);
    const [editMode, setEditMode] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [deleteThisId, setDeleteThisId] = useState<string>('');

    useEffect(() => {
        fetchDataToTable(selectAllQuery, defaultTable, setDefaultTable);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (searchString.length > 1 && searchString != '  ') {
            console.log('query: ' + searchString);
            searchDataToTable(
                `select * from ${tableName} where ${searchType} like '%${searchString}%'`,
                searchDefaultPlaceholder,
                setSearchTable
            );
        } else {
            setSearchTable(searchDefaultPlaceholder);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchString, searchType]);

    return (
        <main>
            <h1>{tableName}</h1>
            <h2>Purpose</h2>
            <p>{tableDescription}</p>
            <ExistingTable
                tableName={tableName}
                tableHeaders={tableHeaders}
                editMode={editMode}
                defaultTable={defaultTable}
                editTable={editTable}
                idName={idName}
                setEditTable={setEditTable}
                selectAllQuery={selectAllQuery}
                setDefaultTable={setDefaultTable}
                setEditMode={setEditMode}
            />
            <NewTable
                tableName={tableName}
                tableHeaders={tableHeaders}
                defaultTable={defaultTable}
                idName={idName}
                setDefaultTable={setDefaultTable}
                selectAllQuery={selectAllQuery}
                addNewEntity={addNewEntity}
                setNewEntity={setNewEntity}
                addNewPlaceholder={addNewPlaceholder}
            />
            <SearchTable
                searchType={searchType}
                tableHeaders={tableHeaders}
                idName={idName}
                searchTable={searchTable}
                setSearchType={setSearchType}
                setSearchString={setSearchString}
            />
            <RemoveId
                idName={idName}
                deleteThisId={deleteThisId}
                setDeleteThisId={setDeleteThisId}
                tableName={tableName}
                selectAllQuery={selectAllQuery}
                defaultTable={defaultTable}
                setDefaultTable={setDefaultTable}
            />
        </main>
    );
}
