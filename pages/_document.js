import Document, { Head, Html, Main, NextScript }  from 'next/document'

class MyDocument extends Document {
    render() {
        return <Html lang="en">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap" rel="stylesheet"/>
            </Head>
            <body>
                <Main></Main>
                <NextScript/>
                <div id="modal-root"></div>
            </body>
        </Html>
    }
}

export default MyDocument;