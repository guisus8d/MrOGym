import { o as decodeKey } from './chunks/astro/server_e4nm4Znd.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_TS0mc556.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/gym/site/","cacheDir":"file:///C:/gym/site/node_modules/.astro/","outDir":"file:///C:/gym/site/dist/","srcDir":"file:///C:/gym/site/src/","publicDir":"file:///C:/gym/site/public/","buildClientDir":"file:///C:/gym/site/dist/","buildServerDir":"file:///C:/gym/site/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/enviar","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/enviar\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"enviar","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/enviar.js","pathname":"/api/enviar","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"a[data-astro-cid-2qdk7jpv]{text-decoration:none}\n"}],"routeData":{"route":"/formulario","isIndex":false,"type":"page","pattern":"^\\/Formulario\\/?$","segments":[[{"content":"Formulario","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Formulario.astro","pathname":"/Formulario","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Horarios.uBgUMX7E.css"},{"type":"inline","content":"body{background:#141414}\n"}],"routeData":{"route":"/horarios","isIndex":false,"type":"page","pattern":"^\\/Horarios\\/?$","segments":[[{"content":"Horarios","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Horarios.astro","pathname":"/Horarios","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Horarios.uBgUMX7E.css"},{"type":"inline","content":".ContenedorInicio1[data-astro-cid-j7pv25f6]{width:100%;height:100%;position:relative;background:url(/_astro/FondoInicio.pZFW7ZAB.svg) no-repeat;background-size:cover}.ContenedorDeInformacionInicio[data-astro-cid-j7pv25f6] h3[data-astro-cid-j7pv25f6]{color:#fff;font-family:Viga,sans-serif;margin:40px 30px auto;font-size:28px}.ContenedorDeInformacionInicio[data-astro-cid-j7pv25f6]{width:100%;height:300px;position:absolute;bottom:0;background:transparent}.Bienvenida[data-astro-cid-j7pv25f6]{color:#000;background:#fbfe58;font-family:Viga,sans-serif;width:110px;padding:5px 10px;border-radius:20px;text-align:center;margin:10px 30px;font-size:20px;filter:drop-shadow(1px,1px,1px,black)}.textBienvenida[data-astro-cid-j7pv25f6]{font-family:Sen Variable,sans-serif;color:#cfcbcb;width:85%;margin-left:30px;font-size:13px}.ContenedorDeBotones[data-astro-cid-j7pv25f6]{position:relative;width:80%;padding:10px;background:#8b8a8a79;margin-bottom:50px;border-radius:15px}.ContenedorDeBotones[data-astro-cid-j7pv25f6] button[data-astro-cid-j7pv25f6]{margin:auto 5px}.horarios[data-astro-cid-j7pv25f6] button[data-astro-cid-j7pv25f6]{border:none;padding:15px 25px;border-radius:50px;background:#cccccc81;color:#fff;display:inline-block}.planes[data-astro-cid-j7pv25f6] button[data-astro-cid-j7pv25f6]{border:none;padding:15px 25px;border-radius:50px;background:#fbfe58;color:#000;display:inline-block}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/gym/site/src/pages/Horarios.astro",{"propagation":"none","containsHead":true}],["C:/gym/site/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/api/enviar@_@js":"pages/api/enviar.astro.mjs","\u0000@astro-page:src/pages/Formulario@_@astro":"pages/formulario.astro.mjs","\u0000@astro-page:src/pages/Horarios@_@astro":"pages/horarios.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DXFHJKoG.mjs","C:/gym/site/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","C:/gym/site/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BWV8X_er.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/viga-latin-400-normal.BPFWhJeG.woff2","/_astro/sen-latin-ext-wght-normal.Cfo6xNJV.woff2","/_astro/sen-latin-wght-normal.C4JoIVNt.woff2","/_astro/viga-latin-400-normal.CQVaxBNl.woff","/_astro/FondoInicio.pZFW7ZAB.svg","/_astro/Horarios.uBgUMX7E.css","/favicon.svg","/Logo.png"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"aLc2cxj9wr9kaa/qVL4sYpI1K8h9ZuUobg+smPCszg4=","sessionConfig":{"driver":"fs-lite","options":{"base":"C:\\gym\\site\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
