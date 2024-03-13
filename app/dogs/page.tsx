'use client';

import { useState, useEffect } from 'react';
import { fetchDataToTable, searchDataToTable } from '../_lib/query-helpers';
import ExistingTable from '../_components/existing-table';
import NewTable from '../_components/new-table';
import RemoveId from '../_components/remove-id';
import SearchTable from '../_components/search-table';

export default function Dogs() {
    const tableName = 'Dogs';
    const tableDescription = 'Represents dogs owned by customers.';
    const idName = 'dogID';
    const selectAllQuery = `select * from ${tableName}`;
    const defaultSearchType = 'dogName';

    interface Entity {
        dogID: string;
        dogName: string;
        dogSize: string;
        dogBreed: string;
        dogColorPreference: string;
    }

    interface Table {
        label: string;
        key: keyof Entity;
    }

    const tableHeaders: Table[] = [
        { label: 'ID', key: 'dogID' },
        { label: 'Name', key: 'dogName' },
        { label: 'Size', key: 'dogSize' },
        { label: 'Breed', key: 'dogBreed' },
        { label: 'Preferred Color', key: 'dogColorPreference' },
    ];

    type EntityNoID = Omit<Entity, 'dogID'>;

    const searchDefaultPlaceholder = [
        {
            dogID: '',
            dogName: '',
            dogSize: '',
            dogBreed: '',
            dogColorPreference: '',
        },
    ];

    const addNewPlaceholder = searchDefaultPlaceholder.map(
        ({ dogID, ...rest }) => rest
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
