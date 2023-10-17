console.log('start')
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'csv-parse'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const CSV_FILE = 'ecdict.mini.csv'
// const CSV_FILE = 'ecdict.csv'

const resolve = (p) => path.resolve(__dirname, p)

const main = async () => {
  const csv = await readFile(resolve(CSV_FILE))
  parse(csv, (err, records) => {
    console.log('🚀 ~ file: write.mjs:16 ~ parse ~ t:', err)
    console.log('🚀 ~ file: write.mjs:17 ~ parse ~ records:', records)
  })
}

main()

