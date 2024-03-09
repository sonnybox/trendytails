import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import Navigation from './_components/navigation/page';
import localFont from 'next/font/local';
import './globals.css';

const icons = localFont({
    src: '../public/fonts/symbols-mono.ttf',
    variable: '--icon',
});

const font = Figtree({ subsets: ['latin'], variable: '--figtree' });

export const metadata: Metadata = {
    title: 'TrendyTails Admin',
    description: 'A CS340 project by Sonny Box and Sean Long',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${font.className} ${font.variable} ${icons.variable}`}
            >
                <Navigation />
                {children}
            </body>
        </html>
    );
}
