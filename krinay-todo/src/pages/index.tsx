import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";

export default function Home() {


  const { data, isLoading: todosLoading } = api.todo.getAll.useQuery();
  console.log("TODOS: ", data);
  
  return (
    <div className="flex grow flex-col">
      { data?.map((todo) => (
        <div>{ todo.title }</div>
      ))}
    </div>
  );
}
