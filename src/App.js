import SuperTokens, {
  getSuperTokensRoutesForReactRouterDom,
} from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Footer from "./Footer";
import { sendButtonAnalytics } from "./Analytics";
import { RouterPageViewAnalytics } from "./RouterPageViewAnalytics";
import "./App.css";

export function getApiDomain() {
  const apiPort = process.env.REACT_APP_API_PORT || 3001;
  const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
  return apiUrl;
}

export function getWebsiteDomain() {
  const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
  const websiteUrl =
    process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
  return websiteUrl;
}

SuperTokens.init({
  appInfo: {
    appName: "SuperTokens Demo App",
    apiDomain: getApiDomain(),
    websiteDomain: getWebsiteDomain(),
  },
  recipeList: [
    EmailPassword.init({
      emailVerificationFeature: {
        mode: "REQUIRED"
      },
      onHandleEvent(context) {
        switch (context.action) {
          case "RESET_PASSWORD_EMAIL_SENT":
            sendButtonAnalytics("page_demoapp_forgotpassword_resetlinksent");
            break;
          case "SIGN_IN_COMPLETE":
            sendButtonAnalytics("button_demoapp_signin");
            break;
          case "SIGN_UP_COMPLETE":
            sendButtonAnalytics("button_demoapp_signup");
            break;
          default:
            break;
        }
      },
    }),
    Session.init(),
  ],
});


function App() {
  return (
    <div className="App">
      <Router>
        <div className="fill">
          <Switch>
            {getSuperTokensRoutesForReactRouterDom()}
            <Route path="/">
              <EmailPassword.EmailPasswordAuth>
                <Home />
              </EmailPassword.EmailPasswordAuth>
            </Route>
          </Switch>
        </div>
        <RouterPageViewAnalytics />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
