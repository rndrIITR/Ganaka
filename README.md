# GAṆAKA (गणक) v0.4.0

**Scientific & Engineering Computation Workbench**
*Compute • Analyze • Visualize • Engineer*

GAṆAKA is a single-page, dependency-free (at runtime) scientific and
engineering computation workbench. Open `index.html` in a browser and every
v0.4.0 capability — calculator, units, calculus, statistics, probability,
linear algebra, CSV analysis, visualization, engineering calculators,
weather, currency, history and settings — is available from that one page.
No separate `calculator.html` / `statistics.html` / etc. exist.

> **Release status:** see [`BUILD_STATUS.md`](BUILD_STATUS.md) and
> [`docs/RELEASE-VALIDATION-v0.4.0.md`](docs/RELEASE-VALIDATION-v0.4.0.md)
> for the evidence-backed release decision. Do not take "it runs" as proof
> of correctness — read the validation report.

## What v0.4.0 actually implements

- **Scientific calculator** — tokenizer → parser → AST → evaluator (no
  `eval()`). Arithmetic, `^`, `%`, parentheses, `sin/cos/tan/asin/acos/atan/
  sinh/cosh/tanh/log/ln/exp/sqrt/cbrt/abs/floor/ceil/round/min/max/gamma`,
  factorial (`!`), `C(n,r)`, `P(n,r)`, constants `pi`, `e`, `euler`, and
  radians/degrees/gradians angle modes.
- **Units** — one centralized registry (length, area, volume, mass, time,
  force, pressure, energy, power, temperature, density, velocity,
  acceleration, flow) spanning SI/Metric/Imperial/US-customary/CGS, plus
  dimensional-compatibility checking (`DIMENSION_ERROR`).
- **Calculus** — forward/backward/central/higher-order numerical
  differentiation; trapezoidal, Simpson 1/3, and adaptive Simpson
  integration; bisection, false position, secant and Newton root finding,
  each reporting method/tolerance/iterations/convergence.
- **Statistics** — full descriptive statistics with explicit
  population/sample distinction, quartiles/IQR/quantiles, MAD, skewness,
  kurtosis, covariance, correlation, and simple OLS regression
  (y = a + bx) with R², adjusted R², SSE, RMSE, MAE, residuals.
- **Probability** — Bernoulli, Binomial, Poisson, Normal, Uniform,
  Exponential, Gamma, Weibull (PMF/PDF, CDF where implemented, moments,
  and inverse CDF for Normal), with parameter validation.
- **Linear algebra** — multiply, transpose, trace, determinant, inverse,
  `Ax=b` via Gaussian elimination with partial pivoting, dot product,
  vector norm; singular/near-singular and dimension-mismatch detection.
  SVD/eigenvalues/QR/Cholesky are explicitly out of scope for v0.4.
- **Data (CSV)** — fully browser-local CSV import, preview, column-type
  inference (numeric/date/text), missing-value counts, unique-value
  counts. Nothing is uploaded anywhere.
- **Visualization** — a genuine, responsive SVG X-Y plot with axis limits
  derived from the supplied data.
- **Engineering** — exactly three calculators: hydrostatic pressure
  (P = ρgh), Reynolds number (Re = ρVD/μ), Manning velocity
  (V = (1/n)R^(2/3)S^(1/2)), each showing inputs/formula/result/units/
  assumptions.
- **Global tools** — live weather via Open-Meteo (no API key) and live
  currency conversion via Frankfurter/ECB reference rates (no API key),
  both explicitly reporting "unavailable" rather than fabricating data
  when the network or API fails.
- **History & Settings** — calculations are recorded locally (enough
  detail to rerun them) and settings persist via `localStorage`.
- **PWA foundation** — manifest + service worker caching the static shell
  so Calculator/Units/Calculus/Statistics/Linear Algebra/CSV analysis keep
  working offline; Weather/Currency correctly report unavailable offline.

Everything **not** listed above (advanced regression, ODE/optimization,
time series, Monte Carlo workbench, reliability/risk analysis, full
structural/hydraulic engineering suites, PDF reporting, SVD/eigenvalues,
etc.) is **explicitly out of scope for v0.4** — see the roadmap in
`BUILD_STATUS.md`.

## Architecture

One canonical engine, many UIs. No UI component re-implements a
mathematical algorithm. See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

```
index.html + src/app.js (UI shell — presentation & input only)
                    │
                    ▼
   src/core/{errors,constants,parser,numerical,linear-algebra,
             statistics,probability,units,engineering}.js
   src/data.js   src/viz.js   src/services/{weather,currency,history,settings}.js
```

## Installation / running

No build step, no npm install required to run the app itself (all code is
plain ES2017+ JavaScript, loaded via `<script>` tags — this is deliberate,
so the single `index.html` also works when opened directly via `file://`).

```bash
# Option A — open directly
open index.html            # or double-click it

# Option B — serve locally (needed for the service worker / PWA install)
python3 -m http.server 8080
# then visit http://localhost:8080/index.html
```

## Development & testing

```bash
node tests/core.test.mjs          # 98 automated numerical/functional tests, zero dependencies
node tests/browser-smoke.mjs      # Playwright browser functional smoke test (requires `playwright`)
```

See [`docs/VALIDATION.md`](docs/VALIDATION.md) and
[`docs/ACCEPTANCE-MATRIX.md`](docs/ACCEPTANCE-MATRIX.md) for full evidence.

## Scientific limitations & engineering disclaimer

GAṆAKA is intended for scientific computation, engineering analysis,
education, research and exploratory use. Safety-critical engineering
decisions require independent verification by qualified professionals and
applicable standards, codes and project-specific requirements. GAṆAKA does
not claim regulatory or code compliance for any implemented calculation.

Numerical methods use finite tolerances and finite iteration counts;
results are reported with the method, tolerance and diagnostics used so
they can be judged and reproduced, not taken as exact.

## License

MIT — see [`LICENSE`](LICENSE).

## Repository

`rndrIITR/Ganaka`
