import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_e4nm4Znd.mjs';
import { $ as $$Layout } from '../chunks/Layout_DC3WKpp9.mjs';
/* empty css                                    */
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="ContenedorInicio1" data-astro-cid-j7pv25f6> <div class="ContenedorDeInformacionInicio" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>SIN EXCUSAS</h3> <p class="Bienvenida" data-astro-cid-j7pv25f6>MR. O GYM</p> <!-- contenedor de bienvenida al citio web Mr. o gym --> <p class="textBienvenida" data-astro-cid-j7pv25f6>
Bienvenido a MR. O GYM, el lugar donde tus metas se
	  convierten en realidad. Sin excusas, comienza hoy tu
	   camino hacia un estilo de vida más saludable y activo.
</p> <!-- contenedor de botones  --> <center data-astro-cid-j7pv25f6> <div class="ContenedorDeBotones" data-astro-cid-j7pv25f6> <a href="/Horarios" class="horarios" data-astro-cid-j7pv25f6><button data-astro-cid-j7pv25f6>HORARIOS</button></a> <a href="" class="planes" data-astro-cid-j7pv25f6><button data-astro-cid-j7pv25f6>PLANES</button></a> </div> </center> </div> </div> ` })} `;
}, "C:/gym/site/src/pages/index.astro", void 0);

const $$file = "C:/gym/site/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
