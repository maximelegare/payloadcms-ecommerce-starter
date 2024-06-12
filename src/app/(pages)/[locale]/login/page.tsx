import React from 'react'
import { Metadata } from 'next'

import { Gutter } from '~/app/_components/Gutter'
import { RenderParams } from '~/app/_components/RenderParams'
import { getMeUser } from '~/app/_utilities/getMeUser'
import { mergeOpenGraph } from '~/app/_utilities/mergeOpenGraph'
import LoginForm from './LoginForm'

import classes from './index.module.scss'

export default async function Login() {
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent('You are already logged in.')}`,
  })

  return (
    <Gutter className={classes.login}>
      <RenderParams className={classes.params} />
      <h1>Log in</h1>
      <LoginForm />
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login or create an account to get started.',
  openGraph: mergeOpenGraph({
    title: 'Login',
    url: '/login',
  }),
}
