"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  Layers,
  MessageSquare,
  PenLine,
  Brain,
  Gamepad2,
  BarChart3,
  Settings,
  HelpCircle,
  Volume2,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  PanelRightClose,
  PanelRightOpen,
  LogOut,
  Check,
  Star,
  StarOff,
  RefreshCw,
  Eye,
  EyeOff,
  Mic,
  MicOff,
  VolumeX,
  Play,
  RotateCcw,
  Award,
  Target,
  TrendingUp,
  Clock,
  Users,
  Lightbulb,
  Heart,
  Send,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
} from "lucide-react";
import { useLearningStore } from "@/store/learningStore";
import { vocabulary, getWordsByLesson, getWordById } from "@/data/vocabulary";
import { lessons, getLessonById, grammarRules } from "@/data/lessons";
import { isDueForReview, getWeakWords, type SRSData } from "@/lib/srs";
import { cn } from "@/lib/utils";
import { toast, Toaster } from "sonner";

// Types
type Section =
  | "dashboard"
  | "vocabulary"
  | "lessons"
  | "hanzi"
  | "pinyin"
  | "qa"
  | "practice"
  | "games"
  | "stats"
  | "settings"
  | "help";

// Login Screen
function LoginScreen({ onLogin }: { onLogin: (user: { id: string; name: string }) => void }) {
  const [mode, setMode] = useState<"login" | "register" | "guest">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "guest") {
      onLogin({ id: "guest-" + Date.now(), name: "ضيف" });
    } else if (name) {
      onLogin({ id: "user-" + Date.now(), name });
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0A1628] via-[#0D2137] to-[#0A1628] flex items-center justify-center p-4" dir="rtl">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#1A5FA8]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#2175c9]/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1A5FA8] to-[#2175c9] mb-4">
              <span className="text-4xl font-bold text-white">桥</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">جِسر</h1>
            <p className="text-blue-300">تعلّم الصينية بسهولة</p>
          </div>

          {/* Mode Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { key: "login", label: "دخول" },
              { key: "register", label: "تسجيل" },
              { key: "guest", label: "زائر" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setMode(tab.key as typeof mode)}
                className={cn(
                  "flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all",
                  mode === tab.key
                    ? "bg-[#1A5FA8] text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode !== "guest" && (
              <>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">الاسم</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#1A5FA8]/50 focus:outline-none"
                    placeholder="أدخل اسمك"
                    required
                  />
                </div>
                {mode === "register" && (
                  <>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">البريد الإلكتروني</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#1A5FA8]/50 focus:outline-none"
                        placeholder="example@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">كلمة المرور</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#1A5FA8]/50 focus:outline-none"
                        placeholder="••••••••"
                      />
                    </div>
                  </>
                )}
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#1A5FA8] to-[#2175c9] text-white font-medium hover:opacity-90 transition-opacity"
            >
              {mode === "guest" ? "دخول كزائر" : mode === "login" ? "دخول" : "تسجيل"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            HSK 1 · {vocabulary.length} كلمة · {lessons.length} درس
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Main App
export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedLessons, setExpandedLessons] = useState(false);

  const { currentUser, setCurrentUser, logout, wordProgress, getSRSStats } = useLearningStore();

  // Check for saved user on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jisr_currentUser");
      if (saved) {
        try {
          const user = JSON.parse(saved);
          setCurrentUser(user);
        } catch {
          // Invalid data
        }
      }
    }
  }, [setCurrentUser]);

  // Save user when changed
  useEffect(() => {
    if (currentUser && typeof window !== "undefined") {
      localStorage.setItem("jisr_currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const handleLogin = (user: { id: string; name: string }) => {
    setCurrentUser({
      ...user,
      streak: 0,
      wordsLearned: 0,
      lessonsCompleted: 0,
      lastActiveDate: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    });
    toast.success(`مرحباً ${user.name}!`);
  };

  const handleLogout = () => {
    logout();
    toast.info("تم تسجيل الخروج");
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const srsStats = getSRSStats();

  const lessonNames = lessons.map((l) => l.titleZh + " - " + l.title);

  const navItems: { id: Section; icon: typeof Home; label: string; group?: string }[] = [
    { id: "dashboard", icon: Home, label: "الرئيسية" },
    { id: "vocabulary", icon: Layers, label: "المفردات" },
    { id: "lessons", icon: BookOpen, label: "الدروس", group: "التعلم" },
    { id: "hanzi", icon: PenLine, label: "الحروف" },
    { id: "pinyin", icon: BookOpen, label: "النغمات" },
    { id: "qa", icon: MessageSquare, label: "أسئلة يومية", group: "التدريب" },
    { id: "practice", icon: Brain, label: "اختبار" },
    { id: "games", icon: Gamepad2, label: "ألعاب" },
    { id: "stats", icon: BarChart3, label: "إحصائيات", group: "أخرى" },
    { id: "settings", icon: Settings, label: "إعدادات" },
    { id: "help", icon: HelpCircle, label: "مساعدة" },
  ];

  const sectionLabels = navItems.reduce((acc, item) => {
    acc[item.id] = item.label;
    return acc;
  }, {} as Record<Section, string>);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-arabic" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#1A5FA8] to-[#2175c9] text-white shadow-lg">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <span className="text-xl font-bold">桥</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">جِسر</h1>
              <p className="text-xs text-blue-200">HSK 1 · الصينية للمبتدئين</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {srsStats.due > 0 && (
              <span className="px-3 py-1 bg-orange-500 rounded-full text-sm font-medium flex items-center gap-1">
                <Target className="w-4 h-4" />
                {srsStats.due} مستحق
              </span>
            )}
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-sm font-bold">
                {currentUser.name.charAt(0)}
              </div>
              <span className="text-sm font-medium hidden sm:block">{currentUser.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-72 bg-gradient-to-b from-[#0A1628] to-[#0D2137] text-white overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1A5FA8] to-[#2175c9] flex items-center justify-center">
                      <span className="text-xl font-bold">桥</span>
                    </div>
                    <div>
                      <h2 className="font-bold">جِسر</h2>
                      <p className="text-xs text-blue-300">HSK 1</p>
                    </div>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentSection(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-right transition-colors",
                        currentSection === item.id
                          ? "bg-[#1A5FA8] text-white"
                          : "text-gray-300 hover:bg-white/5"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex max-w-[1600px] mx-auto w-full">
        {/* Desktop Sidebar */}
        <aside
          className={cn(
            "hidden lg:block sticky top-[60px] h-[calc(100vh-60px)] bg-gradient-to-b from-[#0A1628] to-[#0D2137] text-white overflow-y-auto transition-all duration-300",
            sidebarCollapsed ? "w-[68px]" : "w-64"
          )}
        >
          <div className="p-3">
            {/* Collapse Button */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/5 mb-4"
            >
              {sidebarCollapsed ? (
                <PanelRightOpen className="w-5 h-5" />
              ) : (
                <PanelRightClose className="w-5 h-5" />
              )}
            </button>

            {/* Navigation */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentSection(item.id)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                    currentSection === item.id
                      ? "bg-[#1A5FA8] text-white"
                      : "text-gray-300 hover:bg-white/5"
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              ))}
            </nav>

            {/* User Info */}
            {!sidebarCollapsed && (
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                    <span className="font-bold">{currentUser.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{currentUser.name}</p>
                    <p className="text-xs text-gray-400">
                      {currentUser.streak} يوم متتالي
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>خروج</span>
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Main Area */}
        <main className="flex-1 min-h-screen overflow-y-auto w-full p-4 lg:p-6 pb-20 lg:pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentSection === "dashboard" && (
                <DashboardSection
                  srsStats={srsStats}
                  setCurrentSection={setCurrentSection}
                />
              )}
              {currentSection === "vocabulary" && <VocabularySection />}
              {currentSection === "lessons" && <LessonsSection />}
              {currentSection === "hanzi" && <HanziSection />}
              {currentSection === "pinyin" && <PinyinSection />}
              {currentSection === "qa" && <QASection />}
              {currentSection === "practice" && <PracticeSection />}
              {currentSection === "games" && <GamesSection />}
              {currentSection === "stats" && <StatsSection />}
              {currentSection === "settings" && <SettingsSection />}
              {currentSection === "help" && <HelpSection />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-40">
        <div className="flex items-center justify-around">
          {[
            { id: "dashboard", icon: Home, label: "الرئيسية" },
            { id: "vocabulary", icon: Layers, label: "المفردات" },
            { id: "lessons", icon: BookOpen, label: "الدروس" },
            { id: "practice", icon: Brain, label: "اختبار" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentSection(item.id as Section)}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1 rounded-lg",
                currentSection === item.id ? "text-[#1A5FA8]" : "text-gray-500"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center gap-1 px-3 py-1 text-gray-500"
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs">المزيد</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

// Dashboard Section
function DashboardSection({
  srsStats,
  setCurrentSection,
}: {
  srsStats: { due: number; learned: number; weak: number };
  setCurrentSection: (section: Section) => void;
}) {
  const { currentUser, wordProgress } = useLearningStore();
  const learnedWords = Object.values(wordProgress).filter((p) => p.learned).length;

  const dailyTasks = [
    { id: 1, task: "راجع البطاقات المستحقة", done: srsStats.due === 0, link: "vocabulary" as Section },
    { id: 2, task: "تعلم 5 كلمات جديدة", done: false, link: "vocabulary" as Section },
    { id: 3, task: "ادرس درساً واحداً", done: false, link: "lessons" as Section },
    { id: 4, task: "تدرب على الحروف", done: false, link: "hanzi" as Section },
    { id: 5, task: "أنهِ اختباراً", done: false, link: "practice" as Section },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-[#1A5FA8] to-[#2175c9] rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">مرحباً {currentUser?.name}!</h2>
        <p className="text-blue-200">واصل تعلمك اليوم. كل خطوة تقربك من إتقان الصينية.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Layers, label: "كلمات تعلمتها", value: learnedWords, color: "blue" },
          { icon: Target, label: "بطاقات مستحقة", value: srsStats.due, color: "orange" },
          { icon: TrendingUp, label: "كلمات ضعيفة", value: srsStats.weak, color: "red" },
          { icon: Award, label: "سلسلة متتالية", value: currentUser?.streak || 0, color: "green" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <stat.icon
              className={cn(
                "w-8 h-8 mb-2",
                stat.color === "blue" && "text-blue-500",
                stat.color === "orange" && "text-orange-500",
                stat.color === "red" && "text-red-500",
                stat.color === "green" && "text-green-500"
              )}
            />
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Daily Tasks */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Check className="w-5 h-5 text-green-500" />
          خطة اليوم
        </h3>
        <div className="space-y-2">
          {dailyTasks.map((task) => (
            <button
              key={task.id}
              onClick={() => setCurrentSection(task.link)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg text-right transition-colors",
                task.done
                  ? "bg-green-50 text-green-700"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              )}
            >
              {task.done ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              )}
              <span className="flex-1">{task.task}</span>
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setCurrentSection("vocabulary")}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-right"
        >
          <Layers className="w-10 h-10 text-[#1A5FA8] mb-4" />
          <h3 className="font-bold text-gray-800">المفردات</h3>
          <p className="text-sm text-gray-500">راجع وتعلم كلمات جديدة</p>
        </button>
        <button
          onClick={() => setCurrentSection("lessons")}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-right"
        >
          <BookOpen className="w-10 h-10 text-green-500 mb-4" />
          <h3 className="font-bold text-gray-800">الدروس</h3>
          <p className="text-sm text-gray-500">استكشف الدروس الخمسة عشر</p>
        </button>
        <button
          onClick={() => setCurrentSection("practice")}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-right"
        >
          <Brain className="w-10 h-10 text-orange-500 mb-4" />
          <h3 className="font-bold text-gray-800">الاختبار</h3>
          <p className="text-sm text-gray-500">اختبر معلوماتك</p>
        </button>
      </div>
    </div>
  );
}

// Vocabulary Section
function VocabularySection() {
  const [mode, setMode] = useState<"cards" | "learn" | "test" | "match">("cards");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const { rateWord, wordProgress, markWordLearned } = useLearningStore();

  const filteredWords = useMemo(() => {
    if (selectedLesson) {
      return vocabulary.filter((w) => w.lesson === selectedLesson);
    }
    return vocabulary;
  }, [selectedLesson]);

  const currentWord = filteredWords[currentIndex];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const handleRate = (quality: number) => {
    if (currentWord) {
      rateWord(currentWord.id, quality);
      setFlipped(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % filteredWords.length);
      }, 300);
    }
  };

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredWords.length);
  };

  const handlePrev = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">المفردات</h2>
          <p className="text-gray-500">{filteredWords.length} كلمة</p>
        </div>
        <div className="flex gap-2">
          {(["cards", "learn", "test", "match"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                mode === m
                  ? "bg-[#1A5FA8] text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#1A5FA8]"
              )}
            >
              {m === "cards"
                ? "البطاقات"
                : m === "learn"
                ? "تعلم"
                : m === "test"
                ? "اختبار"
                : "مطابقة"}
            </button>
          ))}
        </div>
      </div>

      {/* Lesson Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedLesson(null)}
          className={cn(
            "px-3 py-1.5 rounded-lg text-sm transition-colors",
            selectedLesson === null
              ? "bg-[#1A5FA8] text-white"
              : "bg-white border border-gray-200 text-gray-600"
          )}
        >
          الكل
        </button>
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => setSelectedLesson(lesson.id)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm transition-colors",
              selectedLesson === lesson.id
                ? "bg-[#1A5FA8] text-white"
                : "bg-white border border-gray-200 text-gray-600"
            )}
          >
            {lesson.id}
          </button>
        ))}
      </div>

      {/* Card Mode */}
      {mode === "cards" && currentWord && (
        <div className="flex flex-col items-center max-w-lg mx-auto">
          {/* Card */}
          <div
            onClick={() => setFlipped(!flipped)}
            className="relative w-full aspect-[3/4] cursor-pointer perspective-1000"
          >
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center justify-center p-8"
                style={{ backfaceVisibility: "hidden" }}
              >
                <span className="text-9xl font-chinese-serif text-gray-800 mb-4">
                  {currentWord.chinese}
                </span>
                <p className="text-xl text-gray-500 font-chinese-sans">{currentWord.pinyin}</p>
                <span
                  className="mt-2 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                  onClick={(e) => e.stopPropagation()}
                >
                  {currentWord.pos}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(currentWord.chinese);
                  }}
                  className="mt-4 p-2 rounded-full bg-[#1A5FA8]/10 text-[#1A5FA8] hover:bg-[#1A5FA8]/20"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
                <p className="mt-4 text-sm text-gray-400">اضغط للقلب</p>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#1A5FA8] to-[#2175c9] rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 text-white"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <p className="text-3xl font-bold mb-4">{currentWord.arabic}</p>
                <p className="text-xl font-chinese-sans mb-2">
                  {currentWord.chinese} · {currentWord.pinyin}
                </p>
                {currentWord.mnemonic && (
                  <div className="mt-4 p-3 bg-white/10 rounded-lg">
                    <p className="text-sm flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      {currentWord.mnemonic}
                    </p>
                  </div>
                )}
                <div className="mt-6 space-y-2 w-full">
                  {currentWord.sentences.slice(0, 2).map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-white/10 rounded-lg p-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div>
                        <p className="text-sm font-chinese-sans">{s.chinese}</p>
                        <p className="text-xs text-blue-200">{s.arabic}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speak(s.chinese);
                        }}
                        className="p-1.5 rounded-full bg-white/10 hover:bg-white/20"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-gray-500">
              {currentIndex + 1} / {filteredWords.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* SRS Buttons */}
          {flipped && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 mt-6"
            >
              <button
                onClick={() => handleRate(1)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                <ThumbsDown className="w-5 h-5" />
                لا أعرفها
              </button>
              <button
                onClick={() => handleRate(4)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors"
              >
                <ThumbsUp className="w-5 h-5" />
                أعرفها
              </button>
            </motion.div>
          )}
        </div>
      )}

      {/* Learn Mode */}
      {mode === "learn" && currentWord && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <span className="text-8xl font-chinese-serif text-gray-800 block mb-4">
              {currentWord.chinese}
            </span>
            <p className="text-2xl text-gray-500 font-chinese-sans">{currentWord.pinyin}</p>
            <p className="text-3xl font-bold text-[#1A5FA8] mt-4">{currentWord.arabic}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-500">نوع الكلمة</p>
                <p className="font-medium">{currentWord.pos}</p>
              </div>
              <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                الدرس {currentWord.lesson}
              </span>
            </div>

            {currentWord.mnemonic && (
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <p className="text-sm text-yellow-700 flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{currentWord.mnemonic}</span>
                </p>
              </div>
            )}

            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-700 font-medium mb-3">أمثلة:</p>
              <div className="space-y-2">
                {currentWord.sentences.map((s, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="font-chinese-sans text-gray-800">{s.chinese}</p>
                      <p className="text-sm text-gray-500">{s.arabic}</p>
                    </div>
                    <button
                      onClick={() => speak(s.chinese)}
                      className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200"
            >
              السابق
            </button>
            <button
              onClick={() => {
                markWordLearned(currentWord.id);
                handleNext();
              }}
              className="flex-1 py-3 rounded-xl bg-[#1A5FA8] text-white font-medium hover:bg-[#1A5FA8]/90"
            >
              التالي
            </button>
          </div>

          <p className="text-center text-gray-400 text-sm mt-4">
            {currentIndex + 1} / {filteredWords.length}
          </p>
        </div>
      )}

      {/* Test Mode */}
      {mode === "test" && (
        <TestMode words={filteredWords} onRate={rateWord} />
      )}

      {/* Match Mode */}
      {mode === "match" && <MatchMode words={filteredWords.slice(0, 12)} />}
    </div>
  );
}

