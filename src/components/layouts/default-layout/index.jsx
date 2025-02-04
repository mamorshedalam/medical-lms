import React from "react";
import LeftSidebar from "./left-sidebar";
import Breadcrumbs from "./breadcrumbs";
import { AuthProvider } from "@/providers/authProvider";
import { useExam } from "@/providers/examProvider";

const MainLayout = ({ children }) => {
  const { resumeSession, resumeLastSession } = useExam();

  return (
    // <AuthProvider>
    <div className="flex w-screen bg-custom-dark">
      <LeftSidebar />
      <main className="flex flex-col flex-1 h-screen w-full xs:px-8 sm:px-12 md:px-16 py-11 overflow-y-scroll overflow-x-hidden scroll-custom bg-gradient-gray-linear rounded-tl-lg">
        <Breadcrumbs />
        <div>
          {children}
          {resumeSession && (
            <div
              onClick={resumeLastSession}
              className="fixed bottom-[25px] right-[25px] m-4 z-[99999999]"
            >
              <div className="with-tooltip relative flex items-center justify-center">
                <button className="w-[4rem] h-[4rem] bg-primary text-white transition duration-300 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="m-auto"
                  >
                    <path
                      d="M5 4.98963C5 4.01847 5 3.53289 5.20249 3.26522C5.37889 3.03203 5.64852 2.88773 5.9404 2.8703C6.27544 2.8503 6.67946 3.11965 7.48752 3.65835L18.0031 10.6687C18.6708 11.1139 19.0046 11.3364 19.1209 11.6169C19.2227 11.8622 19.2227 12.1378 19.1209 12.3831C19.0046 12.6636 18.6708 12.8862 18.0031 13.3313L7.48752 20.3417C6.67946 20.8804 6.27544 21.1497 5.9404 21.1297C5.64852 21.1123 5.37889 20.968 5.20249 20.7348C5 20.4671 5 19.9815 5 19.0104V4.98963Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <span className="tooltip-text absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs p-2 rounded shadow-lg w-[140px] text-center">
                  Resume your last session
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
    // </AuthProvider>
  );
};

export default MainLayout;
