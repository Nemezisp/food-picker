import Document, { Head, Html, Main, NextScript }  from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
    render() {
        return <Html lang="en">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
                integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
                crossOrigin=""/>
            </Head>
            <body>
                <Main></Main>
                <NextScript/>
                <div id="modal-root"></div>
            </body>
            <Script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
            integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
            crossOrigin=""></Script>
        </Html>
    }
}

export default MyDocument;