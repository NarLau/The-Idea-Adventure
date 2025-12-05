import { NavLink, useLocation } from "react-router-dom";
import { authClient } from "~/servers/auth/client";
import SignIn from "./signIn";

export default function PlayGameNavButton() {
  const { data: session, isPending } = authClient.useSession();
  const location = useLocation();

  

  if (isPending) {
    return <button className="btn-hero">Laddar...</button>;
  }

  if (!session) {
    return (
      <div className="playGame">
        <div className="playgamewrapper">
        <div className="playOrLogin">
          <p>You must sign in to play!</p>
          <div className="buttonwrapper"><SignIn /></div>
        </div>
      <NavLink to="/" className="goback hovernbigger" end>
          I wanna go back!
        </NavLink>
      </div></div>
    );
  }

  return (
  <div className="playGame">
    <div className="playgamewrapper">
    <div className="playOrLogin">
      <p>Welcome (ADD USERNAME HERE)</p>
     
      <button
        className="startGameBtn hovernbigger"
        onClick={() => console.log("Play game!")}
      >
        Play Game
      </button>
      </div>
      <NavLink to="/" className="goback hovernbigger"  end>
          I wanna go back!
        </NavLink>
    </div>

       <div className="buttonwrapper"><SignIn/></div>
   </div>
  );
}
