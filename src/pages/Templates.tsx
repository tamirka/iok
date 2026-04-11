import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export const templatesData = [
  {
    id: 1,
    name: "CCTV Prompt Gen",
    slug: "cctv-prompt-gen",
    category: "agent",
    categoryLabel: "AI & Automation",
    categoryColor: "purple",
    emoji: "📹",
    short: "Generate high quality CCTV prompts to help you generate the best sequence.",
    description: "Create realistic surveillance-style video prompts effortlessly. Whether for security training simulations, film production, or creative projects, this tool helps you craft detailed descriptions that generative AI models can turn into convincing CCTV footage.",
    features: [
      "Realistic camera angles and grain effects",
      "Time-stamp and overlay customization",
      "Various environment settings (indoor/outdoor)",
      "Motion and activity descriptions"
    ],
    stack: ["AI Video", "Prompt Engineering", "Surveillance Logic"],
    link: "https://ai.studio/apps/drive/1OO5svbAy_o11ogOHQSdAwzGUqR0R_i46",
    image: "https://picsum.photos/seed/cctv/600/400"
  },
  {
    id: 2,
    name: "AI Recycling",
    slug: "ai-recycling",
    category: "agent",
    categoryLabel: "AI & Automation",
    categoryColor: "purple",
    emoji: "♻️",
    short: "Help you recycle your trash, analyse, teach, grow using our latest recycling solution.",
    description: "An intelligent assistant that identifies recyclable materials from images or descriptions. It provides local recycling guidelines, creative upcycling ideas, and educational content to help communities reduce waste.",
    features: [
      "Image recognition for waste sorting",
      "Local recycling center locator",
      "Upcycling project generator",
      "Impact tracking dashboard"
    ],
    stack: ["Computer Vision", "Sustainability AI", "Geo-location"],
    link: "https://ai.studio/apps/drive/1QtdLvCdLQ81LJKPtsq1BMsEPo9AtUy93",
    image: "https://picsum.photos/seed/recycling/600/400"
  },
  {
    id: 3,
    name: "AI Assistant",
    slug: "ai-assistant",
    category: "agent",
    categoryLabel: "AI & Automation",
    categoryColor: "purple",
    emoji: "🤖",
    short: "Your personal AI assistant to help you manage your daily tasks and boost productivity.",
    description: "A versatile personal assistant designed to streamline your workflow. From scheduling and email management to research and content drafting, this AI adapts to your working style.",
    features: [
      "Smart scheduling and reminders",
      "Email drafting and summarization",
      "Quick research and fact-checking",
      "Task prioritization"
    ],
    stack: ["LLM Integration", "Productivity Tools", "Task Automation"],
    link: "#",
    image: "https://picsum.photos/seed/assistant/600/400"
  },
  {
    id: 4,
    name: "AI Tutor Pro",
    slug: "ai-tutor-pro",
    category: "chatbot",
    categoryLabel: "Education",
    categoryColor: "pink",
    emoji: "🎓",
    short: "Personal AI teacher for different ages in different subjects and disciplines.",
    description: "A comprehensive educational platform that adapts to each student's learning pace. Covers subjects from K-12 to university level with interactive lessons and quizzes.",
    features: [
      "Personalized learning paths",
      "Interactive problem solving",
      "Progress tracking",
      "Multi-subject support"
    ],
    stack: ["Adaptive Learning", "Educational AI", "Interactive UI"],
    link: "https://ai.studio/apps/drive/1LQh_3cIlqEHvHQP7N1DeeDt6Kagnp3wD",
    image: "https://picsum.photos/seed/tutor/600/400"
  },
  {
    id: 5,
    name: "Lead Gen",
    slug: "lead-gen",
    category: "web",
    categoryLabel: "Operations",
    categoryColor: "purple",
    emoji: "🎯",
    short: "Apex capture leads that qualifies visitors and book meetings.",
    description: "Automate your sales funnel with an intelligent lead capture system. It engages visitors, qualifies them based on your criteria, and schedules meetings directly into your calendar.",
    features: [
      "Automated qualification workflows",
      "Calendar integration",
      "CRM syncing",
      "Visitor behavior analysis"
    ],
    stack: ["Sales Automation", "CRM Integration", "Lead Scoring"],
    link: "https://ai.studio/apps/drive/1C-qgZhtuNNu48ak7nHR249acH90Z4KRs",
    image: "https://picsum.photos/seed/leadgen/600/400"
  },
  {
    id: 6,
    name: "Campus Quiz",
    slug: "campus-quiz",
    category: "chatbot",
    categoryLabel: "Education",
    categoryColor: "pink",
    emoji: "📝",
    short: "Trivia Quiz for Moroccan schools and universities in different subjects.",
    description: "Engage students with a fun and competitive trivia platform tailored for the Moroccan curriculum. Perfect for exam preparation or classroom activities.",
    features: [
      "Moroccan curriculum aligned",
      "Multiplayer mode",
      "Leaderboards and achievements",
      "Teacher dashboard"
    ],
    stack: ["Gamification", "Educational Content", "Real-time Quiz"],
    link: "https://ai.studio/apps/drive/1sgIniDeWtc0IylYi-Kh55ro4KcZ4ftx0",
    image: "https://picsum.photos/seed/quiz/600/400"
  },
  {
    id: 7,
    name: "Finbook",
    slug: "finbook",
    category: "web",
    categoryLabel: "Finance & Legal",
    categoryColor: "purple",
    emoji: "📊",
    short: "Your personal bookkeeping agent that helps you edit, save, and record all transactions.",
    description: "Simplify your small business finances with an AI bookkeeper. Scan receipts, categorize expenses automatically, and generate financial reports with ease.",
    features: [
      "Receipt scanning and OCR",
      "Automated categorization",
      "Tax preparation reports",
      "Expense tracking"
    ],
    stack: ["OCR Technology", "Financial AI", "Bookkeeping"],
    link: "https://ai.studio/apps/drive/1QchrnZ6TBb0uSONE5mVu8HdeGbAOAFB2",
    image: "https://picsum.photos/seed/finbook/600/400"
  },
  {
    id: 8,
    name: "Caftanchic",
    slug: "caftanchic",
    category: "web",
    categoryLabel: "E-commerce",
    categoryColor: "pink",
    emoji: "👗",
    short: "E-commerce shop for high fashion kaftan style.",
    description: "A specialized e-commerce platform for traditional and modern Kaftans. Features virtual try-on capabilities and detailed fabric visualization.",
    features: [
      "Virtual try-on",
      "Size recommendation AI",
      "High-res fabric zoom",
      "Secure checkout"
    ],
    stack: ["E-commerce", "Virtual Try-on", "Fashion AI"],
    link: "https://ai.studio/apps/drive/1gYYZLIlAUWBbBErjGnBq5SmX3h3vdx-z",
    image: "https://picsum.photos/seed/caftan/600/400"
  },
  {
    id: 9,
    name: "Restaurant Cost Audit",
    slug: "restaurant-cost-audit",
    category: "web",
    categoryLabel: "Operations",
    categoryColor: "purple",
    emoji: "🍽️",
    short: "Manage ingredient cost of goods and inventory from one single place.",
    description: "Take control of your restaurant's profitability. Track ingredient prices, manage inventory levels, and calculate plate costs dynamically to ensure healthy margins.",
    features: [
      "Real-time inventory tracking",
      "Recipe costing calculator",
      "Supplier price comparison",
      "Waste reduction analytics"
    ],
    stack: ["Inventory Management", "Cost Auditing", "Analytics"],
    link: "https://ai.studio/apps/drive/18uyDgbKEvdxwxHDYKyqrrxOPFD40Pm-y",
    image: "https://picsum.photos/seed/restaurant/600/400"
  },
  {
    id: 10,
    name: "X-Ray Analysis",
    slug: "x-ray-analysis",
    category: "web",
    categoryLabel: "Healthcare",
    categoryColor: "green",
    emoji: "🦴",
    short: "Help you analyse your X-ray for educational purposes.",
    description: "An educational tool for medical students and professionals to practice interpreting X-rays. Uses AI to highlight potential anomalies and provide detailed explanations.",
    features: [
      "Anomaly highlighting",
      "Detailed medical explanations",
      "Case study library",
      "Comparison tools"
    ],
    stack: ["Medical Imaging", "AI Diagnosis", "Education"],
    link: "https://ai.studio/apps/drive/1ff_e9w_x4G-iJlJlBBc3jN6T3xMH-UHG",
    image: "https://picsum.photos/seed/xray/600/400"
  },
  {
    id: 11,
    name: "Vita Care AI",
    slug: "vita-care-ai",
    category: "web",
    categoryLabel: "Healthcare",
    categoryColor: "green",
    emoji: "🏥",
    short: "The future of health management. Our Voice assistant for all your clinical needs.",
    description: "A comprehensive health management assistant that uses voice interaction to schedule appointments, remind you of medications, and answer general health queries.",
    features: [
      "Voice-activated commands",
      "Medication reminders",
      "Symptom checker",
      "Appointment scheduling"
    ],
    stack: ["Voice AI", "Health Management", "Virtual Assistant"],
    link: "#",
    image: "https://picsum.photos/seed/vitacare/600/400"
  },
  {
    id: 12,
    name: "AI PDF Pro",
    slug: "ai-pdf-pro",
    category: "agent",
    categoryLabel: "AI & Automation",
    categoryColor: "purple",
    emoji: "📄",
    short: "PDF generator that turns text into professional PDFs in seconds.",
    description: "Create polished, professional PDF documents from plain text, markdown, or even rough notes. Ideal for reports, invoices, and ebooks.",
    features: [
      "Markdown support",
      "Customizable templates",
      "Automatic formatting",
      "Image embedding"
    ],
    stack: ["PDF Generation", "Document Automation", "Formatting Engine"],
    link: "https://ai.studio/apps/drive/1CaJQBC9xNd1RGrU45H5G6lxHW9f2fs15",
    image: "https://picsum.photos/seed/pdf/600/400"
  },
  {
    id: 13,
    name: "Smart Contract Editor",
    slug: "smart-contract-editor",
    category: "web",
    categoryLabel: "Finance & Legal",
    categoryColor: "purple",
    emoji: "📜",
    short: "Automate blockchain contract auditing by uploading your contract.",
    description: "Ensure the security and efficiency of your smart contracts. This tool analyzes your code for vulnerabilities, gas optimization opportunities, and logic errors.",
    features: [
      "Vulnerability scanning",
      "Gas optimization tips",
      "Solidity support",
      "Audit report generation"
    ],
    stack: ["Blockchain", "Smart Contracts", "Security Auditing"],
    link: "https://ai.studio/apps/drive/1TDsCOOk_kR0gorL48SgIrdeoshh4zfTx",
    image: "https://picsum.photos/seed/contract/600/400"
  },
  {
    id: 14,
    name: "Acme Accounting",
    slug: "acme-accounting",
    category: "web",
    categoryLabel: "Finance & Legal",
    categoryColor: "purple",
    emoji: "💼",
    short: "A ready-made website and landing page for your accounting business.",
    description: "Launch your accounting firm's online presence in minutes. This template includes a professional landing page, service descriptions, and a contact form.",
    features: [
      "Responsive design",
      "SEO optimized",
      "Contact form integration",
      "Service showcase"
    ],
    stack: ["Web Design", "Accounting Services", "Lead Capture"],
    link: "https://ai.studio/apps/drive/1dBHa3J6BR74oT6elJdGa3lvVMMxDnasK",
    image: "https://picsum.photos/seed/accounting/600/400"
  },
  {
    id: 15,
    name: "Story Weaver",
    slug: "story-weaver",
    category: "agent",
    categoryLabel: "AI & Automation",
    categoryColor: "purple",
    emoji: "✍️",
    short: "Your co-author agent to help you generate your brilliant idea and script.",
    description: "Overcome writer's block with an AI co-author. Generate plot twists, character backstories, and dialogue to flesh out your creative writing projects.",
    features: [
      "Plot generation",
      "Character development",
      "Dialogue assistance",
      "Genre adaptation"
    ],
    stack: ["Creative Writing", "LLM Storytelling", "Scriptwriting"],
    link: "https://ai.studio/apps/drive/16TCeQTeJ1mOWTDmatmloG243PXnEIrgg",
    image: "https://picsum.photos/seed/story/600/400"
  },
  {
    id: 16,
    name: "Dr Lahlou Imane",
    slug: "dr-lahlou-imane",
    category: "web",
    categoryLabel: "Healthcare",
    categoryColor: "green",
    emoji: "🩺",
    short: "Apps that help you manage your whole hospital and clinical needs.",
    description: "A complete hospital management system tailored for clinics. Manage patient records, staff schedules, and inventory in one secure platform.",
    features: [
      "Electronic Health Records (EHR)",
      "Appointment booking",
      "Staff management",
      "Inventory control"
    ],
    stack: ["Hospital Management", "Clinical Data", "Scheduling"],
    link: "#",
    image: "https://picsum.photos/seed/clinic/600/400"
  },
  {
    id: 17,
    name: "SM Post Generator",
    slug: "sm-post-generator",
    category: "social",
    categoryLabel: "Social AI",
    categoryColor: "purple",
    emoji: "📱",
    short: "Generate full posts for different styles and formats. Automate social media.",
    description: "A comprehensive tool for social media managers or content creators to brainstorm, generate, refine, and share social media content using AI. Generate complete posts with text and images, customize tone and style, enhance images, and engage with your community.",
    features: [
      "Content Generation: Create complete posts with text captions, hashtags, and images.",
      "Customization: Choose modes (Text & Image / Text Only), tones, and artistic styles.",
      "AI Integration: Powered by Gemini API for high-quality content generation.",
      "Post-Generation Tools: Enhance images and generate AI replies to comments.",
      "Community & Inspiration: Brainstorm ideas and explore a community showcase.",
      "Multi-language Support: English and Arabic (RTL) support."
    ],
    stack: ["Social Media AI", "Gemini API", "Content Automation"],
    link: "https://ai.studio/apps/drive/1P_i_dET0BpXmQ4vbssXdJ_aKWQnmoj3B",
    image: "https://picsum.photos/seed/social/600/400"
  },
  {
    id: 18,
    name: "Comic Style Gen",
    slug: "comic-style-gen",
    category: "agent",
    categoryLabel: "AI & Automation",
    categoryColor: "purple",
    emoji: "🎨",
    short: "Generate different banner types in specific artistic styles.",
    description: "Create eye-catching banners and graphics in various comic book styles. Perfect for marketing materials, social media headers, and website visuals.",
    features: [
      "Multiple comic styles (Manga, Western, Noir)",
      "Customizable text bubbles",
      "Character generation",
      "Scene composition"
    ],
    stack: ["Generative Art", "Comic Styles", "Visual Design"],
    link: "#",
    image: "https://picsum.photos/seed/comic/600/400"
  },
  {
    id: 19,
    name: "Tennis Marketplace",
    slug: "tennis-marketplace",
    category: "web",
    categoryLabel: "E-commerce",
    categoryColor: "pink",
    emoji: "🎾",
    short: "Buy and sell all items related to tennis and racket sports.",
    description: "A dedicated marketplace for tennis enthusiasts. Buy and sell rackets, apparel, and accessories with a community of like-minded players.",
    features: [
      "User profiles",
      "Secure messaging",
      "Category filtering",
      "Location-based search"
    ],
    stack: ["Marketplace", "E-commerce", "Sports Community"],
    link: "https://ai.studio/apps/drive/1li8yJlYV2NhxKjr5W4OKs-gxxeu0PMF6",
    image: "https://picsum.photos/seed/tennis/600/400"
  },
  {
    id: 20,
    name: "Trivia Football",
    slug: "trivia-football",
    category: "chatbot",
    categoryLabel: "Education",
    categoryColor: "pink",
    emoji: "⚽",
    short: "Create different questions for users to test their football knowledge.",
    description: "A dynamic trivia game generator for football fans. Create custom quizzes, host live games, and challenge friends to test their knowledge.",
    features: [
      "Question bank generation",
      "Multiplayer support",
      "Timed challenges",
      "Score tracking"
    ],
    stack: ["Gamification", "Sports Trivia", "Interactive Quiz"],
    link: "https://ai.studio/apps/drive/18XMO2YcQwtgRCmgQAQOC0C9JdHFlTUSV",
    image: "https://picsum.photos/seed/trivia/600/400"
  },
  {
    id: 21,
    name: "Hostel Management",
    slug: "hostel-management",
    category: "web",
    categoryLabel: "Operations",
    categoryColor: "purple",
    emoji: "🏠",
    short: "Help hostel and guesthouses manage their property with tiny details.",
    description: "An all-in-one property management system for hostels. Handle bookings, check-ins, housekeeping, and guest communication efficiently.",
    features: [
      "Booking engine",
      "Channel manager",
      "Housekeeping schedule",
      "Guest portal"
    ],
    stack: ["Property Management", "Hospitality AI", "Booking System"],
    link: "https://ai.studio/apps/drive/1YM4i2EIqxzmQiAp_CzQij_JREJ482CHT",
    image: "https://picsum.photos/seed/hostel/600/400"
  },
  {
    id: 22,
    name: "Video Clip Prod",
    slug: "video-clip-prod",
    category: "agent",
    categoryLabel: "AI & Automation",
    categoryColor: "purple",
    emoji: "🎥",
    short: "Generate first frames for your whole lyrics following the story.",
    description: "Visualize your music videos before filming. Generate keyframes and storyboards based on your lyrics to plan your production effectively.",
    features: [
      "Lyrics analysis",
      "Style transfer",
      "Shot composition",
      "Storyboarding export"
    ],
    stack: ["Video Production", "AI Storyboarding", "Lyrics Analysis"],
    link: "#",
    image: "https://picsum.photos/seed/videoprod/600/400"
  },
  {
    id: 23,
    name: "Restaid",
    slug: "restaid",
    category: "web",
    categoryLabel: "Operations",
    categoryColor: "purple",
    emoji: "🥡",
    short: "Help food trucks and small restaurants manage day-to-day activities.",
    description: "A lightweight management tool for food trucks and small eateries. Track sales, manage orders, and monitor inventory on the go.",
    features: [
      "POS system",
      "Order management",
      "Sales reporting",
      "Menu management"
    ],
    stack: ["Restaurant Management", "POS System", "Inventory"],
    link: "#",
    image: "https://picsum.photos/seed/restaid/600/400"
  },
  {
    id: 24,
    name: "Veggie Slicer",
    slug: "veggie-slicer",
    category: "web",
    categoryLabel: "Gaming",
    categoryColor: "pink",
    emoji: "🔪",
    short: "Fruit Ninja-inspired slicing game featuring vibrant visuals, fluid canvas animations, and a combo-driven scoring system.",
    description: "A fun and addictive arcade game where you slice vegetables to score points. Features smooth animations and challenging gameplay mechanics.",
    features: [
      "Combo system",
      "High score tracking",
      "Responsive controls",
      "Vibrant graphics"
    ],
    stack: ["Canvas API", "Game Development", "Animations"],
    link: "https://ai.studio/apps/drive/16Bkr54mzhHk9v4S7RPDVkZ_aN0rlJVmK",
    image: "https://picsum.photos/seed/fruitninja/600/400"
  },
  {
    id: 25,
    name: "Holidays Image Studio",
    slug: "holidays-image-studio",
    category: "agent",
    categoryLabel: "AI & Automation",
    categoryColor: "purple",
    emoji: "🎆",
    short: "A professional AI studio for generating festive, culturally respectful, and joyful celebration imagery.",
    description: "Create stunning visuals for holidays and celebrations around the world. Perfect for greeting cards, social media posts, and marketing campaigns.",
    features: [
      "Cultural themes",
      "Style customization",
      "High-resolution export",
      "Prompt assistance"
    ],
    stack: ["Generative Imagery", "Cultural AI", "Design Studio"],
    link: "https://ai.studio/apps/a9d10efc-3e7f-45f9-92cb-6448f3b3abc3",
    image: "https://picsum.photos/seed/holidays/600/400"
  },
  {
    id: 26,
    name: "FreshMart",
    slug: "freshmart",
    category: "web",
    categoryLabel: "E-commerce",
    categoryColor: "pink",
    emoji: "🛒",
    short: "A modern, premium grocery eCommerce template with a clean design and smooth user experience.",
    description: "Launch your online grocery store with a premium template. Features a clean design, intuitive navigation, and optimized checkout flow.",
    features: [
      "Product filtering",
      "Cart management",
      "User accounts",
      "Mobile responsive"
    ],
    stack: ["E-commerce", "Grocery Platform", "UX Design"],
    link: "https://ai.studio/apps/drive/1C0EoLY3xsVe9yp-gWi_vucDQD1NHjn4c",
    image: "https://picsum.photos/seed/freshmart/600/400"
  },
  {
    id: 27,
    name: "Turbo Dash 2D",
    slug: "turbo-dash-2d",
    category: "web",
    categoryLabel: "Gaming",
    categoryColor: "pink",
    emoji: "🏎️",
    short: "A high-octane, arcade-style 2D top-down racing game with dynamic difficulty and an AI race commentator.",
    description: "Experience the thrill of top-down racing. Compete on challenging tracks, dodge obstacles, and listen to dynamic AI commentary as you race.",
    features: [
      "Dynamic difficulty",
      "AI commentary",
      "Multiple tracks",
      "Power-ups"
    ],
    stack: ["Game Design", "AI Commentary", "2D Racing"],
    link: "https://ai.studio/apps/drive/1BbTBofzzI7LpE67FQiEGhx2HiNXdDJf4",
    image: "https://picsum.photos/seed/turbodash/600/400"
  },
  {
    id: 28,
    name: "Lumina AI Studios",
    slug: "lumina-ai-studios",
    category: "agent",
    categoryLabel: "AI & Automation",
    categoryColor: "purple",
    emoji: "🌟",
    short: "Full-service AI video production agency for artists and creators.",
    description: "A complete solution for AI video production. From storyboarding to final rendering, Lumina AI Studios provides the tools and workflows for professional creators.",
    features: [
      "End-to-end production workflow",
      "High-quality rendering",
      "Style consistency tools",
      "Collaboration features"
    ],
    stack: ["Video Production", "AI Workflows", "Creative Agency"],
    link: "https://ai.studio/apps/drive/1xH9MgK6LAxRUBMBoB5Xm-XmICf9Qlb6v",
    image: "https://picsum.photos/seed/lumina/600/400"
  },
  {
    id: 29,
    name: "Architecture Image Studio",
    slug: "architecture-image-studio",
    category: "agent",
    categoryLabel: "AI & Automation",
    categoryColor: "purple",
    emoji: "🏗️",
    short: "A professional architectural visualization tool powered by Gemini.",
    description: "Visualize architectural concepts with stunning realism. Control lighting, materials, and environment to create professional-grade renders for presentations and portfolios.",
    features: [
      "Material library",
      "Lighting control",
      "Environment settings",
      "High-fidelity output"
    ],
    stack: ["Architectural Viz", "Gemini API", "3D Rendering"],
    link: "https://architecture-image-studio-635102282857.us-west1.run.app/",
    image: "https://picsum.photos/seed/architecture/600/400"
  },
  {
    id: 30,
    name: "Business Finance Image Studio",
    slug: "business-finance-image-studio",
    category: "agent",
    categoryLabel: "AI & Automation",
    categoryColor: "purple",
    emoji: "📈",
    short: "A premium AI-powered image generator for professional business, finance, and corporate visuals.",
    description: "Generate professional stock imagery for business and finance. Create consistent, high-quality visuals for reports, presentations, and marketing materials.",
    features: [
      "Corporate style guide",
      "Diverse character generation",
      "Office environment settings",
      "Chart and graph visualization"
    ],
    stack: ["Corporate Visuals", "Finance AI", "Image Generation"],
    link: "https://ai.studio/apps/drive/1egW_g7XINPlTYwvuSdN1AkKOpvA--9Vn",
    image: "https://picsum.photos/seed/business/600/400"
  },
  {
    id: 31,
    name: "Education Image Studio",
    slug: "education-image-studio",
    category: "chatbot",
    categoryLabel: "Education",
    categoryColor: "pink",
    emoji: "🏫",
    short: "A professional AI image generator tailored for educational content, teachers, and schools.",
    description: "Create engaging visuals for educational materials. From textbook illustrations to classroom posters, generate content that enhances learning.",
    features: [
      "Subject-specific themes",
      "Age-appropriate styles",
      "Diagram generation",
      "Inclusive character options"
    ],
    stack: ["Educational Design", "AI Imagery", "School Tools"],
    link: "https://ai.studio/apps/drive/1ndZgvL-ZhoAjIgWzHYLitSbBFezUPB0n",
    image: "https://picsum.photos/seed/education/600/400"
  },
  {
    id: 32,
    name: "Wildlife Image Studio",
    slug: "wildlife-image-studio",
    category: "agent",
    categoryLabel: "AI & Automation",
    categoryColor: "purple",
    emoji: "🦁",
    short: "A professional-grade AI studio for generating cinematic wildlife and nature imagery.",
    description: "Capture the beauty of nature with AI. Generate photorealistic wildlife imagery with precise control over lighting, composition, and environment.",
    features: [
      "Species accuracy",
      "Environment customization",
      "Cinematic lighting",
      "Macro photography mode"
    ],
    stack: ["Nature Photography", "Cinematic AI", "Wildlife Viz"],
    link: "https://ai.studio/apps/drive/1AuvmRUjVcTK-n7Hj9N6kN4_I4sc9ibIW",
    image: "https://picsum.photos/seed/wildlife/600/400"
  },
  {
    id: 33,
    name: "CineGen AI",
    slug: "cinegen-ai",
    category: "agent",
    categoryLabel: "AI & Automation",
    categoryColor: "purple",
    emoji: "🎬",
    short: "A professional AI-powered cinematic storyboard creator that turns concepts into visual production plans.",
    description: "Streamline your pre-production process with AI storyboarding. Generate consistent, cinematic shots to visualize your film or video project before shooting.",
    features: [
      "Shot type selection",
      "Style consistency",
      "Character consistency",
      "Export to PDF"
    ],
    stack: ["Storyboarding", "Pre-production", "Cinematic AI"],
    link: "https://ai.studio/apps/drive/1Yhk2s2-m70D7XbLA01iSg_Je0F-Xiju0",
    image: "https://picsum.photos/seed/cinegen/600/400"
  },
  {
    id: 34,
    name: "Legal AI Maroc",
    slug: "legal-ai-maroc",
    category: "web",
    categoryLabel: "Finance & Legal",
    categoryColor: "purple",
    emoji: "⚖️",
    short: "An AI-powered application designed to provide precision insights into Moroccan laws, Dahirs, and codes.",
    description: "Access instant legal insights for Moroccan law. Search codes, Dahirs, and regulations with an AI assistant designed for legal professionals.",
    features: [
      "Legal code search",
      "Case law summarization",
      "Bilingual support (Arabic/French)",
      "Document analysis"
    ],
    stack: ["Legal Tech", "Moroccan Law", "NLP"],
    link: "https://ai.studio/apps/drive/1pSrviVSi_2GdWguZ8FUIIBsuzPGhzap2",
    image: "https://picsum.photos/seed/legalmaroc/600/400"
  },
  {
    id: 35,
    name: "Kid's Story Generation AI",
    slug: "kids-story-generation-ai",
    category: "chatbot",
    categoryLabel: "Education",
    categoryColor: "pink",
    emoji: "🧸",
    short: "A fun and interactive application that uses AI to generate and illustrate magical stories for children.",
    description: "Create personalized bedtime stories with AI. Generate unique plots, characters, and illustrations to spark your child's imagination.",
    features: [
      "Personalized characters",
      "Moral of the story selection",
      "Illustration generation",
      "Read-aloud mode"
    ],
    stack: ["Storytelling AI", "Child Education", "Illustration"],
    link: "https://ai.studio/apps/drive/1K89KMHVfjEWYo92KnBAeL7Kzxz_cLNPD",
    image: "https://picsum.photos/seed/kidsstory/600/400"
  },
  {
    id: 36,
    name: "PromptCrafter",
    slug: "promptcrafter",
    category: "agent",
    categoryLabel: "AI & Automation",
    categoryColor: "purple",
    emoji: "🛠️",
    short: "An AI-powered assistant that helps creators generate high-quality, detailed prompts.",
    description: "Master the art of prompting. This tool helps you craft precise, effective prompts for Midjourney, DALL-E, GPT-4, and other AI models.",
    features: [
      "Model-specific optimization",
      "Prompt library",
      "Style modifiers",
      "Negative prompt suggestions"
    ],
    stack: ["Prompt Engineering", "Creator Tools", "AI Optimization"],
    link: "https://ai.studio/apps/drive/1rQVcaGzK4reBuw3yVp94ux6smmVvsuDX",
    image: "https://picsum.photos/seed/promptcrafter/600/400"
  },
  {
    id: 37,
    name: "LyricLens",
    slug: "lyriclens",
    category: "agent",
    categoryLabel: "AI & Automation",
    categoryColor: "purple",
    emoji: "👁️",
    short: "Cinematic Scene Generator from Lyric to Cinematic Reality.",
    description: "Paste your timestamped lyrics and let our AI director craft detailed scene breakdowns, camera directions, and lighting plots for your next video production.",
    features: [
      "Scene breakdowns",
      "Camera directions",
      "Lighting plots",
      "Timestamped lyrics support"
    ],
    stack: ["Music Video AI", "Scene Generation", "Production Planning"],
    link: "https://ai.studio/apps/2f7bb317-147c-4dc0-83d3-cdded98d6c8a",
    image: "https://picsum.photos/seed/lyriclens/600/400"
  },
  {
    id: 38,
    name: "TweetGenius AI",
    slug: "tweetgenius-ai",
    category: "social",
    categoryLabel: "Social AI",
    categoryColor: "purple",
    emoji: "🐦",
    short: "Craft engaging, viral-ready content for X (formerly Twitter).",
    description: "TweetGenius AI is a powerful content creation tool designed to help you craft engaging, viral-ready content for X (formerly Twitter). By leveraging advanced AI, the app allows you to specify your industry, target audience, and specific goals to generate high-quality single tweets or threads.",
    features: [
      "Viral hook styles",
      "Thread generation",
      "Audience targeting",
      "Engagement strategies"
    ],
    stack: ["Social Media AI", "X Automation", "Content Strategy"],
    link: "https://ai.studio/apps/drive/1zgvxH6Z83UBWQ_K9uuUdFGszFAtcj6yn",
    image: "https://picsum.photos/seed/tweetgenius/600/400"
  }
];

