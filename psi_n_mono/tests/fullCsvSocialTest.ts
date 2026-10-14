import { parseRedesSociais } from '../src/composables/parseRedesSociais.ts'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const CSV_PATH = resolve(__dirname, '../../psi_n_mono_back/tests/acesso_em_hoje.csv')
const OUTPUT_PATH = resolve(__dirname, 'fullCsvSocialTest-output.json')

interface LinhaCSV {
  col_posicao: string
  nome: string
  pronomes: string
  cidadeRegiaoAtendimento: string
  atendeADistancia: string
  telefoneCelular: string
  temWhatsapp: string
  abordagemEspecialidades: string
  possibilidadeAtendimentoSocial: string
  atendeConvenio: string
  redesSociais: string
}

interface ResultadoLinha {
  posicao: string
  nome: string
  redesSociais_original: string
  conversoes: { rede: string; url: string; nick: string }[]
}

function parseCSV(texto: string): LinhaCSV[] {
  const linhas = texto.trim().split('\n')
  if (linhas.length === 0) return []

  let indiceCabecalho = 0
  for (let i = 0; i < linhas.length; i++) {
    if (linhas[i].includes('Nome') && linhas[i].includes('Redes Sociais')) {
      indiceCabecalho = i
      break
    }
  }
  
  const cabecalhos = linhas[indiceCabecalho].split(',').map(h => h.trim().replace(/^"|"$/g, ''))
  
  const resultados: LinhaCSV[] = []
  
  for (let i = indiceCabecalho + 1; i < linhas.length; i++) {
    const valores = parseCSVLinha(linhas[i])
    if (valores.length !== cabecalhos.length) continue
    
    const obj: Record<string, string> = {}
    cabecalhos.forEach((cabecalho, idx) => {
      obj[cabecalho] = valores[idx]?.trim().replace(/^"|"$/g, '') || ''
    })
    
    if (obj['Nome']) {
      resultados.push({
        col_posicao: obj['Carimbo de data/hora'] || '',
        nome: obj['Nome'] || '',
        pronomes: obj['Pronomes'] || '',
        cidadeRegiaoAtendimento: obj['Cidade ou região que atende'] || '',
        atendeADistancia: obj['Faz atendimento à distância (online)'] || '',
        telefoneCelular: obj['Telefone/Celular'] || '',
        temWhatsapp: obj['Tem whatsapp?'] || '',
        abordagemEspecialidades: obj['Abordagem e Especialidades'] || '',
        possibilidadeAtendimentoSocial: obj['Possibilidade de atendimento social '] || '',
        atendeConvenio: obj['Atende convênio?'] || '',
        redesSociais: obj['Redes Sociais'] || '',
      })
    }
  }
  
  return resultados
}

function parseCSVLinha(linha: string): string[] {
  const resultado: string[] = []
  let atual = ''
  let dentroDeAspas = false
  
  for (let i = 0; i < linha.length; i++) {
    const char = linha[i]
    const proxChar = linha[i + 1]
    
    if (char === '"') {
      if (dentroDeAspas && proxChar === '"') {
        atual += '"'
        i++
      } else {
        dentroDeAspas = !dentroDeAspas
      }
    } else if (char === ',' && !dentroDeAspas) {
      resultado.push(atual)
      atual = ''
    } else {
      atual += char
    }
  }
  resultado.push(atual)
  return resultado
}

function main() {
  console.log('=== TESTE COMPLETO DA COLUNA REDES SOCIAIS (CSV LOCAL) ===')
  console.log(`Lendo CSV de: ${CSV_PATH}`)
  console.log(`Salvando saída em: ${OUTPUT_PATH}\n`)
  
  try {
    const csvText = readFileSync(CSV_PATH, 'utf-8')
    const linhas = parseCSV(csvText)
    
    console.log(`Total de linhas no CSV: ${linhas.length}`)
    
    const linhasComRedes = linhas.filter(l => l.redesSociais.trim())
    console.log(`Linhas com "Redes Sociais" preenchido: ${linhasComRedes.length}\n`)
    
    console.log('--- PROCESSANDO ---\n')
    
    let totalConversoes = 0
    let totalLinhasProcessadas = 0
    const resultados: ResultadoLinha[] = []
    const statsPorRede: Record<string, number> = {}
    
    for (const linha of linhasComRedes) {
      totalLinhasProcessadas++
      const original = linha.redesSociais
      const conversoes = parseRedesSociais(original)
      
      if (conversoes.length > 0) {
        totalConversoes += conversoes.length
      }
      
      const resultado: ResultadoLinha = {
        posicao: linha.col_posicao,
        nome: linha.nome,
        redesSociais_original: original,
        conversoes: conversoes.map(r => ({
          rede: r.rede,
          url: r.url,
          nick: r.nick
        }))
      }
      resultados.push(resultado)
      
      for (const c of conversoes) {
        statsPorRede[c.rede] = (statsPorRede[c.rede] || 0) + 1
      }
    }
    
    // Salva o arquivo JSON completo
    const saidaCompleta = {
      metadata: {
        totalLinhasCSV: linhas.length,
        linhasComRedesSociais: totalLinhasProcessadas,
        totalConversoes: totalConversoes,
        mediaLinksPorLinha: Number((totalConversoes / totalLinhasProcessadas).toFixed(2)),
        estatisticasPorRede: statsPorRede,
        geradoEm: new Date().toISOString()
      },
      resultados
    }
    
    writeFileSync(OUTPUT_PATH, JSON.stringify(saidaCompleta, null, 2), 'utf-8')
    
    console.log('\n=== RESUMO ===')
    console.log(`Linhas processadas: ${totalLinhasProcessadas}`)
    console.log(`Total de conversões geradas: ${totalConversoes}`)
    console.log(`Média de links por linha: ${(totalConversoes / totalLinhasProcessadas).toFixed(2)}`)
    console.log(`\nArquivo salvo em: ${OUTPUT_PATH}`)
    
    console.log('\n--- ESTATÍSTICAS POR REDE ---')
    for (const [rede, count] of Object.entries(statsPorRede).sort((a, b) => b[1] - a[1])) {
      console.log(`  ${rede}: ${count}`)
    }
  } catch (error) {
    console.error('Erro:', error)
    process.exit(1)
  }
}

main()