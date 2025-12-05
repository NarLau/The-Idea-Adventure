import SignIn from "~/routes/signIn";

export default function Hero() {
    return (
        <div>
        <div className="heroContainer">
            <div className="heroContent heroText">Lorem</div>
            <div className="heroContent heroSignIn">
                <SignIn/>
            </div>
        </div>
        </div>
    );

};