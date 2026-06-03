"use client";

import { useEffect, useState } from "react";

export default function ProtectedEmail() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <span className="text-gold italic text-sm">
        [Adresse e-mail protégée contre le spam — Activez JavaScript]
      </span>
    );
  }

  const user = "contact";
  const domain = "briserlesfrontieres.fr";

  return (
    <a 
      href={`mailto:${user}@${domain}`} 
      className="text-gold hover:underline transition-all"
      title="Envoyer un e-mail"
    >
      {user}@{domain}
    </a>
  );
}
