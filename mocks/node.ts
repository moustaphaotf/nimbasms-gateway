import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// This configures a request interception layer for Node.js (for testing).
export const server = setupServer(...handlers)
