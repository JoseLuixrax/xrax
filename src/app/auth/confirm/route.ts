import { NextResponse, type NextRequest } from 'next/server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const token_hash = requestUrl.searchParams.get('code')
  
  if (token_hash) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(token_hash)
  }

  if (!token_hash) {
    redirect("/error")
  }

  return NextResponse.redirect(requestUrl.origin) 
}