import { createClient } from "@/utils/supabase/server";
import { Avatar } from "@heroui/react";
import { revalidatePath } from "next/cache";
import ComposePostTextarea from "./compose-post-textarea";
import { ComposePostButton } from "./compose-post-button";

export function ComposePost({
    userAvatarUrl,
}: {
    userAvatarUrl: string,
}
) {
    const addPost = async (formData: FormData) => {
        'use server';

        const content = formData.get('content');
        console.log(content);
        

        if (content === null || content == "") return;

        const supabase = await createClient();
        // Comprobamos si el usuario está autenticado
        const { data: { user }} = await supabase.auth.getUser();
        if(user === null) return;

        await supabase.from('posts').insert({ content, user_id: user.id });

        revalidatePath('/');
    }
    return (
        <form action={addPost} className="flex flex-row p-3 border-b border-white/20">
            <Avatar isBordered radius="full" size="md" src={userAvatarUrl} />
            <div className="flex flex-1 flex-col gap-y-4">
                <ComposePostTextarea />
                <ComposePostButton />
            </div>
        </form>
    )

}