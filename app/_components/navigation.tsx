'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navigation = [
    { name: 'Customers', link: '/customers' },
    { name: 'Dogs', link: '/dogs' },
    { name: 'Address', link: '/address' },
    { name: 'Orders', link: '/orders' },
    { name: 'Products', link: '/products' },
    { name: 'Ownerships', link: '/ownerships' },
];

export default function Navigation() {
    const pathname = usePathname();
    const [showMenu, setShowMenu] = useState(false);
    const [menuIcon, setMenuIcon] = useState('');
    const [fadeIn, setFadeIn] = useState('opacity-100');

    function toggle() {
        if (showMenu == false) {
            setMenuIcon('');
            setShowMenu(true);
            setTimeout(() => {
                setFadeIn('opacity-100');
            }, 1);
        } else {
            setMenuIcon('');
            setFadeIn('opacity-0');
            setTimeout(() => {
                setShowMenu(false);
            }, 150);
        }
        console.log(showMenu);
    }

    function clickedLink() {
        setShowMenu(false);
        setMenuIcon('');
    }

    function Links() {
        return navigation.map((i) => (
            <Link
                onClick={clickedLink}
                key={i.name}
                href={i.link}
                className={`text-sm rounded-[var(--radius)] bg-none p-[var(--padding)] m-1 text-[var(--gruvbox-bg)] hover:text-[var(--gruvbox-fg0)] hover:bg-[var(--gruvbox-bg0)] transition-colors ${
                    pathname == i.link
                        ? 'bg-[var(--gruvbox-bg2)] text-[var(--gruvbox-fg0)]'
                        : ''
                }`}
            >
                {i.name}
            </Link>
        ));
    }

    return (
        <nav className='flex h-12 flex-row justify-between select-none bg-[var(--gruvbox-fg)] p-1 items-center overflow-clip'>
            <div className='flex flex-row p-[var(--padding)] items-center'>
                <div className='mr-2'>
                    <a>󰩃</a>
                </div>
                <div id='title'>
                    <Link
                        className='text-black font-medium hover:text-[var(--gruvbox-bg4)] transition-colors'
                        href='/'
                        onClick={clickedLink}
                    >
                        TrendyTails Admin
                    </Link>
                </div>
            </div>

            <div
                id='header-center'
                className={`max-md:hidden flex`}
            >
                <Links />
            </div>

            <div
                className={`transition-opacity bg-[var(--gruvbox-fg0)] rounded-[var(--radius)] fixed right-2 top-[-0.5rem] translate-y-16 ${
                    showMenu == false ? 'hidden' : 'flex flex-col md:hidden'
                } ${fadeIn}`}
            >
                <Links />
            </div>

            <div className='flex flex-row p-[var(--padding)] ml-1'>
                <div id='logout'>
                    <a
                        className='text-sm transition-colors hover:text-red-600 md:flex max-md:hidden'
                        href='https://www.google.com'
                    >
                        Log Out
                    </a>
                </div>
                <div
                    id='menu-icon'
                    className='sm:flex md:hidden p-[0.25rem]'
                >
                    <button
                        onClick={toggle}
                        className='rounded-md hover:bg-[var(--gruvbox-fg2)] active:bg-[var(--grubbox-gray-light)] pr-2'
                    >
                        <a className={`ml-[2px]`}>{menuIcon}</a>
                    </button>
                </div>
            </div>
        </nav>
    );
}