// Test Mode Component
function TestMode({
  words,
  onRate,
}: {
  words: typeof vocabulary;
  onRate: (wordId: string, quality: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });

  const currentWord = words[currentIndex];
  const options = useMemo(() => {
    if (!currentWord) return [];
    const others = words.filter((w) => w.id !== currentWord.id);
    const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 3);
    return [...shuffled.map((w) => w.arabic), currentWord.arabic].sort(
      () => Math.random() - 0.5
    );
  }, [currentWord, words]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    const isCorrect = answer === currentWord.arabic;
    if (isCorrect) {
      setScore((s) => ({ ...s, correct: s.correct + 1 }));
      onRate(currentWord.id, 4);
    } else {
      setScore((s) => ({ ...s, wrong: s.wrong + 1 }));
      onRate(currentWord.id, 1);
    }
  };

  const nextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    setCurrentIndex((prev) => (prev + 1) % words.length);
  };

  if (!currentWord) return null;

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-500">
            {currentIndex + 1} / {words.length}
          </span>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
              {score.correct} ✓
            </span>
            <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm">
              {score.wrong} ✗
            </span>
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <span className="text-6xl font-chinese-serif text-gray-800 block mb-2">
            {currentWord.chinese}
          </span>
          <button
            onClick={() => {
              const utterance = new SpeechSynthesisUtterance(currentWord.chinese);
              utterance.lang = "zh-CN";
              speechSynthesis.speak(utterance);
            }}
            className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {options.map((option, i) => (
            <button
              key={i}
              onClick={() => !showResult && handleAnswer(option)}
              disabled={showResult}
              className={cn(
                "w-full p-4 rounded-xl text-right transition-all",
                showResult
                  ? option === currentWord.arabic
                    ? "bg-green-100 border-2 border-green-500 text-green-700"
                    : option === selectedAnswer
                    ? "bg-red-100 border-2 border-red-500 text-red-700"
                    : "bg-gray-50 text-gray-400"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              )}
            >
              {option}
            </button>
          ))}
        </div>

        {showResult && (
          <button
            onClick={nextQuestion}
            className="w-full mt-6 py-3 rounded-xl bg-[#1A5FA8] text-white font-medium hover:bg-[#1A5FA8]/90"
          >
            التالي
          </button>
        )}
      </div>
    </div>
  );
}

