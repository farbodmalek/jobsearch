export default [

    [
        {
            id: 1,
            label: "خانه  ",
            url: "/dashboard",
            icon: "grid-fill",
            img: "/img/icon/dashbord.svg",
        },
        {
            id: 2,
            label: "رزومه",
            icon: "box-arrow-right",
            img: "/img/icon/resum.svg",
            subMenu: [
                {
                    label: 'اطلاعات  فردی',
                    icon: 'pi pi-cloud-upload',
                    url: "/jobSeeker/resume/Show/Information",
                    img: "/img/icon/resum.svg",
                },
                {
                    label: 'سوابق تحصیلی ',
                    icon: 'pi pi-cloud-download',
                    url: "/jobSeeker/resume/Show/Education",
                    img: "/img/icon/resum.svg",
                },
                {
                    label: 'سوابق شغلی',
                    icon: 'pi pi-refresh',
                    url: "/jobSeeker/resume/Show/Job",
                    img: "/img/icon/resum.svg",
                },
                {
                    label: 'سوابق مهارتی',
                    icon: 'pi pi-refresh',
                    url: "/jobSeeker/resume/Show/Skills",
                    img: "/img/icon/resum.svg",

                }, {
                    label: 'زبان ها ',
                    icon: 'pi pi-refresh',
                    url: "/jobSeeker/resume/Show/Language",
                    img: "/img/icon/resum.svg",

                }, {
                    label: 'سوابق پژوهشی   ',
                    icon: 'pi pi-refresh',
                    url: "/jobSeeker/resume/Show/Research",
                    img: "/img/icon/resum.svg",

                },
            ]
        },
        {
            id: 3,
            label: 'فعال سازی پروفایل',
            icon: 'pi pi-desktop',
            img: "/img/icon/panel.svg",
        },
        {
            id: 4,
            label: 'خروج',
            icon: 'pi pi-desktop',
            img: "/img/icon/exit.svg"
        },
    ]
];
