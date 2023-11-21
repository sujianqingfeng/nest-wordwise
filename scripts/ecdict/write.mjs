import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PrismaClient } from '@prisma/client'
import { parse } from 'csv-parse'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const CSV_FILE = 'ecdict.mini.csv'
// const CSV_FILE = 'ecdict.csv'

const resolve = (p) => path.resolve(__dirname, p)
const parseCSV = (csv) => {
  return new Promise((resolve, reject) => {
    parse(csv, (err, records) => {
      if (err) {
        reject(err)
      }
      resolve(records)
    })
  })
}

const stripWord = (str) => {
  return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
}
const defaultZero = (str, defaultValue = 0) => {
  return str ? Number(str) : defaultValue
}

const main = async () => {
  const csv = await readFile(resolve(CSV_FILE))
  const prisma = new PrismaClient()
  const records = await parseCSV(csv)

  const len = records.length
  for (let i = 1; i < len; i++) {
    const [
      word,
      phonetic,
      definition,
      translation,
      pos,
      collins,
      oxford,
      tag,
      bnc,
      frq,
      exchange,
      detail,
      audio
    ] = records[i]
    const data = {
      word,
      sw: stripWord(word),
      phonetic,
      definition,
      translation,
      pos,
      collins: defaultZero(collins),
      oxford: defaultZero(oxford),
      tag,
      bnc: defaultZero(bnc, null),
      frq: defaultZero(frq, null),
      exchange,
      detail,
      audio
    }

    await prisma.dictionary.upsert({
      where: {
        word
      },
      update: data,
      create: data
    })
    // console.log('🚀 ~ file: write.mjs:66 ~ main ~ dict:', dict)
  }

  prisma.$disconnect()
  console.log('end')
}

main()
