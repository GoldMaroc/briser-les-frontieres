import { NextResponse } from "next/server";
import { deleteSubscriberByEmail } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Suppression de l'email de la liste d'abonnés
  await deleteSubscriberByEmail(email);

  // Retourner une belle page HTML confirmant le désabonnement
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Désabonnement Réussi | Briser les Frontières</title>
      <style>
        body {
          font-family: 'Inter', system-ui, sans-serif;
          background-color: #0a1128;
          color: #f0ede8;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
          padding: 20px;
        }
        .container {
          background-color: #0d1b2a;
          border: 1px solid rgba(212, 168, 83, 0.2);
          border-radius: 4px;
          padding: 40px;
          max-width: 500px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          letter-spacing: 5px;
          color: #d4a853;
          margin-bottom: 20px;
          display: inline-block;
        }
        h1 {
          font-size: 20px;
          font-weight: 300;
          letter-spacing: 1px;
          margin-top: 0;
          color: #f0ede8;
        }
        p {
          color: #a0aec0;
          font-size: 15px;
          line-height: 1.6;
        }
        .email {
          color: #d4a853;
          font-weight: bold;
        }
        .btn {
          display: inline-block;
          margin-top: 30px;
          padding: 12px 24px;
          background-color: #d4a853;
          color: #0a1128;
          text-decoration: none;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .btn:hover {
          background-color: #e8c468;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">BLF</div>
        <h1>Désabonnement Confirmé</h1>
        <p>L'adresse e-mail <span class="email">${email}</span> a bien été retirée de notre liste de diffusion restreinte.</p>
        <p>Vous ne recevrez plus d'e-mails de newsletter de notre part. Vos données ont été traitées avec la plus grande confidentialité.</p>
        <a href="https://www.briserlesfrontieres.fr" class="btn">Retour à l'accueil</a>
      </div>
    </body>
    </html>
  `;

  return new NextResponse(htmlContent, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
