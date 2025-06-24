import { Resend } from 'resend';

export const prerender = false;

export async function POST({ request }) {
  // Debug: Verificar variables de entorno
  console.log('Mode:', process.env.NODE_ENV);
  console.log('Resend Key:', process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY);

  try {
    const apiKey = process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
    
    if (!apiKey) {
      console.error('ERROR: API key no configurada');
      throw new Error('Configuración del servidor incompleta');
    }

    const resend = new Resend(apiKey);
    const formData = await request.formData();
    
    const email = formData.get('email')?.toString();
    const subject = formData.get('subject')?.toString();
    const message = formData.get('message')?.toString();

    // Validación mejorada
    if (!email?.includes('@') || !subject || !message) {
      return new Response(
        JSON.stringify({ 
          error: 'Datos inválidos',
          details: {
            email: !!email,
            validEmail: email?.includes('@'),
            subject: !!subject,
            message: !!message
          }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Configuración del email con valores por defecto
    const emailOptions = {
      from: 'Mr. O Gym <onboarding@resend.dev>', // Usar dominio de Resend temporal
      to: email,
      subject: subject || 'Sin asunto',
      html: buildEmailTemplate(subject, message)
    };

    console.log('Enviando email con opciones:', emailOptions);

    const { data, error } = await resend.emails.send(emailOptions);

    if (error) {
      console.error('Error de Resend:', JSON.stringify(error, null, 2));
      throw new Error(error.message);
    }

    console.log('Email enviado con éxito:', data.id);
    
    return new Response(
      JSON.stringify({ 
        success: true,
        emailId: data.id
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error completo:', {
      message: error.message,
      stack: error.stack,
      date: new Date().toISOString()
    });

    return new Response(
      JSON.stringify({ 
        error: 'Error al procesar tu solicitud',
        details: process.env.NODE_ENV === 'development' ? {
          message: error.message,
          type: error.constructor.name
        } : null
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Función separada para el template
function buildEmailTemplate(subject, message) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>${subject}</title>
        <style>
            /* Tus estilos aquí */
        </style>
    </head>
    <body>
        <!-- Tu template HTML aquí -->
    </body>
    </html>
  `;
}