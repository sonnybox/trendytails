import { formatValue } from '@/app/_lib/formatting';
import { handleEditChange } from '@/app/_lib/events-handlers';
import { toggleEdit } from '@/app/_lib/query-helpers';
import { cancelEdit } from '@/app/_lib/events-handlers';

interface Table {
    tableName: string;
    tableHeaders: { key: string; label: string }[];
    editMode: boolean;
    defaultTable: any[];
    editTable: any[];
    idName: string;
    setEditTable: React.Dispatch<React.SetStateAction<any[]>>;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    setDefaultTable: React.Dispatch<React.SetStateAction<any[]>>;
    selectAllQuery: string;
}

function renderDefaultBody(defaultTable: any[]) {
    return defaultTable.map((entity, index) => (
        <tr key={index}>
            {Object.keys(entity).map((key) => (
                <td key={key}>{formatValue(entity[key])}</td>
            ))}
        </tr>
    ));
}

function renderEditBody(
    editTable: any[],
    idName: string,
    setEditTable: React.Dispatch<React.SetStateAction<any[]>>
) {
    return editTable.map((entity, index) => (
        <tr
            key={index}
            className='edit-rows'
        >
            {Object.keys(entity).map((key) => (
                <td key={key}>
                    {key === idName ? (
                        <>{entity[key]}</>
                    ) : (
                        <input
                            className='modify-cell'
                            value={formatValue(entity[key])}
                            spellCheck='false'
                            autoComplete='off'
                            type='string'
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
    ));
}

export default function ExistingTable({
    tableName,
    tableHeaders,
    editMode,
    defaultTable,
    editTable,
    idName,
    setEditTable,
    setEditMode,
    setDefaultTable,
    selectAllQuery,
}: Table) {
    return (
        <div className='flex flex-col mt-2 mb-2'>
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
                    {editMode
                        ? renderEditBody(editTable, idName, setEditTable)
                        : renderDefaultBody(defaultTable)}
                </tbody>
            </table>
            <div className='flex justify-start'>
                <button
                    className='edit-button mt-2'
                    onClick={() =>
                        toggleEdit(
                            editTable,
                            defaultTable,
                            editMode,
                            tableName,
                            idName,
                            selectAllQuery,
                            setDefaultTable,
                            setEditTable,
                            setEditMode
                        )
                    }
                >
                    {!editMode ? ' Edit' : ' Save'}
                </button>
                {editMode ? (
                    <button
                        className='cancel-button mt-2 ml-2'
                        onClick={() => cancelEdit(setEditTable, setEditMode)}
                    >
                        󰜺 Cancel
                    </button>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
