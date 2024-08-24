"use client";
import { serverClient } from "./_trpc/serverClient";
import { getCoinDataById } from "@/server/action";
import { notify, ToastMessageType } from "@/utils/notification";
import { trpc } from "./_trpc/client";
import { JsonRpcSigner } from "ethers";

export default function Home() {
  // const frameRef = useRef(null);
  // if (window.addEventListener) {
  //   window.addEventListener("message", onMessage, false);
  // } else if (window.attachEvent) {
  //   window.attachEvent("onmessage", onMessage, false);
  // }
  //
  // function onMessage(event) {
  //   if (event.origin == "http://localhost:3000") return;
  //   console.log(event);
  //   frameRef.current.contentWindow.postMessage(
  //     {
  //       id: event.data.id,
  //       data: {
  //         safeAddress: "0x26C063B43d2d46CAc149dEE9BbcAD9e768FdEF9b",
  //         chainId: 3,
  //         threshold: 1000,
  //         owners: [],
  //         isReadOnly: false,
  //       },
  //       version: "8.1.0",
  //       success: true,
  //     },
  //     "*",
  //   );
  // }
  //
  const loginMutation = trpc.authRouter.login.useMutation();

  const addAccountMutation = trpc.userInfoRouter.addAccount.useMutation();

  async function add() {
    console.log(addAccountMutation.mutate({ address: "asd" }));
  }

  async function login(
    message: string,
    signer: JsonRpcSigner,
    loginMutation: ReturnType<
      (typeof trpc)["authRouter"]["login"]["useMutation"]
    >,
  ) {
    const signedMessage = await signer.signMessage(message);
    const value = loginMutation.mutate({
      message,
      address: signer.address,
      signedMessage,
    });
    return value;
  }

  return (
    <>
      <button onClick={() => add()}>click</button>
    </>
  );
}
