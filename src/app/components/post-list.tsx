import PostCard from "./post-card"
import { type Post } from "@/app/types/posts"

export function PostList({ posts } : { posts: Post[] | null }) {
    return (
        <>
        {
            posts?.map(post => {
                
                const {
                    id,
                    user,
                    content,
                } = post
                
                const {
                    user_name: userName,
                    name: userFullName,
                    avatar_url: avatarUrl,
                } = user
                
                return (
                    <PostCard
                    key={id}
                    userFullName={userFullName ?? "Unknown User"}
                    userName={userName ?? "unknown"}
                    avatarUrl={avatarUrl ?? "/avatar.png"}
                    content={content}
                    />
                )
            })
        }
        </>
    )
}
