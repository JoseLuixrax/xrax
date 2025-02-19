'use client'
import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

export default function ComposePostTextarea() {
    const { pending } = useFormStatus();
    const alreadySent = useRef(false)
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textAreaRef.current == null) return;

        if (!pending && alreadySent.current) {
            alreadySent.current = false;
            textAreaRef.current.value = '';
            return;
        }

        alreadySent.current = pending;
    }, [pending])

    return (
            <textarea
                ref={textAreaRef}
                name="content"
                rows={4}
                className="w-94 text-2xl bg-black placeholder-gray-500 ml-2 p-3"
                placeholder="¡¿Qué está pasando?!"
            ></textarea>
    );
}