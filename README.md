# ShopManager Frontend

A production-ready React + Vite frontend for **ShopManager** – a retail inventory and shop management system.

## 🎯 Features

- **Modern Authentication** – JWT-based auth with email verification
- **Protected Routes** – Secure dashboard accessible only to authenticated users
- **Beautiful UI** – Premium glassmorphic design with Tailwind CSS
- **Responsive Design** – Works seamlessly on desktop, tablet, and mobile
- **TypeScript** – Fully typed for safety and developer experience
- **Context API** – Lightweight state management for authentication
- **Axios Interceptors** – Automatic token refresh on 401 responses
- **Email Verification** – Multi-stage email verification flow with resend capability

## 🏗️ Project Structure

```
shopmanager-frontend/
├── src/
│   ├── api/
│   │   └── auth.ts                 # Axios instance with JWT interceptors
│   ├── components/
│   │   ├── Layout.tsx              # Main layout with navbar
│   │   └── ProtectedRoute.tsx       # Route guard for authenticated pages
│   ├── context/
│   │   └── AuthContext.tsx          # Global auth state & logic
│   ├── hooks/
│   │   └── useAuth.ts              # Custom hook for auth context
│   ├── pages/
│   │   ├── Login.tsx               # Login page
│   │   ├── Register.tsx            # Registration page with validation
│   │   ├── Dashboard.tsx           # Protected dashboard
│   │   ├── VerifyEmail.tsx         # Token verification handler
│   │   ├── VerifyEmailPending.tsx  # Pending verification page
│   │   ├── VerifyEmailSuccess.tsx  # Success page
│   │   └── VerifyEmailError.tsx    # Error page with resend
│   ├── App.tsx                     # Router setup
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Tailwind directives & custom styles
├── .env                            # Environment variables (local)
├── .env.example                    # Environment template
├── index.html                      # HTML entry point
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies & scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm/pnpm
- Backend API running at `http://127.0.0.1:8000`

### Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy .env.example to .env
   cp .env.example .env
   ```

   Update `.env` if needed (default should work for local development):
   ```
   VITE_API_BASE_URL=http://127.0.0.1:8000
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

   The app will be available at `http://localhost:5173`

## 📖 Usage

### Authentication Flow

1. **Register** – User creates account with email verification
2. **Verify Email** – User clicks link in verification email
3. **Login** – User signs in with email/password
4. **Dashboard** – Access protected dashboard

### Key Pages

| Route | Purpose | Authentication |
|-------|---------|---|
| `/login` | Sign in | None (public) |
| `/register` | Create account | None (public) |
| `/verify-email/:token` | Verify email address | None (public) |
| `/verify-email-pending` | Confirmation sent page | None (public) |
| `/verify-email-success` | Verification successful | None (public) |
| `/verify-email-error` | Verification failed/expired | None (public) |
| `/dashboard` | Main dashboard | Required |

## 🔐 Authentication Details

### Login Endpoint
**POST** `/accounts/login/`

Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "refresh": "eyJ...",
  "access": "eyJ...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "ShopAdmin",
    "shop_id": "uuid"
  }
}
```

### Register Endpoint
**POST** `/accounts/register/`

Request:
```json
{
  "full_name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "phone_number": "+1234567890"  // Optional
}
```

### Token Storage

Tokens are stored in `localStorage`:
- `access_token` – JWT access token (short-lived)
- `refresh_token` – JWT refresh token (long-lived)
- `user` – User profile JSON

### Auto Token Refresh

The Axios interceptor automatically:
1. Attaches `access_token` to all API requests
2. Detects 401 responses
3. Refreshes the token using `refresh_token`
4. Retries the original request
5. Redirects to login if refresh fails

## 🎨 Design System

### Color Palette
- **Navy Background** – `#0d1b2a` (primary background)
- **Mid Navy** – `#132033` (secondary background)
- **Light Navy** – `#1a2d42` (tertiary background)
- **Amber Accent** – `#e8a020` (primary action button)
- **Amber Light** – `#f5c04a` (hover state)
- **Slate Text** – `#8fa3b8` (secondary text)

### Typography
- **Headings** – Playfair Display (serif)
- **Body** – DM Sans (sans-serif)

### Components
- Glassmorphic cards with backdrop blur
- Smooth transitions and hover states
- Responsive grid layouts
- Loading spinners and animations

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
# or
pnpm build
```

Output goes to `dist/` directory

### Preview Production Build

```bash
npm run preview
# or
pnpm preview
```

## 🔧 Configuration

### Tailwind CSS
Configured in `tailwind.config.js` with custom navy/amber palette and Playfair Display + DM Sans fonts.

### Vite
Configured in `vite.config.ts` with React plugin and API proxy support (optional).

### TypeScript
Strict mode enabled with proper type checking. See `tsconfig.json` for details.

## 🛠️ Development

### Adding New Pages

1. Create page in `src/pages/`
2. Import in `src/App.tsx`
3. Add route to `<Routes>` in `App.tsx`
4. Use `<ProtectedRoute>` wrapper for authenticated pages

### Using Authentication

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, loginUser, logoutUser } = useAuth();
  
  if (!isAuthenticated) return <div>Please login</div>;
  
  return <div>Welcome, {user?.full_name}!</div>;
}
```

### API Requests

```typescript
import { authAPI } from '@/api/auth';

// Login
const response = await authAPI.login({
  email: 'user@example.com',
  password: 'password123'
});

// Register
await authAPI.register({
  full_name: 'John Doe',
  email: 'user@example.com',
  password: 'password123'
});

// Verify Email
await authAPI.verifyEmail(token);

// Logout
await authAPI.logout({ refresh: refreshToken });
```

## 🐛 Troubleshooting

### "VITE_API_BASE_URL is not set"
Make sure your `.env` file contains:
```
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### CORS Issues
The backend should have CORS enabled for `http://localhost:5173`. Verify in Django settings:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
```

### Token Not Being Sent
Check browser DevTools → Application → LocalStorage to verify tokens are being stored. The Axios interceptor should attach them automatically.

### Stuck on Login Page After Registration
Ensure you click the verification link in the email before trying to login. Check email spam folder if not received.

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://127.0.0.1:8000` |

## 🤝 Backend Integration

This frontend is built for Django + Django REST Framework backend with:
- SimpleJWT for authentication
- Django CORS enabled
- Email verification flow
- Token refresh endpoint

Ensure backend is running before starting frontend development.

## 📄 License

Licensed under the MIT License. See LICENSE file for details.

## 🚀 Future Enhancements

- [ ] Inventory management pages
- [ ] Sales tracking dashboard
- [ ] Customer management
- [ ] Reports and analytics
- [ ] Multi-user collaboration
- [ ] Password reset flow
- [ ] 2FA support
