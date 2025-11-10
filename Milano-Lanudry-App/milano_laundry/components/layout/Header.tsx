"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { TextAlignStart, X, Bubbles, Grid,Zap, Sparkles, Droplets, Wallet, Info, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Drawer } from "vaul";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/** Logo component */
function Logo({ className = "", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <Link href="/" className={cn("inline-flex items-center", className)} aria-label="Home">
      <div className="flex items-center gap-2 text-primary">
        <Bubbles className="h-6 w-6" />
        {showText && <span className="text-xl text-black dark:text-white">Milano Laundry</span>}
      </div>
    </Link>
  );
}

interface HomeHeaderProps {
  localTheme: "light" | "dark";
  setLocalTheme: (theme: "light" | "dark") => void;
}

function TopNotificationBar() {
  return (
    <div className="bg-black fixed top-0 left-0 right-0 h-6 flex items-center justify-center py-1 px-4 text-sm text-white z-30">
      <span className="text-xs font-medium tracking-widest">Free Delivery • Pay Cash on Delivery</span>
    </div>
  );
}

export default function HomeHeader({ localTheme, setLocalTheme }: HomeHeaderProps) {
  const isMobile = useMediaQuery("(max-width: 992px)");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const servicesItems = [
  { href: "/services/wash-fold", label: "Wash & Fold", icon: Droplets }, // water/droplets = washing
  { href: "/services/dry-cleaning", label: "Dry Cleaning", icon: Sparkles }, // clean/shiny effect
  { href: "/services/ironing", label: "Ironing Service", icon: Grid }, // Grid = ironing/pressing
];

  const otherNavItems = [
    { href: "/pricing", label: "Pricing", icon: Wallet },
    { href: "/about", label: "About Us", icon: Info },
    { href: "/contact", label: "Contact", icon: Phone },
  ];

  // Combined items for mobile drawer
  const allMobileItems = [
    ...servicesItems.map(item => ({ ...item, group: "Services" })),
    ...otherNavItems
  ];

  return (
    <>
      <TopNotificationBar />
      <header className="w-full fixed top-4 left-0 right-0 z-30">
        <div className="relative mx-auto md:max-w-screen-lg w-full px-4 py-2">
          <div className="bg-white border border-neutral-200 dark:bg-zinc-900 dark:border-neutral-800 rounded-b-xl h-16 flex items-center px-3">
            {/* LEFT: Mobile hamburger OR desktop Logo */}
            <div className="flex items-center z-10">
              {isMobile ? (
                <Drawer.Root direction="left" open={isOpen} onOpenChange={setIsOpen}>
                  <Drawer.Trigger className="px-3 text-black dark:text-white h-10 grid place-content-center w-fit rounded-lg">
                    <TextAlignStart />
                  </Drawer.Trigger>

                  <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
                    <Drawer.Content
                      className="left-2 top-2 bottom-2 fixed z-50 outline-none w-72 flex"
                      style={{ "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties}
                    >
                      <div className="dark:bg-black bg-white border border-neutral-200 dark:border-neutral-800 p-2 h-full w-full grow flex flex-col rounded-[16px]">
                        <div className="w-full flex justify-between mb-2">
                          {/* mobile drawer logo: icon-only */}
                          <Logo className="pl-2" showText={false} />
                          <button
                            className="rounded-md w-fit bg-neutral-950 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800"
                            onClick={() => setIsOpen(false)}
                          >
                            <X />
                          </button>
                        </div>

                        {/* Services Group in Mobile Drawer */}
                        <div className="mb-4">
                          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-2 py-1">Services</h3>
                          {servicesItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "cursor-pointer gap-1 select-none p-2 dark:hover:text-blue-200 hover:text-base-blue rounded-md transition-colors duration-200 flex items-center justify-start",
                                pathname.startsWith(item.href) &&
                                  "dark:text-blue-200 dark:border dark:border-blue-950 text-base-blue dark:bg-neutral-900 bg-neutral-200",
                              )}
                              onClick={() => setIsOpen(false)}
                            >
                              <item.icon size={20} />
                              <span>{item.label}</span>
                            </Link>
                          ))}
                        </div>

                        {/* Other Navigation Items */}
                        {otherNavItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "cursor-pointer gap-1 select-none p-2 dark:hover:text-blue-200 hover:text-base-blue rounded-md transition-colors duration-200 flex items-center justify-start",
                              pathname.startsWith(item.href) &&
                                "dark:text-blue-200 dark:border dark:border-blue-950 text-base-blue dark:bg-neutral-900 bg-neutral-200",
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </Drawer.Content>
                  </Drawer.Portal>
                </Drawer.Root>
              ) : (
                // Desktop: single logo on the left (text shown)
                <div className="pl-1">
                  <Logo showText={true} />
                </div>
              )}
            </div>

            {/* CENTER: takes remaining space and centers desktop nav; on mobile we show the centered icon only */}
            <div className="flex-1 flex items-center justify-center relative pointer-events-none">
              {isMobile ? (
                <div
                  className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                  aria-hidden
                >
                  {/* mobile center: icon only */}
                  <Logo showText={false} />
                </div>
              ) : (
                // Desktop navigation links centered
                <nav className="flex gap-6 items-center font-medium pointer-events-auto">
                  {/* Services Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger 
                      className={cn(
                        "cursor-pointer gap-2 select-none px-3 py-2 rounded-md transition-colors duration-200 flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                        pathname.startsWith("/services") &&
                          "dark:text-blue-200 dark:border dark:border-blue-950 text-base-blue dark:bg-neutral-900 bg-neutral-200"
                      )}
                    >
                      <Zap size={18} />
                      <span>Services</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="center">
                      <DropdownMenuGroup>
                        {servicesItems.map((item) => (
                          <DropdownMenuItem key={item.href} asChild>
                            <Link
                              href={item.href}
                              className="cursor-pointer flex items-center gap-2"
                            >
                              <item.icon size={16} />
                              <span>{item.label}</span>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Other Navigation Items */}
                  {otherNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "cursor-pointer gap-2 select-none px-3 py-2 rounded-md transition-colors duration-200 flex items-center text-sm",
                        pathname.startsWith(item.href) &&
                          "dark:text-blue-200 dark:border dark:border-blue-950 text-base-blue dark:bg-neutral-900 bg-neutral-200",
                      )}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              )}
            </div>

            {/* RIGHT: Book now CTA */}
            <div className="flex items-center gap-2 z-10">
              <a
                href="/(book)"
                className="bg-cyan-400 hover:bg-primary text-white border dark:border-neutral-800 border-neutral-200 h-10 items-center flex justify-center px-3 rounded-md"
              >
                Book now
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}