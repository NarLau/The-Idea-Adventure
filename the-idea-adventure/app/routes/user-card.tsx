import { useNavigate } from "react-router-dom";
import { authClient } from "~/servers/auth/client";

const navigate = useNavigate();

await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      navigate("/login");
    },
  },
});

