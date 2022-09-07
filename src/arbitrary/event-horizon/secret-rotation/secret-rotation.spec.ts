import { arbitrarySecretRotation } from './secret-rotation'

import { SecretRotationEvent } from '../../../aws/secret-rotation/secret-rotation.type'

import { forAll } from '@skyleague/axioms'

test('SecretRotationEvent === SecretRotationRequest.raw', async () => {
    forAll(await arbitrarySecretRotation(), (r) => SecretRotationEvent.assert(r.raw))
})
