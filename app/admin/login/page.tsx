import { adminLogin } from "@/app/admin/actions";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <form
        action={adminLogin}
        className="w-full max-w-sm border border-border bg-background p-8 shadow-card"
      >
        <h1 className="font-serif text-2xl text-midnight">ThesisPoint CMS</h1>
        <p className="mt-2 text-sm text-text-muted">Admin access only</p>
        <label className="mt-6 block text-sm font-medium text-midnight">
          Admin secret
          <input
            type="password"
            name="secret"
            required
            className="mt-1 w-full border border-border px-3 py-2"
          />
        </label>
        <button
          type="submit"
          className="mt-6 w-full bg-midnight px-4 py-2 text-sm font-medium text-white"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
