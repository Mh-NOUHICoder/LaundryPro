
## Structure Folder App



```bash
.
├── app/
│   ├── (auth)/                                  # Auth Route Group: Simple layout for login/signup
│   │   ├── layout.tsx                           # Layout: Minimal, centered UI
│   │   ├── sign-in/
│   │   │   └── [[...sign-in]]/
│   │   │       └── page.tsx                     # Clerk: <SignIn /> component
│   │   └── sign-up/
│   │       └── [[...sign-up]]/
│   │           └── page.tsx                     # Clerk: <SignUp /> component
│   ├── (site)/                                  # Site Route Group: Standard layout (Header/Footer)
│   │   ├── layout.tsx                           # Layout: Includes <Header /> and <Footer />
│   │   ├── page.tsx                             # Route: / (Home Page)
│   │   ├── services/
│   │   │   └── page.tsx                         # Route: /services (Marketing Overview)
│   │   ├── prices/
│   │   │   └── page.tsx                         # Route: /prices
│   │   ├── about/
│   │   │   └── page.tsx                         # Route: /about
│   │   ├── contact/
│   │   │   └── page.tsx                         # Route: /contact
│   │   └── dashboard/
│   │       └── page.tsx                         # Route: /dashboard (Protected User Area)
│   ├── (book)/                                  # Booking Route Group: The Multi-Step Funnel
│   │   ├── layout.tsx                           # Layout: Includes Progress Bar, minimal navigation
│   │   ├── service-selection/
│   │   │   └── page.tsx                         # STEP 1: Route: /service-selection (Choose Wash/Dry Clean)
│   │   ├── [serviceSlug]/
│   │   │   └── page.tsx                    # STEP 2: Route: /wash-fold or /dry-cleaning (Configure Order Details)
│   │   └── checkout/
│   │       └── page.tsx                         # STEP 3: Route: /checkout (Summary, Address, Payment)
│   ├── layout.tsx                               # Root HTML, <ClerkProvider>, Global Metadata
│   └── globals.css                              # Global Tailwind styles
├── components/
│   ├── ui/                                      # shadcn/ui components (sheet, button, etc.)
│   ├── MobileNav.tsx                            # Your customized navigation component
│   ├── Header.tsx                               # Desktop/Tablet Header
│   └── Footer.tsx                               # Site Footer
├── lib/
│   └── data/
│       └── services.ts                          # TypeScript file for service data/types
├── public/                                      # Static assets (images, fonts, favicon)
└── middleware.ts                                # Clerk Auth protection rules
```

