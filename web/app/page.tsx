/**
 * v0 by Vercel.
 * @see https://v0.dev/t/RpImR1PAsTR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { NavigationMenuLink, NavigationMenuList, NavigationMenu } from "@/components/ui/navigation-menu"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <div className="w-full px-4 py-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">MyApp</div>
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuLink asChild>
              <Link className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100" href="#">
                Home
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100" href="#">
                Features
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100" href="#">
                Pricing
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100" href="#">
                Contact
              </Link>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to MyApp
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  The best app for managing your tasks and projects.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Get Started
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="w-full h-20 flex items-center justify-center border-t text-gray-600 dark:border-gray-800 dark:text-gray-300">
        <p>© 2024 MyApp. All rights reserved.</p>
      </div>
    </div>
  )
}