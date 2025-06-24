import { Resend } from 'resend';

// 1. Configura Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// 2. Maneja la solicitud POST
export async function POST({ request }) {
  try {
    // Obtiene los datos del formulario
    const formData = await request.formData();
    const email = formData.get('email');
    const message = formData.get('message');

    // Validación básica
    if (!email || !message) {
      return new Response(
        JSON.stringify({ error: 'Email y mensaje son requeridos' }),
        { status: 400 }
      );
    }

    // Envía el email (versión simplificada)
    await resend.emails.send({
      from: 'Mr. O Gym <contacto@mrogym.com>',
      to: email,
      subject: 'SOLICITUD DE PLAN - Mr. O Gym',
      text: message
    });

    // Respuesta exitosa
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );

  } catch (error) {
    // Manejo de errores
    return new Response(
      JSON.stringify({ 
        error: 'Error al enviar el mensaje',
        details: error.message 
      }),
      { status: 500 }
    );
  }
}