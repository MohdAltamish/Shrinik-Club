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
      { id: "core-team-vibhor-sharma", name: "Vibhor Sharma", role: "President", image: "/images/vibhor-sharma.webp" },
      { id: "core-team-prajjval-verma", name: "Prajjval Verma", role: "Vice President", image: "/images/prajjval-verma.webp" },
      { id: "core-team-anushka-shukla", name: "Anushka Shukla", role: "Organizer", image: "/images/anushka-shukla.webp" },
      { id: "core-team-siddhant-singh", name: "Siddhant Singh", role: "Secretary", image: "/images/siddhant-singh.webp" },
      { id: "core-team-kritika", name: "Kritika", role: "Joint Secretary", image: "/images/kritika.webp" },
      { id: "core-team-gaurang-aggarwal", name: "Gaurang Aggarwal", role: "Student Coordinator", image: "/images/gaurang-agarwal.webp" },
    ],
  },

  {
    id: "tech-team",
    name: "Tech Team",
    category: "technical",
    members: [
      { id: "tech-team-palak-chadha", name: "Palak Chadha", role: "Director", image: "/images/palak-chadha.webp" },
      { id: "tech-team-altamish", name: "Altamish", role: "Co-Director", image: "/images/altamish.webp" },
      { id: "tech-team-aashish-pandey", name: "Aashish Pandey", role: "Web Master", image: "/images/aashish-pandey.webp" },
      { id: "tech-team-manjot-kaur", name: "Manjot Kaur", role: "Member", image: "/images/manjot-kaur.webp" },
      { id: "tech-team-damini", name: "Damini", role: "Member", image: "/images/damini.webp" },
      { id: "tech-team-ayush-bhatnagar", name: "Ayush Bhatnagar", role: "Member", image: "/images/ayush-bhatnagar.webp" },
      { id: "tech-team-akash-kumar-singh", name: "Akash Kumar Singh", role: "Member", image: "/images/akash-kumar-singh.webp" },
      { id: "tech-team-aabgeen", name: "Aabgeen", role: "Member", image: "/images/aabgeen-aabshar.webp" },
      { id: "tech-team-ashwani", name: "Ashwani", role: "Member", image: "/images/ashwani-kumar.webp" },
      { id: "tech-team-anurag-singh", name: "Anurag Singh", role: "Member", image: "/images/anurag-singh.webp" },
      { id: "tech-team-tushar-sharma", name: "Tushar Sharma", role: "Member", image: "/images/tushar-sharma.webp" },
      { id: "tech-team-divyansh-kaushik", name: "Divyansh Kaushik", role: "Member", image: "/images/divyansh-kaushik.webp" },
      { id: "tech-team-akshat-mishra", name: "Akshat Mishra", role: "Member", image: "/images/akshat-mishra.webp" },
      { id: "tech-team-saksham-kaushik", name: "Saksham Kaushik", role: "Member", image: "/images/saksham-kaushik.webp" },
      { id: "tech-team-dev-agarwal", name: "Dev Agarwal", role: "Member", image: "/images/dev-agarwal.webp" },
      { id: "tech-team-raj-thakur", name: "Raj Thakur", role: "Member", image: "/images/raj.webp" },
      { id: "tech-team-ojasv-agarwal", name: "Ojasv Agarwal", role: "Member", image: "/images/ojasv-agarwal.webp" },
    ],
  },

  {
    id: "design-media-team",
    name: "Design & Media Team",
    category: "creative",
    members: [
      { id: "design-media-team-khyati-prakash", name: "Khyati Prakash", role: "Director", image: "/images/khyati-prakash.webp" },
      { id: "design-media-team-ujjwal-maheshwari", name: "Ujjwal Maheshwari", role: "Campaign Expert", image: "/images/ujjwal-maheshwari.webp" },
      { id: "design-media-team-diya-tyagi", name: "Diya Tyagi", role: "Co-Director", image: "/images/diya-tyagi.webp" },
      { id: "design-media-team-mohd-maaz", name: "Mohd Maaz", role: "Member", image: "/images/mohd-maaz.webp" },
      { id: "design-media-team-rajeshwari-aggarwal", name: "Rajeshwari Aggarwal", role: "Member", image: "/images/rajeshwari-agrawal.webp" },
      { id: "design-media-team-stuti-jain", name: "Stuti Jain", role: "Member", image: "/images/stuti-jain.webp" },
      { id: "design-media-team-sonia", name: "Sonia", role: "Member", image: "/images/sonia.webp" },
      { id: "design-media-team-aayush-srivastava", name: "Aayush Srivastava", role: "Member", image: "/images/aayush-srivastava.webp" },
      { id: "design-media-team-adarsh-verma", name: "Adarsh Verma", role: "Member", image: "/images/adarsh-verma.webp" },
    ],
  },

  {
    id: "editorial-team",
    name: "Editorial Team",
    category: "creative",
    members: [
      { id: "editorial-team-shruti-dixit", name: "Shruti Dixit", role: "Director", image: "/images/shruti-dixit.webp" },
      { id: "editorial-team-itisha-gupta", name: "Itisha Gupta", role: "Co-Director", image: "/images/itisha-gupta.webp" },
      { id: "editorial-team-mantra-srivastava", name: "Mantra Srivastava", role: "Member", image: "/images/mantra-srivastava.webp" },
      { id: "editorial-team-pratap", name: "Pratap", role: "Member", image: "/images/pratap-singh-rana.webp" },
      { id: "editorial-team-parikshita-agrawal", name: "Parikshita Agrawal", role: "Member", image: "/images/parikshita-agrawal.webp" },
      { id: "editorial-team-abhishek-kumar", name: "Abhishek Kumar", role: "Member", image: "/images/abhishek.webp" },
    ],
  },

  {
    id: "pr-team",
    name: "PR Team",
    category: "management",
    members: [
      { id: "pr-team-abhinav-raj", name: "Abhinav Raj", role: "Director", image: "/images/abhinav-raj.webp" },
      { id: "pr-team-ashwani-mishra", name: "Ashwani Mishra", role: "Co-Director", image: "/images/ashwani-mishra.webp" },
      { id: "pr-team-nitya-reja", name: "Nitya Reja", role: "Expert", image: "/images/nitya-reja.webp" },
      { id: "pr-team-tanishka-sharma", name: "Tanishka Sharma", role: "Expert", image: "/images/tanishka-sharma.webp" },
      { id: "pr-team-ajita-srivastava", name: "Ajita Srivastava", role: "Member", image: "/images/ajita-srivastava.webp" },
      { id: "pr-team-avisha-saluja", name: "Avisha Saluja", role: "Member", image: "/images/avisha-saluja.webp" },
      { id: "pr-team-nishtha-bhardwaj", name: "Nishtha Bhardwaj", role: "Member", image: "/images/nishtha.webp" },
      { id: "pr-team-rimjhim", name: "Rimjhim", role: "Member", image: "/images/rimjhim-kumari.webp" },
      { id: "pr-team-kirti-goyal", name: "Kirti Goyal", role: "Member", image: "/images/kirti-goyal.webp" },
      { id: "pr-team-suhani", name: "Suhani", role: "Member", image: "/images/suhani-rastogi.webp" },
      { id: "pr-team-jigyasha-rath", name: "Jigyasha Rath", role: "Member", image: "/images/jigyasha-rath.webp" },
      { id: "pr-team-anmol", name: "Anmol", role: "Member", image: "/images/anmol-rawal.webp" },
    ],
  },

  {
    id: "social-media-team",
    name: "Social Media Team",
    category: "creative",
    members: [
      { id: "social-media-team-satyam-singh", name: "Satyam Singh", role: "Director", image: "/images/satyam-singh.webp" },
      { id: "social-media-team-ayush", name: "Ayush", role: "Co-Director", image: "/images/ayush.webp "},
      { id: "social-media-team-deepesh-ojha", name: "Deepesh Ojha", role: "Member", image: "/images/deepesh-ojha.webp" },
      { id: "social-media-team-tanu-mishra", name: "Tanu Mishra", role: "Member", image: "/images/tanu-mishra.webp" },
      { id: "social-media-team-sarthak-singh", name: "Sarthak Singh", role: "Member", image: "/images/sarthak-singh.webp" },
      { id: "social-media-team-sharad-kumar", name: "Sharad Kumar", role: "Member", image: "/images/sharad-verma.webp" },
      { id: "social-media-team-anni-rai", name: "Anni Rai", role: "Member", image: "/images/anni-rai.webp" },
      { id: "social-media-team-samman-sikhawar", name: "Samman Sikhawar", role: "Member", image: "/images/samman-sikarwar.webp" },
      { id: "social-media-team-aaniya", name: "Aaniya", role: "Member", image: "/images/aaniya-saini.webp" },
      { id: "social-media-team-anushka-gupta", name: "Anushka Gupta", role: "Member", image: "/images/anushka-gupta.webp" },
      { id: "social-media-team-anushka-jain", name: "Anushka Jain", role: "Member", image: "/images/anushka-jain.webp" },
      { id: "social-media-team-arijit", name: "Arijit", role: "Member", image: "/images/arijit.webp" },
      { id: "social-media-team-rishab-mishra", name: "Rishab Mishra", role: "Member", image: "/images/rishabh-mishra.webp" },
      { id: "social-media-team-siya-kanaujiya", name: "Siya Kanaujiya", role: "Member", image: "/images/siya-kanaujiya.webp" },
      { id: "social-media-team-vaibhav-pratap", name: "Vaibhav Pratap", role: "Member", image: "/images/vaibhav-pratap-singh.webp" },
      { id: "social-media-team-sharad-verma", name: "Sharad Verma", role: "Member", image: "/images/sharad-verma.webp" },
      { id: "social-media-team-anshika-pal", name: "Anshika Pal", role: "Member", image: "/images/anshika-pal.webp" },
      { id: "social-media-team-rizwan", name: "Rizwan", role: "Member", image: "/images/rizwan.webp" },
    ],
  },

  {
    id: "event-management-team",
    name: "Event Management Team",
    category: "management",
    members: [
      { id: "event-management-team-abhay-shukla", name: "Abhay Shukla", role: "Head", image: "/images/abhay-shukla.webp" },
      { id: "event-management-team-tanish-solanki", name: "Tanish Solanki", role: "Co-Head", image: "/images/tanish-solanki.webp" },
      { id: "event-management-team-noorpreet", name: "Noorpreet", role: "Co-Head", image: "/images/noorpreet.webp" },
      { id: "event-management-team-vishishta-shukla", name: "Vishishta Shukla", role: "Member", image: "/images/vishishta-shukla.webp" },
      { id: "event-management-team-vaishnavi-sinha", name: "Vaishnavi Sinha", role: "Member", image: "/images/vaishnavi-sinha.webp" },
      { id: "event-management-team-vedansh-shukla", name: "Vedansh Shukla", role: "Member", image: "/images/vedansh-shukla.webp" },
      { id: "event-management-team-roonit-sharma", name: "Roonit Sharma", role: "Member", image: "/images/roonit.webp" },
      { id: "event-management-team-bhumika-bansal", name: "Bhumika Bansal", role: "Member", image: "/images/bhumika-bansal.webp" },
      { id: "event-management-team-shivam-shukla", name: "Shivam Shukla", role: "Member", image: "/images/shivam-shukla.webp" },
      { id: "event-management-team-sreyesh", name: "Shreyas", role: "Member", image: "/images/shreyas.webp" },
      { id: "event-management-team-anoushka-verma", name: "Anoushka Verma", role: "Member", image: "/images/anoushka-verma.webp" },
      { id: "event-management-team-eklavya-verma", name: "Eklavya Verma", role: "Member", image: "/images/eklavya-verma.webp" },
      { id: "event-management-team-vansh-gupta", name: "Vansh Gupta", role: "Member", image: "/images/vansh-gupta.webp" },
      { id: "event-management-team-abhi-kaushik", name: "Abhi Kaushik", role: "Member", image: "/images/abhinav-kaushik.webp" },
      { id: "event-management-team-adhya", name: "Adhya", role: "Member", image: "/images/adhya-goyal.webp" },
      { id: "event-management-team-kartikey-pandey", name: "Kartikey Pandey", role: "Member", image: "/images/kartikey-pandey.webp" },
      { id: "event-management-team-somya-arora", name: "Somya Arora", role: "Member", image: "/images/somya-arora.webp" },
    ],
  },

  {
    id: "dance-avenue",
    name: "Dance Avenue",
    category: "cultural",
    members: [
      { id: "dance-avenue-namrata-singh", name: "Namrata Singh", role: "Western Lead", image: "/images/namrata-singh.webp" },
      { id: "dance-avenue-shambhavi-tewari", name: "Shambhavi Tewari", role: "Semi-Classical Lead", image: "/images/shambhavi-tewari.webp" },
      { id: "dance-avenue-sakshi", name: "Sakshi", role: "Member", image: "/images/sakshi.webp" },
      { id: "dance-avenue-avni", name: "Avni", role: "Member" , image: "/images/avni.webp" },
      { id: "dance-avenue-atifa-zareef", name: "Atifa Zareef", role: "Member", image: "/images/atifa.webp" },
      { id: "dance-avenue-aayushi-sharma", name: "Aayushi Sharma", role: "Member", image: "/images/aayushi-sharma.webp" },
      { id: "dance-avenue-meghna-pandey", name: "Meghna Pandey", role: "Member", image: "/images/meghna-pandey.webp" },
      { id: "dance-avenue-divyanshi-agrahari", name: "Divyanshi Agrahari", role: "Member", image: "/images/divyanshi-agrahari.webp" },
    ],
  },

  {
    id: "music-avenue",
    name: "Music Avenue",
    category: "cultural",
    members: [
      { id: "music-avenue-kartik-kavra", name: "Kartik Kavra", role: "Lead" },
      { id: "music-avenue-harshvardhan", name: "Harshvardhan", role: "Lead", image: "/images/harsh-vardhan-singh.webp" },
      { id: "music-avenue-prasiddhi-dwivedi", name: "Prasiddhi Dwivedi", role: "Co-Lead", image: "/images/prasiddhi-dwivedi.webp" },
      { id: "music-avenue-ruchi-mishra", name: "Ruchi Mishra", role: "Co-Lead", image: "/images/ruchi-mishra.webp" },
      { id: "music-avenue-shubh", name: "Shubh", role: "Vocalist", image: "/images/shubh.webp" },
      { id: "music-avenue-satakshi", name: "Satakshi", role: "Vocalist", image: "/images/satakshi.webp" },
      { id: "music-avenue-kanishk", name: "Kanishk", role: "Vocalist", image: "/images/kanishk.webp" },
      { id: "music-avenue-prakhar", name: "Prakhar", role: "Vocalist", image: "/images/prakhar.webp" },
      { id: "music-avenue-ankit", name: "Ankit", role: "Vocalist" },
      { id: "music-avenue-aditya", name: "Aditya", role: "Vocalist" },
      { id: "music-avenue-riddhima", name: "Riddhima", role: "Vocalist" },
      { id: "music-avenue-adarsh", name: "Adarsh", role: "Congo" },
      { id: "music-avenue-devanshi", name: "Devanshi", role: "Ukulele", image: "/images/devanshi-nand.webp" },
      { id: "music-avenue-aryan", name: "Aryan", role: "Guitarist" },
      { id: "music-avenue-shiv", name: "Shiv", role: "Member", image: "/images/shiv.webp"},
    ],
  },
];