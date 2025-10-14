import Image from "next/image";
import React from "react";
import { MiButton, MiButtonProps } from "./Button";
import MiBadge, { BadgeProps } from "./Badge";

interface CardProps extends BadgeProps, MiButtonProps {
  titulo: string;
  imagenUrl?: string;
  type: "green" | "white" | "black";
  footer?: string;

  funcion1?: () => void;
  funcion2?: () => void;

  sku?: string;
  brand?: string;
  quantity?: number;
  price?: number;
  category?: string;
  isActive?: boolean;
  createdAt?: string;
}

export const Card: React.FC<CardProps> = ({
  titulo,
  imagenUrl = "",
  footer,
  type,
  label,
  status,
  titleBadge,
  icon,
  funcion1,
  funcion2,
  sku,
  brand,
  quantity,
  price,
  category,
  isActive,
  createdAt,
  variant,
  size,
}) => {
  // 🎨 estilos dinámicos según el tipo
  const typeClasses: Record<typeof type, string> = {
    green:
      "from-emerald-600/90 via-emerald-700 to-emerald-800 text-black hover:shadow-emerald-500/30",
    white:
      "from-black-100 via-gray-200 to-gray-300 text-gray-900 hover:shadow-gray-400/40",
    black:
      "from-gray-900 via-gray-800 to-gray-900 text-gray-100 hover:shadow-gray-800/50",
  };

  return (
    <div
      className={`card bg-gradient-to-b ${typeClasses[type]} rounded-2xl p-5 w-80 flex flex-col items-center shadow-xl gap-4 transition-all duration-300 hover:-translate-y-1`}
    >
      {/* Badge */}
      <MiBadge
        label={label}
        status={status}
        icon={icon}
        titleBadge={titleBadge}
      />

      {/* Imagen */}
      <div className="w-full flex justify-center">
        <Image
          src={imagenUrl || "/placeholder.png"}
          width={180}
          height={180}
          alt={titulo}
          className="rounded-xl object-cover shadow-md border border-white/10"
        />
      </div>

      {/* Título */}
      <h3 className="text-xl font-semibold text-center mt-2">{titulo}</h3>

      {/* Info del producto */}
      <div className="text-sm w-full px-3 space-y-1 mt-1 font-light">
        {sku && (
          <p>
            <span className="font-medium">SKU:</span> {sku}
          </p>
        )}
        {brand && (
          <p>
            <span className="font-medium">Marca:</span> {brand}
          </p>
        )}
        {category && (
          <p>
            <span className="font-medium">Categoría:</span> {category}
          </p>
        )}
        {quantity !== undefined && (
          <p>
            <span className="font-medium">Cantidad:</span> {quantity}
          </p>
        )}
        {price !== undefined && (
          <p>
            <span className="font-medium">Precio:</span>{" "}
            <span className="font-semibold text-amber-400">
              ${price.toLocaleString()}
            </span>
          </p>
        )}
        {isActive !== undefined && (
          <p>
            <span className="font-medium">Estado:</span>{" "}
            <span
              className={`font-semibold ${
                isActive ? "text-green-400" : "text-red-400"
              }`}
            >
              {isActive ? "Activo" : "Inactivo"}
            </span>
          </p>
        )}
        {createdAt && (
          <p>
            <span className="font-medium">Creado:</span>{" "}
            {new Date(createdAt).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Botones */}
      <div className="flex justify-between gap-3 mt-4 w-full">
        <MiButton
          textButton="Editar"
          click={funcion1}
          variant={variant || "primary"}
          size={size || "sm"}
        />
        <MiButton
          textButton="Eliminar"
          click={funcion2}
          variant={variant || "danger"}
          size={size || "sm"}
        />
      </div>

      {/* Footer opcional */}
      {footer && (
        <div className="mt-3 text-sm text-center italic opacity-80">
          {footer}
        </div>
      )}
    </div>
  );
};
