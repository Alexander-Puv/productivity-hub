'use client'

import React, { useState } from 'react'
import DashboardForm from './dashboard-form'
import Todo from './ui/todo'
import { Button } from './ui/button'

const DashboardPage = ({todos}: {todos: ITodo[] | null}) => {
  const [isCompletedPage, setIsCompletedPage] = useState(false)
  return (
    <section className="w-full max-w-xl m-8 flex flex-col items-center gap-3">
      {!isCompletedPage ? <>
        <DashboardForm />
        <div className="mb-2" />
        {todos?.map(todo => !todo.done && <Todo {...todo} autoHide key={todo.id} />)}
      </> : <>
        {todos?.map(todo => todo.done && <Todo {...todo} key={todo.id} />)}
      </>}
      <div className="mt-2 self-end">
        <Button onClick={() => setIsCompletedPage(state => !state)}>
          {!isCompletedPage ? 'Finished todos' : 'Unfinished todos'}
        </Button>
      </div>
    </section>
  )
}

export default DashboardPage