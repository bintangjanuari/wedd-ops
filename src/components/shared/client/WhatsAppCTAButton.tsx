import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WhatsAppCTAButtonProps {
  phoneNumber: string; // contoh: "628123456789"
  messageTemplate: string;
  label?: string; // default: "Kirim via WhatsApp"
  size?: "sm" | "md" | "lg" | "icon";
  variant?: "solid" | "outline";
  className?: string;
  onClick?: () => void;
}

export function WhatsAppCTAButton({
  phoneNumber,
  messageTemplate,
  label = "Kirim via WhatsApp",
  size = "md",
  variant = "solid",
  className,
  onClick,
}: WhatsAppCTAButtonProps) {
  // Normalisasi nomor HP ke format internasional 62
  let cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  if (cleanPhone.startsWith("0")) {
    cleanPhone = "62" + cleanPhone.slice(1);
  }

  const encodedMessage = encodeURIComponent(messageTemplate);
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5 min-h-[36px]",
    md: "px-4 py-2 text-sm gap-2 min-h-[44px]",
    lg: "px-5 py-3 text-base gap-2.5 min-h-[48px]",
    icon: "p-2.5 min-h-[44px] min-w-[44px] justify-center",
  };

  const variantClasses = {
    solid: "bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold shadow-sm active:scale-95",
    outline: "border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 font-semibold active:scale-95",
  };

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-xl transition-all select-none shrink-0",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <MessageCircle className="h-4 w-4 shrink-0" />
      {size !== "icon" && <span>{label}</span>}
    </a>
  );
}

