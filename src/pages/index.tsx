import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";
import { useState } from "react";

export default function Home() {


  const { data:session } =useSession();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const ctx = api.useUtils();
  const { data, isLoading: todosLoading } = 
      api.todo.getTodosByUser.useQuery(session?.user?.id ?? "");

  const { mutate } = api.todo.createTodo.useMutation({
    onSuccess: () => {
      setTitle("");
      setDetails("");
      void ctx.todo.getTodosByUser.invalidate()
    }
  })
  const { mutate: setDoneMutate } = api.todo.setDone.useMutation({
    onSuccess: () => {
      void ctx.todo.getTodosByUser.invalidate();
    }
  })
  const { mutate: deleteMutate } = api.todo.deleteTodo.useMutation({
    onSuccess: () => {
      void ctx.todo.getTodosByUser.invalidate();
    }
  })
  return (
    <div className="flex grow flex-col">
      
      <div>
        <input 
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
          placeholder="Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <button
          onClick={() => mutate({ 
            userId: session?.user.id ?? "", 
            title: title, 
            details: details, 
            done: false 
          })}
        >Add Todo</button>
      </div>
      { data?.map((todo) => (
        <div className="flex gap-2">
          <input 
            type="checkbox"
            style={{ zoom: 1.5 }}
            checked={!!todo.done}
            onChange={() => {
              setDoneMutate({ 
                id: todo.id,
                done: todo.done ? false : true
              })
            }}
        />
        <p>{ todo.title }</p>
        <p>{todo.details}</p>
        <h4>{todo.done ? "Complete":"Incomplete"}</h4>
        <button 
          onClick={() => deleteMutate(todo.id)}
          style={{color:"red"}}
        >
          Delete
        </button>
      </div>
    ))}
    </div>
  );
}
