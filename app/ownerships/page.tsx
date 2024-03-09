'use client';

import React, { useState, useEffect } from 'react';
import {
    handleIdChange,
    handleSearchChange,
    handleSelectChange,
    handleEditChange,
    handleInputChange,
    cancelEdit,
} from '../_lib/events-handlers';
import {
    fetchDataToTable,
    searchDataToTable,
    deleteEntityById,
    toggleEdit,
    sendNewEntity,
} from '../_lib/query-helpers';
import formatDate from '../_lib/format-date';

export default function Ownerships() {
    const tableName = 'Ownerships';
    const tableDescription =
        'Represents the intersection between various customers and dogs.';
    const deleteIdName = 'customerID';
    const selectAllQuery = `select * from ${tableName}`;
    const defaultSearchType = 'customerID';

    interface Entity {
        FK_customerID: number;
        FK_dogID: number;
    }

    interface Table {
        label: string;
        key: keyof Entity;
    }

    const tableHeaders: Table[] = [
        { label: 'customerID', key: 'FK_customerID' },
        { label: 'dogID', key: 'FK_dogID' },
    ];

    type EntityNoID = Entity;

    const searchDefaultPlaceholder = [
        {
            FK_customerID: -1,
            FK_dogID: -1,
        },
    ];

    const addNewPlaceholder = searchDefaultPlaceholder;

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
    const [deleteThisId, setDeleteThisId] = useState<number>(-1);

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

    function getInputType(string: string) {
        switch (string) {
            case 'customerCardInfo':
                return 'number';

            case 'customerStartDate':
                return 'date';

            default:
                return 'text';
        }
    }

    return (
        <main>
            <h1>{tableName}</h1>
            <h2>Purpose</h2>
            <p>{tableDescription}</p>
            <h2>Existing {tableName}</h2>
            <table>
                <thead>
                    <tr>
                        {tableHeaders.map((header) => (
                            <th key={header.key}>{header.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {!editMode
                        ? defaultTable.map((entity, index) => (
                              <tr key={index}>
                                  {Object.keys(entity).map((key) => (
                                      <td key={key}>
                                          {entity[key as keyof Entity]}
                                      </td>
                                  ))}
                              </tr>
                          ))
                        : editTable.map((entity, index) => (
                              <tr key={index}>
                                  {Object.keys(entity).map((key) => (
                                      <td key={key}>
                                          {key === deleteIdName ? (
                                              <>{entity[key as keyof Entity]}</>
                                          ) : (
                                              <input
                                                  placeholder={
                                                      entity[
                                                          key as keyof Entity
                                                      ] === -1
                                                          ? 'click to type...'
                                                          : ''
                                                  }
                                                  type={getInputType(
                                                      key as keyof Entity
                                                  )}
                                                  onChange={(e) =>
                                                      handleEditChange(
                                                          index,
                                                          key,
                                                          e.target.value,
                                                          editTable,
                                                          setEditTable
                                                      )
                                                  }
                                              />
                                          )}
                                      </td>
                                  ))}
                              </tr>
                          ))}
                </tbody>
            </table>
            <button
                id="edit"
                onClick={() =>
                    toggleEdit(
                        editTable,
                        defaultTable,
                        editMode,
                        tableName,
                        deleteIdName,
                        selectAllQuery,
                        setDefaultTable,
                        setEditTable,
                        setEditMode
                    )
                }
            >
                {!editMode ? 'Edit' : 'Save'}
            </button>
            {editMode ? (
                <button
                    id="cancel"
                    onClick={() => cancelEdit(setEditTable, setEditMode)}
                >
                    Cancel
                </button>
            ) : (
                <></>
            )}

            <h2>Add New {tableName}</h2>
            <table>
                <thead>
                    <tr>
                        {tableHeaders.map((header) => (
                            <th key={header.key}>{header.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {addNewEntity.map((entity, index) => (
                        <tr key={index}>
                            {Object.keys(entity).map((key) => (
                                <td key={key}>
                                    <input
                                        type={getInputType(
                                            key as keyof EntityNoID
                                        )}
                                        name={key as keyof EntityNoID}
                                        value={entity[key as keyof EntityNoID]}
                                        placeholder={
                                            index == 0 ? 'click to type...' : ''
                                        }
                                        onChange={(event) =>
                                            handleInputChange(
                                                event,
                                                index,
                                                0,
                                                addNewEntity,
                                                setNewEntity
                                            )
                                        }
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                id="add"
                onClick={() =>
                    sendNewEntity(
                        addNewEntity,
                        tableName,
                        selectAllQuery,
                        defaultTable,
                        setDefaultTable,
                        setNewEntity,
                        addNewPlaceholder
                    )
                }
            >
                Add
            </button>

            <h2>Live Search</h2>
            <select
                name="searchType"
                id="select"
                value={searchType}
                onChange={(event) => handleSelectChange(event, setSearchType)}
            >
                {tableHeaders.map((header) => (
                    <option key={header.key} value={header.key}>
                        {header.label}
                    </option>
                ))}
            </select>
            <input
                placeholder="type anything..."
                id="input"
                onChange={(event) => handleSearchChange(event, setSearchString)}
            />
            <table>
                <thead>
                    <tr>
                        {tableHeaders.map((header) => (
                            <th key={header.key}>{header.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {searchTable.map((entity, index) => (
                        <tr key={index}>
                            {Object.keys(entity).map((key) => (
                                <td key={key}>{entity[key as keyof Entity]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Remove By ID</h2>
            <input
                type="number"
                name="id"
                onChange={(event) => handleIdChange(event, setDeleteThisId)}
                value={deleteThisId <= -1 ? '' : deleteThisId}
            />
            <button
                id="confirm"
                onClick={() => {
                    deleteEntityById(
                        deleteIdName,
                        tableName,
                        deleteThisId,
                        setDeleteThisId
                    );
                    fetchDataToTable(
                        selectAllQuery,
                        defaultTable,
                        setDefaultTable,
                        true
                    );
                }}
            >
                Confirm
            </button>
        </main>
    );
}
