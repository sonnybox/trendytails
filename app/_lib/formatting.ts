export function formatValue(value: string): string {
    // Case 1: Check if it's a date in the format '2024-02-29T08:00:00.000Z'
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

    // If it's a date, return it in the format '02-29-2024'
    if (dateRegex.test(value)) {
        const [year, month, day] = value.split('T')[0].split('-');
        return `${month}-${day}-${year}`;
    }

    return value;
}

export function inputType(value: string) {
    // Case 1: Check if it's a date in the format 'mm-dd-yyyy'
    const dateRegex1 = /^\d{2}-\d{2}-\d{4}$/;
    if (dateRegex1.test(value)) {
        return 'date';
    }

    // Case 2: Check if it's a date in the format 'yyyy-mm-ddT08:00:00.000Z'
    const dateRegex2 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
    if (dateRegex2.test(value)) {
        return 'date';
    }

    return 'text';
}

// Used in the edit query
export function convertDateFormat(dateString: string) {
    const [month, day, year] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    // Format the date as 'yyyy-mm-dd'
    return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

export function convertCardFormat(cardString: string) {
    console.log('cardString before: ' + cardString);
    // Remove spaces
    const after = cardString.replace(/\s/g, '');
    console.log('cardString after: ' + after);
    return after;
}
