const plugin = require("tailwindcss/plugin")

const paddingSafe = plugin(({ addUtilities, config, e }) => {
  const paddings = config("theme.padding", {})
  const variants = config("variants.padding", {})

  const utilities = Object.entries(paddings).flatMap(([modifier, size]) => ({
    [`.${e(`p-${modifier}-safe`)}`]: {
      "padding-top": `max(${size}, env(safe-area-inset-top))`,
      "padding-bottom": `max(${size}, env(safe-area-inset-bottom))`,
      "padding-left": `max(${size}, env(safe-area-inset-left))`,
      "padding-right": `max(${size}, env(safe-area-inset-right))`
    },
    [`.${e(`py-${modifier}-safe`)}`]: {
      "padding-top": `max(${size}, env(safe-area-inset-top))`,
      "padding-bottom": `max(${size}, env(safe-area-inset-bottom))`
    },
    [`.${e(`px-${modifier}-safe`)}`]: {
      "padding-left": `max(${size}, env(safe-area-inset-left))`,
      "padding-right": `max(${size}, env(safe-area-inset-right))`
    },
    [`.${e(`pt-${modifier}-safe`)}`]: {
      "padding-top": `max(${size}, env(safe-area-inset-top))`
    },
    [`.${e(`pr-${modifier}-safe`)}`]: {
      "padding-right": `max(${size}, env(safe-area-inset-right))`
    },
    [`.${e(`pb-${modifier}-safe`)}`]: {
      "padding-bottom": `max(${size}, env(safe-area-inset-bottom))`
    },
    [`.${e(`pl-${modifier}-safe`)}`]: {
      "padding-left": `max(${size}, env(safe-area-inset-left))`
    }
  }))

  addUtilities(utilities, variants)
})

module.exports = {
  content: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: ({ theme }) => ({
        device: `0px 0px 0px 4px ${theme(
          "colors.white"
        )}, 0px 0px 1px 4px rgba(0, 0, 0, 0.08), 0px 2px 8px 4px rgba(0, 0, 0, 0.08), 0px 6px 42px 4px rgba(0, 0, 0, 0.06)`,
        "device-highlight": `0px 0px 1px 4px ${theme(
          "colors.zinc.850"
        )}, 0px 0px 1px 4px ${theme(
          "colors.zinc.700"
        )}, 0px 2px 8px 4px rgba(0, 0, 0, 0.08), 0px 6px 42px 4px rgba(0, 0, 0, 0.06)`
      }),
      colors: {
        primary: {
          50: "#FCF5FF",
          100: "#F7E8FF",
          200: "#EFD3FF",
          300: "#E4B0FD",
          400: "#D47FFB",
          500: "#C14EF3",
          600: "#AA2DDF",
          700: "#901FBF",
          800: "#791D9C",
          900: "#641B7E"
        },
        zinc: {
          150: "#ececee",
          250: "#dcdce0",
          350: "#bbbbc1",
          450: "#898992",
          550: "#62626b",
          650: "#494951",
          750: "#333338",
          850: "#202023",
          950: "#121215"
        }
      },
      flex: {
        "3/2": "1.5 1.5 0%",
        "3/4": "0.75 0.75 0%"
      },
      fontSize: {
        "2xs": [
          "0.65rem",
          {
            lineHeight: "1rem"
          }
        ]
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: null,
            pre: {
              color: null,
              backgroundColor: null
            },
            "code::before": null,
            "code::after": null,
            ol: {
              paddingLeft: "1.25em"
            },
            ul: {
              listStyleType: "none",
              paddingLeft: "1.25em"
            },
            li: {
              position: "relative"
            },
            "ul > li::marker": null,
            "ul > li::before": {
              content: `""`,
              position: "absolute",
              backgroundColor: "var(--tw-prose-bullets)",
              borderRadius: "100px",
              width: "0.75em",
              height: "0.125em",
              top: "0.8125em",
              left: "-1.25em"
            }
          }
        }
      },
      zIndex: {
        negative: -1
      }
    }
  },
  plugins: [require("@tailwindcss/typography"), paddingSafe]
}
