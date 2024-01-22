//media queries to target landscape phones (425px), tablets (768px), laptops (1024px) and extra large desktop screens (1440px).
const breakpoints = {
    s: "425px",
    m:"768px",
    lg:"1024px",
    xl:"1440px"
};
export const devices = {
    phones:`min-width: ${breakpoints.s}`,
    tablets:`min-width: ${breakpoints.m}`,
    laptops:`min-width: ${breakpoints.lg}`,
    desktops:`min-width: ${breakpoints.xl}`,
}