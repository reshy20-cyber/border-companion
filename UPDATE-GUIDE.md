# دليل تحديث المعلومات · Data update guide

All law/visa content lives in **data.js**. `index.html` is the app UI and should not need changes for routine updates.

## What to edit in data.js
| Item | Where |
|---|---|
| Country cards (entry, residence, money, driving, laws, emergency numbers, official sources) | `C=[ ... ]` |
| Status for a nationality → destination (visa-free, e-Visa, embassy visa…) | `function R(dest,n0)` |
| The sentence shown under "Your status" | `N={ ... }` (referenced by `R`) |
| Allowed stay length used by the stay counter | `DAYS` (keyed by the `N` note) |
| "Apply" button links | `AP={ ... }` |
| Scams & warnings | `WARN={ ... }` |
| Review date shown in the app | `REVIEW` and `DATA_VERSION` |

## Rules
- Every text is `q(arabic, english, french, german)`; arrays must have the same length in all four languages.
- Only cite official sources (government, embassy, EU) or reputable news; record them in the pull-request description.
- Mark anything not confirmed by a recent reliable source as unverified (third value `false` in `R`).
- After editing: update `REVIEW` + `DATA_VERSION`, and bump `VERSION` in `sw.js`.
- Never push straight to `main`: open a pull request so the owner can review and merge.