// Match Mode Component
function MatchMode({ words }: { words: typeof vocabulary }) {
  const [matches, setMatches] = useState<
    { id: string; content: string; type: "chinese" | "arabic"; matched: boolean }[]
  >([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState(0);

  useEffect(() => {
    const shuffled = [
      ...words.map((w) => ({ id: w.id + "-zh", content: w.chinese, type: "chinese" as const, matched: false })),
      ...words.map((w) => ({ id: w.id + "-ar", content: w.arabic, type: "arabic" as const, matched: false })),
    ].sort(() => Math.random() - 0.5);
    setMatches(shuffled);
  }, [words]);

  const handleSelect = (item: typeof matches[0]) => {
    if (item.matched) return;

    if (!selected) {
      setSelected(item.id);
    } else {
      const selectedMatch = matches.find((m) => m.id === selected);
      if (!selectedMatch) return;

      const selectedWordId = selected.replace(/-zh|-ar/, "");
      const currentWordId = item.id.replace(/-zh|-ar/, "");

      if (selectedWordId === currentWordId && selectedMatch.type !== item.type) {
        setMatches((prev) =>
          prev.map((m) =>
            m.id === selected || m.id === item.id ? { ...m, matched: true } : m
          )
        );
        setMatchedPairs((p) => p + 1);
        toast.success("ممتاز!");
      } else {
        toast.error("حاول مرة أخرى");
      }
      setSelected(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">طابق الكلمات</h3>
        <span className="px-3 py-1 bg-[#1A5FA8] text-white rounded-full text-sm">
          {matchedPairs} / {words.length}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {matches.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSelect(item)}
            disabled={item.matched}
            className={cn(
              "p-4 rounded-xl text-center transition-all",
              item.matched
                ? "bg-green-100 text-green-700 opacity-50"
                : selected === item.id
                ? "bg-[#1A5FA8] text-white"
                : "bg-white border border-gray-200 hover:border-[#1A5FA8] text-gray-700"
            )}
          >
            <span className={cn(item.type === "chinese" && "font-chinese-serif text-lg")}>
              {item.content}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Lessons Section
function LessonsSection() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<"vocab" | "grammar" | "conversation" | "exercises">("vocab");
  const { wordProgress, markWordLearned } = useLearningStore();

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  if (selectedLesson) {
    const lessonWords = vocabulary.filter((w) =>
      selectedLesson.vocabularyIds.includes(w.id)
    );

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedLesson(null)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{selectedLesson.title}</h2>
            <p className="text-gray-500 font-chinese-sans">{selectedLesson.titleZh}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { id: "vocab", label: "المفردات" },
            { id: "grammar", label: "القواعد" },
            { id: "conversation", label: "محادثة" },
            { id: "exercises", label: "تمارين" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                activeTab === tab.id
                  ? "bg-[#1A5FA8] text-white"
                  : "bg-white text-gray-600 border border-gray-200"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "vocab" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {lessonWords.map((word) => {
              const progress = wordProgress[word.id];
              const learned = progress?.learned || false;
              return (
                <div
                  key={word.id}
                  className={cn(
                    "p-4 rounded-xl border transition-all",
                    learned
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-gray-200 hover:border-[#1A5FA8]"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-chinese-serif">{word.chinese}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(word.chinese);
                      }}
                      className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      <Volume2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 font-chinese-sans">{word.pinyin}</p>
                  <p className="text-sm font-medium text-gray-700">{word.arabic}</p>
                  <button
                    onClick={() => markWordLearned(word.id)}
                    className={cn(
                      "mt-2 w-full py-1.5 rounded-lg text-xs font-medium transition-colors",
                      learned
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600 hover:bg-[#1A5FA8]/10 hover:text-[#1A5FA8]"
                    )}
                  >
                    {learned ? "تم التعلم ✓" : "تعلم"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "grammar" && (
          <div className="space-y-4">
            {selectedLesson.grammarIds.map((gId) => {
              const rule = grammarRules.find((r) => r.id === gId);
              if (!rule) return null;
              return (
                <div
                  key={rule.id}
                  className="bg-white rounded-xl p-6 border border-gray-100"
                >
                  <h4 className="font-bold text-lg text-[#1A5FA8] mb-2">
                    {rule.title}
                  </h4>
                  <p className="text-gray-600 mb-3">{rule.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {rule.examples.map((ex, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-chinese-sans"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "conversation" && (
          <div className="space-y-6">
            {selectedLesson.conversations.map((conv, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  {conv.scene}
                </p>
                <div className="space-y-3">
                  {conv.lines.map((line, j) => (
                    <div
                      key={j}
                      className={cn(
                        "p-3 rounded-lg",
                        j % 2 === 0 ? "bg-blue-50 mr-8" : "bg-gray-50 ml-8"
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500 font-medium">
                          {line.speaker}
                        </span>
                        <button
                          onClick={() => speak(line.chinese)}
                          className="p-1 rounded bg-white/50 hover:bg-white"
                        >
                          <Volume2 className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                      <p className="font-chinese-sans">{line.chinese}</p>
                      <p className="text-sm text-gray-500">{line.arabic}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "exercises" && (
          <div className="space-y-4">
            {selectedLesson.exercises.map((ex, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-gray-100"
              >
                <p className="font-medium mb-4">{ex.question}</p>
                {ex.type === "multiple_choice" && ex.options && (
                  <div className="space-y-2">
                    {ex.options.map((opt, j) => (
                      <button
                        key={j}
                        className="w-full p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-right"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">الدروس</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((lesson) => {
          const lessonWords = vocabulary.filter((w) =>
            lesson.vocabularyIds.includes(w.id)
          );
          const learnedCount = lessonWords.filter(
            (w) => wordProgress[w.id]?.learned
          ).length;
          const progress = lessonWords.length > 0 ? learnedCount / lessonWords.length : 0;

          return (
            <button
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#1A5FA8] hover:shadow-md transition-all text-right"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="px-3 py-1 bg-[#1A5FA8] text-white rounded-full text-sm font-bold">
                  {lesson.id}
                </span>
                <span
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                    progress === 1
                      ? "bg-green-100 text-green-600"
                      : progress > 0
                      ? "bg-orange-100 text-orange-600"
                      : "bg-gray-100 text-gray-400"
                  )}
                >
                  {Math.round(progress * 100)}%
                </span>
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{lesson.title}</h3>
              <p className="text-sm text-gray-500 font-chinese-sans mb-3">
                {lesson.titleZh}
              </p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    progress === 1
                      ? "bg-green-500"
                      : progress > 0
                      ? "bg-[#1A5FA8]"
                      : "bg-gray-200"
                  )}
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {learnedCount} / {lessonWords.length} كلمة
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Hanzi Section
function HanziSection() {
  const [selectedChar, setSelectedChar] = useState<string>("我");
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizResult, setQuizResult] = useState<{ totalStrokes: number; totalMistakes: number } | null>(null);

  const characterInfo: Record<string, { pinyin: string; arabic: string }> = {
    "我": { pinyin: "wǒ", arabic: "أنا" },
    "你": { pinyin: "nǐ", arabic: "أنت" },
    "他": { pinyin: "tā", arabic: "هو" },
    "她": { pinyin: "tā", arabic: "هي" },
    "们": { pinyin: "men", arabic: "جمع (ـنا/ـكم)" },
    "是": { pinyin: "shì", arabic: "يكون" },
    "不": { pinyin: "bù", arabic: "لا" },
    "好": { pinyin: "hǎo", arabic: "جيد" },
    "有": { pinyin: "yǒu", arabic: "يملك" },
    "在": { pinyin: "zài", arabic: "في" },
    "人": { pinyin: "rén", arabic: "شخص" },
    "大": { pinyin: "dà", arabic: "كبير" },
    "小": { pinyin: "xiǎo", arabic: "صغير" },
    "上": { pinyin: "shàng", arabic: "فوق" },
    "下": { pinyin: "xià", arabic: "تحت" },
    "中": { pinyin: "zhōng", arabic: "وسط" },
    "国": { pinyin: "guó", arabic: "بلد" },
    "学": { pinyin: "xué", arabic: "يتعلم" },
    "生": { pinyin: "shēng", arabic: "يولد / حياة" },
    "书": { pinyin: "shū", arabic: "كتاب" },
    "看": { pinyin: "kàn", arabic: "ينظر" },
    "来": { pinyin: "lái", arabic: "يأتي" },
    "去": { pinyin: "qù", arabic: "يذهب" },
    "吃": { pinyin: "chī", arabic: "يأكل" },
    "喝": { pinyin: "hē", arabic: "يشرب" },
    "爱": { pinyin: "ài", arabic: "يحب" },
    "家": { pinyin: "jiā", arabic: "بيت" },
    "山": { pinyin: "shān", arabic: "جبل" },
    "水": { pinyin: "shuǐ", arabic: "ماء" },
    "火": { pinyin: "huǒ", arabic: "نار" },
    "木": { pinyin: "mù", arabic: "شجرة" },
    "日": { pinyin: "rì", arabic: "شمس / يوم" },
    "月": { pinyin: "yuè", arabic: "قمر / شهر" },
    "年": { pinyin: "nián", arabic: "سنة" },
    "天": { pinyin: "tiān", arabic: "سماء / يوم" },
    "东": { pinyin: "dōng", arabic: "شرق" },
    "西": { pinyin: "xī", arabic: "غرب" },
    "南": { pinyin: "nán", arabic: "جنوب" },
    "北": { pinyin: "běi", arabic: "شمال" },
  };

  const characters = Object.keys(characterInfo);
  const info = characterInfo[selectedChar];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).HanziWriter) {
      const target = document.getElementById("hanzi-target");
      if (target) {
        target.innerHTML = "";
        const writer = (window as any).HanziWriter.create("hanzi-target", selectedChar, {
          width: 300,
          height: 300,
          padding: 20,
          strokeColor: "#1A5FA8",
          outlineColor: "#E5E7EB",
          drawingColor: "#EF4444",
          showOutline: true,
          showCharacter: true,
        });

        (window as any).hanziWriter = writer;
      }
    }
  }, [selectedChar]);

  const animateCharacter = () => {
    if ((window as any).hanziWriter) {
      (window as any).hanziWriter.animateCharacter({
        onComplete: () => {
          console.log("Animation complete");
        },
      });
    }
  };

  const startQuiz = () => {
    setIsQuizMode(true);
    setQuizResult(null);
    if ((window as any).hanziWriter) {
      (window as any).hanziWriter.quiz({
        onComplete: (summary: any) => {
          setQuizResult({
            totalStrokes: summary.totalStrokes,
            totalMistakes: summary.totalMistakes,
          });
          setIsQuizMode(false);
        },
      });
    }
  };

  const reset = () => {
    setIsQuizMode(false);
    setQuizResult(null);
    setSelectedChar(selectedChar);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">كتابة الحروف الصينية</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Character Grid */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <h3 className="font-medium text-gray-700 mb-3">اختر حرفاً</h3>
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
              {characters.map((char) => (
                <button
                  key={char}
                  onClick={() => {
                    setSelectedChar(char);
                    setIsQuizMode(false);
                    setQuizResult(null);
                  }}
                  className={cn(
                    "aspect-square rounded-lg text-xl font-chinese-serif flex items-center justify-center transition-colors",
                    selectedChar === char
                      ? "bg-[#1A5FA8] text-white"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                  )}
                >
                  {char}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Drawing Area */}
        <div className="order-1 lg:order-2">
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            {/* Info */}
            <div className="text-center mb-4">
              <span className="text-5xl font-chinese-serif text-gray-800 block">
                {selectedChar}
              </span>
              <div className="flex items-center justify-center gap-4 mt-2">
                <p className="text-gray-500 font-chinese-sans">{info?.pinyin}</p>
                <button
                  onClick={() => speak(selectedChar)}
                  className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <Volume2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">{info?.arabic}</p>
            </div>

            {/* Drawing */}
            <div className="relative">
              <div
                id="hanzi-target"
                className="mx-auto bg-gray-50 rounded-xl border-2 border-gray-200"
              />

              {quizResult && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-white/90 flex items-center justify-center rounded-xl"
                >
                  <div className="text-center">
                    {quizResult.totalMistakes === 0 ? (
                      <p className="text-green-600 font-bold text-lg">ممتاز!</p>
                    ) : quizResult.totalMistakes < 3 ? (
                      <p className="text-blue-600 font-bold">جيد جداً!</p>
                    ) : (
                      <p className="text-orange-600 font-bold">حاول مرة أخرى</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      {quizResult.totalMistakes} أخطاء من {quizResult.totalStrokes} ضربات
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Controls */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={animateCharacter}
                disabled={isQuizMode}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[#1A5FA8] text-white hover:bg-[#1A5FA8]/90 disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                رسم تلقائي
              </button>
              <button
                onClick={startQuiz}
                disabled={isQuizMode}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50"
              >
                <PenLine className="w-4 h-4" />
                وضع الاختبار
              </button>
              <button
                onClick={reset}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                <RotateCcw className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Pinyin Section
function PinyinSection() {
  const [activeTab, setActiveTab] = useState<"tones" | "initials" | "finals" | "rules">("tones");

  const tones = [
    { tone: 1, mark: "ˉ", example: "妈 mā", arabic: "أم (نغمة عالية ثابتة)", color: "blue" },
    { tone: 2, mark: "ˊ", example: "麻 má", arabic: "قنب (نغمة صاعدة)", color: "green" },
    { tone: 3, mark: "ˇ", example: "马 mǎ", arabic: "حصان (نغمة هابطة صاعدة)", color: "orange" },
    { tone: 4, mark: "ˋ", example: "骂 mà", arabic: "يشتم (نغمة هابطة)", color: "red" },
    { tone: 5, mark: "", example: "吗 ma", arabic: "حرف استفهام (نغمة محايدة)", color: "gray" },
  ];

  const initials = [
    { letter: "b", example: "八 bā", arabic: "ثمانية", ipa: "p" },
    { letter: "p", example: "跑 pǎo", arabic: "يركض", ipa: "pʰ" },
    { letter: "m", example: "妈 mā", arabic: "أم", ipa: "m" },
    { letter: "f", example: "飞 fēi", arabic: "يطير", ipa: "f" },
    { letter: "d", example: "大 dà", arabic: "كبير", ipa: "t" },
    { letter: "t", example: "他 tā", arabic: "هو", ipa: "tʰ" },
    { letter: "n", example: "你 nǐ", arabic: "أنت", ipa: "n" },
    { letter: "l", example: "来 lái", arabic: "يأتي", ipa: "l" },
    { letter: "g", example: "高 gāo", arabic: "عالٍ", ipa: "k" },
    { letter: "k", example: "看 kàn", arabic: "ينظر", ipa: "kʰ" },
    { letter: "h", example: "好 hǎo", arabic: "جيد", ipa: "x" },
    { letter: "j", example: "家 jiā", arabic: "بيت", ipa: "tɕ" },
    { letter: "q", example: "去 qù", arabic: "يذهب", ipa: "tɕʰ" },
    { letter: "x", example: "小 xiǎo", arabic: "صغير", ipa: "ɕ" },
    { letter: "zh", example: "中 zhōng", arabic: "وسط", ipa: "ʈʂ" },
    { letter: "ch", example: "吃 chī", arabic: "يأكل", ipa: "ʈʂʰ" },
    { letter: "sh", example: "是 shì", arabic: "يكون", ipa: "ʂ" },
    { letter: "r", example: "人 rén", arabic: "شخص", ipa: "ʐ" },
    { letter: "z", example: "在 zài", arabic: "في", ipa: "ts" },
    { letter: "c", example: "菜 cài", arabic: "طبق", ipa: "tsʰ" },
    { letter: "s", example: "三 sān", arabic: "ثلاثة", ipa: "s" },
    { letter: "y", example: "一 yī", arabic: "واحد", ipa: "j" },
    { letter: "w", example: "我 wǒ", arabic: "أنا", ipa: "w" },
  ];

  const finals = [
    { final: "a", example: "八 bā", arabic: "ثمانية" },
    { final: "o", example: "我 wǒ", arabic: "أنا" },
    { final: "e", example: "乐 lè", arabic: "سعيد" },
    { final: "i", example: "你 nǐ", arabic: "أنت" },
    { final: "u", example: "书 shū", arabic: "كتاب" },
    { final: "ü", example: "女 nǚ", arabic: "امرأة" },
    { final: "ai", example: "爱 ài", arabic: "حب" },
    { final: "ei", example: "给 gěi", arabic: "يعطي" },
    { final: "ui", example: "水 shuǐ", arabic: "ماء" },
    { final: "ao", example: "好 hǎo", arabic: "جيد" },
    { final: "ou", example: "有 yǒu", arabic: "يملك" },
    { final: "iu", example: "六 liù", arabic: "ستة" },
    { final: "ie", example: "写 xiě", arabic: "يكتب" },
    { final: "an", example: "三 sān", arabic: "ثلاثة" },
    { final: "en", example: "人 rén", arabic: "شخص" },
    { final: "in", example: "你 nǐ", arabic: "أنت" },
    { final: "un", example: "云 yún", arabic: "سحاب" },
    { final: "ang", example: "忙 máng", arabic: "مشغول" },
    { final: "eng", example: "生 shēng", arabic: "يولد" },
    { final: "ing", example: "名 míng", arabic: "اسم" },
    { final: "ong", example: "中 zhōng", arabic: "وسط" },
  ];

  const specialRules = [
    { title: "تغيير النغمة الثالثة", description: "عندما تلتقي نغمتان ثالثتان، تصبح الأولى نغمة ثانية", examples: ["你好 nǐ hǎo → ní hǎo", "很好 hěn hǎo → hén hǎo"] },
    { title: "قاعدة ü مع j, q, x", description: "عندما تأتي ü بعد j أو q أو x، تُكتب u بدون النقطتين", examples: ["家 jiā (ليس jüā)", "去 qù (ليس qǜ)", "学 xué (ليس xüé)"] },
    { title: "النغمة المحايدة", description: "تُستخدم في نهايات الكلمات مثل 吗، 的، 了", examples: ["是吗 shì ma", "我的 wǒ de", "去了 qù le"] },
    { title: "نطق '不' و '一'", description: "تتغير نغمتهما حسب الكلمة التالية", examples: ["不是 bú shì (نغمة 2)", "一个 yí ge (نغمة 2)"] },
  ];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">النغمات والأصوات</h2>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: "tones", label: "النغمات" },
          { id: "initials", label: "الحروف الأولية" },
          { id: "finals", label: "الحروف الأخيرة" },
          { id: "rules", label: "قواعد خاصة" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
              activeTab === tab.id
                ? "bg-[#1A5FA8] text-white"
                : "bg-white text-gray-600 border border-gray-200"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "tones" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {tones.map((t) => (
            <div
              key={t.tone}
              className={cn(
                "p-6 rounded-xl border",
                t.color === "blue" && "bg-blue-50 border-blue-200",
                t.color === "green" && "bg-green-50 border-green-200",
                t.color === "orange" && "bg-orange-50 border-orange-200",
                t.color === "red" && "bg-red-50 border-red-200",
                t.color === "gray" && "bg-gray-50 border-gray-200"
              )}
            >
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">
                  {t.tone}
                  <span className="text-sm mr-1">{t.mark}</span>
                </div>
                <p className="text-sm text-gray-600 mt-3">{t.example}</p>
                <p className="text-xs text-gray-500 mt-1">{t.arabic}</p>
                <button
                  onClick={() => speak(t.example.split(" ")[0])}
                  className="mt-3 p-2 rounded-full bg-white/50 hover:bg-white"
                >
                  <Volume2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "initials" && (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">الحرف</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">مثال</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">المعنى</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">IPA</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {initials.map((init) => (
                <tr key={init.letter} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-bold text-lg">{init.letter}</td>
                  <td className="px-4 py-3 font-chinese-sans">{init.example}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{init.arabic}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">/{init.ipa}/</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => speak(init.example.split(" ")[0])}
                      className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      <Volume2 className="w-4 h-4 text-gray-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "finals" && (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">الحرف</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">مثال</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">المعنى</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {finals.map((f) => (
                <tr key={f.final} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-bold text-lg">{f.final}</td>
                  <td className="px-4 py-3 font-chinese-sans">{f.example}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{f.arabic}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => speak(f.example.split(" ")[0])}
                      className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      <Volume2 className="w-4 h-4 text-gray-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "rules" && (
        <div className="space-y-4">
          {specialRules.map((rule, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-[#1A5FA8] text-white flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-gray-800 mb-2">{rule.title}</h4>
                  <p className="text-gray-600 mb-3">{rule.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {rule.examples.map((ex, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-chinese-sans"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// QA Section
function QASection() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<Record<string, boolean>>({});
  const [practiceMode, setPracticeMode] = useState<string | null>(null);

  const categories = [
    {
      id: "shop",
      icon: "🛒",
      title: "في المتجر",
      color: "blue",
      questions: [
        { q: "这个多少钱？", pinyin: "Zhège duōshao qián?", arabic: "بكم هذا؟", answers: [{ zh: "这个五十块钱。", pinyin: "Zhège wǔshí kuài qián.", arabic: "هذا بخمسين يوان." }] },
        { q: "能便宜一点吗？", pinyin: "Néng piányi yìdiǎn ma?", arabic: "هل يمكن أن يكون أرخص؟", answers: [{ zh: "可以，四十五块。", pinyin: "Kěyǐ, sìshíwǔ kuài.", arabic: "نعم، بخمسة وأربعين." }] },
        { q: "我要这个。", pinyin: "Wǒ yào zhège.", arabic: "أريد هذا.", answers: [{ zh: "好的，一共五十块。", pinyin: "Hǎo de, yígòng wǔshí kuài.", arabic: "حسناً، المجموع خمسون." }] },
        { q: "有别的颜色吗？", pinyin: "Yǒu bié de yánsè ma?", arabic: "هل هناك لون آخر؟", answers: [{ zh: "有，有红色和蓝色。", pinyin: "Yǒu, yǒu hóngsè hé lánsè.", arabic: "نعم، يوجد أحمر وأزرق." }] },
        { q: "可以刷卡吗？", pinyin: "Kěyǐ shuākǎ ma?", arabic: "هل يمكن الدفع بالبطاقة؟", answers: [{ zh: "可以，请刷卡。", pinyin: "Kěyǐ, qǐng shuākǎ.", arabic: "نعم، مر البطاقة من فضلك." }] },
      ],
    },
    {
      id: "restaurant",
      icon: "🍜",
      title: "في المطعم",
      color: "green",
      questions: [
        { q: "请问，还有位置吗？", pinyin: "Qǐngwèn, hái yǒu wèizhi ma?", arabic: "هل هناك مكان؟", answers: [{ zh: "有，请坐这儿。", pinyin: "Yǒu, qǐng zuò zhèr.", arabic: "نعم، اجلس هنا من فضلك." }] },
        { q: "我想点菜。", pinyin: "Wǒ xiǎng diǎn cài.", arabic: "أريد أن أطلب الطعام.", answers: [{ zh: "好的，请看菜单。", pinyin: "Hǎo de, qǐng kàn càidān.", arabic: "حسناً، انظر القائمة من فضلك." }] },
        { q: "这个菜辣不辣？", pinyin: "Zhège cài là bú là?", arabic: "هل هذا الطبق حار؟", answers: [{ zh: "有点辣。", pinyin: "Yǒudiǎn là.", arabic: "حار قليلاً." }] },
        { q: "请给我一杯水。", pinyin: "Qǐng gěi wǒ yì bēi shuǐ.", arabic: "أعطني كوب ماء من فضلك.", answers: [{ zh: "好的，请稍等。", pinyin: "Hǎo de, qǐng shāo děng.", arabic: "حسناً، انتظر قليلاً." }] },
        { q: "买单。", pinyin: "Mǎi dān.", arabic: "الفاتورة من فضلك.", answers: [{ zh: "一共八十块。", pinyin: "Yígòng bāshí kuài.", arabic: "المجموع ثمانون." }] },
      ],
    },
    {
      id: "intro",
      icon: "👋",
      title: "التعارف",
      color: "purple",
      questions: [
        { q: "你好，我叫...", pinyin: "Nǐ hǎo, wǒ jiào...", arabic: "مرحبا، اسمي...", answers: [{ zh: "你好！很高兴认识你。", pinyin: "Nǐ hǎo! Hěn gāoxìng rènshi nǐ.", arabic: "مرحبا! سررت بلقائك." }] },
        { q: "你是哪里人？", pinyin: "Nǐ shì nǎlǐ rén?", arabic: "من أين أنت؟", answers: [{ zh: "我是中国人。", pinyin: "Wǒ shì Zhōngguó rén.", arabic: "أنا صيني." }] },
        { q: "你几岁？", pinyin: "Nǐ jǐ suì?", arabic: "كم عمرك؟", answers: [{ zh: "我二十五岁。", pinyin: "Wǒ èrshíwǔ suì.", arabic: "عمري خمسة وعشرون سنة." }] },
        { q: "你做什么工作？", pinyin: "Nǐ zuò shénme gōngzuò?", arabic: "ما عملك؟", answers: [{ zh: "我是老师。", pinyin: "Wǒ shì lǎoshī.", arabic: "أنا معلم." }] },
      ],
    },
    {
      id: "transport",
      icon: "🚌",
      title: "المواصلات",
      color: "orange",
      questions: [
        { q: "请问，地铁站在哪儿？", pinyin: "Qǐngwèn, dìtiězhàn zài nǎr?", arabic: "أين محطة المترو؟", answers: [{ zh: "往前走，然后左转。", pinyin: "Wǎng qián zǒu, ránhòu zuó zhuǎn.", arabic: "امضِ قدماً، ثم انعطف يساراً." }] },
        { q: "去机场多少钱？", pinyin: "Qù jīchǎng duōshao qián?", arabic: "بكم الذهاب للمطار؟", answers: [{ zh: "打车一百块左右。", pinyin: "Dǎ chē yìbǎi kuài zuǒyòu.", arabic: "سيارة الأجرة حوالي مئة." }] },
        { q: "这路车去火车站吗？", pinyin: "Zhè lù chē qù huǒchēzhàn ma?", arabic: "هل هذه الحافلة تذهب لمحطة القطار؟", answers: [{ zh: "去的，请上车。", pinyin: "Qù de, qǐng shàng chē.", arabic: "نعم، اصعد من فضلك." }] },
      ],
    },
    {
      id: "help",
      icon: "🆘",
      title: "طلب المساعدة",
      color: "red",
      questions: [
        { q: "你能帮我吗？", pinyin: "Nǐ néng bāng wǒ ma?", arabic: "هل يمكنك مساعدتي؟", answers: [{ zh: "当然可以。", pinyin: "Dāngrán kěyǐ.", arabic: "بالطبع." }, { zh: "没问题。", pinyin: "Méi wèntí.", arabic: "لا مشكلة." }] },
        { q: "我的手机丢了。", pinyin: "Wǒ de shǒujī diū le.", arabic: "ضاع هاتفي.", answers: [{ zh: "别着急，我帮你找。", pinyin: "Bié zháojí, wǒ bāng nǐ zhǎo.", arabic: "لا تقلق، سأساعدك في البحث." }] },
        { q: "我不舒服。", pinyin: "Wǒ bù shūfu.", arabic: "لا أشعر بالراحة.", answers: [{ zh: "要去看医生吗？", pinyin: "Yào qù kàn yīsheng ma?", arabic: "هل تريد رؤية طبيب؟" }] },
        { q: "请问洗手间在哪儿？", pinyin: "Qǐngwèn xǐshǒujiān zài nǎr?", arabic: "أين دورة المياه؟", answers: [{ zh: "在那边，右转就是。", pinyin: "Zài nàbian, yòu zhuǎn jiù shì.", arabic: "هناك، انعطف يميناً." }] },
        { q: "我迷路了。", pinyin: "Wǒ mílù le.", arabic: "ضللت الطريق.", answers: [{ zh: "你要去哪儿？我带你去。", pinyin: "Nǐ yào qù nǎr? Wǒ dài nǐ qù.", arabic: "إلى أين تريد؟ سأرافقك." }] },
      ],
    },
  ];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const colorClasses: Record<string, string> = {
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    green: "border-green-200 bg-green-50 text-green-700",
    purple: "border-purple-200 bg-purple-50 text-purple-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
    red: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">أسئلة يومية</h2>

      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden"
          >
            {/* Category Header */}
            <button
              onClick={() =>
                setExpandedCategory(
                  expandedCategory === cat.id ? null : cat.id
                )
              }
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cat.icon}</span>
                <span className="font-medium">{cat.title}</span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-xs",
                    colorClasses[cat.color]
                  )}
                >
                  {cat.questions.length} أسئلة
                </span>
              </div>
              {expandedCategory === cat.id ? (
                <ChevronRight className="w-5 h-5 text-gray-400 rotate-90" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {/* Questions */}
            {expandedCategory === cat.id && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                className="border-t border-gray-100"
              >
                {cat.questions.map((q, i) => (
                  <div
                    key={i}
                    className="p-4 border-b border-gray-50 last:border-b-0"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="text-xl font-chinese-serif text-gray-800">
                          {q.q}
                        </p>
                        <p className="text-sm text-gray-500 font-chinese-sans">
                          {q.pinyin}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {q.arabic}
                        </p>
                      </div>
                      <button
                        onClick={() => speak(q.q)}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 flex-shrink-0"
                      >
                        <Volume2 className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        setShowAnswer((prev) => ({
                          ...prev,
                          [`${cat.id}-${i}`]: !prev[`${cat.id}-${i}`],
                        }))
                      }
                      className="text-sm text-[#1A5FA8] hover:underline"
                    >
                      {showAnswer[`${cat.id}-${i}`] ? "إخفاء الجواب" : "أظهر الجواب"}
                    </button>

                    {showAnswer[`${cat.id}-${i}`] && (
                      <div className="mt-3 space-y-2">
                        {q.answers.map((a, j) => (
                          <div
                            key={j}
                            className="flex items-start justify-between gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                          >
                            <div>
                              <p className="font-chinese-sans text-gray-800">
                                {a.zh}
                              </p>
                              <p className="text-xs text-gray-500">{a.pinyin}</p>
                              <p className="text-sm text-green-700 mt-1">
                                {a.arabic}
                              </p>
                            </div>
                            <button
                              onClick={() => speak(a.zh)}
                              className="p-1.5 rounded-full bg-green-100 hover:bg-green-200"
                            >
                              <Volume2 className="w-4 h-4 text-green-600" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Practice Section
function PracticeSection() {
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const { rateWord } = useLearningStore();

  const questions = useMemo(() => {
    return vocabulary
      .sort(() => Math.random() - 0.5)
      .slice(0, 30)
      .map((word) => {
        const others = vocabulary.filter((w) => w.id !== word.id);
        const wrongAnswers = others
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((w) => w.arabic);
        const options = [...wrongAnswers, word.arabic].sort(
          () => Math.random() - 0.5
        );
        return { word, options, correct: word.arabic };
      });
  }, []);

  const current = questions[currentQuestion];

  if (!current) return null;

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    const isCorrect = answer === current.correct;
    if (isCorrect) {
      setScore((s) => ({ ...s, correct: s.correct + 1 }));
      rateWord(current.word.id, 4);
    } else {
      setScore((s) => ({ ...s, wrong: s.wrong + 1 }));
      rateWord(current.word.id, 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowResult(false);
      setSelectedAnswer(null);
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">اختبار سريع</h2>
        <p className="text-gray-500">30 سؤال عشوائي</p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {currentQuestion + 1} / {questions.length}
        </span>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            {score.correct} صحيح
          </span>
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
            {score.wrong} خطأ
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <span className="text-8xl font-chinese-serif text-gray-800 block mb-4">
            {current.word.chinese}
          </span>
          <button
            onClick={() => speak(current.word.chinese)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
          >
            <Volume2 className="w-5 h-5" />
            استمع
          </button>
        </div>

        <div className="space-y-3">
          {current.options.map((option, i) => (
            <button
              key={i}
              onClick={() => !showResult && handleAnswer(option)}
              disabled={showResult}
              className={cn(
                "w-full p-4 rounded-xl text-right transition-all font-medium",
                showResult
                  ? option === current.correct
                    ? "bg-green-100 border-2 border-green-500 text-green-700"
                    : option === selectedAnswer
                    ? "bg-red-100 border-2 border-red-500 text-red-700"
                    : "bg-gray-50 text-gray-400"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-2 border-transparent"
              )}
            >
              {option}
            </button>
          ))}
        </div>

        {showResult && currentQuestion < questions.length - 1 && (
          <button
            onClick={nextQuestion}
            className="w-full mt-6 py-3 rounded-xl bg-[#1A5FA8] text-white font-medium hover:bg-[#1A5FA8]/90"
          >
            التالي
          </button>
        )}

        {showResult && currentQuestion === questions.length - 1 && (
          <div className="mt-6 text-center">
            <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <p className="text-xl font-bold text-gray-800 mb-2">
              انتهى الاختبار!
            </p>
            <p className="text-gray-600">
              حصلت على {score.correct} من {questions.length}
            </p>
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setScore({ correct: 0, wrong: 0 });
                setShowResult(false);
                setSelectedAnswer(null);
              }}
              className="mt-4 px-6 py-2 rounded-lg bg-[#1A5FA8] text-white font-medium"
            >
              إعادة الاختبار
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Games Section
function GamesSection() {
  const [activeGame, setActiveGame] = useState<"memory" | "speed" | null>(null);

  const games = [
    {
      id: "memory",
      title: "لعبة الذاكرة",
      description: "طابق الكلمات الصينية بمعانيها العربية",
      icon: Brain,
      color: "purple",
    },
    {
      id: "speed",
      title: "لعبة السرعة",
      description: "أجب على أكبر عدد من الأسئلة في 30 ثانية",
      icon: Zap,
      color: "orange",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">الألعاب</h2>

      {!activeGame && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => setActiveGame(game.id as typeof activeGame)}
              className={cn(
                "bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all text-right",
                game.color === "purple" && "hover:border-purple-300",
                game.color === "orange" && "hover:border-orange-300"
              )}
            >
              <game.icon
                className={cn(
                  "w-12 h-12 mb-4",
                  game.color === "purple" && "text-purple-500",
                  game.color === "orange" && "text-orange-500"
                )}
              />
              <h3 className="text-lg font-bold text-gray-800">{game.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{game.description}</p>
            </button>
          ))}
        </div>
      )}

      {activeGame === "memory" && (
        <MemoryGame onBack={() => setActiveGame(null)} />
      )}

      {activeGame === "speed" && (
        <SpeedGame onBack={() => setActiveGame(null)} />
      )}
    </div>
  );
}

// Memory Game
function MemoryGame({ onBack }: { onBack: () => void }) {
  const [cards, setCards] = useState<
    { id: string; content: string; type: "chinese" | "arabic"; matched: boolean; flipped: boolean }[]
  >([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    const words = vocabulary.sort(() => Math.random() - 0.5).slice(0, 8);
    const gameCards = [
      ...words.map((w) => ({
        id: w.id + "-zh",
        content: w.chinese,
        type: "chinese" as const,
        matched: false,
        flipped: false,
      })),
      ...words.map((w) => ({
        id: w.id + "-ar",
        content: w.arabic,
        type: "arabic" as const,
        matched: false,
        flipped: false,
      })),
    ].sort(() => Math.random() - 0.5);
    setCards(gameCards);
  }, []);

  const handleCardClick = (card: typeof cards[0]) => {
    if (card.matched || card.flipped || flippedCards.length >= 2) return;

    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, card.id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;
      const firstWordId = first.replace(/-zh|-ar/, "");
      const secondWordId = second.replace(/-zh|-ar/, "");

      if (firstWordId === secondWordId && first !== second) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first || c.id === second
                ? { ...c, matched: true }
                : c
            )
          );
          setMatches((m) => m + 1);
          setFlippedCards([]);
          toast.success("ممتاز!");
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first || c.id === second
                ? { ...c, flipped: false }
                : c
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ChevronRight className="w-5 h-5" />
          رجوع
        </button>
        <div className="flex gap-4">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
            الحركات: {moves}
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            المطابقات: {matches}/8
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={cn(
              "aspect-square rounded-xl flex items-center justify-center text-lg font-medium transition-all",
              card.matched
                ? "bg-green-100 text-green-700"
                : card.flipped
                ? "bg-[#1A5FA8] text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            )}
          >
            {card.matched || card.flipped ? (
              <span
                className={cn(
                  card.type === "chinese" && "font-chinese-serif text-xl"
                )}
              >
                {card.content}
              </span>
            ) : (
              "?"
            )}
          </button>
        ))}
      </div>

      {matches === 8 && (
        <div className="text-center">
          <Award className="w-16 h-16 text-yellow-500 mx-auto mb-2" />
          <p className="text-xl font-bold text-gray-800">مبروك!</p>
          <p className="text-gray-600">أنهيت اللعبة في {moves} حركة</p>
          <button
            onClick={() => {
              setMoves(0);
              setMatches(0);
              setFlippedCards([]);
              // Re-shuffle
              const words = vocabulary.sort(() => Math.random() - 0.5).slice(0, 8);
              const gameCards = [
                ...words.map((w) => ({
                  id: w.id + "-zh",
                  content: w.chinese,
                  type: "chinese" as const,
                  matched: false,
                  flipped: false,
                })),
                ...words.map((w) => ({
                  id: w.id + "-ar",
                  content: w.arabic,
                  type: "arabic" as const,
                  matched: false,
                  flipped: false,
                })),
              ].sort(() => Math.random() - 0.5);
              setCards(gameCards);
            }}
            className="mt-4 px-6 py-2 rounded-lg bg-[#1A5FA8] text-white font-medium"
          >
            لعبة جديدة
          </button>
        </div>
      )}
    </div>
  );
}

// Speed Game
function SpeedGame({ onBack }: { onBack: () => void }) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [started, setStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const words = useMemo(
    () => vocabulary.sort(() => Math.random() - 0.5).slice(0, 50),
    []
  );

  useEffect(() => {
    if (started && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [started, timeLeft]);

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
      toast.success("+" + (streak >= 3 ? " خماسي!" : ""));
    } else {
      setStreak(0);
    }
    setCurrentWord((prev) => (prev + 1) % words.length);
  };

  if (!started) {
    return (
      <div className="text-center space-y-6">
        <Zap className="w-24 h-24 text-orange-500 mx-auto" />
        <h3 className="text-2xl font-bold text-gray-800">لعبة السرعة</h3>
        <p className="text-gray-600">
          أجب على أكبر عدد من الأسئلة في 30 ثانية
        </p>
        <button
          onClick={() => setStarted(true)}
          className="px-8 py-3 rounded-xl bg-orange-500 text-white font-bold text-lg hover:bg-orange-600"
        >
          ابدأ!
        </button>
      </div>
    );
  }

  if (timeLeft === 0) {
    return (
      <div className="text-center space-y-6">
        <Award className="w-20 h-20 text-yellow-500 mx-auto" />
        <h3 className="text-2xl font-bold text-gray-800">انتهى الوقت!</h3>
        <p className="text-3xl text-[#1A5FA8] font-bold">{score} إجابة صحيحة</p>
        <button
          onClick={onBack}
          className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium"
        >
          رجوع للألعاب
        </button>
      </div>
    );
  }

  const word = words[currentWord];
  const options = [word.arabic, ...vocabulary.filter(w => w.id !== word.id).sort(() => Math.random() - 0.5).slice(0, 3).map(w => w.arabic)].sort(() => Math.random() - 0.5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ChevronRight className="w-5 h-5" />
          إنهاء
        </button>
        <div className="flex gap-4">
          <span
            className={cn(
              "px-4 py-2 rounded-full font-bold text-lg",
              timeLeft <= 10 ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
            )}
          >
            {timeLeft} ثانية
          </span>
          <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-bold">
            {score}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md mx-auto">
        <div className="text-center mb-6">
          <span className="text-8xl font-chinese-serif text-gray-800 block">
            {word.chinese}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt === word.arabic)}
              className={cn(
                "p-4 rounded-xl border-2 transition-all",
                opt === word.arabic
                  ? "border-green-200 hover:border-green-400"
                  : "border-gray-200 hover:border-gray-400"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {streak >= 3 && (
        <p className="text-center text-orange-500 font-bold animate-pulse">
          سلسلة! {streak} ✓
        </p>
      )}
    </div>
  );
}

// Stats Section
function StatsSection() {
  const { wordProgress, currentUser } = useLearningStore();

  const totalLearned = Object.values(wordProgress).filter((p) => p.learned).length;
  const totalDue = Object.values(wordProgress).filter(
    (p) => p.learned && isDueForReview(p.srsData)
  ).length;
  const totalWeak = Object.values(wordProgress).filter(
    (p) => p.learned && p.srsData.easeFactor < 2.3
  ).length;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">الإحصائيات</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <Layers className="w-10 h-10 text-blue-500 mb-4" />
          <p className="text-3xl font-bold text-gray-800">{totalLearned}</p>
          <p className="text-sm text-gray-500">كلمة تعلمتها</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <Target className="w-10 h-10 text-orange-500 mb-4" />
          <p className="text-3xl font-bold text-gray-800">{totalDue}</p>
          <p className="text-sm text-gray-500">بطاقة مستحقة</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <TrendingUp className="w-10 h-10 text-red-500 mb-4" />
          <p className="text-3xl font-bold text-gray-800">{totalWeak}</p>
          <p className="text-sm text-gray-500">كلمة ضعيفة</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <Award className="w-10 h-10 text-green-500 mb-4" />
          <p className="text-3xl font-bold text-gray-800">{currentUser?.streak || 0}</p>
          <p className="text-sm text-gray-500">يوم متتالي</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4">التقدم الكلي</h3>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#1A5FA8] to-[#2175c9] rounded-full"
            style={{ width: `${(totalLearned / vocabulary.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {Math.round((totalLearned / vocabulary.length) * 100)}% متقن ({totalLearned}/{vocabulary.length})
        </p>
      </div>
    </div>
  );
}

// Settings Section
function SettingsSection() {
  const { currentUser, logout } = useLearningStore();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">الإعدادات</h2>

      <div className="bg-white rounded-xl p-6 border border-gray-100 space-y-6">
        <div>
          <h3 className="font-medium text-gray-800 mb-2">الحساب</h3>
          <p className="text-gray-600">الاسم: {currentUser?.name}</p>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
        >
          <LogOut className="w-5 h-5" />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}

// Help Section
function HelpSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">المساعدة</h2>

      <div className="bg-white rounded-xl p-6 border border-gray-100 space-y-4">
        <div>
          <h3 className="font-bold text-gray-800 mb-2">ما هو JISR (جِسر)؟</h3>
          <p className="text-gray-600">
            جسر هو تطبيق لتعلم اللغة الصينية للمتحدثين بالعربية. نستخدم نظام
            التكرار المتباعد (SRS) لمساعدتك على تذكر الكلمات بشكل فعال.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-gray-800 mb-2">كيف تستخدم التطبيق؟</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• راجع البطاقات يومياً للاحتفاظ بالمعلومات</li>
            <li>• أكمل الدروس بالترتيب لتعلم الأساسيات</li>
            <li>• استخدم الألعاب للتعلم بطريقة ممتعة</li>
            <li>• تتبع تقدمك في قسم الإحصائيات</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-gray-800 mb-2">ما هو SRS؟</h3>
          <p className="text-gray-600">
            SRS (Spaced Repetition System) يُظهر لك البطاقات على فترات متزايدة
            بناءً على أدائك. الكلمات الصعبة تظهر أكثر، والكلمات السهلة تظهر أقل.
          </p>
        </div>
      </div>
    </div>
  );
}

// Chevron Left for RTL
function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

// Zap icon for speed game
function Zap({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
