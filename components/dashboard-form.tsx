'use client'

import { Button } from "@/components/ui/button";
import { addTodo } from "@/lib/actions/addTodo";
import * as Form from "@radix-ui/react-form";
import { useState } from "react";

const DashboardForm = () => {
  const [text, setText] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await addTodo(text)

    if (res.error) {
      console.error(res.error)
    }
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
            onChange={e => setText(e.target.value)}
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <Button className="ml-auto">Add todo</Button>
      </Form.Submit>
    </Form.Root>
  )
}

export default DashboardForm