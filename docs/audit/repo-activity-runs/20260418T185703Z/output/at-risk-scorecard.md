# At-risk repository scorecard (heuristic)

- Maintainer run: `20260329T084806Z`
- Repo activity run: `20260418T185703Z`
- Window: since **2025-04-18** (12 months)
- **Higher score → triage first.** This is a weighted signal blend, not a formal status.

## How the score is built

| Factor | Points |
|--------|--------|
| No active maintainers | +55 |
| Exactly one active maintainer | +30 |
| Exactly two active maintainers | +12 |
| Inactive maintainer count | +2 each, max +16 |
| No active triagers and ≤1 active maintainer | +8 |
| ≥40 **human** PRs opened and ≤1 active maintainer | +10 |
| ≥25 **human** issues opened and 0 active maintainers | +10 |
| Each emeritus candidate row in `emeritus-candidates.md` | +2, max +12 |

*(Bot-authored PRs/issues are excluded from traffic signals and do not add points.)*

| Rank | Score | Repository | Act M | PRs merged (human) | Emeritus # | Contributors to score |
|-----:|------:|------------|------:|---------------------:|-----------:|----------------------|
| 1 | 76 | asyncapi/modelina | 1 | 127 | 8 | single_active_maintainer +30, inactive_maintainer_bench +16, no_triagers_thin_maintainers +8, high_human_pr_open_volume_thin_coverage +10, emeritus_candidates_named +12 |
| 2 | 75 | asyncapi/chatbot | 0 | 0 | 3 | no_active_maintainers +55, inactive_maintainer_bench +6, no_triagers_thin_maintainers +8, emeritus_candidates_named +6 |
| 3 | 75 | asyncapi/diff | 0 | 0 | 3 | no_active_maintainers +55, inactive_maintainer_bench +6, no_triagers_thin_maintainers +8, emeritus_candidates_named +6 |
| 4 | 71 | asyncapi/brand | 0 | 0 | 2 | no_active_maintainers +55, inactive_maintainer_bench +4, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 5 | 71 | asyncapi/EDAVisualiser | 0 | 0 | 2 | no_active_maintainers +55, inactive_maintainer_bench +4, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 6 | 71 | asyncapi/enterprise-patterns | 0 | 0 | 2 | no_active_maintainers +55, inactive_maintainer_bench +4, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 7 | 71 | asyncapi/extensions-catalog | 0 | 3 | 2 | no_active_maintainers +55, inactive_maintainer_bench +4, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 8 | 71 | asyncapi/go-watermill-template | 0 | 0 | 2 | no_active_maintainers +55, inactive_maintainer_bench +4, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 9 | 71 | asyncapi/java-spring-template | 0 | 18 | 2 | no_active_maintainers +55, inactive_maintainer_bench +4, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 10 | 71 | asyncapi/learning-paths | 0 | 0 | 2 | no_active_maintainers +55, inactive_maintainer_bench +4, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 11 | 71 | asyncapi/nodejs-template | 0 | 18 | 2 | no_active_maintainers +55, inactive_maintainer_bench +4, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 12 | 71 | asyncapi/nodejs-ws-template | 0 | 3 | 2 | no_active_maintainers +55, inactive_maintainer_bench +4, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 13 | 71 | asyncapi/parser-api | 0 | 0 | 2 | no_active_maintainers +55, inactive_maintainer_bench +4, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 14 | 71 | asyncapi/problem | 0 | 0 | 2 | no_active_maintainers +55, inactive_maintainer_bench +4, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 15 | 71 | asyncapi/python-paho-template | 0 | 0 | 2 | no_active_maintainers +55, inactive_maintainer_bench +4, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 16 | 71 | asyncapi/template-for-generator-templates | 0 | 0 | 2 | no_active_maintainers +55, inactive_maintainer_bench +4, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 17 | 67 | asyncapi/php-template | 0 | 1 | 1 | no_active_maintainers +55, inactive_maintainer_bench +2, no_triagers_thin_maintainers +8, emeritus_candidates_named +2 |
| 18 | 67 | asyncapi/tck | 0 | 4 | 1 | no_active_maintainers +55, inactive_maintainer_bench +2, no_triagers_thin_maintainers +8, emeritus_candidates_named +2 |
| 19 | 67 | asyncapi/training | 0 | 0 | 1 | no_active_maintainers +55, inactive_maintainer_bench +2, no_triagers_thin_maintainers +8, emeritus_candidates_named +2 |
| 20 | 54 | asyncapi/java-template | 1 | 1 | 4 | single_active_maintainer +30, inactive_maintainer_bench +8, no_triagers_thin_maintainers +8, emeritus_candidates_named +8 |
| 21 | 42 | asyncapi/avro-schema-parser | 1 | 1 | 1 | single_active_maintainer +30, inactive_maintainer_bench +2, no_triagers_thin_maintainers +8, emeritus_candidates_named +2 |
| 22 | 42 | asyncapi/dotnet-rabbitmq-template | 1 | 1 | 1 | single_active_maintainer +30, inactive_maintainer_bench +2, no_triagers_thin_maintainers +8, emeritus_candidates_named +2 |
| 23 | 42 | asyncapi/jasyncapi | 1 | 5 | 1 | single_active_maintainer +30, inactive_maintainer_bench +2, no_triagers_thin_maintainers +8, emeritus_candidates_named +2 |
| 24 | 42 | asyncapi/java-spring-cloud-stream-template | 1 | 5 | 1 | single_active_maintainer +30, inactive_maintainer_bench +2, no_triagers_thin_maintainers +8, emeritus_candidates_named +2 |
| 25 | 42 | asyncapi/net-sdk | 1 | 0 | 1 | single_active_maintainer +30, inactive_maintainer_bench +2, no_triagers_thin_maintainers +8, emeritus_candidates_named +2 |
| 26 | 38 | asyncapi/optimizer | 1 | 3 | 0 | single_active_maintainer +30, no_triagers_thin_maintainers +8 |
| 27 | 28 | asyncapi/bindings | 6 | 3 | 12 | inactive_maintainer_bench +16, emeritus_candidates_named +12 |
| 28 | 28 | asyncapi/spec-json-schemas | 4 | 19 | 17 | inactive_maintainer_bench +16, emeritus_candidates_named +12 |
| 29 | 16 | asyncapi/asyncapi-react | 2 | 36 | 1 | two_active_maintainers +12, inactive_maintainer_bench +2, emeritus_candidates_named +2 |
| 30 | 16 | asyncapi/converter-js | 2 | 13 | 1 | two_active_maintainers +12, inactive_maintainer_bench +2, emeritus_candidates_named +2 |
| 31 | 16 | asyncapi/html-template | 2 | 32 | 1 | two_active_maintainers +12, inactive_maintainer_bench +2, emeritus_candidates_named +2 |
| 32 | 16 | asyncapi/jasyncapi-idea-plugin | 2 | 69 | 1 | two_active_maintainers +12, inactive_maintainer_bench +2, emeritus_candidates_named +2 |
| 33 | 16 | asyncapi/markdown-template | 2 | 22 | 1 | two_active_maintainers +12, inactive_maintainer_bench +2, emeritus_candidates_named +2 |
| 34 | 12 | asyncapi/bundler | 2 | 5 | 0 | two_active_maintainers +12 |
| 35 | 12 | asyncapi/kotlin-asyncapi | 2 | 128 | 0 | two_active_maintainers +12 |
| 36 | 12 | asyncapi/parser-js | 2 | 11 | 0 | two_active_maintainers +12 |
| 37 | 12 | asyncapi/protobuf-schema-parser | 2 | 1 | 0 | two_active_maintainers +12 |
| 38 | 12 | asyncapi/saunter | 2 | 8 | 0 | two_active_maintainers +12 |
| 39 | 12 | asyncapi/vs-asyncapi-preview | 2 | 13 | 0 | two_active_maintainers +12 |
| 40 | 4 | asyncapi/community | 4 | 116 | 1 | inactive_maintainer_bench +2, emeritus_candidates_named +2 |
| 41 | 4 | asyncapi/generator | 4 | 178 | 1 | inactive_maintainer_bench +2, emeritus_candidates_named +2 |
| 42 | 4 | asyncapi/studio | 4 | 27 | 1 | inactive_maintainer_bench +2, emeritus_candidates_named +2 |
| 43 | 0 | asyncapi/.github | 3 | 27 | 0 | — |
| 44 | 0 | asyncapi/cli | 4 | 102 | 0 | — |
| 45 | 0 | asyncapi/conference-website | 4 | 113 | 0 | — |
| 46 | 0 | asyncapi/openapi-schema-parser | 3 | 20 | 0 | — |
| 47 | 0 | asyncapi/spec | 5 | 19 | 0 | — |
| 48 | 0 | asyncapi/website | 9 | 207 | 0 | — |
