import assert from 'node:assert/strict'
import { parseRedesSociais } from '../src/composables/parseRedesSociais.ts'

type Caso = {
  entrada: string;
  esperado: string[];
}

const casos: Caso[] = [
  {
    entrada: '@psic.andressa.amp',
    esperado: ['https://instagram.com/psic.andressa.amp'],
  },
  {
    entrada: '@psi_gessycacaroline',
    esperado: ['https://instagram.com/psi_gessycacaroline'],
  },
  {
    entrada: '@psicamilabsalerno',
    esperado: ['https://instagram.com/psicamilabsalerno'],
  },
  {
    entrada: '@camipsicologia',
    esperado: ['https://instagram.com/camipsicologia'],
  },
  {
    entrada: '@arunpsicologia',
    esperado: ['https://instagram.com/arunpsicologia'],
  },
  {
    entrada: '@ssmmyradonatopsi',
    esperado: ['https://instagram.com/ssmmyradonatopsi'],
  },
  {
    entrada: '@marcela.pereirarosa',
    esperado: ['https://instagram.com/marcela.pereirarosa'],
  },
  {
    entrada: '@pompeo.psi',
    esperado: ['https://instagram.com/pompeo.psi'],
  },
  {
    entrada: '@amanda.almeida.psi',
    esperado: ['https://instagram.com/amanda.almeida.psi'],
  },
  {
    entrada: '@psiravediniz',
    esperado: ['https://instagram.com/psiravediniz'],
  },
  {
    entrada: '@psi.alexiazara',
    esperado: ['https://instagram.com/psi.alexiazara'],
  },
  {
    entrada: 'matheuscarvalhopsico5',
    esperado: ['https://instagram.com/matheuscarvalhopsico5'],
  },
  {
    entrada: '@alexandreromansine',
    esperado: ['https://instagram.com/alexandreromansine'],
  },
  {
    entrada: '@psicologoash',
    esperado: ['https://instagram.com/psicologoash'],
  },
  {
    entrada: 'IG: @psievandrosoares',
    esperado: ['https://instagram.com/psievandrosoares'],
  },
  {
    entrada: 'Meu insta https://www.instagram.com/diversa.psi/ e meu site: https://terezinhaoliveira.com/',
    esperado: ['https://www.instagram.com/diversa.psi/', 'https://terezinhaoliveira.com/'],
  },
  {
    entrada: 'www.jessicaneri.com.br/Instagram: @psi.jessica.cabral',
    esperado: ['https://www.jessicaneri.com.br/Instagram', 'https://instagram.com/psi.jessica.cabral'],
  },
  {
    entrada: 'Instagram: @alinemendes.m Facebook: Psicóloga Nayara Lima',
    esperado: ['https://instagram.com/alinemendes.m'],
  },
  {
    entrada: 'https://www.facebook.com/Micheli-Paula-263422954360626/',
    esperado: ['https://www.facebook.com/Micheli-Paula-263422954360626/'],
  },
  {
    entrada: 'psivargas.com.br',
    esperado: ['https://psivargas.com.br'],
  },
  {
    entrada: 'Ainda não tenho redes sociais profissionais...',
    esperado: [],
  },
]

for (const caso of casos) {
  const resultado = parseRedesSociais(caso.entrada)
  const urls = resultado.map((rede) => rede.url)

  console.log(JSON.stringify({ entrada: caso.entrada, conversoes: resultado }, null, 2))
  assert.deepEqual(urls, caso.esperado)
}

console.log(`OK: ${casos.length} conversões testadas`)
