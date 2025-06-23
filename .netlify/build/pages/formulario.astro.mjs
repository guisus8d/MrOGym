import { e as createComponent, m as maybeRenderHead, r as renderTemplate } from '../chunks/astro/server_e4nm4Znd.mjs';
/* empty css                                      */
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Formulario = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<form method="POST" action="/api/enviar" class="space-y-4" data-astro-cid-2qdk7jpv> <div data-astro-cid-2qdk7jpv> <label for="email" class="block mb-2" data-astro-cid-2qdk7jpv>Tu email</label> <input type="email" id="email" name="email" required class="w-full p-2 border rounded" data-astro-cid-2qdk7jpv> </div> <div data-astro-cid-2qdk7jpv> <input type="hidden" id="subject" name="subject" required class="w-full p-2 border rounded" value="SOLICITUD DE PLAN" data-astro-cid-2qdk7jpv> </div> <div data-astro-cid-2qdk7jpv> <label for="message" class="block mb-2" data-astro-cid-2qdk7jpv>Mensaje</label> <textarea id="message" name="message" required rows="5" class="w-full p-2 border rounded" data-astro-cid-2qdk7jpv></textarea> </div> <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" data-astro-cid-2qdk7jpv>
Enviar Mensaje
</button> </form> `;
}, "C:/gym/site/src/pages/Formulario.astro", void 0);

const $$file = "C:/gym/site/src/pages/Formulario.astro";
const $$url = "/Formulario";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Formulario,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
