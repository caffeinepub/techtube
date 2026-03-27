import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import {
  Bell,
  ChevronRight,
  Clock,
  Code2,
  Eye,
  Github,
  Layers,
  Linkedin,
  Play,
  Search,
  Star,
  Terminal,
  Twitter,
  Youtube,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Tutorial } from "./backend.d";
import {
  useCategories,
  useIncrementViewCount,
  useTrendingTutorials,
  useTutorialsByCategory,
} from "./hooks/useQueries";

// ─── Thumbnail gradient helpers ────────────────────────────────────────────
const GRADIENTS = [
  "from-blue-900 via-blue-700 to-cyan-500",
  "from-indigo-900 via-purple-700 to-pink-500",
  "from-slate-800 via-cyan-800 to-teal-500",
  "from-gray-900 via-blue-800 to-indigo-500",
  "from-blue-950 via-sky-700 to-blue-400",
  "from-purple-900 via-blue-800 to-cyan-600",
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Web Development": <Code2 className="w-3.5 h-3.5" />,
  Backend: <Terminal className="w-3.5 h-3.5" />,
  DevOps: <Layers className="w-3.5 h-3.5" />,
  "AI/ML": <Zap className="w-3.5 h-3.5" />,
  Mobile: <Code2 className="w-3.5 h-3.5" />,
  Database: <Layers className="w-3.5 h-3.5" />,
};

function thumbnailGradient(id: bigint) {
  return GRADIENTS[Number(id) % GRADIENTS.length];
}

function formatViews(n: bigint) {
  const num = Number(n);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return String(num);
}

