export default function getInputType(
    string: string
): 'number' | 'date' | 'text' {
    const containsDate = /date/i.test(string);
    const containsNumber = /id|card|zip|amount|stock|quantity/i.test(string);

    if (containsDate) {
        return 'date';
    } else if (containsNumber) {
        return 'number';
    } else {
        return 'text';
    }
}
