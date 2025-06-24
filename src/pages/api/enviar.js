import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function POST({ request }) {
  // Verificar método HTTP
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método no permitido' }), {
      status: 405
    });
  }

  try {
    // Verificar API key
    if (!import.meta.env.RESEND_API_KEY) {
      console.error('ERROR: RESEND_API_KEY no está configurada');
      throw new Error('Configuración del servidor incompleta');
    }

    const formData = await request.formData();
    const email = formData.get('email');
    const message = formData.get('message');

    if (!email || !message) {
      return new Response(
        JSON.stringify({ error: 'Email y mensaje son requeridos' }),
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Mr. O Gym <contacto@mrogym.com>',
      to: email,
      reply_to: 'contacto@mrogym.com', // Añadido para mejor manejo de respuestas
      subject: 'SOLICITUD DE PLAN - Mr. O Gym',
      text: message
    });

    if (error) {
      console.error('Error de Resend:', error);
      throw error;
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Mensaje enviado correctamente" 
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Error completo:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Error al procesar tu solicitud',
        details: process.env.NODE_ENV === 'development' ? error.message : null
      }),
      { status: 500 }
    );
  }
}