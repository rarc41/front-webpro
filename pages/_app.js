import 'tailwindcss/tailwind.css'
import '../main.css'
import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo";
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
