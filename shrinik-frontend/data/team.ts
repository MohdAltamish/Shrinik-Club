export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  socials?: {
    linkedin?: string;
  };
}

export interface TeamGroup {
  id: string;
  name: string;
  category: "core" | "technical" | "creative" | "management" | "cultural" | "academic";
  members: TeamMember[];
}

export const teamGroups: TeamGroup[] = [
  {
    id: "core-team",
    name: "Core Team",
    category: "core",

    members: [
      {
        id: "core-team-vibhor-sharma",
        name: "Vibhor Sharma",
        role: "President",
        image: "/images/vibhor-sharma.jpg",
      },
      {
        id: "core-team-prajjval-verma",
        name: "Prajjval Verma",
        role: "Vice President",
      },
      {
        id: "core-team-anushka-shukla",
        name: "Anushka Shukla",
        role: "Organizer",
      },
      {
        id: "core-team-siddhant-singh",
        name: "Siddhant Singh",
        role: "Secretary",
      },
      {
        id: "core-team-kritika",
        name: "Kritika",
        role: "Joint Secretary",
      },
      {
        id: "core-team-gaurang-aggarwal",
        name: "Gaurang Aggarwal",
        role: "Student Coordinator",
        image: "/images/gaurang-agarwal.jpg",
      },
    ],
  },

  {
    id: "tech-team",
    name: "Tech Team",
    category: "technical",

    members: [
      {
        id: "tech-team-palak-chadha",
        name: "Palak Chadha",
        role: "Director",
        image: "/images/palak-chadha.jpg",
      },
      {
        id: "tech-team-altamish",
        name: "Altamish",
        role: "Co-Director",
        image: "/images/altamish.jpg",
      },
      {
        id: "tech-team-aashish-pandey",
        name: "Aashish Pandey",
        role: "Web Master",
        image: "/images/aashish-pandey.jpg",
      },
      {
        id: "tech-team-manjot-kaur",
        name: "Manjot Kaur",
        role: "Member",
        image: "/images/manjot-kaur.jpg",
      },
      {
        id: "tech-team-damini",
        name: "Damini",
        role: "Member",
        image: "/images/damini.jpg",
      },
      {
        id: "tech-team-ayush-bhatnagar",
        name: "Ayush Bhatnagar",
        role: "Member",
        image: "/images/ayush-bhatnagar.jpg",
      },
      {
        id: "tech-team-akash-kumar-singh",
        name: "Akash Kumar Singh",
        role: "Member",
        image: "/images/akash-kumar-singh.jpg",
      },
      {
        id: "tech-team-aabgeen",
        name: "Aabgeen",
        role: "Member",
        image: "/images/aabgeen-aabshar.jpg",
      },
      {
        id: "tech-team-ashwani",
        name: "Ashwani",
        role: "Member",
        image: "/images/ashwani-kumar.jpg",
      },
      {
        id: "tech-team-anurag-singh",
        name: "Anurag Singh",
        role: "Member",
        image: "/images/anurag-singh.jpg",
      },
      {
        id: "tech-team-tushar-sharma",
        name: "Tushar Sharma",
        role: "Member",
        image: "/images/tushar-sharma.jpg",
      },
    ],
  },

  {
    id: "design-media-team",
    name: "Design & Media Team",
    category: "creative",

    members: [
      {
        id: "design-media-team-khyati-prakash",
        name: "Khyati Prakash",
        role: "Director",
      },
      {
        id: "design-media-team-ujjwal-maheshwari",
        name: "Ujjwal Maheshwari",
        role: "Campaign Expert",
        image: "/images/ujjwal-maheshwari.jpg",
      },
      {
        id: "design-media-team-diya-tyagi",
        name: "Diya Tyagi",
        role: "Co-Director",
        image: "/images/diya-tyagi.jpg",
      },
      {
        id: "design-media-team-mohd-maaz",
        name: "Mohd Maaz",
        role: "Member",
        image: "/images/mohd-maaz.jpg",
      },
      {
        id: "design-media-team-rajeshwari-aggarwal",
        name: "Rajeshwari Aggarwal",
        role: "Member",
        image: "/images/rajeshwari-agrawal.jpg",
      },
      {
        id: "design-media-team-stuti-jain",
        name: "Stuti Jain",
        role: "Member",
        image: "/images/stuti-jain.jpg",
      },
      {
        id: "design-media-team-sonia",
        name: "Sonia",
        role: "Member",
        image: "/images/sonia.jpg",
      },
      {
        id: "design-media-team-aayush-srivastava",
        name: "Aayush Srivastava",
        role: "Member",
        image: "/images/aayush-srivastava.jpg",
      },
    ],
  },

  {
    id: "editorial-team",
    name: "Editorial Team",
    category: "creative",

    members: [
      {
        id: "editorial-team-shruti-dixit",
        name: "Shruti Dixit",
        role: "Director",
        image: "/images/shruti-dixit.jpg",
      },
      {
        id: "editorial-team-itisha-gupta",
        name: "Itisha Gupta",
        role: "Co-Director",
        image: "/images/itisha-gupta.jpg",
      },
      {
        id: "editorial-team-mantra-srivastava",
        name: "Mantra Srivastava",
        role: "Member",
        image: "/images/mantra-srivastava.jpg",
      },
      {
        id: "editorial-team-pratap",
        name: "Pratap",
        role: "Member",
        image: "/images/pratap-singh-rana.jpg",
      },
      {
        id: "editorial-team-parikshita-agrawal",
        name: "Parikshita Agrawal",
        role: "Member",
        image: "/images/parikshita-agrawal.jpg",
      },
      {
        id: "editorial-team-jigyasha-rath",
        name: "Jigyasha Rath",
        role: "Member",
        image: "/images/jigyasha-rath.jpg",
      },
      {
        id: "editorial-team-riya",
        name: "Riya",
        role: "Member",
      },
    ],
  },

  {
    id: "pr-team",
    name: "PR Team",
    category: "management",

    members: [
      {
        id: "pr-team-abhinav-raj",
        name: "Abhinav Raj",
        role: "Director",
      },
      {
        id: "pr-team-ashwani-mishra",
        name: "Ashwani Mishra",
        role: "Co-Director",
        image: "/images/ashwani-mishra.jpg",
      },
      {
        id: "pr-team-nitya-reja",
        name: "Nitya Reja",
        role: "Expert",
        image: "/images/nitya-reja.jpg",
      },
      {
        id: "pr-team-tanishka-sharma",
        name: "Tanishka Sharma",
        role: "Expert",
        image: "/images/tanishka-sharma.jpg",
      },
      {
        id: "pr-team-ajita-srivastava",
        name: "Ajita Srivastava",
        role: "Member",
        image: "/images/ajita-srivastava.jpg",
      },
      {
        id: "pr-team-avisha-saluja",
        name: "Avisha Saluja",
        role: "Member",
        image: "/images/avisha-saluja.jpg",
      },
      {
        id: "pr-team-nishtha-bhardwaj",
        name: "Nishtha Bhardwaj",
        role: "Member",
        image: "/images/nishtha-bhardwaj.jpg",
      },
      {
        id: "pr-team-rimjhim",
        name: "Rimjhim",
        role: "Member",
        image: "/images/rimjhim-kumari.jpg",
      },
      {
        id: "pr-team-kirti-goyal",
        name: "Kirti Goyal",
        role: "Member",
        image: "/images/kirti-goyal.jpg",
      },
      {
        id: "pr-team-suhani",
        name: "Suhani",
        role: "Member",
        image: "/images/suhani-rastogi.jpg",
      },
    ],
  },

  {
    id: "social-media-team",
    name: "Social Media Team",
    category: "creative",

    members: [
      {
        id: "social-media-team-satyam-singh",
        name: "Satyam Singh",
        role: "Director",
        image: "/images/satyam-singh.jpg",
      },
      {
        id: "social-media-team-ayush",
        name: "Ayush",
        role: "Co-Director",
      },
      {
        id: "social-media-team-deepesh-ojha",
        name: "Deepesh Ojha",
        role: "Member",
        image: "/images/deepesh-ojha.jpg",
      },
      {
        id: "social-media-team-tanu-mishra",
        name: "Tanu Mishra",
        role: "Member",
        image: "/images/tanu-mishra.jpg",
      },
      {
        id: "social-media-team-sarthak-singh",
        name: "Sarthak Singh",
        role: "Member",
      },
      {
        id: "social-media-team-sharad-kumar",
        name: "Sharad Kumar",
        role: "Member",
        image: "/images/sharad-verma.jpg",
      },
      {
        id: "social-media-team-anni-rai",
        name: "Anni Rai",
        role: "Member",
        image: "/images/anni-rai.jpg",
      },
      {
        id: "social-media-team-samman-sikhawar",
        name: "Samman Sikhawar",
        role: "Member",
        image: "/images/samman-sikarwar.jpg",
      },
      {
        id: "social-media-team-adarsh-verma",
        name: "Adarsh Verma",
        role: "Member",
        image: "/images/adarsh-verma.jpg",
      },
    ],
  },

  {
    id: "event-management-team",
    name: "Event Management Team",
    category: "management",

    members: [
      {
        id: "event-management-team-abhay-shukla",
        name: "Abhay Shukla",
        role: "Head",
      },
      {
        id: "event-management-team-tanish-solanki",
        name: "Tanish Solanki",
        role: "Co-Head",
        image: "/images/tanish-solanki.jpg",
      },
      {
        id: "event-management-team-noorpreet",
        name: "Noorpreet",
        role: "Co-Head",
        image: "/images/noorpreet.jpg",
      },
      {
        id: "event-management-team-vishishta-shukla",
        name: "Vishishta Shukla",
        role: "Member",
        image: "/images/vishishta-shukla.jpg",
      },
      {
        id: "event-management-team-vaishnavi-sinha",
        name: "Vaishnavi Sinha",
        role: "Member",
        image: "/images/vaishnavi-sinha.jpg",
      },
      {
        id: "event-management-team-adarsh-pandey",
        name: "Adarsh Pandey",
        role: "Member",
      },
      {
        id: "event-management-team-vedansh-shukla",
        name: "Vedansh Shukla",
        role: "Member",
        image: "/images/vedansh-shukla.jpg",
      },
      {
        id: "event-management-team-roonit-sharma",
        name: "Roonit Sharma",
        role: "Member",
        image: "/images/roonit-sharma.jpg",
      },
      {
        id: "event-management-team-bhumika-bansal",
        name: "Bhumika Bansal",
        role: "Member",
        image: "/images/bhumika-bansal.jpg",
      },
      {
        id: "event-management-team-shivam-shukla",
        name: "Shivam Shukla",
        role: "Member",
      },
      {
        id: "event-management-team-sreyesh",
        name: "Sreyesh",
        role: "Member",
      },
      {
        id: "event-management-team-anoushka-verma",
        name: "Anoushka Verma",
        role: "Member",
        image: "/images/anoushka-verma.jpg",
      },
    ],
  },

  {
    id: "dance-avenue",
    name: "Dance Avenue",
    category: "cultural",

    members: [
      {
        id: "dance-avenue-namrata-singh",
        name: "Namrata Singh",
        role: "Western Lead",
        image: "/images/namrata-singh.jpg",
      },
      {
        id: "dance-avenue-shambhavi-tewari",
        name: "Shambhavi Tewari",
        role: "Semi-Classical Lead",
        image: "/images/shambhavi-tewari.jpg",
      },
      {
        id: "dance-avenue-sakshi",
        name: "Sakshi",
        role: "Member",
      },
      {
        id: "dance-avenue-avni",
        name: "Avni",
        role: "Member",
      },
      {
        id: "dance-avenue-agam-raj",
        name: "Agam Raj",
        role: "Member",
      },
      {
        id: "dance-avenue-shristi-pradeep",
        name: "Shristi Pradeep",
        role: "Member",
      },
      {
        id: "dance-avenue-atifa-zareef",
        name: "Atifa Zareef",
        role: "Member",
      },
      {
        id: "dance-avenue-aayushi-sharma",
        name: "Aayushi Sharma",
        role: "Member",
      },
      {
        id: "dance-avenue-meghna-pandey",
        name: "Meghna Pandey",
        role: "Member",
        image: "/images/meghna-pandey.jpg",
      },
      {
        id: "dance-avenue-divyanshi-agrahari",
        name: "Divyanshi Agrahari",
        role: "Member",
      },
    ],
  },

  {
    id: "music-avenue",
    name: "Music Avenue",
    category: "cultural",

    members: [
      {
        id: "music-avenue-kartik-kavra",
        name: "Kartik Kavra",
        role: "Lead",
      },
      {
        id: "music-avenue-harshvardhan",
        name: "Harshvardhan",
        role: "Lead",
        image: "/images/harsh-vardhan-singh.jpg",
      },
      {
        id: "music-avenue-prasiddhi-dwivedi",
        name: "Prasiddhi Dwivedi",
        role: "Co-Lead",
        image: "/images/prasiddhi-dwivedi.jpg",
      },
      {
        id: "music-avenue-ruchi-mishra",
        name: "Ruchi Mishra",
        role: "Co-Lead",
        image: "/images/ruchi-mishra.jpg",
      },
      {
        id: "music-avenue-shubh",
        name: "Shubh",
        role: "Vocalist",
      },
      {
        id: "music-avenue-satakshi",
        name: "Satakshi",
        role: "Vocalist",
      },
      {
        id: "music-avenue-kanishk",
        name: "Kanishk",
        role: "Vocalist",
      },
      {
        id: "music-avenue-prakhar",
        name: "Prakhar",
        role: "Vocalist",
      },
      {
        id: "music-avenue-ankit",
        name: "Ankit",
        role: "Vocalist",
      },
      {
        id: "music-avenue-aditya",
        name: "Aditya",
        role: "Vocalist",
      },
      {
        id: "music-avenue-riddhima",
        name: "Riddhima",
        role: "Vocalist",
      },
      {
        id: "music-avenue-adarsh",
        name: "Adarsh",
        role: "Congo",
      },
      {
        id: "music-avenue-devanshi",
        name: "Devanshi",
        role: "Ukulele",
        image: "/images/devanshi-nand.jpg",
      },
      {
        id: "music-avenue-aryan",
        name: "Aryan",
        role: "Guitarist",
      },
    ],
  },

];