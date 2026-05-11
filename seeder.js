import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Class from "./models/Class.js";
import Subject from "./models/Subject.js";
import Chapter from "./models/Chapter.js";
import Video from "./models/Video.js";
import Test from "./models/Test.js";
import Question from "./models/Question.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tech_academy";

const embedUrl = (id) => `https://www.youtube.com/embed/${id}`;
const thumbUrl = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

const classData = [
  { grade: 1, name: "Class 1", description: "Foundation of learning", icon: "🌱", color: "#f97316" },
  { grade: 2, name: "Class 2", description: "Building blocks", icon: "🔢", color: "#eab308" },
  { grade: 3, name: "Class 3", description: "Growing minds", icon: "🌿", color: "#22c55e" },
  { grade: 4, name: "Class 4", description: "Expanding knowledge", icon: "📐", color: "#14b8a6" },
  { grade: 5, name: "Class 5", description: "Critical thinking begins", icon: "🔭", color: "#3b82f6" },
  { grade: 6, name: "Class 6", description: "Middle school foundation", icon: "⚗️", color: "#8b5cf6" },
  { grade: 7, name: "Class 7", description: "Science & arts exploration", icon: "🎨", color: "#ec4899" },
  { grade: 8, name: "Class 8", description: "Advanced concepts", icon: "🧬", color: "#f43f5e" },
  { grade: 9, name: "Class 9", description: "Pre-board preparation", icon: "📊", color: "#06b6d4" },
  { grade: 10, name: "Class 10", description: "Board exam excellence", icon: "🏆", color: "#6366f1" },
];

