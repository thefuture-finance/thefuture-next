import { trpc } from "@/app/_trpc/client";
import { JsonRpcSigner } from "ethers";

export async function login(
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
