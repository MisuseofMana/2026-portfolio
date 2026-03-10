export default defineAppConfig({
  global: {
    picture: {
      dark: '/images/profilepic.png',
      light: '/images/profilepic.png',
      alt: 'My profile picture'
    },
    meetingLink: 'https://cal.com/',
    email: 'contact@seanyager.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'slate'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description:
          'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `© ${new Date().getFullYear()} MisuseofMana`,
    colorMode: false,
    links: [
      {
        'icon': 'i-simple-icons-github',
        'to': 'https://github.com/MisuseofMana',
        'target': '_blank',
        'aria-label': 'Sean Yager on GitHub'
      },
      {
        'icon': 'i-simple-icons-itchdotio',
        'to': 'https://shinbone.itch.io/',
        'target': '_blank',
        'aria-label': 'Sean Yager on Itch.io'
      },
      {
        'icon': 'i-simple-icons-gumroad',
        'to': 'https://misuseofmana.gumroad.com/',
        'target': '_blank',
        'aria-label': 'Sean Yager on Gumroad'
      }
    ]
  }
})
