"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const progressData = [
  { month: "Jan", score: 58 },
  { month: "Feb", score: 63 },
  { month: "Mar", score: 67 },
  { month: "Apr", score: 71 },
  { month: "May", score: 74 },
  { month: "Jun", score: 76 },
];

const sectionData = [
  { name: "Keywords", value: 65 },
  { name: "Skills", value: 65 },
  { name: "Experience", value: 80 },
  { name: "Structure", value: 90 },
  { name: "Formatting", value: 62 },
  { name: "Readability", value: 85 },
];

const keywordData = [
  { name: "Matched", value: 8 },
  { name: "Missing", value: 4 },
];

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

const PIE_COLORS = ["#22C55E", "#EF4444"];

export default function AnalyticsCharts() {
  return (
    <div className="space-y-8">

      {/* Resume Progress */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-bold text-white">
          Resume Improvement Progress
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Track how your ATS score has improved over time.
        </p>

        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3B82F6"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Score Breakdown */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-bold text-white">
          ATS Score Breakdown
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Compare every section of your resume.
        </p>

        <div className="mt-6 h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip />
              <Legend />

              <Bar dataKey="value">
                {sectionData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Keyword Match */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-bold text-white">
          Keyword Match
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Matched vs missing keywords.
        </p>

        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={keywordData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {keywordData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={PIE_COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}