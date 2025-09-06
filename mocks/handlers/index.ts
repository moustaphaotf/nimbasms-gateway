import { authHandlers } from './auth.handlers'
import { accountHandlers } from './account.handlers'
import { messagesHandlers } from './messages.handlers'
import { sendersHandlers } from './senders.handlers'
import { statisticsHandlers } from './statistics.handlers'
import { usersHandlers } from './users.handlers'
import { membershipHandlers } from './membership.handlers'
import { exportsHandlers } from './exports.handlers'

export const handlers = [
  ...authHandlers,
  ...accountHandlers,
  ...messagesHandlers,
  ...sendersHandlers,
  ...statisticsHandlers,
  ...usersHandlers,
  ...membershipHandlers,
  ...exportsHandlers
]
