# GAṆAKA v0.4.0 — Build Status

**Legend:** ✅ Implemented & verified · 🚧 Partially implemented · ⛔ Not implemented (planned for a later release)

## Core

| Feature | Status | Notes |
|---|---|---|
| Single-page application (one `index.html`) | ✅ | All workspaces are `<section>`s toggled by `src/app.js`; no separate HTML pages |
| Secure expression parser (no `eval`) | ✅ | `src/core/parser.js` |
| Factorial / Combination / Permutation | ✅ | Non-integer factorial via Gamma function |
| Angle modes (radians/degrees/gradians) | ✅ | Verified to actually change trig results |
| History | ✅ | Records + rerun + delete, `localStorage`-backed |
| Settings | ✅ | Persist across reload, `localStorage`-backed |

## Mathematics

| Feature | Status | Notes |
|---|---|---|
| Numerical differentiation (fwd/bwd/central/higher-order) | ✅ | |
| Numerical integration (trapezoidal/Simpson 1-3/adaptive Simpson) | ✅ | |
| Root finding (bisection/false position/secant/Newton) | ✅ | Reports method/tolerance/iterations/convergence; throws `CONVERGENCE_ERROR` rather than faking a result |

## Probability (v0.4 practical subset — exactly 8 distributions)

| Distribution | PMF/PDF | CDF | Moments | Status |
|---|---|---|---|---|
| Bernoulli | ✅ | ✅ | ✅ | ✅ |
| Binomial | ✅ | ✅ | ✅ | ✅ |
| Poisson | ✅ | ✅ | ✅ | ✅ |
| Normal | ✅ | ✅ (+ inverse CDF) | ✅ | ✅ |
| Uniform | ✅ | ✅ | ✅ | ✅ |
| Exponential | ✅ | ✅ | ✅ | ✅ |
| Gamma | ✅ | ✅ | ✅ | ✅ |
| Weibull | ✅ | ✅ | ✅ | ✅ |
| Lognormal, Beta, Student-t, Chi-square, F, Pareto, Gumbel, Negative Binomial, Geometric | ⛔ | ⛔ | ⛔ | Planned v0.5+ |

## Statistics

| Feature | Status |
|---|---|
| Descriptive statistics (n, mean, weighted mean, median, mode, min/max/range, population **and** sample variance/SD, CV, quartiles, IQR, quantiles, MAD, skewness, kurtosis) | ✅ |
| Covariance / correlation | ✅ |
| Simple OLS regression (y = a + bx) with R², adjusted R², SSE, RMSE, MAE, residuals | ✅ |
| Multiple / polynomial / logistic / ridge / lasso / WLS / robust regression | ⛔ | Planned v0.5+ |
| Full hypothesis-testing framework, ANOVA, Bayesian statistics | ⛔ | Planned v0.6+ |

## Linear Algebra

| Feature | Status |
|---|---|
| Multiply, transpose, trace, determinant, inverse | ✅ |
| Ax=b (Gaussian elimination, partial pivoting) | ✅ |
| Dot product, Euclidean norm | ✅ |
| Singular / near-singular / dimension-mismatch detection | ✅ |
| SVD, eigenvalues, QR, Cholesky | ⛔ | Explicitly out of v0.4 scope |

## Data

| Feature | Status |
|---|---|
| Local CSV import (file picker + paste) | ✅ |
| Row/column counts, preview | ✅ |
| Column-type inference (numeric / date-like / text) | ✅ |
| Missing-value counts, unique-value counts | ✅ |
| Data never transmitted anywhere | ✅ |

## Visualization

| Feature | Status |
|---|---|
| X-Y SVG plot, data-derived axis limits, responsive | ✅ |
| Histogram, box plot, scatter-only, heatmap, QQ plot, residual plot | ⛔ | Planned v0.5+ |

## Engineering (exactly 3 calculators, by design)

| Feature | Status |
|---|---|
| Hydrostatic pressure (P = ρgh) | ✅ |
| Reynolds number (Re = ρVD/μ or V·D/ν) | ✅ |
| Manning velocity (V = (1/n)R^(2/3)S^(1/2)) | ✅ |
| Full hydraulic design suite, structural mechanics, dam analysis, SDOF/response-spectrum, earthquake engineering | ⛔ | Planned v0.7–v0.8 |

## Global

| Feature | Status | Notes |
|---|---|---|
| Live weather (Open-Meteo, no API key) | ✅ | Explicit "unavailable" on failure/offline; never fabricates data |
| Live currency (Frankfurter/ECB, no API key) | ✅ | Same failure-handling guarantee |
| City/timezone lookup | ✅ | Derived from the weather geocoding response |

## Product

| Feature | Status | Notes |
|---|---|---|
| Responsive UI (320px–1920px+) | ✅ | Verified via Playwright at 6 viewport widths, zero horizontal overflow |
| Accessibility baseline (keyboard nav, visible focus, labeled forms, ARIA live regions, no color-only status) | ✅ | See `docs/RELEASE-VALIDATION-v0.4.0.md` |
| PWA foundation (manifest + service worker + offline shell) | ✅ | Weather/Currency correctly report unavailable offline |
| Automated tests | ✅ | 98 unit/numerical + 30 browser-functional, all passing |
| Documentation set | ✅ | This file + `docs/{ARCHITECTURE,USER-GUIDE,NUMERICAL-METHODS,VALIDATION,API,CONTRIBUTING,SECURITY,ACCEPTANCE-MATRIX,REQUIREMENTS-TRACEABILITY-MATRIX,RELEASE-VALIDATION-v0.4.0}.md` |
| i18n (English/Hindi dictionaries) | ⛔ | Architecture note only — no translation dictionary implemented in v0.4 |
| Full PDF report generator, projects, advanced export | ⛔ | Planned v0.9 |

## Roadmap (explicitly deferred, not v0.4)

- **v0.5** — Additional probability distributions; multiple/polynomial
  regression; histogram/box-plot/scatter/heatmap visualizations; ODE
  solver foundation; optimization framework foundation; Web Worker
  offloading for expensive computation.
- **v0.6** — Time series (ACF/PACF, decomposition, stationarity,
  ARIMA); Monte Carlo workbench UI; reliability/risk analysis; advanced
  hypothesis testing/ANOVA.
- **v0.7** — Engineering mechanics (stress/strain/Hooke's law/section
  properties), fluids, open-channel/hydraulic design suite.
- **v0.8** — Earthquake & dynamics (SDOF, response spectra), engineering
  data analysis.
- **v0.9** — Reports (PDF), projects, advanced export, enhanced PWA
  (background sync, install prompts).
- **v1.0** — Comprehensive scientific and engineering computation
  platform.

None of the above exists as a functioning feature in v0.4.0. Where an
architectural placeholder exists (e.g. the domain-service layering in
`docs/ARCHITECTURE.md` anticipates future modules), it is documented as
such, not exposed as a working control in the UI.
