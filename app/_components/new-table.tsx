import { sendNewEntity } from '@/app/_lib/query-helpers';
import { handleInputChange } from '@/app/_lib/events-handlers';
import getInputType from '@/app/_lib/get-input-type';

interface Table {
    tableName: string;
    tableHeaders: { key: string; label: string }[];
    defaultTable: any[];
    idName: string;
    setDefaultTable: React.Dispatch<React.SetStateAction<any[]>>;
    selectAllQuery: string;
    addNewEntity: any[];
    setNewEntity: React.Dispatch<React.SetStateAction<any[]>>;
    addNewPlaceholder: any[];
}

export default function NewTable({
    tableName,
    tableHeaders,
    setNewEntity,
    addNewPlaceholder,
    addNewEntity,
    defaultTable,
    idName,
    setDefaultTable,
    selectAllQuery,
}: Table) {
    return (
        <div className='flex flex-col mb-2'>
            <h2>Add New {tableName}</h2>
            <table>
                <thead>
                    <tr>
                        {tableHeaders.map((header) =>
                            header.key == idName ? (
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
                                        type={getInputType(key)}
                                        name={key}
                                        className='modify-cell'
                                        value={entity[key]}
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
            <div className='flex'>
                <button
                    className='add-button mt-2'
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
                     Add
                </button>
            </div>
        </div>
    );
}