// Subject catalog. We intentionally reuse a curated set of verified-embeddable videos
// across classes to provide breadth without risking "Video unavailable" from bad links.
const subjectCatalog = [
  {
    key: "math",
    name: "Mathematics",
    icon: "➕",
    color: "#3b82f6",
    description: "Numbers, operations, and problem-solving skills",
    chapters: [
      {
        name: "Addition Basics",
        description: "Learn how addition works with simple examples",
        videos: [
          { title: "Addition for kids - How to add", youtubeId: "43U-cyZj600" },
          { title: "Number Base Conversion Practice", youtubeId: "Fpm-E5v6ddc" },
        ],
      },
      {
        name: "Fractions Fundamentals",
        description: "Understand fractions with real-world examples",
        videos: [
          { title: "Fractions for Kids (Classic)", youtubeId: "p33BYf1NDAE" },
          { title: "Fractions for Kids – Full Lesson", youtubeId: "5arM5wpCNUo" },
        ],
      },
      {
        name: "Number Systems",
        description: "Learn about different number systems and patterns",
        videos: [
          { title: "Number Base Conversion Practice", youtubeId: "Fpm-E5v6ddc" },
          { title: "Number Base Conversion Practice (review)", youtubeId: "Fpm-E5v6ddc" },
        ],
      },
    ],
  },
  {
    key: "science",
    name: "Science",
    icon: "🔬",
    color: "#10b981",
    description: "Explore matter, life, and the world around you",
    chapters: [
      {
        name: "States of Matter",
        description: "Solids, liquids, gases—and how they change",
        videos: [
          { title: "States of Matter and Changes of State", youtubeId: "vNvElea-124" },
          { title: "Electricity for kids (intro clip)", youtubeId: "pSAP-PbvkUM" },
        ],
      },
      {
        name: "Ecosystems",
        description: "Plants, animals, and their environment",
        videos: [
          { title: "What are ecosystems?", youtubeId: "H6PBtCfgcHo" },
          { title: "Ecosystems for Kids", youtubeId: "SNF8b7KKJ2I" },
        ],
      },
      {
        name: "Human Body Systems",
        description: "A quick overview of major body systems",
        videos: [
          { title: "Human Body Systems Overview", youtubeId: "0JDCViWGn-0" },
          { title: "Physical and Chemical Changes", youtubeId: "x49BtB5dOwg" },
        ],
      },
    ],
  },
  {
    key: "english",
    name: "English Grammar",
    icon: "📖",
    color: "#8b5cf6",
    description: "Build strong foundations in parts of speech",
    chapters: [
      {
        name: "Nouns",
        description: "Person, place, thing, or idea",
        videos: [
          { title: "All About Nouns (FreeSchool)", youtubeId: "tquecIG-Pws" },
          { title: "What is a Noun? (Jack Hartmann)", youtubeId: "9cu7C07pNbA" },
        ],
      },
      {
        name: "Verbs",
        description: "Action words you can use every day",
        videos: [
          { title: "Action Verbs Vocabulary Chant", youtubeId: "Bh4ua951SCw" },
          { title: "Adjectives for Kids (Parts of Speech)", youtubeId: "4jxXnHSbicY" },
        ],
      },
      {
        name: "Adjectives",
        description: "Describe nouns with details and clarity",
        videos: [
          { title: "Adjectives for Kids (Homeschool Pop)", youtubeId: "4jxXnHSbicY" },
          { title: "Adjectives for Kids (Grades 1-3)", youtubeId: "4f3H12YNlxo" },
        ],
      },
    ],
  },
  {
    key: "hindi",
    name: "Hindi",
    icon: "🪔",
    color: "#f97316",
    description: "Varnamala, matras, and reading basics",
    chapters: [
      {
        name: "Hindi Alphabets (Writing)",
        description: "Learn to write Hindi alphabets",
        videos: [
          { title: "How to write Hindi Alphabets", youtubeId: "M-eTWHth-hk" },
          { title: "Hindi Varnamala Song (Swar)", youtubeId: "ToMBqpAvFSA" },
        ],
      },
      {
        name: "Hindi Matras",
        description: "Learn common matras with examples",
        videos: [
          { title: "Hindi Matra Knowledge (KG-1)", youtubeId: "jal6HF5ZqdY" },
          { title: "ए की मात्रा वाले शब्द", youtubeId: "oqndUYRMdT0" },
        ],
      },
      {
        name: "Reading Practice",
        description: "Practice simple words and sounds",
        videos: [
          { title: "Hindi Varnamala Song (Swar)", youtubeId: "ToMBqpAvFSA" },
          { title: "Hindi Matra Knowledge (KG-1)", youtubeId: "jal6HF5ZqdY" },
        ],
      },
    ],
  },
  {
    key: "social",
    name: "Social Studies",
    icon: "🌏",
    color: "#06b6d4",
    description: "Maps, geography, and civic basics",
    chapters: [
      {
        name: "Continents & Oceans",
        description: "Learn the continents and oceans",
        videos: [
          { title: "Continents and Oceans for Kids (Compilation)", youtubeId: "UxUPAKyNmjI" },
          { title: "7 Continents and 5 Oceans", youtubeId: "nPUOpiwESoU" },
        ],
      },
      {
        name: "India: States on Map",
        description: "Learn Indian states with map visuals",
        videos: [
          { title: "Indian States (Map Learning)", youtubeId: "TzRn0vCb5KA" },
          { title: "Indian States (Map Learning - review)", youtubeId: "TzRn0vCb5KA" },
        ],
      },
      {
        name: "General Awareness",
        description: "Simple geography awareness and basics",
        videos: [
          { title: "7 Continents and 5 Oceans", youtubeId: "nPUOpiwESoU" },
          { title: "Continents and Oceans for Kids (Compilation)", youtubeId: "UxUPAKyNmjI" },
        ],
      },
    ],
  },
  {
    key: "computer",
    name: "Computer Science",
    icon: "💻",
    color: "#6366f1",
    description: "Computer basics, devices, and safe internet",
    chapters: [
      {
        name: "What is a Computer?",
        description: "Introduction to computers and how they work",
        videos: [
          { title: "What are Computers for Kids", youtubeId: "RmbFJq2jADY" },
          { title: "How Computers Work (for Kids!)", youtubeId: "LH0Uh_Fv6lk" },
        ],
      },
      {
        name: "Parts of a Computer",
        description: "Input and output devices explained",
        videos: [
          { title: "Computer Parts for Kids", youtubeId: "7U6b3VfFkFU" },
          { title: "Computer Parts Explained", youtubeId: "rtaJ-f5jXp4" },
        ],
      },
      {
        name: "Internet Safety",
        description: "Staying safe while learning online",
        videos: [
          { title: "Internet Safety for Kids (Twinkl)", youtubeId: "JTl211YlFzc" },
          { title: "Internet Safety Tips for Kids", youtubeId: "qtJNRxMRuPE" },
        ],
      },
    ],
  },
  {
    key: "marathi",
    name: "Marathi",
    icon: "🟠",
    color: "#ef4444",
    description: "Mulakshare and alphabet basics",
    chapters: [
      {
        name: "Marathi Mulakshare",
        description: "Swar and Vyanjane basics",
        videos: [
          { title: "Marathi Mulakshare (Swar & Vyanjane)", youtubeId: "4ft8DLd7m7g" },
          { title: "Marathi Varnamala (अ ते ज्ञ)", youtubeId: "NMBW2vEO0Rw" },
        ],
      },
      {
        name: "Marathi Alphabet Train",
        description: "Alphabet learning with visuals",
        videos: [
          { title: "Marathi Aksharmala - Alphabets Train", youtubeId: "RUPE8PW2UGs" },
          { title: "Marathi Mulakshare (Swar & Vyanjane)", youtubeId: "4ft8DLd7m7g" },
        ],
      },
      {
        name: "Revision",
        description: "Quick review of letters",
        videos: [
          { title: "Marathi Varnamala (अ ते ज्ञ)", youtubeId: "NMBW2vEO0Rw" },
          { title: "Marathi Aksharmala - Alphabets Train", youtubeId: "RUPE8PW2UGs" },
        ],
      },
    ],
  },
];

