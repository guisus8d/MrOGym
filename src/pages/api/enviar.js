import { Resend } from 'resend';

export const prerender = false;

export async function POST({ request }) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    const formData = await request.formData();
    const email = formData.get('email')?.toString();
    const subject = formData.get('subject')?.toString();
    const message = formData.get('message')?.toString();

    // Validación básica
    if (!email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Faltan campos requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Envío del email
    const { data, error } = await resend.emails.send({
      from: 'Mr. O Gym <mrogym@mrogym.com>',
      to: [email],
      subject: subject,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${formData.get('subject')}</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background-color: #fbfe58;
                    color: black;
                    padding: 20px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-left: 1px solid #ddd;
                    border-right: 1px solid #ddd;
                }
                .footer {
                    background-color: #ecf0f1;
                    padding: 15px;
                    text-align: center;
                    font-size: 12px;
                    color: #7f8c8d;
                    border-radius: 0 0 5px 5px;
                    border-left: 1px solid #ddd;
                    border-right: 1px solid #ddd;
                    border-bottom: 1px solid #ddd;
                }
                .logo {
                    max-width: 150px;
                    height: auto;
                }
                .button {
                    
                    display: inline-block;
                    padding: 10px 20px;
                    background-color:rgb(229, 233, 29);
                    color: black;
                    text-decoration: none;
                    border-radius: 4px;
                    margin: 15px 0;
                    
                }
                .message {
                    background-color: white;
                    padding: 15px;
                    border-radius: 4px;
                    border: 1px solid #eee;
                    margin: 15px 0;
                }
                .logo{
                  width: 100px;
                }
                  .titulo{
                   font-size: 13px;
                  }

                  
            </style>
        </head>
        <body>
            <div class="header">
                <img class="logo" src="https://mrogym.com/Logo.png" alt="Mr. O Gym Logo" class="logo">
                <h1>${formData.get('subject')}</h1>
            </div>
            
            <div class="content">
                <div class="message">
                    ${formData.get('message')}
                </div>
                
                <p class="titulo">Mensaje de envio de datos para registrarse en un plan.</p>
                
                <a href="https://mrogym.com/contacto" class="button">Ver mas Infomacion</a>
            </div>
            
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Mr. O Gym. Todos los derechos reservados.</p>
                <p>
                    <a href="https://mrogym.com" style="color:rgb(29, 165, 255);">Visita nuestro sitio web</a> | 
                    <a href="https://mrogym.com/privacidad" style="color:rgb(35, 185, 255);">Política de privacidad</a>
                </p>
            </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Error Resend:', error);
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error en endpoint:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Error al enviar el mensaje',
        details: error.message 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}