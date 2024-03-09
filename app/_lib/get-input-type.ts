export default function getInputType(string: string) {
    switch (string) {
        case 'customerCardInfo':
            return 'number';

        case 'customerStartDate':
            return 'date';

        default:
            return 'text';
    }
}
