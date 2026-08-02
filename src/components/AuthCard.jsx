import { Link } from "react-router-dom";

function AuthCard({ title, subtitle, linkTo, linkText, children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#334155,_#0f172a_70%)] px-4 py-10 font-sans">
      <header className="mx-auto mb-8 max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          Wise Cash 
        </h1>
        <p className="mt-3 text-lg text-slate-300">
          Helping you to use optimize your money!
        </p>
      </header>

      <main className="flex items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-950/20">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-slate-800">{title}</h2>
            {subtitle && <p className="mt-2 text-sm text-slate-500">{subtitle}</p>}
          </div>

          {children}

          {linkTo && linkText && (
            <div className="mt-5 text-center">
              <Link
                to={linkTo}
                className="text-sm font-medium text-slate-600 transition hover:text-slate-800"
              >
                {linkText}
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AuthCard;
