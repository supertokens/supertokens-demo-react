import React, { useState, useEffect } from 'react';
import Logout from "./Logout";
import SuccessView from "./SuccessView";
import Session from 'supertokens-auth-react/recipe/session';
import { useHistory } from "react-router-dom";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";

export default function Home() {
    const [userId, setUserId] = useState(undefined);
    const history = useHistory();

    async function logoutClicked() {
        await signOut();
        history.push("/auth");
    }

    useEffect(() => {
        if (Session.doesSessionExist()) {
            setUserId(Session.getUserId());
        }

    }, [history]);


    if (userId === undefined) {
        return null;
    } else {
        return (
            <div className="fill">
                <Logout
                    logoutClicked={logoutClicked} />
                <SuccessView
                    userId={userId} />
            </div>
        );
    }
}