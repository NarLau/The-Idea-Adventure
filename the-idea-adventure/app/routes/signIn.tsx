import { authClient } from "~/servers/auth/client";


export default function AuthButton() {
  const {
    data: session,
    isPending,
    error,
    refetch,
  } = authClient.useSession();

  if (isPending) {
    return <button className="loginLogout btn-hero">Loading...</button>;
  }

  if (!session) {
    return (<>
      <button
        className="loginLogout btn-hero discordBtn hovernbigger"
        onClick={() =>
          authClient.signIn.social({
            provider: "discord",
            callbackURL: location.pathname, 
          })
        }
      >
        Login with Discord
      </button>
      <p className="orelse"> or</p>
      <button  className="loginLogout btn-hero googleBtn hovernbigger"  onClick={() =>
          authClient.signIn.social({
            provider: "google",
            callbackURL: location.pathname, 
          })
        }>Login with Google</button></>
    );
  }

  return (
    <p
      className="logoutP hovernbigger"
      onClick={() =>
        authClient.signOut({
          query: { redirectTo: "/" },
        })
      }
    >
      LogOut
    </p>
  );
}