// ─── Navbar ─────────────────────────────────────────────────────────────────
function Navbar({ onSearch }: { onSearch: () => void }) {
  const navLinks = ["Tutorials", "Paths", "Library", "Community"];

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "oklch(0.13 0.02 240 / 0.95)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid oklch(0.22 0.03 240)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
            style={{ background: "oklch(0.5 0.17 235)", color: "white" }}
          >
            TT
          </div>
          <span
            className="font-bold text-lg tracking-tight"
            style={{ color: "oklch(0.92 0.01 240)" }}
          >
            TechTube
          </span>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link}
              href="/"
              data-ocid={`nav.${link.toLowerCase()}.link`}
              className="px-3.5 py-2 text-sm font-medium rounded-lg transition-colors"
              style={{
                color:
                  link === "Tutorials"
                    ? "oklch(0.92 0.01 240)"
                    : "oklch(0.6 0.02 240)",
                borderBottom:
                  link === "Tutorials"
                    ? "2px solid oklch(0.65 0.18 235)"
                    : "2px solid transparent",
              }}
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-ocid="nav.search_input"
            onClick={onSearch}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors"
            style={{
              background: "oklch(0.19 0.03 240)",
              color: "oklch(0.6 0.02 240)",
              border: "1px solid oklch(0.22 0.03 240)",
            }}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>

          <div className="relative">
            <button
              type="button"
              data-ocid="nav.bell.button"
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
              style={{ color: "oklch(0.75 0.02 240)" }}
            >
              <Bell className="w-4.5 h-4.5" />
            </button>
            <span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold"
              style={{ background: "oklch(0.5 0.17 235)", color: "white" }}
            >
              18
            </span>
          </div>

          <div className="flex items-center gap-2 ml-1">
            <Avatar className="w-7 h-7">
              <AvatarFallback
                style={{
                  background: "oklch(0.35 0.1 240)",
                  color: "oklch(0.92 0.01 240)",
                  fontSize: "10px",
                }}
              >
                JS
              </AvatarFallback>
            </Avatar>
            <span
              className="hidden sm:block text-sm font-medium"
              style={{ color: "oklch(0.78 0.02 240)" }}
            >
              John Smith
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function HeroSection({ onExplore }: { onExplore: () => void }) {
  return (
    <section
      className="w-full rounded-2xl overflow-hidden my-6"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.17 0.04 235) 0%, oklch(0.13 0.02 240) 100%)",
        border: "1px solid oklch(0.22 0.03 240)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
      }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-8 px-8 py-12 lg:px-16 lg:py-14">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 max-w-lg"
        >
          <Badge
            className="mb-4 text-xs font-semibold px-3 py-1"
            style={{
              background: "oklch(0.5 0.17 235 / 0.2)",
              color: "oklch(0.72 0.15 235)",
              border: "1px solid oklch(0.5 0.17 235 / 0.3)",
            }}
          >
            🚀 New tutorials weekly
          </Badge>
          <h1
            className="text-4xl lg:text-5xl xl:text-[52px] font-extrabold leading-tight mb-5"
            style={{ color: "oklch(0.94 0.005 240)", letterSpacing: "-0.02em" }}
          >
            Master Tech Skills.{" "}
            <span style={{ color: "oklch(0.65 0.18 235)" }}>One Tutorial</span>{" "}
            at a Time.
          </h1>
          <p
            className="text-sm lg:text-base mb-8 leading-relaxed"
            style={{ color: "oklch(0.6 0.02 240)" }}
          >
            Learn web development, AI, DevOps, and more with hands-on video
            tutorials crafted by industry experts. Go from beginner to
            professional at your own pace.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-ocid="hero.primary_button"
              onClick={onExplore}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95"
              style={{
                background: "oklch(0.5 0.17 235)",
                color: "white",
                boxShadow: "0 4px 20px oklch(0.5 0.17 235 / 0.4)",
              }}
            >
              <Play className="w-4 h-4 fill-white" />
              Explore All Tutorials
            </button>
            <button
              type="button"
              data-ocid="hero.secondary_button"
              className="flex items-center gap-1.5 px-5 py-3 rounded-xl font-medium text-sm transition-colors"
              style={{
                color: "oklch(0.65 0.18 235)",
                border: "1px solid oklch(0.5 0.17 235 / 0.35)",
              }}
            >
              View Paths
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-8">
            {[
              { label: "Tutorials", value: "500+" },
              { label: "Learners", value: "50K+" },
              { label: "Expert Authors", value: "80+" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-xl font-bold"
                  style={{ color: "oklch(0.92 0.01 240)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "oklch(0.55 0.02 240)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right - Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 flex justify-center items-center relative"
        >
          <div className="relative w-full max-w-sm">
            <img
              src="/assets/generated/hero-tech-illustration.dim_600x400.png"
              alt="Tech tutorial illustration"
              className="w-full h-auto rounded-xl object-cover"
              style={{ opacity: 0.9 }}
            />
            {/* Floating play button */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
              style={{
                background: "oklch(0.5 0.17 235 / 0.9)",
                boxShadow: "0 0 30px oklch(0.5 0.17 235 / 0.5)",
              }}
            >
              <Play className="w-6 h-6 fill-white text-white ml-0.5" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Tutorial Card ───────────────────────────────────────────────────────────
function TutorialCard({
  tutorial,
  index,
  onView,
}: { tutorial: Tutorial; index: number; onView: (id: bigint) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      data-ocid={`tutorials.item.${index + 1}`}
      className="rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1"
      style={{
        background: "oklch(0.16 0.025 240)",
        border: "1px solid oklch(0.22 0.03 240)",
        boxShadow: hovered
          ? "0 12px 32px rgba(0,0,0,0.5)"
          : "0 4px 16px rgba(0,0,0,0.3)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onView(tutorial.id)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        {tutorial.thumbnailUrl ? (
          <img
            src={tutorial.thumbnailUrl}
            alt={tutorial.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${thumbnailGradient(tutorial.id)} flex items-center justify-center`}
          >
            <Code2 className="w-12 h-12 opacity-30 text-white" />
          </div>
        )}
        {/* Play overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.45)" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(0,0,0,0.6)",
                  border: "2px solid rgba(255,255,255,0.8)",
                }}
              >
                <Play className="w-5 h-5 fill-white text-white ml-0.5" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Duration badge */}
        <div
          className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1"
          style={{ background: "rgba(0,0,0,0.7)", color: "white" }}
        >
          <Clock className="w-3 h-3" />
          {tutorial.duration}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3
          className="font-semibold text-sm leading-snug mb-3 line-clamp-2"
          style={{ color: "oklch(0.92 0.01 240)" }}
        >
          {tutorial.title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-5 h-5">
              <AvatarFallback
                style={{
                  background: "oklch(0.35 0.1 240)",
                  color: "oklch(0.92 0.01 240)",
                  fontSize: "8px",
                }}
              >
                {tutorial.author.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs" style={{ color: "oklch(0.58 0.02 240)" }}>
              {tutorial.author}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="flex items-center gap-1 text-xs"
              style={{ color: "oklch(0.55 0.02 240)" }}
            >
              <Eye className="w-3 h-3" />
              {formatViews(tutorial.viewCount)}
            </span>
            <span
              className="flex items-center gap-1 text-xs"
              style={{ color: "oklch(0.78 0.12 80)" }}
            >
              <Star className="w-3 h-3 fill-current" />
              {tutorial.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Trending Card ───────────────────────────────────────────────────────────
function TrendingCard({
  tutorial,
  rank,
  onView,
}: { tutorial: Tutorial; rank: number; onView: (id: bigint) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: rank * 0.08 }}
      data-ocid={`trending.item.${rank + 1}`}
      className="flex gap-3 cursor-pointer group rounded-xl p-3 transition-colors"
      style={{
        background: "oklch(0.16 0.025 240)",
        border: "1px solid oklch(0.22 0.03 240)",
      }}
      onClick={() => onView(tutorial.id)}
    >
      {/* Thumbnail */}
      <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0">
        {tutorial.thumbnailUrl ? (
          <img
            src={tutorial.thumbnailUrl}
            alt={tutorial.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${thumbnailGradient(tutorial.id)}`}
          />
        )}
        <div
          className="absolute bottom-1 right-1 px-1 py-px rounded text-[9px] font-medium"
          style={{ background: "rgba(0,0,0,0.7)", color: "white" }}
        >
          {tutorial.duration}
        </div>
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <p
          className="text-xs font-semibold line-clamp-2 leading-snug mb-1.5 group-hover:text-primary transition-colors"
          style={{ color: "oklch(0.88 0.01 240)" }}
        >
          {tutorial.title}
        </p>
        <div className="flex items-center gap-2">
          <span
            className="text-[10px]"
            style={{ color: "oklch(0.55 0.02 240)" }}
          >
            {tutorial.author}
          </span>
          <span
            className="flex items-center gap-0.5 text-[10px]"
            style={{ color: "oklch(0.78 0.12 80)" }}
          >
            <Star className="w-2.5 h-2.5 fill-current" />
            {tutorial.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Card Skeleton ───────────────────────────────────────────────────────────
function CardSkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "oklch(0.16 0.025 240)",
        border: "1px solid oklch(0.22 0.03 240)",
      }}
    >
      <Skeleton
        className="aspect-video w-full"
        style={{ background: "oklch(0.2 0.025 240)" }}
      />
      <div className="p-4 space-y-2">
        <Skeleton
          className="h-4 w-3/4"
          style={{ background: "oklch(0.2 0.025 240)" }}
        />
        <Skeleton
          className="h-3 w-1/2"
          style={{ background: "oklch(0.2 0.025 240)" }}
        />
      </div>
    </div>
  );
}

function TrendingSkeleton() {
  return (
    <div
      className="flex gap-3 p-3 rounded-xl"
      style={{
        background: "oklch(0.16 0.025 240)",
        border: "1px solid oklch(0.22 0.03 240)",
      }}
    >
      <Skeleton
        className="w-24 h-16 rounded-lg shrink-0"
        style={{ background: "oklch(0.2 0.025 240)" }}
      />
      <div className="flex-1 space-y-2 pt-1">
        <Skeleton
          className="h-3 w-full"
          style={{ background: "oklch(0.2 0.025 240)" }}
        />
        <Skeleton
          className="h-3 w-2/3"
          style={{ background: "oklch(0.2 0.025 240)" }}
        />
      </div>
    </div>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      className="mt-16 pt-10 pb-6"
      style={{ borderTop: "1px solid oklch(0.22 0.03 240)" }}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {/* TechTube Links */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs"
              style={{ background: "oklch(0.5 0.17 235)", color: "white" }}
            >
              TT
            </div>
            <span
              className="font-bold text-sm"
              style={{ color: "oklch(0.92 0.01 240)" }}
            >
              TechTube
            </span>
          </div>
          <ul className="space-y-2.5">
            {["About Us", "Tutorials", "Learning Paths", "Pricing", "Blog"].map(
              (l) => (
                <li key={l}>
                  <a
                    href="/"
                    data-ocid={`footer.${l.toLowerCase().replace(/ /g, "_")}.link`}
                    className="text-sm transition-colors hover:text-foreground"
                    style={{ color: "oklch(0.55 0.02 240)" }}
                  >
                    {l}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4
            className="font-semibold text-sm mb-4"
            style={{ color: "oklch(0.92 0.01 240)" }}
          >
            Resources
          </h4>
          <ul className="space-y-2.5">
            {[
              "Documentation",
              "API Reference",
              "Code Samples",
              "Changelog",
              "Status",
            ].map((l) => (
              <li key={l}>
                <a
                  href="/"
                  className="text-sm transition-colors hover:text-foreground"
                  style={{ color: "oklch(0.55 0.02 240)" }}
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Community */}
        <div>
          <h4
            className="font-semibold text-sm mb-4"
            style={{ color: "oklch(0.92 0.01 240)" }}
          >
            Community
          </h4>
          <ul className="space-y-2.5">
            {[
              "Discord Server",
              "GitHub Discussions",
              "Forum",
              "Newsletter",
              "Events",
            ].map((l) => (
              <li key={l}>
                <a
                  href="/"
                  className="text-sm transition-colors hover:text-foreground"
                  style={{ color: "oklch(0.55 0.02 240)" }}
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4
            className="font-semibold text-sm mb-4"
            style={{ color: "oklch(0.92 0.01 240)" }}
          >
            Follow Us
          </h4>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: <Twitter className="w-4 h-4" />, label: "Twitter" },
              { icon: <Github className="w-4 h-4" />, label: "GitHub" },
              { icon: <Youtube className="w-4 h-4" />, label: "YouTube" },
              { icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
            ].map(({ icon, label }) => (
              <a
                key={label}
                href="/"
                aria-label={label}
                data-ocid={`footer.${label.toLowerCase()}.link`}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{
                  border: "1px solid oklch(0.28 0.03 240)",
                  color: "oklch(0.6 0.02 240)",
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{ borderTop: "1px solid oklch(0.22 0.03 240)" }}
        className="pt-5 flex flex-col sm:flex-row justify-between items-center gap-3"
      >
        <p className="text-xs" style={{ color: "oklch(0.45 0.02 240)" }}>
          © {year}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: "oklch(0.6 0.12 235)" }}
          >
            caffeine.ai
          </a>
        </p>
        <p className="text-xs" style={{ color: "oklch(0.4 0.02 240)" }}>
          Privacy · Terms · Cookies
        </p>
      </div>
    </footer>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: allCategories, isLoading: catsLoading } = useCategories();
  const { data: tutorials, isLoading: tutorialsLoading } =
    useTutorialsByCategory(selectedCategory);
  const { data: trending, isLoading: trendingLoading } = useTrendingTutorials();
  const { mutate: incrementViews } = useIncrementViewCount();

  const categories = ["All", ...(allCategories ?? [])];

  function scrollToContent() {
    document
      .getElementById("content-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  // Fallback sample data shown while loading
  const sampleTutorials: Tutorial[] = [
    {
      id: 1n,
      title: "Building Modern APIs with Node.js & Express",
      description: "",
      category: "Backend",
      author: "Alex Chen",
      duration: "2h 15m",
      viewCount: 45200n,
      rating: 4.8,
      thumbnailUrl: "",
      videoUrl: "",
      tags: [],
      createdAt: 0n,
    },
    {
      id: 2n,
      title: "React 19 Deep Dive: New Hooks & Concurrent Features",
      description: "",
      category: "Web Development",
      author: "Sarah Johnson",
      duration: "3h 45m",
      viewCount: 72100n,
      rating: 4.9,
      thumbnailUrl: "",
      videoUrl: "",
      tags: [],
      createdAt: 0n,
    },
    {
      id: 3n,
      title: "Docker & Kubernetes for Production Deployments",
      description: "",
      category: "DevOps",
      author: "Marcus Williams",
      duration: "4h 30m",
      viewCount: 38500n,
      rating: 4.7,
      thumbnailUrl: "",
      videoUrl: "",
      tags: [],
      createdAt: 0n,
    },
    {
      id: 4n,
      title: "Machine Learning with Python: From Zero to Hero",
      description: "",
      category: "AI/ML",
      author: "Priya Patel",
      duration: "6h 20m",
      viewCount: 91300n,
      rating: 4.9,
      thumbnailUrl: "",
      videoUrl: "",
      tags: [],
      createdAt: 0n,
    },
    {
      id: 5n,
      title: "PostgreSQL Performance Tuning & Optimization",
      description: "",
      category: "Database",
      author: "David Kim",
      duration: "2h 50m",
      viewCount: 29800n,
      rating: 4.6,
      thumbnailUrl: "",
      videoUrl: "",
      tags: [],
      createdAt: 0n,
    },
    {
      id: 6n,
      title: "TypeScript Advanced Patterns for Large Codebases",
      description: "",
      category: "Web Development",
      author: "Emily Torres",
      duration: "3h 10m",
      viewCount: 54600n,
      rating: 4.8,
      thumbnailUrl: "",
      videoUrl: "",
      tags: [],
      createdAt: 0n,
    },
  ];

  const displayTutorials =
    tutorials && tutorials.length > 0
      ? tutorials
      : tutorialsLoading
        ? []
        : sampleTutorials;
  const displayTrending =
    trending && trending.length > 0
      ? trending
      : trendingLoading
        ? []
        : sampleTutorials.slice(0, 4);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.11 0.025 240) 0%, oklch(0.13 0.02 240) 50%, oklch(0.12 0.02 240) 100%)",
      }}
    >
      <Toaster />
      <Navbar onSearch={() => {}} />

      <main className="max-w-[1200px] mx-auto px-6">
        <HeroSection onExplore={scrollToContent} />

        {/* Main content */}
        <div id="content-section" className="flex flex-col lg:flex-row gap-8">
          {/* Left: Browse + Grid */}
          <div className="flex-1 min-w-0">
            {/* Category section */}
            <section className="mb-6" data-ocid="categories.section">
              <h2
                className="text-lg font-semibold mb-4"
                style={{ color: "oklch(0.92 0.01 240)" }}
              >
                Browse by Category
              </h2>
              <div className="flex flex-wrap gap-2">
                {catsLoading
                  ? Array.from({ length: 6 }, (_, i) => `sk-cat-${i}`).map(
                      (k) => (
                        <Skeleton
                          key={k}
                          className="h-8 w-24 rounded-full"
                          style={{ background: "oklch(0.2 0.025 240)" }}
                        />
                      ),
                    )
                  : categories.map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        data-ocid={`categories.${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}.tab`}
                        onClick={() => setSelectedCategory(cat)}
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                        style={{
                          background:
                            selectedCategory === cat
                              ? "oklch(0.5 0.17 235)"
                              : "oklch(0.17 0.025 240)",
                          color:
                            selectedCategory === cat
                              ? "white"
                              : "oklch(0.6 0.02 240)",
                          border: `1px solid ${selectedCategory === cat ? "oklch(0.5 0.17 235)" : "oklch(0.24 0.03 240)"}`,
                        }}
                      >
                        {CATEGORY_ICONS[cat]}
                        {cat}
                      </button>
                    ))}
              </div>
            </section>

            {/* Tutorial grid */}
            <section data-ocid="tutorials.section">
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "oklch(0.92 0.01 240)" }}
                >
                  {selectedCategory === "All"
                    ? "All Tutorials"
                    : selectedCategory}
                </h2>
                {displayTutorials.length > 0 && (
                  <span
                    className="text-sm"
                    style={{ color: "oklch(0.55 0.02 240)" }}
                  >
                    {displayTutorials.length} tutorials
                  </span>
                )}
              </div>

              {tutorialsLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {Array.from({ length: 4 }, (_, i) => `sk-card-${i}`).map(
                    (k) => (
                      <CardSkeleton key={k} />
                    ),
                  )}
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCategory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                  >
                    {displayTutorials.map((t, i) => (
                      <TutorialCard
                        key={String(t.id)}
                        tutorial={t}
                        index={i}
                        onView={incrementViews}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}
            </section>
          </div>

          {/* Right: Trending sidebar */}
          <aside className="w-full lg:w-72 xl:w-80 shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "oklch(0.92 0.01 240)" }}
                >
                  Trending Now
                </h2>
                <span
                  className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
                  style={{
                    background: "oklch(0.5 0.17 235 / 0.15)",
                    color: "oklch(0.65 0.18 235)",
                  }}
                >
                  <Zap className="w-3 h-3" /> Hot
                </span>
              </div>

              {trendingLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }, (_, i) => `sk-trend-${i}`).map(
                    (k) => (
                      <TrendingSkeleton key={k} />
                    ),
                  )}
                </div>
              ) : (
                <div className="space-y-3" data-ocid="trending.section">
                  {displayTrending.map((t, i) => (
                    <TrendingCard
                      key={String(t.id)}
                      tutorial={t}
                      rank={i}
                      onView={incrementViews}
                    />
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>

      <div className="max-w-[1200px] mx-auto px-6">
        <Footer />
      </div>
    </div>
  );
}
