# Updates & Changes For Creating In 2024

I did this tutorial in July/August of 2024, and since the release of the video itself on August 25, 2023 there are many changes needed to make it work with NextJs 14 and other modern dependencies. Here are a list of the things I did in order to make this Discord Clone work for me. Unfortunately Antonio's repo is private. So making direct comparisons to his code isn't possible for me, but I will try to be as in-depth as possible here.

### Middleware and Protected Routes

Go to the [Clerk Docs](https://clerk.com/docs/references/nextjs/clerk-middleware#protect-routes-based-on-user-authentication-status), particularly the page linked, and use them to refactor your 'middleware.ts' file.

Notable changes are the replacement of the { authMiddleware } with { clerkMiddleware, createRouteMatcher } and using that create a protected routes function. Your matcher will still be similar, but if you do not add the protected routes function you will not have any protected routes.

### Sign-Out Url

The 'afterSignOutUrl' property much now be called on the <ClerkProvider> itself in the app->layout.tsx file, and can no long be used on the <UserButton> itself. Currently as finishing the project the Clerk Sign-Out button does not seem to work on Mobile, but I will be fixing that soon.

### Database

PlanetScale no longer has a free tier. One option is to use a local PostgreSQL database, but if you're uncomfortable with setting that up NeonDB is a great option. Another YouTuber, Brad Traversy of [Traversy Media](https://www.youtube.com/@TraversyMedia) (an amazing channel for anyone still learning web dev), has a video [Full App Build - Dev to Deployment - Next.js, Prisma, Neon & Clerk](https://www.youtube.com/watch?v=I6DCo5RwHBE) that has a section on setting up and connecting to NeonDB starting at 7:54 in the video. This is what I used to figure this section out.

### Prisma.Schema Generator

I had to add a generator function to my schema. Here it is:
generator client {
provider = 'prisma-client-js'
}

If you run into an error when generating your schema, this may be the cause.

### UploadThing Changes

Insteal of importing the CSS file in the 'file-upload.ts' you must modify your Tailwind.Config file. You will remove the 'const config =' at the beginning of the function declaration, and the 'export default config' at the bottom of the page. Then you will import { withUt }, and wrap your config with that. It should look something like:

    export default withUt({
      // initial config settings
    }) satisfies Config

This took me a few tries to get right, and I believe the Next compiler may not enjoy you doing this, I promise it works. Just make sure to shut down your dev server, fix the config file, and restart it.

Also, the 'generateComponents' import is deprecated, and cannot be used as it is the video. You must individually import each component in the 'uploadthing.ts' file like this:

    import {

generateUploadButton,
generateUploadDropzone,
generateUploader,
} from '@uploadthing/react'

### Next Config

First, the file upload domain is now 'utfs.io', and the way it is setup in the video will throw a console error as its' method is deprecated. For Next 14, it should look something like:

    const nextConfig = {

images: {
remotePatterns: [
{
hostname: 'utfs.io',
},
],
},
}

### Adding 'Sizes' Prop To Images

Another issue that will not break your application, but will throw console errors is not adding a 'sizes' prop to your images. You can always just look up the Tailwind sizes used in the className of the image, and then hardcode those into the 'sizes' prop. It will look like:

    sizes={(max-width: 40px) (max-height: 40px)}

### Sidebar

Using the 'hidden' class was giving me issues, so instead I switched it to 'invisible md:visible md:flex' rather than 'hidden md:flex'. This worked fine for me and was used in all cases where 'hidden' was used in the video instead.

### Server Main Layout

The first place you'll come across redirectToSignIn() in the video is in the server layout, but in all cases where it is used in the video it should be replaced with importing { auth } from Clerk, and then the call of it should be:

    auth().redirectToSignIn()

### Destructuring the useModal Hook

Just using { inOpen, onClose, type, data } would NOT work for me. This error probably took me the longest to figure out. In all cases where you destructure { data } you should use { data = {} }.

### Edit Server Input Error

When editing the server name with code from the project, it will throw an error saying 'The input has no onChnage hadnler'. While the error will not effect functionality, it can be removed by adding an onChange handler to all <Input>'s used throughout the video. It will look like:

    onChange={field.onChange}

### Hidden Tooltips For Sidebar

After adding the Channel Sidebar I could no long see my Server Sidebar tooltips. I fixed this by adding 'z-50' to the <div> around the Server Sidebar at (main)->(routes)->servers->layout.tsx file.

### Add-On: Query OS For Searchbar Keyboard Shortcout

This is totally not needed, but to make the app look more professional, I install the 'react-device-detect' package on NPM so I could query the user devices' OS and dynamically render either 'CTRL K' or '⌘ K' in the search bar.

### Delete Channel Modal

In the delete-channel-modal I had to switch router.push() and router.reset() around from what it was in the video to make the channel automatically delete without having to refresh the page.

### Chat Input Main Div Height Issues

In order to push the Chat Input itself to the bottom of the page I could not use 'h-full' on the main <div>, but rather 'h-[100vh]'

### TypeError Caused By Trailing Slash

In both the 'socket-provider.tsx' and 'io.ts' files I had to change the 'addTrailingSlash' property to 'true' in order to remove a TypeError from the VSCode console running the Next instance.

### Chat Messages Conditional Fix

In the 'chat-messages.tsx' file when creating the conditionals for possible loading or crashing 'loading' had to be changed to 'pending'.

### LiveKit Token Funciton

Rather than using an IIFE function I used a named arrow function and called it. This was more readable and didn't cause Prettier or ESLint errors as the way in the video did.
