import { Resend } from 'resend';

// 1. Configura Resend
const resend = new Resend(import.meta.env.RESEND_API_KEY);

// 2. Maneja la solicitud POST
export async function POST({ request }) {
  try {
    // Verifica que la API key esté presente
    if (!import.meta.env.RESEND_API_KEY) {
      throw new Error('API key de Resend no configurada');
    }

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

    // Envía el email
    const { data, error } = await resend.emails.send({
      from: 'Mr. O Gym <contacto@mrogym.com>',
      to: email,
      subject: 'SOLICITUD DE PLAN - Mr. O Gym',
      text: message
    });

    if (error) {
      throw error;
    }

    // Respuesta exitosa
    return new Response(
      JSON.stringify({ success: true, data }),
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