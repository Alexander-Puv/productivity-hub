'use client'

import React, { useState } from 'react'
import DashboardForm from './dashboard-form'
import Todo from './ui/todo'
import { Button } from './ui/button'

const DashboardPage = ({recievedTodos}: {recievedTodos: ITodo[] | null}) => {
  const [isFinishedPage, setIsFinishedPage] = useState(false)
  const [todos, setTodos] = useState(recievedTodos)

  return (
    <section className="w-full max-w-xl m-8 flex flex-col">
      <div className={`w-full flex flex-col items-center gap-3 ${isFinishedPage && 'hidden'}`}>
        <DashboardForm />
        <div className="mb-2" />
        {todos?.map(todo => !todo.done
          && <Todo {...todo} setTodos={setTodos} autoHide key={todo.id} />
        )}
      </div>
      <div className={`w-full flex flex-col items-center gap-3 ${!isFinishedPage && 'hidden'}`}>
        {todos?.map(todo => todo.done
          && <Todo {...todo} setTodos={setTodos} key={todo.id} />
        )}
      </div>
      <div className="mt-5 self-end">
        <Button onClick={() => setIsFinishedPage(state => !state)}>
          {!isFinishedPage ? 'Finished todos' : 'Unfinished todos'}
        </Button>
      </div>
    </section>
  )
}

export default DashboardPage