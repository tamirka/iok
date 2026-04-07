export function Marquee() {
  const items = [
    "AI Mobile Apps", "Autonomous Agents", "AI Chatbots", "Web Platforms",
    "Social Automation", "OpenAI GPT-4", "Claude API", "Google Gemini",
    "React Native", "Next.js", "Supabase", "LangChain"
  ];

  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...items, ...items].map((item, index) => (
          <span key={index} className="marquee-item">{item}</span>
        ))}
      </div>
    </div>
  );
}
