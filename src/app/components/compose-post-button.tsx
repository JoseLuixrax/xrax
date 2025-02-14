'use client';
import { useFormStatus } from "react-dom";

export function ComposePostButton() {
    const { pending } = useFormStatus();

    return (
        <button 
            disabled={pending}
            type="submit" 
            className="bg-sky-500/90 font-bold rounded-full px-5 py-2 self-end hover:bg-sky-500/100 transition
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? 'Publicando...' : 'Publicar'}
        </button>
    )
}

