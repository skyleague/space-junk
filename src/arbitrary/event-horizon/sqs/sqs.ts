import type { Arbitrary } from '@skyleague/axioms'
import { unknown, object } from '@skyleague/axioms'
import type { SQSEvent, SQSHandler } from '@skyleague/event-horizon'
import { toArbitrary } from '@skyleague/therefore'

export async function arbitrarySqs<C = unknown, S = unknown, SqsP = unknown>(
    definition: SQSHandler<C, S, SqsP>
): Promise<Arbitrary<SQSEvent<SqsP>>> {
    const { sqs } = definition
    return object({
        body: sqs.schema.payload !== undefined ? await Promise.resolve(toArbitrary(sqs.schema.payload)) : unknown(),
        raw: unknown(),
    }) as unknown as Arbitrary<SQSEvent<SqsP>>
}
