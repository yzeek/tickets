import 'bootstrap/dist/css/bootstrap.css';
import Header from '../components/header'
import buildClient from '../api/build-client';
const AppComponent = ({ Component, pageProps, currentUser }) => {

    return <div>
        <Header currentUser={currentUser} />
        <div className='container'>
            <Component {...pageProps} currentUser={currentUser} />
        </div>
    </div>
}

AppComponent.getInitialProps = async appContext => {
    let pageProps = {};
    let client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');
    if (appContext.Component.getInitialProps)
        pageProps = await
            appContext
                .Component
                .getInitialProps(appContext.ctx, client, data.currentUser)
    return { pageProps: pageProps, ...data };

};
export default AppComponent 