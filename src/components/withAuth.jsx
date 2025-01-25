// components/withAuth.js
import { useEffect } from "react";
import { useRouter } from "next/router";

const withAuth = (Component) => {
  return (props) => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        loginWithRedirect({
          appState: { returnTo: router.asPath },
        });
      }
    }, [isAuthenticated, isLoading, loginWithRedirect, router]);

    if (isLoading || !isAuthenticated) {
      return <div>Loading...</div>; // You can customize this loading state as needed
    }

    return <Component {...props} />;
  };
};

export default withAuth;
