export default defineNuxtConfig({
    devtools: {enabled: true},

    buildModules: [],

    ssr: false,
    css: [
        '~/assets/app.scss',
        "~/assets/font/iransans.css",
        // "~/assets/css/iranSans.css",
    ],

    modules: [
        '@vite-pwa/nuxt',
        '@pinia/nuxt',
        'nuxt-primevue'
    ],

    // devServer: {
    //     https: true
    // },

    pwa: {
        workbox: {
            globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
        },
        manifest: {
            "name": "جست و جو شغل",
            "short_name": "سامانه جست و جو شغل",
            "lang": "fa",
            "start_url": "/",
            "display": "standalone",
            "background_color": "#0064C7",
            "theme_color": "#0064C7",
            icons: [
                {
                    "src": "/icons/Artboard-16x16.png",
                    "sizes": "16x16",
                    "type": "image/png"
                },
                {
                    "src": "/icons/Artboard-24x24.png",
                    "sizes": "24x24",
                    "type": "image/png"
                }, {
                    "src": "/icons/Artboard-32x32.png",
                    "sizes": "32x32",
                    "type": "image/png"
                }, {
                    "src": "/icons/Artboard-57x57.png",
                    "sizes": "57x57",
                    "type": "image/png"
                }, {
                    "src": "/icons/Artboard-60x60.png",
                    "sizes": "60x60",
                    "type": "image/png"
                }, {
                    "src": "/icons/Artboard-64x64.png",
                    "sizes": "64x64",
                    "type": "image/png"
                }, {
                    "src": "/icons/Artboard-72x72.png",
                    "sizes": "72x72",
                    "type": "image/png"
                }, {
                    "src": "/icons/Artboard-76x76.png",
                    "sizes": "76x76",
                    "type": "image/png"
                }, {
                    "src": "/icons/Artboard-114x114.png",
                    "sizes": "114x114",
                    "type": "image/png"
                }, {
                    "src": "/icons/Artboard-120x120.png",
                    "sizes": "120x120",
                    "type": "image/png"
                }, {
                    "src": "/icons/Artboard-144x144.png",
                    "sizes": "144x144",
                    "type": "image/png"
                }, {
                    "src": "/icons/Artboard-180x180.png",
                    "sizes": "180x180",
                    "type": "image/png"
                },
                {
                    "src": "/icons/Artboard-192x192.png",
                    "sizes": "192x192",
                    "type": "image/png"
                },
                {
                    "src": "/icons/Artboard-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png"
                },
                {
                    "src": "/icons/Artboard-maskable-16x16.png",
                    "sizes": "16x16",
                    "type": "image/png",
                    "purpose": "maskable"
                }, {
                    "src": "/icons/Artboard-maskable-24x24.png",
                    "sizes": "24x24",
                    "type": "image/png",
                    "purpose": "maskable"
                },
                {
                    "src": "/icons/Artboard-maskable-32x32.png",
                    "sizes": "32x32",
                    "type": "image/png",
                    "purpose": "maskable"
                },
                {
                    "src": "/icons/Artboard-maskable-57x57.png",
                    "sizes": "57x57",
                    "type": "image/png",
                    "purpose": "maskable"
                },
                {
                    "src": "/icons/Artboard-maskable-60x60.png",
                    "sizes": "60x60",
                    "type": "image/png",
                    "purpose": "maskable"
                },
                {
                    "src": "/icons/Artboard-maskable-64x64.png",
                    "sizes": "64x64",
                    "type": "image/png",
                    "purpose": "maskable"
                },
                {
                    "src": "/icons/Artboard-maskable-72x72.png",
                    "sizes": "72x72",
                    "type": "image/png",
                    "purpose": "maskable"
                },
                {
                    "src": "/icons/Artboard-maskable-76x76.png",
                    "sizes": "76x76",
                    "type": "image/png",
                    "purpose": "maskable"
                },
                {
                    "src": "/icons/Artboard-maskable-114x114.png",
                    "sizes": "114x114",
                    "type": "image/png",
                    "purpose": "maskable"
                },
                {
                    "src": "/icons/Artboard-maskable-120x120.png",
                    "sizes": "120x120",
                    "type": "image/png",
                    "purpose": "maskable"
                },
                {
                    "src": "/icons/Artboard-maskable-144x144.png",
                    "sizes": "144x144",
                    "type": "image/png",
                    "purpose": "maskable"
                },
                {
                    "src": "/icons/Artboard-maskable-180x180.png",
                    "sizes": "180x180",
                    "type": "image/png",
                    "purpose": "maskable"
                },
                {
                    "src": "/icons/Artboard-maskable-192x192.png",
                    "sizes": "192x192",
                    "type": "image/png",
                    "purpose": "maskable"
                },
                {
                    "src": "/icons/Artboard-maskable-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "maskable"
                }
            ]
        },
        head: {
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
                }
            ]
        },
        devOptions: {
            enabled: true,
            type: "module",
        },
    },

    plugins: [
        {
            src: '~/plugins/bootstrap.bundle.min.js',
            mode: 'client'
        }
    ],

    primevue: {
        options: {
            ripple: true,
        },
        components: {
            include: ['Dialog', 'Button', 'InputText', "Dropdown", "ProgressBar", "Accordion", 'InputNumber', 'Checkbox',
                "AccordionTab", "IconField", "InputIcon", "RadioButton", "Textarea", "AutoComplete", 'MultiSelect',
                "ProgressSpinner", 'DynamicDialog', "TabPanel", "TabView", "PanelMenu", "Sidebar", "Password",
                "ConfirmPopup", 'Ripple', 'Tooltip', 'StyleClass', 'Avatar', 'Carousel']
        },
        directives: {
            include: ['Ripple', 'Tooltip', 'StyleClass', 'Avatar']
        }
    },

    runtimeConfig: {
        public: {
            jobSeeker: process.env.JobSeeker_API,
            employer: process.env.Employer_Api,
            common: process.env.Common_Api,
            media: process.env.Media_Api,
            panel: process.env.Panel_Api,
            placement: process.env.Placement_Api,
            Public: process.env.Public_Api,
        },
    },

})
