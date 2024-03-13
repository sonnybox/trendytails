export const handleIdChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    func: React.Dispatch<React.SetStateAction<string>>
) => {
    const id = event.target.value;
    !isNaN(parseInt(id)) ? func(id) : func('');
};

export const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    func: React.Dispatch<React.SetStateAction<string>>
) => {
    const input = event.target.value;
    if (input.includes(';') || input.includes('--')) {
        func('');
    } else {
        func(input);
    }
};

export const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    func: React.Dispatch<React.SetStateAction<string>>
) => {
    const input = event.target.value;
    if (input.includes(';') || input.includes('--')) {
        func('');
    } else {
        func(input);
    }
};

export const handleEditChange = (
    index: number,
    field: any,
    value: string,
    editTable: any[],
    func: React.Dispatch<React.SetStateAction<any>>
) => {
    const updatedRow = { ...editTable[index], [field]: value };
    const updatedTable = [...editTable];
    updatedTable[index] = updatedRow;
    func(updatedTable);
};

export const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    columnIndex: number,
    addNewEntity: any[],
    func: React.Dispatch<React.SetStateAction<any>[]>
) => {
    const updatedData = [...addNewEntity];
    updatedData[rowIndex][event.target.name as keyof (typeof updatedData)[0]] =
        event.target.value;
    func(updatedData);
};

export function cancelEdit(
    setEditTable: React.Dispatch<React.SetStateAction<any>[]>,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
) {
    setEditMode(false);
    setEditTable([]);
}
