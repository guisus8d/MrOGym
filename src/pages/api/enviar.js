import { Resend } from 'resend';

// Asegúrate de exportar prerender como false
export const prerender = false;

export async function POST({ request }) {
  try {
    const resend = new Resend(import.meta.env.RESEND_API_KEY);
    const data = await request.formData();
    
    const email = data.get('email');
    const subject = data.get('subject');
    const message = data.get('message');

    if (!email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { data: resendData, error } = await resend.emails.send({
      from: 'Mr. O Gym <mrogym@mrogym.com>',
      to: [email],
      subject: subject,
      html: `... (tu template HTML) ...`
    });

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, data: resendData }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}