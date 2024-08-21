"use client";
// import useAddressBook from "@/app/_hooks/useAddressBook";
import { type AddressBookItem, Methods } from "@safe-global/safe-apps-sdk";
import type { ReactElement } from "react";
import { useMemo } from "react";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import type { RequestId } from "@safe-global/safe-apps-sdk";
// import useSafeInfo from "@/app/_hooks/useSafeInfo";
import { useSafePermissions } from "@/hooks/permissions/index";
// import { useCurrentChain } from "@/app/_hooks/useChains";
import { isSameUrl } from "@/utils/url";
import useThirdPartyCookies from "./useThirdPartyCookies";
import useAppIsLoading from "./useAppIsLoading";
import {
  PermissionStatus,
  type SafeAppDataWithPermissions,
} from "@/app/_components/apps/types";

import SafeAppIframe from "./SafeAppFrame";
import { useCustomAppCommunicator } from "@/hooks/useCustomAppCommunicator";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const UNKNOWN_APP_NAME = "Unknown Safe App";

type AppFrameProps = {
  appUrl: string;
  allowedFeaturesList: string;
  // safeAppFromManifest: SafeAppDataWithPermissions;
};

const AppFrame = ({
  appUrl,
  allowedFeaturesList,
  // safeAppFromManifest,
}: AppFrameProps): ReactElement => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  // const { safe, safeLoaded } = useSafeInfo();
  // const addressBook = useAddressBook();
  const router = useRouter();
  // const [remoteApp, , isBackendAppsLoading] = useSafeAppFromBackend(
  //   appUrl,
  //   safe.chainId,
  // );
  const { thirdPartyCookiesDisabled, setThirdPartyCookiesDisabled } =
    useThirdPartyCookies();
  const { iframeRef, appIsLoading, isLoadingSlow, setAppIsLoading } =
    useAppIsLoading();
  // useAnalyticsFromSafeApp(iframeRef);
  const {
    permissionsRequest,
    setPermissionsRequest,
    confirmPermissionRequest,
    getPermissions,
    hasPermission,
  } = useSafePermissions();
  // const appName = useMemo(
  //   () => (remoteApp ? remoteApp.name : appUrl),
  //   [appUrl, remoteApp],
  // );

  const communicator = useCustomAppCommunicator(
    iframeRef,
    // safeAppFromManifest,
    {
      onGetPermissions: getPermissions,
      onRequestAddressBook: (origin: string): AddressBookItem[] => {
        if (hasPermission(origin, Methods.requestAddressBook)) {
          // return Object.entries(addressBook).map(([address, name]) => ({
          //   address,
          //   name,
          //   chainId,
          // }));
          return [];
        }

        return [];
      },
      onSetPermissions: setPermissionsRequest,
    },
  );

  const onAcceptPermissionRequest = (_origin: string, requestId: RequestId) => {
    const permissions = confirmPermissionRequest(PermissionStatus.GRANTED);
    communicator?.send(permissions, requestId as string);
  };

  useEffect(() => {
    iframeRef.current.src += "";
  }, [address, iframeRef]);

  const onRejectPermissionRequest = (requestId?: RequestId) => {
    if (requestId) {
      confirmPermissionRequest(PermissionStatus.DENIED);
      communicator?.send(
        "Permissions were rejected",
        requestId as string,
        true,
      );
    } else {
      setPermissionsRequest(undefined);
    }
  };

  // useEffect(() => {
  //   if (!remoteApp) return;
  //
  //   trackSafeAppOpenCount(remoteApp.id);
  // }, [remoteApp]);

  const onIframeLoad = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe || !isSameUrl(iframe.src, appUrl)) {
      return;
    }

    setAppIsLoading(false);
  }, [appUrl, iframeRef, setAppIsLoading]);

  // useEffect(() => {
  //   if (!appIsLoading && !isBackendAppsLoading) {
  //     trackSafeAppEvent(
  //       {
  //         ...SAFE_APPS_EVENTS.OPEN_APP,
  //       },
  //       appName,
  //     );
  //   }
  // }, [appIsLoading, isBackendAppsLoading, appName]);

  if (false) {
    return <div />;
  }

  return (
    <>
      <Head>
        <title>{`Safe Apps - Viewer - ${UNKNOWN_APP_NAME}`}</title>
      </Head>

      <div className="w-full h-full">
        {/* {thirdPartyCookiesDisabled && ( */}
        {/*   <ThirdPartyCookiesWarning */}
        {/*     onClose={() => setThirdPartyCookiesDisabled(false)} */}
        {/*   /> */}
        {/* )} */}

        {appIsLoading && (
          <div>
            {isLoadingSlow && (
              <div>
                The Safe App is taking too long to load, consider refreshing.
              </div>
            )}
            {/* <CircularProgress size={48} color="primary" /> */}
          </div>
        )}

        <div
          style={{
            height: "100%",
            width: "100%",
            display: appIsLoading ? "none" : "block",
            paddingBottom: 0,
          }}
        >
          <SafeAppIframe
            appUrl={appUrl}
            allowedFeaturesList={allowedFeaturesList}
            iframeRef={iframeRef}
            onLoad={onIframeLoad}
            title={""}
          />
        </div>
      </div>
    </>
  );
};

export default AppFrame;
