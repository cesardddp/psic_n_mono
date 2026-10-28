export type RedeSocial = {
  rede: string;
  url: string;
  nick: string;
}

const plataformas = [
  'instagram',
  'facebook',
  'linkedin',
  'twitter',
  'tiktok',
  'youtube',
  'whatsapp',
  'telegram',
]

function removePontuacaoFinal(valor: string) {
  return valor.replace(/[.,;:!?]+$/g, '').replace(/[)\]}]+$/g, '')
}

function classificaRede(url: string): RedeSocial {
  const urlComProtocolo = /^https?:\/\//i.test(url) ? url : `https://${url}`
  const endereco = new URL(urlComProtocolo)
  const host = endereco.hostname.toLowerCase().replace(/^www\./, '')
  const rede = plataformas.find((plataforma) => host === `${plataforma}.com` || host.endsWith(`.${plataforma}.com`)) || 'site'
  const caminho = endereco.pathname.replace(/\/+$/, '')
  const nick = caminho.split('/').filter(Boolean).at(-1) || host

  return { rede, url: urlComProtocolo, nick: rede === 'site' ? host : nick }
}

export function parseRedesSociais(valor: string | undefined | null): RedeSocial[] {
  const texto = valor?.trim() || ''
  if (!texto) return []

  const encontrados: RedeSocial[] = []
  const adicionar = (url: string) => {
    const limpo = removePontuacaoFinal(url)
    if (!limpo || encontrados.some((item) => item.url.toLowerCase() === limpo.toLowerCase())) return

    try {
      encontrados.push(classificaRede(limpo))
    } catch {
      // Ignora fragmentos que parecem links, mas não formam uma URL válida.
    }
  }

  const urls = texto.match(/(?:https?:\/\/|www\.)[^\s,;]+|(?<![@\w])(?:[\w-]+\.)+(?:com|com\.br|org|org\.br|net|link|me|cc|io|br)(?:\/[^\s,;]*)?/gi) || []
  urls.forEach((url: string) => adicionar(url))

  const usuarios = /(^|[^\w])@([a-z0-9][a-z0-9._-]{1,})/gi
  for (const encontrado of texto.matchAll(usuarios)) {
    adicionar(`https://instagram.com/${encontrado[2]}`)
  }

  const instagramSemArroba = /(?:(?:instagram|insta)\b|\big\b)\s*[:\-/]?\s*([a-z][a-z0-9._-]{2,})/gi
  for (const encontrado of texto.matchAll(instagramSemArroba)) {
    if (!['http', 'https', 'www'].includes(encontrado[1].toLowerCase()) && !encontrado[1].includes('.com')) {
      adicionar(`https://instagram.com/${encontrado[1]}`)
    }
  }

  const usuarioSolto = /^[a-z0-9][a-z0-9._-]{2,}$/i
  if (!encontrados.length && usuarioSolto.test(texto)) {
    adicionar(`https://instagram.com/${texto}`)
  }

  return encontrados
}
