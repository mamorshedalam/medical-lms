"use client";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "@/components/layouts/default-layout";
import QuizLayout from "@/components/layouts/quiz-layout";
import LaunchTrainingModal from "@/components/ui/modals/launch-training-modal";
import CustomTestModal from "@/components/ui/modals/custom-test-modal";
import CreateSessionAnnaleModal from "@/components/ui/modals/create-session-annale-modal";
import BackHomeConfirmModal from "@/components/ui/modals/quiz-modals/back-home-confirm-modal";
import TerminateConfirmModal from "@/components/ui/modals/quiz-modals/terminate-confirm-modal";
import AddToPlaylistModal from "@/components/ui/modals/add-to-playlist-modal";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "./ui/spinner";
import RootProvider from "@/providers";
import Notification from "./ui/Notification";

function MainComponent({ Component, pageProps }) {

  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !router.pathname.startsWith("/login")) {
      loginWithRedirect()
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, router.pathname])

  if (isLoading)
    return (
      <div className="h-screen w-screen">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      </div>
    );

  const isQuizPage = /(quiz|exam|test|result)/i.test(router.asPath);

  // if (error)
  //   return (
  //     <div className="h-screen w-screen">
  //       <div>{error.message}</div>
  //     </div>
  //   );

  return (
    <>
      {isAuthenticated ? (
        <RootProvider>
          {isQuizPage ? (
            <>
              {/* <QuizLayout> */}
              <Component {...pageProps} />
              {/* </QuizLayout> */}
            </>

          ) : (
            <MainLayout>
              <Component {...pageProps} />
              <div id="modal-group">
                <LaunchTrainingModal />
                <CustomTestModal />
                <CreateSessionAnnaleModal />
              </div>
            </MainLayout>
          )}
           <Notification />
        </RootProvider>
      ) : (
        <Component {...pageProps} />
      )}
      <ToastContainer stacked closeOnClick draggable />
      
    </>
  );
}

export default MainComponent;
