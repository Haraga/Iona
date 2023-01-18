import Head from 'next/head'
import { Inter } from '@next/font/google'
import { CatContainer } from 'components/CatContainer';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='my-3'>
        <Container >
          <h1>Cat Browser</h1>
          <CatContainer />
        </Container>
      </main>
    </>
  )
}
