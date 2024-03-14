import {
    handleSelectChange,
    handleSearchChange,
} from '@/app/_lib/events-handlers';
import { formatValue } from '../_lib/formatting';

interface Table {
    searchType: string;
    tableHeaders: { key: string; label: string }[];
    idName: string;
    searchTable: any[];
    setSearchType: React.Dispatch<React.SetStateAction<string>>;
    setSearchString: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchTable({
    searchType,
    tableHeaders,
    idName,
    searchTable,
    setSearchType,
    setSearchString,
}: Table) {
    return (
        <div className='mb-6'>
            <div className='flex flex-row mb-3'>
                <h2 className='mt-1 mr-2'>Live Search</h2>
                <select
                    name='searchType'
                    id='select'
                    className='mr-2'
                    value={searchType}
                    onChange={(event) =>
                        handleSelectChange(event, setSearchType)
                    }
                >
                    {tableHeaders.map((header) =>
                        header.key == idName ? (
                            ''
                        ) : (
                            <option
                                key={header.key}
                                value={header.key}
                            >
                                {header.label}
                            </option>
                        )
                    )}
                </select>
                <input
                    placeholder='type anything...'
                    spellCheck='false'
                    autoComplete='off'
                    className='search-input'
                    id='input'
                    onChange={(event) =>
                        handleSearchChange(event, setSearchString)
                    }
                />
            </div>
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
                                <td key={key}>{formatValue(entity[key])}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
