import { createTRPCHandle } from 'trpc-sveltekit'
import { router, createContext } from '$trpc/router'

import type { Handle } from '@sveltejs/kit'

export const handle: Handle = createTRPCHandle({ router, createContext })
