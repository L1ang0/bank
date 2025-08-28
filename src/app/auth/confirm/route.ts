import { NextResponse, type NextRequest } from 'next/server'
import type { EmailOtpType } from '@supabase/supabase-js'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  if (token_hash && type) {
    const supabase = createSupabaseServerClient()
    const { error } = await supabase.auth.verifyOtp({ type, token_hash })
    if (error) {
      // шлём на страницу с ошибкой или обратно на форму
      return NextResponse.redirect(`${origin}/?auth_error=${encodeURIComponent(error.message)}`)
    }
  }

  return NextResponse.redirect(`${origin}${next}`)
}
