import { FastifyReply, FastifyRequest } from 'fastify';


export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    // fastify-jwt adds request.jwtVerify()
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
}