const getSubjectsForGrade = (grade) => {
  // For now: consistent rich catalog for all grades (1–10) to expand content breadth quickly.
  // You can later tailor per grade by filtering here.
  return subjectCatalog;
};

async function validateCatalogVideos() {
  const ids = new Set();
  for (const s of subjectCatalog) {
    for (const ch of s.chapters) for (const v of ch.videos) ids.add(v.youtubeId);
  }
  const unique = [...ids];
  for (const id of unique) {
    const url = `https://www.youtube.com/watch?v=${id}`;
    const o = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const r = await fetch(o);
    if (!r.ok) throw new Error(`oEmbed failed for ${id} (status ${r.status})`);
  }
}

const buildNotes = (subjectName, chapterName) =>
  `📝 **Quick Notes: ${subjectName} — ${chapterName}**\\n\\n` +
  `• Watch the lessons first\\n` +
  `• Write 3 key points in your own words\\n` +
  `• Try the quiz to check understanding\\n\\n` +
  `✅ Tip: Revisit this chapter before tests for quick revision.`;

const buildQuestions = (subjectKey, chapterName) => {
  if (subjectKey === "math" && chapterName.includes("Addition")) {
    return [
      { questionText: "What is 2 + 3?", options: ["4", "5", "6", "7"], correctAnswer: 1, explanation: "2 + 3 = 5", difficulty: "easy" },
      { questionText: "What is 6 + 1?", options: ["5", "6", "7", "8"], correctAnswer: 2, explanation: "6 + 1 = 7", difficulty: "easy" },
      { questionText: "What is 10 + 5?", options: ["12", "13", "14", "15"], correctAnswer: 3, explanation: "10 + 5 = 15", difficulty: "easy" },
      { questionText: "What is 9 + 8?", options: ["15", "16", "17", "18"], correctAnswer: 2, explanation: "9 + 8 = 17", difficulty: "medium" },
    ];
  }
  if (subjectKey === "english" && chapterName.includes("Nouns")) {
    return [
      { questionText: "Which word is a noun?", options: ["Run", "Beautiful", "School", "Quickly"], correctAnswer: 2, explanation: "School is a place (noun).", difficulty: "easy" },
      { questionText: "Nouns name a person, place, thing, or…", options: ["Color", "Idea", "Verb", "Sentence"], correctAnswer: 1, explanation: "Nouns can also name ideas.", difficulty: "easy" },
      { questionText: "Which is a proper noun?", options: ["city", "teacher", "India", "river"], correctAnswer: 2, explanation: "India is a specific name, so it’s a proper noun.", difficulty: "medium" },
      { questionText: "Which is an abstract noun?", options: ["Chair", "Honesty", "Apple", "Dog"], correctAnswer: 1, explanation: "Honesty is an idea.", difficulty: "medium" },
    ];
  }
  // Generic fallback quiz
  return [
    { questionText: `Key idea of "${chapterName}" is best learned by:`, options: ["Guessing", "Watching + practice", "Skipping", "Only reading"], correctAnswer: 1, explanation: "Watch the lesson, then practice.", difficulty: "easy" },
    { questionText: "A good revision method is:", options: ["No notes", "Quick notes + quiz", "Only videos", "Only tests"], correctAnswer: 1, explanation: "Combine notes and quizzes.", difficulty: "easy" },
    { questionText: "Progress improves when you:", options: ["Stop learning", "Practice regularly", "Avoid quizzes", "Never review"], correctAnswer: 1, explanation: "Regular practice improves learning.", difficulty: "easy" },
    { questionText: "Best next step after a lesson:", options: ["Close app", "Take a short quiz", "Forget topic", "Skip revision"], correctAnswer: 1, explanation: "Quizzes help retention.", difficulty: "easy" },
  ];
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear old data (except users)
    await Class.deleteMany({});
    await Subject.deleteMany({});
    await Chapter.deleteMany({});
    await Video.deleteMany({});
    await Test.deleteMany({});
    await Question.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Validate catalog videos before writing anything
    await validateCatalogVideos();
    console.log("✅ Verified YouTube videos via oEmbed");

    // Create admin user if not exists
    const adminEmail = "admin@techacademy.com";
    let adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
      adminUser = await User.create({
        name: "Admin User",
        email: adminEmail,
        password: "Admin@123",
        role: "admin",
        points: 9999,
        badges: ["Founder", "Top Learner"],
      });
      console.log("👤 Admin created: admin@techacademy.com / Admin@123");
    }

    // Create demo student if not exists
    const studentEmail = "student@techacademy.com";
    let studentUser = await User.findOne({ email: studentEmail });
    if (!studentUser) {
      studentUser = await User.create({
        name: "Demo Student",
        email: studentEmail,
        password: "Student@123",
        role: "student",
        points: 150,
        badges: ["Early Bird"],
        streakDays: 3,
      });
      console.log("👤 Student created: student@techacademy.com / Student@123");
    }

    // Seed classes
    const createdClasses = await Class.insertMany(classData);
    console.log(`✅ Created ${createdClasses.length} classes`);

    // Seed subjects for each class
    for (const cls of createdClasses) {
      const subjects = getSubjectsForGrade(cls.grade);
      for (const subjectDef of subjects) {
        const subject = await Subject.create({
          name: subjectDef.name,
          icon: subjectDef.icon,
          color: subjectDef.color,
          description: subjectDef.description || "",
          classId: cls._id,
        });

        for (let i = 0; i < subjectDef.chapters.length; i++) {
          const chDef = subjectDef.chapters[i];
          const chapter = await Chapter.create({
            name: chDef.name,
            description: chDef.description,
            order: i + 1,
            subjectId: subject._id,
            notes: buildNotes(subjectDef.name, chDef.name),
          });

          const videoDocs = chDef.videos.map((v, idx) => ({
            title: v.title,
            youtubeUrl: embedUrl(v.youtubeId),
            thumbnail: thumbUrl(v.youtubeId),
            chapterId: chapter._id,
            order: idx + 1,
          }));
          await Video.insertMany(videoDocs);

          const test = await Test.create({
            title: `${chDef.name} - Quick Quiz`,
            chapterId: chapter._id,
            timeLimit: 600,
            difficulty: cls.grade <= 5 ? "easy" : "medium",
            passingScore: 60,
            description: `Quick quiz for ${subjectDef.name}: ${chDef.name}`,
          });

          const questions = buildQuestions(subjectDef.key, chDef.name).map((q) => ({
            ...q,
            testId: test._id,
          }));
          await Question.insertMany(questions);
        }
      }
    }

    console.log("\n🎉 Seeding complete!");
    console.log("📧 Admin:   admin@techacademy.com   | 🔑 Admin@123");
    console.log("📧 Student: student@techacademy.com | 🔑 Student@123");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
}

seed();
