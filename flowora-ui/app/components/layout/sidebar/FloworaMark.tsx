export default function FloworaMark() {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 32 32"
            fill="none"
            className="shrink-0"
        >
            <rect width="32" height="32" rx="9" fill="url(#flowora-grad)" />
            <path
                d="M9 21c3-1 3-5 6-6s3 5 6 6"
                stroke="#0F1115"
                strokeWidth="2.1"
                strokeLinecap="round"
                fill="none"
                opacity="0.92"
            />
            <path
                d="M9 12c3 1 3 5 6 6s3-5 6-6"
                stroke="#0F1115"
                strokeWidth="2.1"
                strokeLinecap="round"
                fill="none"
                opacity="0.55"
            />
            <defs>
                <linearGradient id="flowora-grad" x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0" stopColor="#4FD1C5" />
                    <stop offset="1" stopColor="#F5B454" />
                </linearGradient>
            </defs>
        </svg>
    );
}
