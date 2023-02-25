import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { GsResponse } from 'src/backend/api/response'

export default function Signin() {
  const [error, setError] = useState<string>()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const login = async () => {
    setLoading(true)
    const result = await axios.post('/api/signin', {
      email,
      password,
    })
    setLoading(false)

    const gsResponse = result.data as GsResponse
    if (gsResponse.success) {
      return router.push('/dashboard')
    }

    setError(gsResponse.message)
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <main>
        <h1>Sign In</h1>
        <p>{error}</p>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button disabled={loading} onClick={() => login()}>
          LogIn
        </button>
        <Link href={'signup'}>Sign Up</Link>
      </main>
    </>
  )
}
