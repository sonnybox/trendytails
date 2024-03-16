export default function Home() {
    return (
        <main>
            <h1>Overview</h1>
            <div className='text-box'>
                <h2>Introduction</h2>
                <p>
                    TrendyTails is an online subscription service to provide
                    clothing tailored for dogs. We aim to offer a simplified and
                    enjoyable shopping experience for dog owners. Customers can
                    subscribe to receive monthly clothing outfits for their
                    canine companions, specifically chosen to meet their
                    preferences and needs.
                </p>
            </div>
            <div className='text-box'>
                <h2>Market Projection</h2>
                <p>
                    As a nascent startup, TrendyTails is projected to rapidly
                    expand its customer base. It is anticipated that within a
                    specified timeframe, the business will cater to over 35,000
                    customers, delivering monthly clothing boxes to
                    approximately 50,000 dogs.
                </p>
            </div>

            <div className='text-box'>
                <h2>Product Range</h2>
                <p>
                    Our initial launch will feature an extensive collection of
                    approximately 10,000 clothing variations. These options
                    cater to a diverse range of dog breeds and sizes, ensuring
                    that every dog can find a comfortable and stylish outfit.
                </p>
                <p className='mt-4'>
                    This database will enable user login via email and password,
                    securing account details such as addresses and card
                    information, tracking inventory to manage availability on
                    the frontend, and enhancing overall customer experience.
                </p>
            </div>
            <div className='text-box'>
                <h2>Technology and Database Management</h2>
                <p>
                    The backbone of TrendyTails is a sophisticated,
                    database-enabled website. This platform will manage critical
                    datasets, including:
                </p>
                <ul>
                    <li>
                        Customer Profiles: Secure over 35,000 customer details.
                    </li>
                    <li>
                        Dog Profiles: Accommodating diverse specifications for
                        50,000 dogs.
                    </li>
                    <li>
                        Inventory Catalog: Offering a selection from around
                        10,000 clothing options.
                    </li>
                    <li>
                        Transaction Records: Handling thousands of monthly
                        transactions efficiently.
                    </li>
                </ul>
            </div>
        </main>
    );
}
