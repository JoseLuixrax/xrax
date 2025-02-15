import { createClient } from '@/utils/supabase/server'
import { AuthButtonServer } from './components/auth-button-server';
import { redirect } from 'next/navigation';
import { PostList } from './components/post-list';
import { ComposePost } from './components/compose-post';
import { IconHomeFilled, IconSearch, IconBell, IconMail, IconBookmark, IconBriefcase, IconUser, IconAdjustments } from '@tabler/icons-react';

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  console.log(user);
  

  if (user === null) {
    redirect('/login')
  }

  const { data: posts } = await supabase
  .from('posts')
  .select('*, user:users(*)')
  .order('created_at', { ascending: false })

  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 pt-0 pb-0">
        <div className='flex flex-row w-full w-full max-w-[1100px]'>
          <header className='flex-col w-full max-w-[200px] mr-10'>
            <ul className='flex flex-col items-start justify-start w-full h-[90vh] gap-y-6' >
              <li className='text-2xl font-bold hover:bg-gray-800/90 rounded-full p-3'>Xrax</li>
              <li className='text-xl font-bold hover:bg-gray-800/90 rounded-full p-3'>
                <a href='#'><div className='flex items-center space-x-2'><IconHomeFilled size={30} /><span>Inicio</span></div></a>
              </li>
              <li className='text-xl font-semibold hover:bg-gray-800/90 rounded-full p-3'>
                <a href='#'><div className='flex items-center space-x-2'><IconSearch size={30} /><span>Explorar</span></div></a>
              </li>
              <li className='text-xl font-semibold hover:bg-gray-800/90 rounded-full p-3'>
                <a href='#'><div className='flex items-center space-x-2'><IconBell size={30} /><span>Notificaciones</span></div></a>
              </li>
              <li className='text-xl font-semibold hover:bg-gray-800/90 rounded-full p-3'>
                <a href='#'><div className='flex items-center space-x-2'><IconMail size={30} /><span>Mensajes</span></div></a>
              </li>              
              <li className='text-xl font-semibold hover:bg-gray-800/90 rounded-full p-3'>
                <a href='#'><div className='flex items-center space-x-2'><IconBookmark size={30} /><span>Guardados</span></div></a>
              </li>              
              <li className='text-xl font-semibold hover:bg-gray-800/90 rounded-full p-3'>
                <a href='#'><div className='flex items-center space-x-2'><IconBriefcase size={30} /><span>Trabajos</span></div></a>
              </li>              
              <li className='text-xl font-semibold hover:bg-gray-800/90 rounded-full p-3'>
                <a href='#'><div className='flex items-center space-x-2'><IconUser size={30} /><span>Perfil</span></div></a>
              </li>
              <li className='text-xl font-semibold hover:bg-gray-800/90 rounded-full p-3'>
                <a href='#'><div className='flex items-center space-x-2'><IconAdjustments size={30} /><span>Más opciones</span></div></a>
              </li>
              <li className='text-xl font-semibold rounded-full p-3'>
                <AuthButtonServer />
              </li>
            </ul>
            
            <div className='flex flex-col items-center justify-center w-full p-3 hover:bg-gray-800/90 rounded-full'>
              <div className='flex items-center space-x-2'>
                <img src={user.user_metadata.avatar_url} alt={user.user_metadata.user_name} className='w-10 h-10 rounded-full' />
                <div className='flex flex-col items-start justify-start'>
                  <span className='text-lg font-bold'>{user.user_metadata.user_name}</span>
                  <span className='text-sm font-semibold text-gray-500'>@{user.user_metadata.user_name}</span>
                  </div>
                </div>
              </div>
          </header>
          <section className='max-w-[600px] w-full border-l border-r border-white/20 min-h-screen'>
            <ComposePost userAvatarUrl={user?.user_metadata?.avatar_url}/>
            <PostList posts={posts} />
          </section>
        </div>
      </main>
  );
}
