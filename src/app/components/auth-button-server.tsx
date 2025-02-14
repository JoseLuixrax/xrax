import { createClient } from "@/utils/supabase/server";
import AuthButton from "@/app/components/auth-button-client";

export async function AuthButtonServer() {
    const supabase = await createClient();
    const { data: { user }} = await supabase.auth.getUser();

    return <AuthButton user={user} />
}