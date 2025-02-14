'use client';

import { createClient } from "@/utils/supabase/client";
import { GithubIcon } from "./icons";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

export default function AuthButton({ user } : { user: unknown }) {
    const supabase = createClient();
    const router = useRouter();

    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "github",
            options: { redirectTo: "http://localhost:3000/auth/confirm" }
        })
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    }

    return (
        <div>

            {
                user === null ? (
                    <button onClick={handleSignIn} type="button" className="text-white bg-[#24292F] 
                        focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 
                        font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center 
                        focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
                        <GithubIcon className="w-4 h-4 me-2" />
                        Iniciar sesión con Github
                    </button>
                    ) : (
                    <Button onPress={handleSignOut}>Cerrar sesión</Button>
                )
            }
        </div>
    );

}
