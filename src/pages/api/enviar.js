import { Resend } from 'resend';

export const prerender = false;

export async function POST({ request }) {
  try {
    // Versión compatible con ambos entornos
    const apiKey = process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
    
    if (!apiKey) {
      throw new Error('API key no configurada');
    }

    const resend = new Resend(apiKey);
    const formData = await request.formData();
    
    const email = formData.get('email')?.toString();
    const subject = formData.get('subject')?.toString();
    const message = formData.get('message')?.toString();

    // Validación de campos
    if (!email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Todos los campos son requeridos' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
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
            <title>${subject}</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #fbfe58; color: black; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
                .content { padding: 20px; background-color: #f9f9f9; border-left: 1px solid #ddd; border-right: 1px solid #ddd; }
                .footer { background-color: #ecf0f1; padding: 15px; text-align: center; font-size: 12px; color: #7f8c8d; border-radius: 0 0 5px 5px; border: 1px solid #ddd; }
                .logo { width: 100px; }
                .button { display: inline-block; padding: 10px 20px; background-color:rgb(229, 233, 29); color: black; text-decoration: none; border-radius: 4px; margin: 15px 0; }
                .message { background-color: white; padding: 15px; border-radius: 4px; border: 1px solid #eee; margin: 15px 0; }
                .titulo { font-size: 13px; }
            </style>
        </head>
        <body>
            <div class="header">
                <img class="logo" src="https://mrogym.com/Logo.png" alt="Mr. O Gym Logo">
                <h1>${subject}</h1>
            </div>
            <div class="content">
                <div class="message">${message}</div>
                <p class="titulo">Mensaje de envio de datos para registrarse en un plan.</p>
                <a href="https://mrogym.com/contacto" class="button">Ver más Información</a>
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
      console.error('Error de Resend:', error);
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error en el endpoint:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Error al enviar el mensaje',
        details: process.env.NODE_ENV === 'development' ? error.message : null 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}