import { AlertCircle } from "lucide-react";

export function ErrorDisplay({ message }) {
    if (!message) return null;

    return (
        <div className="flex items-center justify-center p-6 text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span className="font-medium">{message}</span>
        </div>
    );
}
