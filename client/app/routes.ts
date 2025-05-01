import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [    
    // index("pages/HomePage.tsx"),
    // route("pages/ProgramInfoPage.tsx", "/program-information"),
    layout("components/layout/Layout.tsx", [
        index("pages/HomePage.tsx"),
        route("/program-information", "pages/ProgramInfoPage.tsx"),
        route("/estimate", "pages/EstimatorPage.tsx"),
        route("/application/business", "pages/BusinessApplicationPage.tsx"),
        route("/application/individual", "pages/IndividualApplicationPage.tsx"),
        route("/faq", "pages/FAQPage.tsx"),
        route("/contact", "pages/ContactPage.tsx"),
        route("/news", "pages/NewsPage.tsx"),
        // route("pages/NotFoundPage.tsx", "*"),
        // route("pages/PrivacyPolicyPage.tsx", "/privacy-policy"),
        // route("pages/TermsOfServicePage.tsx", "/terms-of-service"),
    ])
] satisfies RouteConfig;
