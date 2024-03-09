import Link from 'next/link';

export default function Navigation() {
    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="customers">Customers</Link>
            <Link href="dogs">Dogs</Link>
            <Link href="address">Address</Link>
            <Link href="products">Products</Link>
            <Link href="orders">Orders</Link>
            <Link href="ownerships">Ownerships</Link>
        </nav>
    );
}
