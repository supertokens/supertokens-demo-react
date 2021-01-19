import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { sendPageViewAnalytics } from "./Analytics";
import Session from "supertokens-auth-react/recipe/session";

function usePageViews() {
  let location = useLocation();
  useEffect(() => {
    (async function sendEvents() {
      if (!Session.doesSessionExist() && location.pathname === "/auth") {
        await new Promise((res) => setTimeout(res, 500));
        sendPageViewAnalytics("page_demoapp", { page_visited: "sign in up" });
      }
      if (location.pathname === "/auth/reset-password") {
        await new Promise((res) => setTimeout(res, 500));
        sendPageViewAnalytics("page_demoapp", {
          page_visited: "reset password",
        });
      }
    })();
  }, [location]);
}

export const RouterPageViewAnalytics = () => {
  usePageViews();
  return <></>;
};
