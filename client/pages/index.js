import Link from "next/link";

const LandingPage = ({ currentUser, tickets }) => {
    const ticketsList = tickets.map((t) => {
        return (<tr key={t.id}>
            <td>{t.title}</td>
            <td>{t.price}</td>
            <td><Link href={'/tickets/[ticketId]'} as={`tickets/${t.id}`}>
                details
            </Link></td>
        </tr >)
    })
    return (
        <div>
            <h2>tickets 3</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Tiltle</th>
                        <th>Price</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {ticketsList}
                </tbody>
            </table>
        </div>
    )
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
    const { data } = await client.get('/api/tickets');
    // return data;
    return { tickets: data }
};

export default LandingPage;
