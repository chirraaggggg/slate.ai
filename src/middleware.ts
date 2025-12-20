import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Home is public; everything else is protected.
const isPublicRoute = createRouteMatcher(['/']);

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