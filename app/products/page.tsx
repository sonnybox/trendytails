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

export default function Products() {
    const tableName = 'Products';
    const tableDescription = 'Represents products available for ordering.';
    const deleteIdName = 'productID';
    const selectAllQuery = `select * from ${tableName}`;
    const defaultSearchType = 'productName';

    interface Entity {
        productID: number;
        productName: string;
        productBreedSuitability: string;
        productColor: string;
        productSize: string;
        productStockQuantity: number;
        productDescription: string;
    }

    interface Table {
        label: string;
        key: keyof Entity;
    }

    const tableHeaders: Table[] = [
        { label: 'ID', key: 'productID' },
        { label: 'Name', key: 'productName' },
        { label: 'Suitable', key: 'productBreedSuitability' },
        { label: 'Color', key: 'productColor' },
        { label: 'Size', key: 'productSize' },
        { label: 'Stock', key: 'productStockQuantity' },
        { label: 'Desc.', key: 'productDescription' },
    ];

    type EntityNoID = Omit<Entity, 'productID'>;

    const searchDefaultPlaceholder = [
        {
            productID: -1,
            productName: '',
            productBreedSuitability: '',
            productColor: '',
            productSize: '',
            productStockQuantity: -2,
            productDescription: '',
        },
    ];

    const addNewPlaceholder = searchDefaultPlaceholder.map(
        ({ productID, ...rest }) => rest
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
                                              <>
                                                  {
                                                      entity[
                                                          key as keyof Entity
                                                      ] as string
                                                  }
                                              </>
                                          ) : (
                                              <input
                                                  placeholder={
                                                      entity[
                                                          key as keyof Entity
                                                      ] as string
                                                  }
                                                  type="text"
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
                        {tableHeaders.map((header) =>
                            header.key == deleteIdName ? (
                                ''
                            ) : (
                                <th key={header.key}>{header.label}</th>
                            )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {addNewEntity.map((entity, index) => (
                        <tr key={index}>
                            {Object.keys(entity).map((key) => (
                                <td key={key}>
                                    <input
                                        type="text"
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
                {tableHeaders.map((header) =>
                    header.key == deleteIdName ? (
                        ''
                    ) : (
                        <option key={header.key} value={header.key}>
                            {header.label}
                        </option>
                    )
                )}
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
                                <td key={key}>
                                    {entity[key as keyof Entity] === -1
                                        ? '󰍉'
                                        : entity[key as keyof Entity] === -2
                                        ? ''
                                        : entity[key as keyof Entity]}
                                </td>
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
