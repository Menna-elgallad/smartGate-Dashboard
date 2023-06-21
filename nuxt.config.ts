import { fileURLToPath } from 'url';
import { resolve } from 'pathe';
import { defineNuxtConfig } from 'nuxt/config';

const resolvePath = (...paths: string[]) => resolve(fileURLToPath(new URL('./', import.meta.url)), ...paths);

export default defineNuxtConfig({

  app: {
    head: {
      meta: [
        { 'http-equiv': 'x-ua-compatible', 'content': 'IE=edge' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
      ],
      link: [
        { rel: 'icon', href: '/logo.png' }
      ]
    }
  },

  build: {
    transpile: [
      'chart.js',
      'primevue'
    ]
  },

  components: {
    dirs: [
      {
        extensions: ['vue'],
        global: true,
        path: '~/components/common/',
        pathPrefix: false
      }
    ]
  },

  css: [
    'primevue/resources/primevue.css',
    'primeflex/primeflex.css',
    'primeicons/primeicons.css',
    'prismjs/themes/prism-coy.css',
    '~/assets/styles/layout.scss',
    '~/assets/demo/flags/flags.css'
  ],

  dir: {
    public: '../public/'
  },

  experimental: {
    reactivityTransform: true,
    viteNode: false
  },

  imports: {
    autoImport: true,
    addons: {
      vueTemplate: true
    }
  },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '~/modules/primevue',
    'nuxt-graphql-client' ,
    'nuxt-icon' , 
    "@bg-dev/nuxt-fcm"
  ],
 

  fcm: {
    firebaseConfig: {
      apiKey: "AIzaSyC48neMUl09HETdLdVCofKV-KQvUDBhWXU",
      authDomain: "car-plate-detect.firebaseapp.com",
      projectId: "car-plate-detect",
      storageBucket: "car-plate-detect.appspot.com",
      messagingSenderId: "944256968583",
      databaseURL: "https://car-plate-detect-default-rtdb.firebaseio.com/",
      appId: "1:944256968583:web:8cbc0f236538cc0bebd522",
    },
    vapidKey:
      "BHZluur5_gBk6AAGr5A-mKKTnTQtpkRch9O7AvlFmgzpJIIpSe2P5TFgX0W3y0XuJSGAsbLsMoYgfzG4425fdT4",
    serviceAccount: {
      type: "service_account",
      project_id: "car-plate-detect",
      private_key_id: "49ac62f6dd22975ef4dbf7c3361461ffb168ce04",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCpVSqmeneuRIRP\ns9BlReRmkIcW31ehn3Bm+sKISS+Zofe/GuIg0DFakljY7kyMZlqQF6FwFgCnuv4z\n0GEvkShYQCzs7DuAFBSoIq5a3/onmwNcVdYOhTYcx+JJOb/J2oPG4A9jFghxOBJn\nVnCcvwva1EWhQtvSAt4AOFpY6zQMmBlXbaMtueCV3jFSvvx8+djzW6+zbR+U+CVh\nM8NyXhhy8CfR5vTLX4r2a0tpGhqR+HuEicyefj4mQa/KfABUpv/y9svMUlP69OMB\nH7wrQ1UXyWvpWR6jBO2cAsSFUP7dKFWlZLpzFo4qoA96maZXKtXCA1tQcK8K0VaR\nPWLgJQhbAgMBAAECggEAJkX+vuQ9euE3usAc4Vcb2ebe8deHehuMj2osYBuSq7oF\nQme0JtCH5z3e4SFzoeRcoecFcU031rGYVWPLI7I+mTvgK6j1heyEAsDcAeRQKXWL\nG+q22E9ZvMWdKwnnhJtkX6YzNCU9wUF4P201ROiVqF+EYX+4Kc7GGOyj1ydKe3Hi\nwM3tDbcZd0/iLTowdAbgZCgN+yONMtToWXBYRT/aT5PHZoQGPg8K/SMoJgCAnNmH\nb+WzPEE61HfiGG1bUt+7mVJGj5thEb0wgaSlXLW7HUXcVKy0HQ65IgQF+n6hy5jv\n+z+RseCkCL5kW5I/CRZn9g+hnkbER1zIi1yqxeAFiQKBgQDpsTBwZMKIhEQ2V1du\nnef+RB1r8nBqoNZA9V220NRSG1W6GDZlkh6An/BgCpuxhWLpzY7CyauVJqjZ02um\nc0sa1PQhpx7absuOCa3f2m1qXChd8AmL3LOkBZoyOD24jD0pYtPTAF1FlN/07iH2\nHAkm0qEBGAVq+E6fH63CursV/QKBgQC5fzRM8Ga9zSzwZ0paWYICCQz5Q7wDmRIy\nbT3DrESr0vG0JRc4LBSFVN7SiC8tsj+Iqzn11jKKNPgaNPF9UmrnrI4z1X86WEI/\nm9jPYfF8JQQSGFTmX1YSQTR3TCYXAs7fP2lCiNJg8jPORB05KzCY0rzLl7kllZyW\n6og+aAo7NwKBgQC1Q51A8Mb7wSxvwhutT4otbYQswOZ1rr/BrxC7xwuJjG5YZIN9\nEXPbbTO0K0ZM0hvBIpKDgI44qL38B8POXkt5Soj6uXhzEdGOIO/fXLvV7hnZk2C0\nPcKRjU7neTxWs2CVg3Sui+/NEwcMItHw5horJOGBybIaIPRK9PWAv/pxuQKBgAQA\nkJpQXYce1CdjsyD76Wgt1c/S/E1/kfrwjHKaVuj2Jizi1/toSBEQYbZdJddwjxpd\nx2RceL6uoeO+3K79hjz1ZiQMKTCTEurYa/cdf95T1iCl0b8es3a1XXJtfCzm7Ju4\nfIbo+NEKqL98jLzdB7Fkapph7aa38ab37HScPgxFAoGAE9Cz2CEz6DRKuwfwrOFB\nHLBG6UcXKeDdjQDgjgJrlmtkErsc8yhe/vEMorZD7kCiwdpfV7snG+SDcZ23umqV\nY1F1KkPGLpZ8K0jK90NpVSl4srreWj91xleBBLmrXWcstiJ/VllRKePrmLSoxdD0\niVXsl7g1VSCGl98c1HF0GhY=\n-----END PRIVATE KEY-----\n",
      client_email:
        "firebase-adminsdk-uf0xj@car-plate-detect.iam.gserviceaccount.com",
      client_id: "104563292725001010265",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uf0xj%40car-plate-detect.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    },
  },
  runtimeConfig: {
    public: {
      GQL_HOST: process.env.GQL_HOST || 'https://smartgate.onrender.com/graphql' // add .env file and GQL_HOST variable to add the graphql host
      // api.spacex is a placeholder api
    }
  },

  nitro: {
    preset: 'vercel'
  },

  srcDir: 'src/',

  vite: {
    build: {
      sourcemap: process.env.NODE_ENV !== 'production'
    },
    clearScreen: true,
    logLevel: 'info'
  }
});