export function Templates() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dbTemplates, setDbTemplates] = useState<any[]>([]);
  
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'templates'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const slugify = (text: string) => text ? text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '') : '';

      const templates = snapshot.docs.map(doc => {
        const data = doc.data();
        const staticMatch = templatesData.find(t => t.id.toString() === data.originalId);
        return {
          id: doc.id,
          name: data.title || data.name,
          slug: data.slug || slugify(data.title || data.name),
          image: data.imageUrl || (staticMatch ? staticMatch.image : ''),
          ...data
        };
      });
      
      // Sort in memory to avoid filtering out documents missing createdAt
      templates.sort((a: any, b: any) => {
        const timeA = a.createdAt?.toMillis?.() || 0;
        const timeB = b.createdAt?.toMillis?.() || 0;
        return timeB - timeA;
      });
      
      setDbTemplates(templates);
    }, (error) => {
      console.error("Error fetching templates:", error);
    });
    return () => unsubscribe();
  }, []);

  const allTemplates = [
    ...dbTemplates,
    ...templatesData.filter(staticT => !dbTemplates.some(dbT => 
      (dbT.originalId && dbT.originalId.toString() === staticT.id.toString()) || 
      (dbT.name && staticT.name && dbT.name.toLowerCase().trim() === staticT.name.toLowerCase().trim())
    ))
  ];

  useEffect(() => {
    if (slug) {
      const t = allTemplates.find(x => x.slug === slug || x.id.toString() === slug);
      if (t) {
        document.title = `${t.name} - Ainario Templates`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', t.description || t.short || '');
        } else {
          const meta = document.createElement('meta');
          meta.name = 'description';
          meta.content = t.description || t.short || '';
          document.head.appendChild(meta);
        }
      }
    } else {
      document.title = 'Templates - Ainario AI Agency';
    }
  }, [slug, allTemplates]);

  const handleBack = () => {
    navigate('/templates');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredTemplates = allTemplates.filter(t => {
    const matchFilter = activeFilter === 'all' || t.category === activeFilter;
    const matchSearch = !searchQuery || 
      t.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.short?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.categoryLabel?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.stack && t.stack.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchFilter && matchSearch;
  });

  if (slug) {
    const t = allTemplates.find(x => x.slug === slug || x.id.toString() === slug);
    if (!t) return null;

    const related = allTemplates.filter(x => x.id !== t.id && x.category === t.category).slice(0, 3);
    const allOther = allTemplates.filter(x => x.id !== t.id && x.category !== t.category).slice(0, 3 - related.length);
    const relatedAll = [...related, ...allOther].slice(0, 3);

    return (
      <div id="page-detail" className="page-in" style={{ display: 'block' }}>
        <span className="detail-back" onClick={handleBack}>Back to Templates</span>

        <div className="detail-hero">
          <div className="detail-meta">
            <p className={`detail-category ${t.categoryColor}`}>{t.categoryLabel}</p>
            <h1 className="detail-title">{t.name}</h1>
            <p className="detail-desc">{t.description}</p>

            <div className="detail-features">
              <h4>What's included</h4>
              {t.features && t.features.map((f: string, i: number) => (
                <div className="feature-item" key={i}>
                  <span className="feature-check">✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="detail-stack">
              {t.stack && t.stack.map((s: string, i: number) => <span className="detail-tag" key={i}>{s}</span>)}
            </div>

            <div>
              <a href={t.link} target="_blank" rel="noopener noreferrer" className="detail-cta">
                View Live Demo
              </a>
              <a href="/#contact" className="detail-cta-ghost">Get This Template</a>
            </div>
          </div>

          <div className="detail-image-panel">
            <div className="detail-main-image">
              {(t.imageUrl || t.image) ? (
                <img src={t.imageUrl || t.image} alt={t.name} />
              ) : (
                <div className="detail-placeholder">{t.emoji}</div>
              )}
            </div>
            <div className="detail-thumbs">
              <div className="detail-thumb active">{t.emoji}</div>
              <div className="detail-thumb">📐</div>
              <div className="detail-thumb">⚙️</div>
            </div>
          </div>
        </div>

        <div className="related-section">
          <h3>More Templates</h3>
          <div className="related-grid">
            {relatedAll.map(r => (
              <Link to={`/templates/${r.slug || r.id}`} className="template-card" key={r.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card-image">
                  {(r.imageUrl || r.image) ? (
                    <img src={r.imageUrl || r.image} alt={r.name} loading="lazy" />
                  ) : (
                    <div className="card-image-placeholder">{r.emoji}</div>
                  )}
                  <div className="card-overlay"><div className="overlay-btn">View Details</div></div>
                </div>
                <div className="card-body">
                  <p className={`card-category ${r.categoryColor}`}>{r.categoryLabel}</p>
                  <h3>{r.name}</h3>
                  <p>{r.short}</p>
                </div>
                <div className="card-footer">
                  <div className="card-stack">
                    {r.stack && r.stack.slice(0, 2).map((s: string, i: number) => <span className="mini-tag" key={i}>{s}</span>)}
                  </div>
                  <span className="card-arrow">↗</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="page-grid" style={{ display: 'block' }}>
      <div className="grid-hero">
        <div className="grid-hero-bg"></div>
        <div className="grid-hero-inner">
          <p className="page-label">Portfolio</p>
          <h1>40+ AI Templates<br/><em>Ready to Deploy</em></h1>
          <p>Browse our library of production-ready AI applications. Click any template to explore features and get a live demo link.</p>
        </div>
      </div>

      <div className="filters-bar">
        <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All</button>
        <button className={`filter-btn ${activeFilter === 'mobile' ? 'active' : ''}`} onClick={() => setActiveFilter('mobile')}>Mobile Apps</button>
        <button className={`filter-btn ${activeFilter === 'web' ? 'active' : ''}`} onClick={() => setActiveFilter('web')}>Web Platforms</button>
        <button className={`filter-btn ${activeFilter === 'chatbot' ? 'active' : ''}`} onClick={() => setActiveFilter('chatbot')}>Chatbots</button>
        <button className={`filter-btn ${activeFilter === 'agent' ? 'active' : ''}`} onClick={() => setActiveFilter('agent')}>AI Agents</button>
        <button className={`filter-btn ${activeFilter === 'social' ? 'active' : ''}`} onClick={() => setActiveFilter('social')}>Social AI</button>
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input 
            className="search-input" 
            type="text" 
            placeholder="Search templates..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <span className="count-badge">{filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="templates-grid">
        {filteredTemplates.length === 0 ? (
          <div className="empty-state">
            <span style={{ fontSize: '40px' }}>🔍</span>
            <p>No templates found. Try a different filter.</p>
          </div>
        ) : (
          filteredTemplates.map((t, i) => (
            <Link 
              to={`/templates/${t.slug || t.id}`}
              className="template-card card-in" 
              style={{ animationDelay: `${i * 40}ms`, textDecoration: 'none', color: 'inherit' }} 
              key={t.id}
            >
              <div className="card-image">
                {(t.imageUrl || t.image) ? (
                  <img src={t.imageUrl || t.image} alt={t.name} loading="lazy" />
                ) : (
                  <div className="card-image-placeholder">{t.emoji}</div>
                )}
                <div className="card-overlay"><div className="overlay-btn">View Details</div></div>
              </div>
              <div className="card-body">
                <p className={`card-category ${t.categoryColor}`}>{t.categoryLabel}</p>
                <h3>{t.name}</h3>
                <p>{t.short}</p>
              </div>
              <div className="card-footer">
                <div className="card-stack">
                  {t.stack && t.stack.slice(0, 3).map((s: string, j: number) => <span className="mini-tag" key={j}>{s}</span>)}
                </div>
                <span className="card-arrow">↗</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
