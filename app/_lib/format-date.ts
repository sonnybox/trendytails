export default function formatDate(inputDate: string) {
    if (inputDate) {
        // Create a new Date object from the input string
        const date = new Date(inputDate);

        // Extract year, month, and day from the date object
        const year = date.getFullYear();
        // Add 1 to month since getMonth() returns zero-based index
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        // Return formatted date
        return `${month}/${day}/${year}`;
    } else {
        return '';
    }
}
