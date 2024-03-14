import { handleIdChange } from '@/app/_lib/events-handlers';
import { deleteEntityById, fetchDataToTable } from '@/app/_lib/query-helpers';

interface Table {
    idName: string;
    deleteThisId: string;
    setDeleteThisId: React.Dispatch<React.SetStateAction<string>>;
    tableName: string;
    selectAllQuery: string;
    defaultTable: any[];
    setDefaultTable: React.Dispatch<React.SetStateAction<any[]>>;
    optionalHeader?: string;
}

export default function RemoveId({
    idName,
    deleteThisId,
    setDeleteThisId,
    tableName,
    selectAllQuery,
    defaultTable,
    setDefaultTable,
    optionalHeader,
}: Table) {
    return (
        <div className='flex flex-row mb-2 mt-1'>
            <h2 className='mt-1 mr-2'>
                {optionalHeader ? optionalHeader : 'Remove By ID'}
            </h2>
            <input
                type='number'
                name='id'
                autoComplete='off'
                spellCheck='false'
                className='search-input mr-2'
                placeholder='type a id...'
                onChange={(event) => handleIdChange(event, setDeleteThisId)}
                value={parseInt(deleteThisId) <= 0 ? '' : deleteThisId}
            />
            <button
                className='confirm-button'
                onClick={() => {
                    deleteEntityById(
                        idName,
                        tableName,
                        deleteThisId,
                        setDeleteThisId
                    );
                    setTimeout(() => {
                        fetchDataToTable(
                            selectAllQuery,
                            defaultTable,
                            setDefaultTable,
                            true
                        );
                    }, 50);
                }}
            >
                 Confirm
            </button>
        </div>
    );
}
