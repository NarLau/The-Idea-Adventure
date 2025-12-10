import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { authClient } from "~/servers/auth/client";
import SignIn from "./signIn";


export default function PlayGameNavButton() {
  const { data: session, isPending } = authClient.useSession();
    const location = useLocation();
    const navigate = useNavigate();

  const startGame = () => {
    if (session) {
      navigate("/game");
    } else {
      alert("You must log in first!");
    }
  };
  

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
      {session ? (
        <>
          <p>Welcome {session.user.name}</p>
          <button className="startGameBtn" onClick={startGame}>
            Play Game
          </button>
        </>
      ) : (
        <p>You must log in to play.</p>
      )}
      </div>
      <NavLink to="/" className="goback hovernbigger"  end>
          I wanna go back!
        </NavLink>
    </div>

       <div className="buttonwrapper"><SignIn/></div>
   </div>
  );
}
