"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const questionsByCategory: Record<string, { id: number; question: string; options: string[]; correct: number }[]> = {
  quran: [
    {
      id: 1,
      question: "How many Surahs are in the Holy Quran?",
      options: ["110", "114", "120", "99"],
      correct: 1,
    },
    {
      id: 2,
      question: "Which is the longest Surah in the Quran?",
      options: ["Al-Fatiha", "Al-Baqarah", "Yaseen", "Al-Kahf"],
      correct: 1,
    },
    {
      id: 3,
      question: "Which Surah is known as the 'Heart of the Quran'?",
      options: ["Al-Fatiha", "Yaseen", "Al-Rahman", "Al-Mulk"],
      correct: 1,
    },
    {
      id: 4,
      question: "How many Juz (parts) are in the Quran?",
      options: ["20", "25", "30", "40"],
      correct: 2,
    },
    {
      id: 5,
      question: "Which Surah does not start with Bismillah?",
      options: ["Al-Fatiha", "Al-Tawbah", "Al-Nas", "Al-Ikhlas"],
      correct: 1,
    },
  ],
  hadith: [
    {
      id: 1,
      question: "Which book is considered the most authentic after the Quran?",
      options: ["Sahih Muslim", "Sahih Bukhari", "Sunan Abu Dawud", "Muwatta Malik"],
      correct: 1,
    },
    {
      id: 2,
      question: "Who compiled Sahih Bukhari?",
      options: ["Imam Muslim", "Imam Bukhari", "Imam Tirmidhi", "Imam Nawawi"],
      correct: 1,
    },
    {
      id: 3,
      question: "How many Hadith are in Sahih Bukhari (approximately)?",
      options: ["2,000", "4,000", "7,000", "10,000"],
      correct: 2,
    },
    {
      id: 4,
      question: "What is the meaning of 'Hadith'?",
      options: ["Recitation", "Narration/Saying", "Prayer", "Fasting"],
      correct: 1,
    },
    {
      id: 5,
      question: "Which is NOT one of the Kutub al-Sittah (six books)?",
      options: ["Sahih Bukhari", "Sahih Muslim", "Muwatta Malik", "Sunan Ibn Majah"],
      correct: 2,
    },
  ],
  seerah: [
    {
      id: 1,
      question: "In which city was Prophet Muhammad ﷺ born?",
      options: ["Madinah", "Makkah", "Taif", "Jerusalem"],
      correct: 1,
    },
    {
      id: 2,
      question: "What was the name of the Prophet's ﷺ mother?",
      options: ["Khadijah", "Aminah", "Fatimah", "Aisha"],
      correct: 1,
    },
    {
      id: 3,
      question: "At what age did the Prophet ﷺ receive the first revelation?",
      options: ["25", "30", "40", "50"],
      correct: 2,
    },
    {
      id: 4,
      question: "In which cave did the Prophet ﷺ receive the first revelation?",
      options: ["Cave of Thawr", "Cave of Hira", "Cave of Uhud", "Cave of Badr"],
      correct: 1,
    },
    {
      id: 5,
      question: "In which year did the Hijrah (migration to Madinah) take place?",
      options: ["610 CE", "620 CE", "622 CE", "630 CE"],
      correct: 2,
    },
  ],
  fiqh: [
    {
      id: 1,
      question: "How many pillars of Islam are there?",
      options: ["3", "4", "5", "6"],
      correct: 2,
    },
    {
      id: 2,
      question: "How many times is Salah (prayer) obligatory daily?",
      options: ["3", "4", "5", "6"],
      correct: 2,
    },
    {
      id: 3,
      question: "What is the percentage of Zakat on wealth?",
      options: ["1%", "2.5%", "5%", "10%"],
      correct: 1,
    },
    {
      id: 4,
      question: "In which month is fasting obligatory?",
      options: ["Muharram", "Rajab", "Ramadan", "Shawwal"],
      correct: 2,
    },
    {
      id: 5,
      question: "What is the first pillar of Islam?",
      options: ["Salah", "Zakat", "Shahada", "Hajj"],
      correct: 2,
    },
  ],
  history: [
    {
      id: 1,
      question: "Who was the first Caliph after the Prophet ﷺ?",
      options: ["Umar ibn Khattab", "Abu Bakr", "Uthman ibn Affan", "Ali ibn Abi Talib"],
      correct: 1,
    },
    {
      id: 2,
      question: "In which battle did the Muslims defeat the Quraysh first?",
      options: ["Battle of Uhud", "Battle of Badr", "Battle of Khandaq", "Battle of Hunayn"],
      correct: 1,
    },
    {
      id: 3,
      question: "Who built the Dome of the Rock in Jerusalem?",
      options: ["Umar ibn Khattab", "Abd al-Malik ibn Marwan", "Suleiman the Magnificent", "Salahuddin Ayyubi"],
      correct: 1,
    },
    {
      id: 4,
      question: "Who was known as 'Salahuddin Ayyubi' in the West?",
      options: ["Saladin", "Sultan", "Khalid", "Harun"],
      correct: 0,
    },
    {
      id: 5,
      question: "Which city was the capital of the Abbasid Caliphate?",
      options: ["Damascus", "Baghdad", "Cairo", "Istanbul"],
      correct: 1,
    },
  ],
  prophets: [
    {
      id: 1,
      question: "Which angel brought revelation to the Prophet ﷺ?",
      options: ["Mikail", "Israfil", "Jibreel", "Azrail"],
      correct: 2,
    },
    {
      id: 2,
      question: "Who was the first prophet?",
      options: ["Ibrahim", "Nuh", "Adam", "Musa"],
      correct: 2,
    },
    {
      id: 3,
      question: "Which prophet built the Kaaba with his son?",
      options: ["Musa", "Ibrahim", "Nuh", "Sulaiman"],
      correct: 1,
    },
    {
      id: 4,
      question: "Which prophet was swallowed by a whale?",
      options: ["Yunus", "Yusuf", "Ayyub", "Ilyas"],
      correct: 0,
    },
    {
      id: 5,
      question: "Which prophet could speak to animals?",
      options: ["Sulaiman", "Dawud", "Isa", "Yaqub"],
      correct: 0,
    },
  ],
};

