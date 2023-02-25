import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const logout = async () => {
    await axios.post('/api/signout')
    router.push('/signin')
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <main>
        <h1>Home</h1>
        <p>This page is private</p>
        <button onClick={() => logout()}>Sign out</button>
      </main>
    </>
  )
}
