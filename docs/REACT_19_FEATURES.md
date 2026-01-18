# React 19 Features Used

This document tracks React 19 features used in this project and how they differ from React 18.

---

## 1. `ref` as a Regular Prop (No forwardRef)

**File:** `src/components/MainCard/index.tsx`

### React 19 (Current)
```tsx
interface MainCardProps {
  ref?: Ref<HTMLDivElement>
  // other props...
}

export default function MainCard({ ref, ...props }: MainCardProps) {
  return <Card ref={ref} {...props} />
}
```

### React 18 (Legacy)
```tsx
import { forwardRef } from 'react'

const MainCard = forwardRef<HTMLDivElement, MainCardProps>((props, ref) => {
  return <Card ref={ref} {...props} />
})

MainCard.displayName = 'MainCard'

export default MainCard
```

**Why React 19 is better:**
- No wrapper function needed
- No need for `displayName`
- Simpler, more intuitive API
- `ref` is just another prop

---

## 2. `useActionState` for Form Handling

**File:** `src/components/auth/AuthLoginForm.tsx`

### React 19 (Current)
```tsx
import { useActionState } from 'react'

interface FormState {
  error: string | null
  success: boolean
}

const [state, formAction, isPending] = useActionState<FormState, FormData>(
  async (_prevState, formData) => {
    const email = formData.get('email') as string
    // validation and API call...
    return { error: null, success: true }
  },
  { error: null, success: false }
)

return (
  <form action={formAction}>
    <input name="email" />
    <button disabled={isPending}>
      {isPending ? 'Loading...' : 'Submit'}
    </button>
    {state.error && <span>{state.error}</span>}
  </form>
)
```

### React 18 (Legacy)
```tsx
import { useState, FormEvent } from 'react'

const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState<string | null>(null)

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault()
  setIsLoading(true)
  setError(null)
  
  const formData = new FormData(e.target as HTMLFormElement)
  const email = formData.get('email') as string
  
  try {
    // validation and API call...
  } catch (err) {
    setError('Something went wrong')
  } finally {
    setIsLoading(false)
  }
}

return (
  <form onSubmit={handleSubmit}>
    <input name="email" />
    <button disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Submit'}
    </button>
    {error && <span>{error}</span>}
  </form>
)
```

**Why React 19 is better:**
- Built-in pending state (`isPending`)
- Automatic form data handling
- State management in one place
- No manual `e.preventDefault()`
- Works with progressive enhancement

---

## 3. Avoiding Over-Engineering

### DON'T use these unless truly needed:

#### ❌ Unnecessary `useCallback`
```tsx
// BAD - React 19 compiler handles this
const handleClick = useCallback(() => {
  doSomething()
}, [])

// GOOD - Just write the function
const handleClick = () => {
  doSomething()
}
```

#### ❌ Unnecessary `useMemo`
```tsx
// BAD - Premature optimization
const items = useMemo(() => data.map(x => x.id), [data])

// GOOD - Let React handle it
const items = data.map(x => x.id)
```

#### ❌ Unnecessary `useEffect`
```tsx
// BAD - Using effect for derived state
const [filteredItems, setFilteredItems] = useState([])
useEffect(() => {
  setFilteredItems(items.filter(x => x.active))
}, [items])

// GOOD - Calculate during render
const filteredItems = items.filter(x => x.active)
```

---

## Future React 19 Features to Consider

### `use()` Hook
For reading promises and context directly:
```tsx
// Reading a promise
const data = use(fetchData())

// Reading context (alternative to useContext)
const theme = use(ThemeContext)
```

### `useOptimistic`
For optimistic UI updates:
```tsx
const [optimisticItems, addOptimistic] = useOptimistic(items)

const handleAdd = async (newItem) => {
  addOptimistic([...items, newItem])
  await saveToServer(newItem)
}
```

### Document Metadata
```tsx
function BlogPost({ post }) {
  return (
    <>
      <title>{post.title}</title>
      <meta name="description" content={post.summary} />
      <article>{post.content}</article>
    </>
  )
}
```

---

---

## 4. Layout Routes with Outlet (React Router Pattern)

**Files:** `src/routes/index.tsx`, `src/components/guards/*.tsx`

### Current Pattern (Layout Routes)
```tsx
// routes/index.tsx
const router = createBrowserRouter([
  // Guest routes group
  {
    element: <GuestGuard />,
    children: [
      { path: ROUTES.LOGIN, element: <Login /> },
      { path: ROUTES.REGISTER, element: <Register /> },
    ],
  },
  // Protected routes group
  {
    element: <AuthGuard />,
    children: [
      { path: ROUTES.DASHBOARD, element: <Dashboard /> },
      { path: ROUTES.PROFILE, element: <Profile /> },
    ],
  },
])

// GuestGuard.tsx - uses Outlet
export default function GuestGuard(): ReactNode {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return <Outlet />  // Renders child routes
}
```

### Previous Pattern (Wrapper per route)
```tsx
// Less scalable - guard wraps each route
const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <AuthGuard>
        <Dashboard />
      </AuthGuard>
    ),
  },
])

// GuestGuard.tsx - wraps children
export default function GuestGuard({ children }: { children: ReactNode }) {
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}
```

**Why Layout Routes are better:**
- Guards defined once per group, not per route
- Easier to add routes to a group
- Cleaner route configuration
- Supports nested layouts (e.g., DashboardLayout > Sidebar)

---

## Summary

| Feature | React 18 | React 19 |
|---------|----------|----------|
| Ref forwarding | `forwardRef()` wrapper | `ref` as prop |
| Form actions | `onSubmit` + useState | `useActionState` |
| Pending states | Manual `isLoading` state | Built-in `isPending` |
| Memoization | Manual `useCallback/useMemo` | Compiler handles it |

