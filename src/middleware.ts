import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Mark auth routes as public so users can sign up and sign in
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-up(.*)',
  '/sign-in(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return; // allow public routes
  await auth.protect(); // enforce auth elsewhere
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // skip static files and Next internals
    '/(api|trpc)(.*)', // always run on API routes
  ],
};