export const SITE_CONFIG = {
    name: "SHRINIK",
    description: "Technology, creativity and culture.",
};

// Set to true to re-enable the Gallery section and navigation in the future
export const SHOW_GALLERY = false;

export const NAV_ITEMS = [
    { label: "About", href: "#about" },
    { label: "Team", href: "#team" },
    { label: "Events", href: "#events" },
    ...(SHOW_GALLERY ? [{ label: "Gallery", href: "#gallery" }] : []),
    { label: "Contact", href: "#contact" },
];