const generalQuestions = questionsByCategory.quran;

function QuizContent()  {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "quran";
  const currentQuestions = questionsByCategory[category] || generalQuestions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = currentQuestions[currentIndex];
  const totalQuestions = currentQuestions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  // ... baaki code same rahega

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === currentQuestion.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
  };

  // Result Screen
  if (showResult) {
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full rounded-2xl border border-emerald-100 bg-white p-10 text-center shadow-xl">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? "🏆" : percentage >= 50 ? "👍" : "📚"}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quiz Complete!
          </h1>
          <p className="text-gray-600 mb-8">
            {percentage >= 80
              ? "MashaAllah! Excellent performance."
              : percentage >= 50
              ? "Good effort! Keep learning."
              : "Keep practicing, you'll improve!"}
          </p>

          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 mb-8">
            <div className="text-sm text-emerald-700 font-medium mb-1">
              Your Score
            </div>
            <div className="text-5xl font-bold text-emerald-800">
              {score}/{totalQuestions}
            </div>
            <div className="text-sm text-emerald-600 mt-1">
              {percentage}% correct
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleRestart}
              className="rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800 transition"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Quiz Screen
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      {/* Navbar */}
      <nav className="border-b border-emerald-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
              <span className="text-white font-bold text-sm">IQ</span>
            </div>
            <span className="text-xl font-bold text-emerald-900">
              IslamicQuiz
            </span>
          </Link>
          <div className="text-sm font-medium text-gray-600">
            Score: <span className="text-emerald-700 font-bold">{score}</span>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-700 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isCorrect = index === currentQuestion.correct;
              const isSelected = index === selectedAnswer;

              let buttonStyle =
                "border-gray-200 bg-white hover:border-emerald-400 hover:bg-emerald-50";

              if (isAnswered) {
                if (isCorrect) {
                  buttonStyle =
                    "border-emerald-500 bg-emerald-50 text-emerald-900";
                } else if (isSelected) {
                  buttonStyle = "border-red-400 bg-red-50 text-red-900";
                } else {
                  buttonStyle = "border-gray-200 bg-gray-50 text-gray-400";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                  className={`w-full text-left rounded-xl border-2 px-5 py-4 font-medium transition-all ${buttonStyle} ${
                    !isAnswered ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {isAnswered && isCorrect && (
                      <span className="text-emerald-600 font-bold">✓</span>
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <span className="text-red-500 font-bold">✗</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        {isAnswered && (
          <button
            onClick={handleNext}
            className="w-full rounded-lg bg-emerald-700 px-6 py-4 font-semibold text-white hover:bg-emerald-800 transition shadow-lg shadow-emerald-700/20"
          >
            {currentIndex + 1 === totalQuestions
              ? "See Results"
              : "Next Question →"}
          </button>
        )}
      </div>
    </main>
  );
}
export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-emerald-700 font-medium">Loading quiz...</div>
      </div>
    }>
      <QuizContent />
    </Suspense>
  );
}