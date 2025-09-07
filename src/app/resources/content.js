import { InlineCode } from "@/once-ui/components";
import '@fortawesome/fontawesome-free/css/all.css';

const person = {
  firstName: "Chel",
  lastName: "Gadores",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Photo Editor, Developer, Photographer",
  avatar: "/images/avatar.jpg",
  location: "Asia/Manila", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Tagalog", "Cebuano"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Wysi-Chel",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/rachelle-gadores-589840248/",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:iam.chel1021@gmail.com",
  },
  {
    name: "Resume",
    icon: "fas fa-folder",
    link: "https://github.com/Wysi-Chel/files"},
];

const home = {
  label: "Home",
  title: `${person.firstName}'s Portfolio`,
  description: ``,
  headline: <>Photo Editor,Web Developer, Photographer</>,
  subline: (
    <>
      I'm Chel, an aspriring developer from <InlineCode>Philippines</InlineCode>. I try to find fun experiences
      <br /> and useful information in life.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Chel is a Davao-based photo editor, web developer, and photographer with a passion for design, layout, and software development.
        She is a Computer Engineeringgraduate aspiring to be in a work environment where she can contribute and
        assist in difficulties.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Upwork",
        timeframe: "2024 - Present",
        role: "Freelancer",
        achievements: [
          <>
            I am pursuing a career in freelancing as a photo editor and web developer on Upwork.
          </>,
        ],
        images:[],
      },
      {
        company: "Thai Student",
        timeframe: "2024 - 2025",
        role: "Tutor",
        achievements: [
          <>
            I am helping a student in senior high school learn the fundamentals in JavaScript
            in preparation for college entrance.
          </>,
        ],
        images:[],
      },
      {
        company: "Self-Employed",
        timeframe: "2024 - Present",
        role: "Crafter",
        achievements: [
          <>
            Home-based crafting station of event supplies for various celebratory events.
          </>,
        ],
        images:[],
      },
      {
        company: "Internship Trainee",
        timeframe: "April - May 2024",
        role: "Technical Assistant",
        achievements: [
          <>
            Developed a customer feedback system for customer-experience of the Technical Education
            and Skills Development Authority <InlineCode>TESDA</InlineCode>.
          </>,
        ],
        images: [],
      },
      {
        company: "Hiwinstar Restaurant",
        timeframe: "November 2020 - February 2021",
        role: "Service Crew",
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Holy Trinity College of General Santos City",
        description: <>Studied Computer Engineering. Graduated with a Leadership Award for leading the college's engineering program in
        Institute of Computer Engineers of the Philippines Student Edition <InlineCode>ICpEP.se</InlineCode> 
          for 2 consecutive years.</>,
      },
      {
        name: "The Heritage Academy of the Philippines",
        description: <>Studied Computer Systems Servicing - TVL. Graduated as class Valedictorian.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Adobe Creative Suite",
        description: <>As a design enthusiast, I have made myself familiar with the design softwares of Adobe.</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Canva",
        description: <>Design in Canva is the most convenient way to develop creative illustrations.</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Figma",
        description: <>Continuously learning to prototype in Figma</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "JavaScript",
        description: <>Building next gen apps with JavaScript</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "ReactJS",
        description: <>Continuous learning about UI/UX Designing.</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "TypeScript",
        description: <>This project is a TypeScript-powered module that dynamically manages and renders a collection of social links, icons, and actions.</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
    ],
  },
  resume: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Canva",
        description: <>Design in Canva is the most convenient way to develop creative illustrations.</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Figma",
        description: <>Continuously learning to prototype in Figma</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "JavaScript",
        description: <>Building next gen apps with JavaScript</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "ReactJS",
        description: <>Continuous learning about UI/UX Designing.</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Adobe Creative Suite",
        description: <>As a design enthusiast, I have made myself familiar with the design softwares of Adobe.</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
    ],
  },
};

const blog = {
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Projects",
  title: "Fun Projects",
  description: `Projects by ${person.firstName}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Gallery",
  title: "Photograph - Gallery",
  description: `A photo collection by ${person.name}`,
  images: [
    {
      src: "/images/gallery/img-01.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-02.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-03.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-04.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-05.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-06.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-07.png",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-08.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-09.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-10.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-11.png",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-12.png",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-13.png",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-14.png",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
