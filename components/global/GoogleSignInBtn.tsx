import { useAuth } from "@/providers/auth-provider";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "../ui/button";

const GoogleSignInBtn = ({
    setError,
}: {
    setError: (message: string | null) => void;
}) => {
    const [googleLoading, setGoogleLoading] = useState(false);

    const { googleSignIn } = useAuth();

    const handleGoogleSignUp = async () => {
        setError(null);
        setGoogleLoading(true);
        try {
            await googleSignIn();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to sign up with Google — please try again.",
            );
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignUp}
            disabled={googleLoading}
            className="h-12 w-full gap-2.5 rounded-xl border-border/60 bg-card text-sm font-semibold text-foreground hover:bg-accent cursor-pointer"
        >
            <IconBrandGoogleFilled className="h-4 w-4" />
            {googleLoading ? "Connecting..." : "Continue with Google"}
        </Button>
    );
};

export default GoogleSignInBtn;
