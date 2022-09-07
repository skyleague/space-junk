import { arbitraryContext } from './context'

import { Context } from '../../../aws'

import { forAll } from '@skyleague/axioms'

test('context === context', async () => {
    forAll(await arbitraryContext(), (c) => Context.assert(c.raw))
})
