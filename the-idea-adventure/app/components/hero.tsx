import SignIn from "~/routes/signIn";

export default function Hero() {
    return (
        <div>
        <div className="heroContainer">
            <div className="heroContent heroText">
                <h4>The Idea Adventure</h4>
                <p>This is a small world, with some small creauters that wanna say hi to you! 
                    Train your english and figure out what to do next!
                </p>
            </div>
            <div className="heroContent heroSignIn">
                <SignIn/>
            </div>
        </div>
        </div>
    );

};