import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {cookies} from 'next/headers'
 
export function middleware(request: NextRequest) {
  const auth=(request.cookies.get('isAuth')?.value);
  console.log(typeof(auth),auth)
  if (request.nextUrl.pathname.startsWith('/profile') && auth==undefined ) {
    return NextResponse.rewrite(new URL('/', request.url))
  }
}