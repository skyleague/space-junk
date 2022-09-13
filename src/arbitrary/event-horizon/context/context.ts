import { Context } from '../../../aws/lambda'
import { mock } from '../../../test/mock'

import type { Arbitrary } from '@skyleague/axioms'
import { string, object, constant } from '@skyleague/axioms'
import type { Logger, Tracer, Metrics, LambdaContext } from '@skyleague/event-horizon'
import { toArbitrary } from '@skyleague/therefore'
import type { Context as AwsContext } from 'aws-lambda'

export async function arbitraryContext<C = never, S = never>({ config, services }: { config?: C; services?: S } = {}): Promise<
    Arbitrary<LambdaContext<C, S>>
> {
    return object({
        logger: constant(mock<Logger>()),
        tracer: constant(mock<Tracer>()),
        metrics: constant(mock<Metrics>()),
        requestId: string({ minLength: 2 }),
        traceId: string({ minLength: 2 }),
        isSensitive: constant(false),
        raw: (await toArbitrary(Context)) as Arbitrary<AwsContext>,
        config: constant(config) as Arbitrary<C>,
        services: constant(services) as Arbitrary<S>,
    })
}
