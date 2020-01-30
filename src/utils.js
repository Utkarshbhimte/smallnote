export const generateId = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  )
}

export const getWindow = () => (typeof window !== "undefined" && window) || null

// commenting the code below as the getting the
// default theme from os and SSR caching are the
// not working properly.

// getting the OS defaults
// export const getPreferredTheme = () =>
//   getWindow() &&
//   getWindow().matchMedia &&
//   getWindow().matchMedia("(prefers-color-scheme: dark)").matches
//     ? "dark"
//     : "light"

export const CONSTANTS = {
  gridRowGap: 10,
  gridRowDenominator: 27,
  gridColDenominator: 250,
}
