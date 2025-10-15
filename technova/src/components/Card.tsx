import React from "react";
import { IProduct } from "@/interfaces/product";
import Button from "@/components/Button";
import Badge from "@/components/Badge";

interface CardProps {
  product: IProduct;
  onDelete: (id: string) => void;
  onEdit?: (product: IProduct) => void;
}

const Card: React.FC<CardProps> = ({ product, onDelete, onEdit }) => {
  const { _id, name, price, category, imageUrl, isActive, brand } = product;

  return (
    <div className="card">
      <img src={imageUrl || "https://via.placeholder.com/150"} alt={name} />
      <div className="card-title">{name}</div>
      <div className="card-price">💲{price}</div>
      <Badge
        label={isActive ? "Activo" : "Inactivo"}
        variant={isActive ? "success" : "error"}
      />
      <Badge label={category} variant="info" />
      <Badge label={brand} variant="warning" />
      <div className="card-actions">
        {onEdit && (
          <Button
            label="Editar"
            variant="primary"
            size="small"
            onClick={() => onEdit(product)}
          />
        )}
        <Button
          label="Eliminar"
          variant="secondary"
          size="small"
          onClick={() => onDelete(_id!)}
        />
      </div>
    </div>
  );
};

export default Card;
