import { CommonEngine } from '@angular/ssr/node'
import { render } from '@netlify/angular-runtime/common-engine.mjs'

const commonEngine = new CommonEngine()

export async function netlifyCommonEngineHandler(request: Request, context: any): Promise<Response> {
  const url = new URL(request.url)

  // ✅ Ejemplo opcional de endpoints API (puedes agregar más)
  if (url.pathname === '/api/hello') {
    return Response.json({ message: 'Hola desde Netlify!' })
  }

  // ✅ Renderiza tu aplicación Angular Universal
  return await render(commonEngine)
}
