import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";
import { getApiDomain } from "../App";
Session.addAxiosInterceptors(axios);

export default function CallAPIView() {

    async function callAPIClicked() {
        // this will also automatically refresh the session if needed
        try {
            let response = await axios.get(getApiDomain() + "/sessioninfo");
            window.alert("Session Information:\n" + JSON.stringify(response.data, null, 2))
        } catch (err) {
            if (err.status === 401) {
                window.alert("Oops! Your session has expired!");
            }
        }
    }

    return (
        <div
            onClick={callAPIClicked}
            className="sessionButton">
            Call API
        </div>
    );
}