import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { Test, TestingModule } from '@nestjs/testing'
import { ParseService } from '../parse.service'

describe('ParseService', () => {
  let service: ParseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParseService]
    }).compile()

    service = module.get<ParseService>(ParseService)
  })

  it('remove', async () => {
    // https://architectak.medium.com/embracing-solid-principles-in-javascript-for-maintainable-code-ce153d74d326
    const html = await readFile(resolve(__dirname, './test.html'))
    const result = service.removeUselessTags(html)
    expect(result).toMatchSnapshot()
  })
})
