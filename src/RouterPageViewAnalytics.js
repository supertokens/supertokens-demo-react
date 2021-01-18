import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { sendPageViewAnalytics } from "./Analytics";
import Session from 'supertokens-auth-react/recipe/session';

function usePageViews() {
  let location = useLocation();
  useEffect(() => {
    if (!Session.doesSessionExist() && location.pathname === "/auth") {
      sendPageViewAnalytics("page_demoapp", { page_visited: "sign in up" })
    }
    if (location.pathname === "/auth/reset-password") {
      sendPageViewAnalytics("page_demoapp", { page_visited: "reset password" });
    }
  }, [location]);
}

export const RouterPageViewAnalytics = () => {
  usePageViews();
  return <></>;
};
