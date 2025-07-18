import PageLayout from "@/components/PageLayout";

export default function Dashboard() {
  return (
    <PageLayout>
      {/* Başlık ve ikon */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl"
          style={{ background: "var(--dashboard-accent)" }}
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-1">
            Yazılımcı Dashboard'u
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base">
            Yönetim paneline hoş geldiniz!
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
