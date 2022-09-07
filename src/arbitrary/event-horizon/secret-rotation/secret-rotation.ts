import { SecretRotationEvent } from '../../../aws/secret-rotation/secret-rotation.type'

import type { Arbitrary } from '@skyleague/axioms'
import { mapArbitrary } from '@skyleague/axioms'
import type { SecretRotationRequest, SecretRotationServices } from '@skyleague/event-horizon'
import { toArbitrary } from '@skyleague/therefore'

export async function arbitrarySecretRotation<C = never, S extends SecretRotationServices = SecretRotationServices>(
    _options: { config?: C; services?: S } = {}
): Promise<Arbitrary<SecretRotationRequest>> {
    const arbSecretRotationEvent = await toArbitrary(SecretRotationEvent)
    return mapArbitrary(
        (e) => ({ raw: e, step: e.Step, secretId: e.SecretId, clientRequestToken: e.ClientRequestToken }),
        arbSecretRotationEvent
    )
}
