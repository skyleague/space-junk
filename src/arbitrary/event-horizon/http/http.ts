import type { Arbitrary } from '@skyleague/axioms'
import { unknown, object } from '@skyleague/axioms'
import type { GatewayVersion, HttpHandler, HttpRequest } from '@skyleague/event-horizon'
import { toArbitrary } from '@skyleague/therefore'

export async function arbitraryHttp<
    C = unknown,
    S = unknown,
    HttpB = unknown,
    HttpP = unknown,
    HttpQ = unknown,
    HttpH = unknown,
    HttpR = unknown,
    GV extends GatewayVersion = 'v1'
>(
    definition: HttpHandler<C, S, HttpB, HttpP, HttpQ, HttpH, HttpR, GV>
): Promise<Arbitrary<HttpRequest<HttpB, HttpP, HttpQ, HttpH, GV>>> {
    const { http } = definition
    return object({
        body: http.schema.body !== undefined ? await Promise.resolve(toArbitrary(http.schema.body)) : unknown(),
        headers: http.schema.headers !== undefined ? await Promise.resolve(toArbitrary(http.schema.headers)) : unknown(),
        query: http.schema.query !== undefined ? await Promise.resolve(toArbitrary(http.schema.query)) : unknown(),
        path: http.schema.pathParams !== undefined ? await Promise.resolve(toArbitrary(http.schema.pathParams)) : unknown(),
        raw: unknown(),
    }) as unknown as Arbitrary<HttpRequest<HttpB, HttpP, HttpQ, HttpH, GV>>
}
