const { Resend } = require('resend');

// Netlify Function handler
exports.handler = async (event, context) => {
  // Solo aceptar POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método no permitido' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    if (!process.env.RESEND_API_KEY) {
      console.error('ERROR: Falta API key de Resend');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Configuración del servidor incompleta' })
      };
    }

    const body = JSON.parse(event.body);
    const { email, message } = body;

    if (!email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email y mensaje son requeridos' }),
        headers: {
          'Content-Type': 'application/json'
        }
      };
    }

    const { data, error } = await resend.emails.send({
      from: 'Mr. O Gym <contacto@mrogym.com>',
      to: email,
      reply_to: 'contacto@mrogym.com',
      subject: 'SOLICITUD DE PLAN - Mr. O Gym',
      text: message
    });

    if (error) {
      console.error('Error de Resend:', error);
      throw error;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: "Mensaje enviado correctamente",
        emailId: data.id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

  } catch (error) {
    console.error('Error completo:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Error al procesar tu solicitud',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Contacta al soporte'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
};