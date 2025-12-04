import { authClient } from "~/servers/auth/client";
import { Button } from "~/components/ui/buttons";

export default function AuthButton() {
  const {
    data: session,
    isPending,
    error,
    refetch,
  } = authClient.useSession();

  if (isPending) {
    return <Button className="w-full">Laddar...</Button>;
  }

  if (!session) {
    return (
      <Button
        className="w-full"
        onClick={() =>
          authClient.signIn.social({
            provider: "discord",
            callbackURL: "/",
          })
        }
      >
        Logga in med Discord
      </Button>
    );
  }

  return (
    <Button
      className="w-full"
      onClick={() =>
        authClient.signOut({
          query: { redirectTo: "/" },
        })
      }
    >
      Logga ut
    </Button>
  );
}
