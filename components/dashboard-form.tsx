'use client'

import { Button } from "@/components/ui/button";
import { addRecord } from "@/lib/actions/add-record";
import * as Form from "@radix-ui/react-form";
import { useState } from "react";
import Loader from "./ui/loader";

const DashboardForm = () => {
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    const res = await addRecord({tableName: 'todos', values: {text, done: false}})

    if (res.error) {
      console.error(res.error)
    } else {
      setText('')
    }
    setIsLoading(false)
  }

  return (
    <Form.Root onSubmit={handleSubmit} className="w-full grid gap-5">
      <Form.Field className="grid" name="text">
        <div className="flex items-baseline justify-between">
          <Form.Label>Todo text</Form.Label>
          <Form.Message className="text-sm opacity-80" match="valueMissing">
            Please enter the todo text
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="h-9 w-full px-2.5 bg-accent rounded text-base leading-none"
            required
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <Button className="ml-auto">
          {isLoading
            ? <Loader />
            : 'Add todo'
          }
        </Button>
      </Form.Submit>
    </Form.Root>
  )
}

export default DashboardForm