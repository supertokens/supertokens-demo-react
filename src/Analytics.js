import {useRef, useEffect} from 'react'
import Session from "supertokens-auth-react/recipe/session";

export function getAnalytics() {
  return new Promise((res, rej) => {
    let numberOfRetries = 20;
    const analytics = window.stAnalytics;
    if (analytics) {
      res(analytics.getInstance());
      return;
    }

    let interval = setInterval(() => {
      const stAnalytics = window.stAnalytics;
      numberOfRetries--;
      if (stAnalytics) {
        clearInterval(interval);
        res(stAnalytics.getInstance());
        return;
      }
      if (numberOfRetries < 0) {
        clearInterval(interval);
        rej("Already waited for 2 seconds");
      }
    }, 100);
  });
}

export function sendButtonAnalytics(eventName, options, version = "v5") {
  getAnalytics().then((stAnalytics) =>
    stAnalytics.sendEvent(
      eventName,
      {
        type: "button_click",
        ...options,
      },
      version
    )
  );
}

export async function sendPageViewAnalytics(
  eventName,
  options,
  version = "v5"
) {
  const stAnalytics = await getAnalytics()
  await stAnalytics.sendEvent(
    eventName,
    {
      type: "page_view",
      referrer: document.referrer,
      ...options,
    },
    version
  )
}

// export function usePageViewAnalytics() {
//   const didMountRef = useRef(false);
//   useEffect(() => {
//     if (didMountRef.current) {
//       (async function sendPageViewEvents() {
//         async function sendEvents(eventName, meta) {
//           await sendPageViewAnalytics(eventName, meta)
//         }
//         if (window.location.pathname === "/auth/reset-password") {
//           await sendEvents("page_demoapp", { page_visited: "reset password" });
//         }
//         if (!Session.doesSessionExist() && window.location.pathname === "/auth") {
//           await sendEvents("page_demoapp", { page_visited: "sign in up" })
//         }
//       })()
//     } else {
//       didMountRef.current = true
//     }
//   })
// }
