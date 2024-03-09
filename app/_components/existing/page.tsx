import getInputType from '@/app/_lib/get-input-type';
import formatDate from '@/app/_lib/format-date';
import { handleEditChange } from '@/app/_lib/events-handlers';
import { toggleEdit } from '@/app/_lib/query-helpers';
import { cancelEdit } from '@/app/_lib/events-handlers';

export default function ExistingTable<T>(
    tableName: string,
    tableHeaders: any[],
    editMode: boolean,
    defaultTable: any[],
    editTable: any[],
    deleteIdName: string,
    setEditTable: React.Dispatch<React.SetStateAction<any>[]>,
    selectAllQuery: string,
    setDefaultTable: React.Dispatch<React.SetStateAction<any>[]>,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
) {
    return (
        <>
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
                                          {getInputType(
                                              key as keyof T as string
                                          ) === 'date'
                                              ? formatDate(
                                                    entity[
                                                        key as keyof T
                                                    ] as string
                                                )
                                              : entity[key as keyof T]}
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
                                                          key as keyof T
                                                      ] as string
                                                  }
                                              </>
                                          ) : (
                                              <input
                                                  placeholder={
                                                      entity[
                                                          key as keyof T
                                                      ] as string
                                                  }
                                                  type={getInputType(
                                                      key as keyof T as string
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
        </>
    );
}
