import { createClient } from '@/utils/supabase/server'
import { AuthButtonServer } from './components/auth-button-server';
import { redirect } from 'next/navigation';
import { PostList } from './components/post-list';
import { ComposePost } from './components/compose-post';

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('/login')
  }

  const { data: posts } = await supabase
  .from('posts')
  .select('*, user:users(*)')
  .order('created_at', { ascending: false })

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 pt-0">

        <section className='max-w-[600px] w-full mx-auto border-l border-r border-white/20 min-h-screen'>
          <ComposePost userAvatarUrl={user?.user_metadata?.avatar_url}/>
          <PostList posts={posts} />
        </section>
        
        <AuthButtonServer />
      </main>
  );
}
