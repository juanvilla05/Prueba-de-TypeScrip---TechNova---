import React from "react";

type BadgeVariant = "success" | "warning" | "error" | "info";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const Badge: React.FC<BadgeProps> = ({ label, variant = "info" }) => {
  const className = `badge badge-${variant}`;
  return <span className={className}>{label}</span>;
};

export default Badge;
