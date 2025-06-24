import { Resend } from 'resend';

export const prerender = false;

export async function POST({ request }) {
  // 1. Verificación EXTRA de la API Key
  const apiKey = process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
  console.log('Clave Resend cargada:', apiKey ? '***' + apiKey.slice(-4) : 'NO ENCONTRADA');

  if (!apiKey || !apiKey.startsWith('re_')) {
    console.error('Error: API Key inválida');
    return new Response(
      JSON.stringify({ 
        error: 'Error de configuración del servidor',
        details: 'API_KEY_INVALID'
      }), 
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    // 2. Parseo SEGURO del FormData
    let email, subject, message;
    
    try {
      const formData = await request.formData();
      email = formData.get('email')?.toString()?.trim();
      subject = formData.get('subject')?.toString()?.trim() || 'Sin asunto';
      message = formData.get('message')?.toString()?.trim();
    } catch (parseError) {
      console.error('Error parseando formData:', parseError);
      return new Response(
        JSON.stringify({ 
          error: 'Datos del formulario inválidos',
          details: 'INVALID_FORM_DATA'
        }),
        { status: 400 }
      );
    }

    // 3. Validación MEJORADA
    if (!email || !email.includes('@') || !email.includes('.')) {
      return new Response(
        JSON.stringify({ 
          error: 'Email inválido',
          details: { receivedEmail: email }
        }),
        { status: 400 }
      );
    }

    if (!message || message.length < 5) {
      return new Response(
        JSON.stringify({ 
          error: 'El mensaje es demasiado corto',
          details: { messageLength: message?.length }
        }),
        { status: 400 }
      );
    }

    // 4. Configuración del email CON ALTERNATIVAS
    const emailData = {
      from: 'Mr. O Gym <onboarding@resend.dev>', // Dominio temporal de Resend
      to: email,
      subject: subject,
      html: generateEmailTemplate(subject, message),
      headers: {
        'X-Entity-Ref-ID': Date.now().toString()
      }
    };

    console.log('Intentando enviar email con:', {
      to: emailData.to,
      subject: emailData.subject,
      length: emailData.html.length
    });

    // 5. Envío con timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10 seg timeout

    const { data, error } = await resend.emails.send(emailData, { signal: controller.signal });
    clearTimeout(timeout);

    if (error) {
      console.error('Error de Resend API:', {
        status: error.status,
        message: error.message,
        name: error.name
      });
      throw error;
    }

    console.log('Email enviado con éxito. ID:', data.id);
    
    return new Response(
      JSON.stringify({ 
        success: true,
        emailId: data.id
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Error COMPLETO:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    const errorDetails = {
      type: error.name,
      code: error.status || 'NO_STATUS',
      message: error.message
    };

    return new Response(
      JSON.stringify({ 
        error: 'No se pudo enviar el mensaje',
        details: process.env.NODE_ENV === 'development' ? errorDetails : null
      }),
      { status: 500 }
    );
  }
}

// Función separada para el template
function generateEmailTemplate(subject, message) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>${subject}</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #fbfe58; color: black; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .footer { background-color: #ecf0f1; padding: 15px; text-align: center; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>${subject}</h1>
        </div>
        <div class="content">
            <p>${message}</p>
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} Mr. O Gym</p>
        </div>
    </body>
    </html>
  `;
}