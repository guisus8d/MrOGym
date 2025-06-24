import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST({ request }) {
  try {
    // 1. Obtener datos del formulario
    const formData = await request.formData();
    const email = formData.get('email');
    const message = formData.get('message');

    // 2. Validaciones básicas
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Email inválido' }), { 
        status: 400 
      });
    }

    if (!message || message.length < 10) {
      return new Response(JSON.stringify({ error: 'Mensaje muy corto (mínimo 10 caracteres)' }), { 
        status: 400 
      });
    }

    // 3. Enviar email
    const { data, error } = await resend.emails.send({
      from: 'Mr. O Gym <contacto@mrogym.com>',
      to: email,
      subject: 'SOLICITUD DE PLAN - Mr. O Gym',
      html: `<p>Hemos recibido tu mensaje:</p><p>${message}</p><p>Te contactaremos pronto.</p>`
    });

    if (error) {
      throw error;
    }

    // 4. Respuesta exitosa
    return new Response(JSON.stringify({ 
      success: true,
      message: 'Email enviado correctamente' 
    }), { 
      status: 200 
    });

  } catch (error) {
    // 5. Manejo de errores
    return new Response(JSON.stringify({ 
      error: 'Error al enviar el email',
      details: error.message 
    }), { 
      status: 500 
    });
  }
}