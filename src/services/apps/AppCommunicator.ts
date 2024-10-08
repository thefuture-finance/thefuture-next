import type { RefObject } from "react";
import type {
  SDKMessageEvent,
  MethodToResponse,
  ErrorResponse,
  RequestId,
} from "@safe-global/safe-apps-sdk";
import {
  getSDKVersion,
  Methods,
  MessageFormatter,
} from "@safe-global/safe-apps-sdk";
import { asError } from "@/services/exception/exceptions";

type MessageHandler = (
  msg: SDKMessageEvent,
) =>
  | void
  | MethodToResponse[Methods]
  | ErrorResponse
  | Promise<MethodToResponse[Methods] | ErrorResponse | void>;

type AppCommunicatorConfig = {
  onMessage?: (msg: SDKMessageEvent) => void;
  onError?: (error: Error, data: any) => void;
};

class AppCommunicator {
  private iframeRef: RefObject<HTMLIFrameElement | undefined>;
  private handlers = new Map<Methods, MessageHandler>();
  private config: AppCommunicatorConfig;

  constructor(
    iframeRef: RefObject<HTMLIFrameElement | undefined>,
    config?: AppCommunicatorConfig,
  ) {
    this.iframeRef = iframeRef;
    this.config = config || {};

    window.addEventListener("message", this.handleIncomingMessage);
  }

  on = (method: Methods, handler: MessageHandler): void => {
    this.handlers.set(method, handler);
  };

  private isValidMessage = (msg: SDKMessageEvent): boolean => {
    if (!msg.data) return false;
    if (msg.data.hasOwnProperty("isCookieEnabled")) {
      return true;
    }

    const sentFromIframe = this.iframeRef.current?.contentWindow === msg.source;
    const knownMethod = Object.values(Methods).includes(msg.data.method);

    return sentFromIframe && knownMethod;
  };

  private canHandleMessage = (msg: SDKMessageEvent): boolean => {
    if (!msg.data) return false;
    return Boolean(this.handlers.get(msg.data.method));
  };

  send = (data: unknown, requestId: RequestId, error = false): void => {
    const sdkVersion = getSDKVersion();
    const msg = error
      ? MessageFormatter.makeErrorResponse(
          requestId,
          data as string,
          sdkVersion,
        )
      : MessageFormatter.makeResponse(requestId, data, sdkVersion);

    this.iframeRef.current?.contentWindow?.postMessage(msg, "*");
  };

  handleIncomingMessage = async (msg: SDKMessageEvent): Promise<void> => {
    if (msg.origin != document.location.origin) {
      console.log(`handling message ${msg.data.method}`);
      console.log(msg);
    }
    const validMessage = this.isValidMessage(msg);
    const hasHandler = this.canHandleMessage(msg);

    if (validMessage && hasHandler) {
      const handler = this.handlers.get(msg.data.method);

      this.config?.onMessage?.(msg);

      try {
        const response = await handler(msg);

        // If response is not returned, it means the response will be send somewhere else
        if (typeof response !== "undefined") {
          this.send(response, msg.data.id);
        }
      } catch (e) {
        const error = asError(e);

        this.send(error.message, msg.data.id, true);
        this.config?.onError?.(error, msg.data);
      }
    }
  };

  clear = (): void => {
    window.removeEventListener("message", this.handleIncomingMessage);
    this.handlers.clear();
  };
}

export default AppCommunicator;
