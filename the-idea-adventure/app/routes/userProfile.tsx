import { useLocation, useNavigate, NavLink } from "react-router";
import { authClient } from "~/servers/auth/client";
import SignIn from "./signIn";
import Nav from "~/components/nav";
import { useState } from "react";

export default function UserProfile() {
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

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const handleDeleteAccount = async () => {
		setIsDeleting(true);
		try {
			const { data, error } = await authClient.deleteUser();
			if (error) {
				console.error('Error deleting account:', error);
				alert('Failed to delete account: ' + error.message);
				setIsDeleting(false);
				return;
			}
			window.location.href = '/';
		} catch (err) {
			console.error('Failed to delete account:', err);
			alert('An error occurred while deleting your account.');
			setIsDeleting(false);
		}
	};


    const DeleteConfirmationModal = () => (
  <div
    className="modal-overlay"
    onClick={() => setShowDeleteModal(false)}
  >
    <div
      className="modal-content"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="modal-title">Delete Account</h2>

      <p className="modal-text">
        Are you sure you want to delete your account?
        <br/><br />
        <strong>You will lose all of your game progress.</strong>
        <br/><br />
        This action cannot be undone.
      </p>

      <div className="modal-actions">
        <button
          className="modal-cancel"
          onClick={() => setShowDeleteModal(false)}
          disabled={isDeleting}
        >
          Cancel
        </button>

        <button
          className="modal-delete delBtn"
          onClick={handleDeleteAccount}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  </div>
);
  if (isPending) {
    return <button className="btn-hero">Laddar...</button>;
  }

  if (!session) {
    return (<>
    <Nav></Nav>
      <div className="playGame">
        <div className="playgamewrapper">
        <div className="playOrLogin">
          <p>You must signin to see your account</p>
          <div className="buttonwrapper"><SignIn /></div>
        </div>
      <NavLink to="/" className="goback hovernbigger" end>
          I wanna go back!
        </NavLink>
      </div></div>
    </>);
  }

  return (<>
    <Nav></Nav>
  <div className="playGame">
    
    <div className="playgamewrapper">
    <div className="playOrLogin">
      {session ? (
        <>
          <p>You are Signed in as: {session.user.name}</p>
          <button className="startGameBtn" onClick={startGame}>
            Press to start game
          </button>
        </>
      ) : (
        <p>You must log in to start playing.</p>
      )}
      </div>  
      <button onClick = {
			() => setShowDeleteModal(true) } className = "delBtn" >
		Delete My Account </button>
         { showDeleteModal && <DeleteConfirmationModal/>}
      <NavLink to="/" className="goback hovernbigger"  end>
          I wanna go back!
        </NavLink>
    </div>
   
       <div className="buttonwrapper"><SignIn/></div>
   </div>
  </>);
}
