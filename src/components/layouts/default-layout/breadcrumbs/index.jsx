import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import HomeIcon from "@/assets/icons/home";
import AngleLeft from "@/assets/icons/angle-left";

const Breadcrumbs = () => {
  const router = useRouter();
  const { asPath } = router;

  const pathSegments = asPath
    .split("?")[0]
    .split("/")
    .filter((x) => x);

  const crumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    return { title: segment.charAt(0).toUpperCase() + segment.slice(1), href }; // Capitalize first letter of title
  });

  const styledHomeIcon = React.cloneElement(HomeIcon(), {
    className: `w-4 h-4 ${
      crumbs.length > 0 ? "fill-[#667085] opacity-50" : "fill-custom-dark"
    } hover:fill-custom-dark hover:opacity-100 transition-all`,
  });

  return (
    <nav aria-label="breadcrumb" className="flex items-center py-3">
      <ol className="inline-flex items-center h-6">
        <li key="home" className="inline-flex items-center">
          <Link href="/">{styledHomeIcon}</Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li
            key={crumb.href}
            className="inline-flex items-center font-semibold"
          >
            {/* Add a separator except for the first item */}
            {i >= 0 && (
              <span className="mx-4">
                <AngleLeft />
              </span>
            )}

            {/* If it's the last item, don't wrap in a link */}
            {i === crumbs.length - 1 ? (
              <span className="text-custom-dark text-lg font-semibold">
                {decodeURIComponent(crumb.title)}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-[#A9AEBA] hover:text-custom-dark text-lg font-semibold"
              >
                {decodeURIComponent(crumb.title)}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
