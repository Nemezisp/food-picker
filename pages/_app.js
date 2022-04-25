import '../styles/globals.css'
import StoreProvider from '../context/store-context'
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
              integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
              crossOrigin=""/>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </>

  )
}

export default MyApp
