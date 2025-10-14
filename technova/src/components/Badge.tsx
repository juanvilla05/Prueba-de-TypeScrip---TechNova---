import React from 'react'
export interface BadgeProps {
    label:string; // texto del badge.
    status?:"succes"|"warning"|"info"|"error"|"neutral"; // define color y estilo (default: "neutral").
    icon?: React.ReactNode; //ícono opcional.
    titleBadge?: string; // texto para tooltip o accesibilidad.
};


export default function MiBadge({label,status,icon,titleBadge}:BadgeProps){
  return (
    <div className={`badge ${status}`}>
      <h1>{titleBadge}</h1>
      {icon && <span className='badgeIcon'>{icon}</span>}
      <p className='badgeLabel'>{label}</p>
    </div>
  );
};
