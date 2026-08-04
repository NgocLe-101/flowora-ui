import { CheckCircle2, Loader2, XCircle } from "lucide-react";

export default function StatusIcon({ status }: { status: string }) {
    if (status === "running")
        return <Loader2 className="h-3.5 w-3.5 animate-spin" />;
    if (status === "success")
        return <CheckCircle2 className="h-3.5 w-3.5 text-green-500!" />;
    return <XCircle className="h-3.5 w-3.5 text-red-400!" />;
}
