export async function mariaDbQuery(
    query: string,
    queryonly: boolean = false
): Promise<any[]> {
    try {
        const response = await fetch('/api/mariadb', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: query, queryonly: queryonly }),
        });

        if (!response.ok) {
            console.log(`Network response error: ${response.status}`);
            return [];
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching data:', error);
        return [];
    }
}

export const fetchDataToTable = async (
    query: string,
    defaultTable: any[],
    setDefaultTable: React.Dispatch<React.SetStateAction<any>[]>,
    overwrite?: boolean
) => {
    if (!defaultTable[0] || overwrite == true) {
        const data = await mariaDbQuery(query);
        setDefaultTable(data);
    } else {
        console.log('fetched data');
    }
};

export async function searchDataToTable(
    query: string,
    placeholder: any[],
    setSearchTable: React.Dispatch<React.SetStateAction<any>[]>
) {
    const data = await mariaDbQuery(query);

    if (data.length === 0) {
        setSearchTable(placeholder);
    } else {
        setSearchTable(data);
    }
}

export async function deleteEntityById(
    idName: string,
    tableName: string,
    deleteThisId: number,
    func: React.Dispatch<React.SetStateAction<number>>
) {
    if (deleteThisId != -1) {
        await mariaDbQuery(
            `delete from ${tableName} where ${idName} = '${deleteThisId}';`,
            true
        );
        func(-1);
    } else {
        console.log('No ID detected');
    }
}

export function sendEditQuery<T>(
    editTable: any[],
    defaultTable: any[],
    tableName: string,
    deleteIdName: string,
    selectAllQuery: string,
    setDefaultTable: React.Dispatch<React.SetStateAction<any>[]>
) {
    editTable.forEach(async (entity, index) => {
        const defaultEntity = defaultTable[index];
        const differenceEntity: { [key: string]: string } = {};
        const keys = Object.keys(entity) as (keyof T)[];

        // Check for differences
        for (const key of keys) {
            if (entity[key] !== defaultEntity[key]) {
                differenceEntity[key as string] = `'${entity[key]}'`;
            }
        }

        // If there are no differences, skip the query
        if (Object.keys(differenceEntity).length === 0) {
            return;
        }

        // Build the query string
        const setClause = Object.entries(differenceEntity)
            .map(([key, value]) => `${key} = ${value}`)
            .join(', ');
        const query = `update ${tableName} set ${setClause} where ${deleteIdName} = ${entity[deleteIdName]};`;
        await mariaDbQuery(query, true);
        await fetchDataToTable(
            selectAllQuery,
            defaultTable,
            setDefaultTable,
            true
        );
    });
}

export function toggleEdit<T>(
    editTable: any[],
    defaultTable: any[],
    editMode: boolean,
    tableName: string,
    deleteIdName: string,
    selectAllQuery: string,
    setDefaultTable: React.Dispatch<React.SetStateAction<any>[]>,
    setEditTable: React.Dispatch<React.SetStateAction<any>[]>,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
) {
    if (editMode) {
        setEditMode(false);
        sendEditQuery<T>(
            editTable,
            defaultTable,
            tableName,
            deleteIdName,
            selectAllQuery,
            setDefaultTable
        );
    } else {
        setEditTable(defaultTable);
        setEditMode(true);
    }
}

export async function sendNewEntity(
    addNewEntity: any[],
    tableName: string,
    selectAllQuery: string,
    defaultTable: any[],
    setDefaultTable: React.Dispatch<React.SetStateAction<any>[]>,
    setNewEntity: React.Dispatch<React.SetStateAction<any>[]>,
    addNewPlaceholder: any[]
) {
    const entity = addNewEntity[0];
    const fields = Object.keys(entity);
    const values = Object.values(entity);

    if (values.every((value) => value !== '')) {
        // Ensure all fields have values
        const query = `insert into ${tableName} (${fields.join(
            ', '
        )}) values (${values.map((value) => `'${value}'`).join(', ')});`;

        await mariaDbQuery(query, true);
        await fetchDataToTable(
            selectAllQuery,
            defaultTable,
            setDefaultTable,
            true
        );

        setNewEntity(addNewPlaceholder);
    } else {
        console.log('Invalid entry.');
    }
}
