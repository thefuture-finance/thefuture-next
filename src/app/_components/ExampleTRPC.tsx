"use client";
import { useState } from "react";

import { trpc } from "../_trpc/client";
import { serverClient } from "../_trpc/serverClient";

export default function ExampleTRPC({
  initialTodos,
}: {
  initialTodos: Awaited<
    ReturnType<(typeof serverClient)["example"]["sayHelloWorld"]>
  >;
}) {
  const getHelloWorld = trpc.example.sayHelloWorld.useQuery(undefined, {
    initialData: initialTodos,
    refetchInterval: 3000,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return (
    <div className="w-full h-full flex justify-center items-center text-4xl text-white">
      {getHelloWorld.data}
    </div>
  );
}
