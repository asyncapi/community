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
| Bot merge share (deny-listed PR authors) | up to +35 (≈35% of percentage points) |
| Inactive maintainer count | +2 each, max +16 |
| Zero human-merged PRs with ≥5 total merges in window | +14 |
| No active triagers and ≤1 active maintainer | +8 |
| ≥40 PRs opened and ≤1 active maintainer | +10 |
| ≥25 human issues opened (or total if human missing) and 0 active maintainers | +10 |
| Each emeritus candidate row in `emeritus-candidates.md` | +2, max +12 |

| Rank | Score | Repository | Act M | Bot % | Merged h/t | Emeritus # | Contributors to score |
|-----:|------:|------------|------:|------:|-----------:|-----------:|----------------------|
| 1 | 130 | asyncapi/go-watermill-template | 0 | 100% | 0 / 46 | 2 | no_active_maintainers +55, bot_merge_weighted +35, inactive_maintainer_bench +4, no_human_merged_prs +14, no_triagers_thin_maintainers +8, high_pr_volume_thin_coverage +10, emeritus_candidates_named +4 |
| 2 | 124 | asyncapi/chatbot | 0 | 100% | 0 / 10 | 3 | no_active_maintainers +55, bot_merge_weighted +35, inactive_maintainer_bench +6, no_human_merged_prs +14, no_triagers_thin_maintainers +8, emeritus_candidates_named +6 |
| 3 | 124 | asyncapi/diff | 0 | 100% | 0 / 15 | 3 | no_active_maintainers +55, bot_merge_weighted +35, inactive_maintainer_bench +6, no_human_merged_prs +14, no_triagers_thin_maintainers +8, emeritus_candidates_named +6 |
| 4 | 120 | asyncapi/brand | 0 | 100% | 0 / 10 | 2 | no_active_maintainers +55, bot_merge_weighted +35, inactive_maintainer_bench +4, no_human_merged_prs +14, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 5 | 120 | asyncapi/EDAVisualiser | 0 | 100% | 0 / 11 | 2 | no_active_maintainers +55, bot_merge_weighted +35, inactive_maintainer_bench +4, no_human_merged_prs +14, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 6 | 120 | asyncapi/enterprise-patterns | 0 | 100% | 0 / 11 | 2 | no_active_maintainers +55, bot_merge_weighted +35, inactive_maintainer_bench +4, no_human_merged_prs +14, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 7 | 120 | asyncapi/learning-paths | 0 | 100% | 0 / 11 | 2 | no_active_maintainers +55, bot_merge_weighted +35, inactive_maintainer_bench +4, no_human_merged_prs +14, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 8 | 120 | asyncapi/parser-api | 0 | 100% | 0 / 11 | 2 | no_active_maintainers +55, bot_merge_weighted +35, inactive_maintainer_bench +4, no_human_merged_prs +14, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 9 | 120 | asyncapi/problem | 0 | 100% | 0 / 14 | 2 | no_active_maintainers +55, bot_merge_weighted +35, inactive_maintainer_bench +4, no_human_merged_prs +14, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 10 | 120 | asyncapi/python-paho-template | 0 | 100% | 0 / 6 | 2 | no_active_maintainers +55, bot_merge_weighted +35, inactive_maintainer_bench +4, no_human_merged_prs +14, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 11 | 120 | asyncapi/template-for-generator-templates | 0 | 100% | 0 / 17 | 2 | no_active_maintainers +55, bot_merge_weighted +35, inactive_maintainer_bench +4, no_human_merged_prs +14, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 12 | 116 | asyncapi/training | 0 | 100% | 0 / 11 | 1 | no_active_maintainers +55, bot_merge_weighted +35, inactive_maintainer_bench +2, no_human_merged_prs +14, no_triagers_thin_maintainers +8, emeritus_candidates_named +2 |
| 13 | 100 | asyncapi/nodejs-ws-template | 0 | 82% | 3 / 17 | 2 | no_active_maintainers +55, bot_merge_weighted +29, inactive_maintainer_bench +4, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 14 | 99 | asyncapi/php-template | 0 | 92% | 1 / 13 | 1 | no_active_maintainers +55, bot_merge_weighted +32, inactive_maintainer_bench +2, no_triagers_thin_maintainers +8, emeritus_candidates_named +2 |
| 15 | 97 | asyncapi/extensions-catalog | 0 | 75% | 3 / 12 | 2 | no_active_maintainers +55, bot_merge_weighted +26, inactive_maintainer_bench +4, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 16 | 92 | asyncapi/tck | 0 | 71% | 4 / 14 | 1 | no_active_maintainers +55, bot_merge_weighted +25, inactive_maintainer_bench +2, no_triagers_thin_maintainers +8, emeritus_candidates_named +2 |
| 17 | 91 | asyncapi/net-sdk | 1 | 100% | 0 / 11 | 1 | single_active_maintainer +30, bot_merge_weighted +35, inactive_maintainer_bench +2, no_human_merged_prs +14, no_triagers_thin_maintainers +8, emeritus_candidates_named +2 |
| 18 | 87 | asyncapi/java-spring-template | 0 | 47% | 18 / 34 | 2 | no_active_maintainers +55, bot_merge_weighted +16, inactive_maintainer_bench +4, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 19 | 87 | asyncapi/modelina | 1 | 32% | 127 / 187 | 8 | single_active_maintainer +30, bot_merge_weighted +11, inactive_maintainer_bench +16, no_triagers_thin_maintainers +8, high_pr_volume_thin_coverage +10, emeritus_candidates_named +12 |
| 20 | 86 | asyncapi/java-template | 1 | 92% | 1 / 12 | 4 | single_active_maintainer +30, bot_merge_weighted +32, inactive_maintainer_bench +8, no_triagers_thin_maintainers +8, emeritus_candidates_named +8 |
| 21 | 86 | asyncapi/nodejs-template | 0 | 44% | 18 / 32 | 2 | no_active_maintainers +55, bot_merge_weighted +15, inactive_maintainer_bench +4, no_triagers_thin_maintainers +8, emeritus_candidates_named +4 |
| 22 | 75 | asyncapi/avro-schema-parser | 1 | 94% | 1 / 16 | 1 | single_active_maintainer +30, bot_merge_weighted +33, inactive_maintainer_bench +2, no_triagers_thin_maintainers +8, emeritus_candidates_named +2 |
| 23 | 70 | asyncapi/dotnet-rabbitmq-template | 1 | 80% | 1 / 5 | 1 | single_active_maintainer +30, bot_merge_weighted +28, inactive_maintainer_bench +2, no_triagers_thin_maintainers +8, emeritus_candidates_named +2 |
| 24 | 67 | asyncapi/java-spring-cloud-stream-template | 1 | 71% | 5 / 17 | 1 | single_active_maintainer +30, bot_merge_weighted +25, inactive_maintainer_bench +2, no_triagers_thin_maintainers +8, emeritus_candidates_named +2 |
| 25 | 67 | asyncapi/optimizer | 1 | 83% | 3 / 18 | 0 | single_active_maintainer +30, bot_merge_weighted +29, no_triagers_thin_maintainers +8 |
| 26 | 66 | asyncapi/jasyncapi | 1 | 69% | 5 / 16 | 1 | single_active_maintainer +30, bot_merge_weighted +24, inactive_maintainer_bench +2, no_triagers_thin_maintainers +8, emeritus_candidates_named +2 |
| 27 | 55 | asyncapi/bindings | 6 | 77% | 3 / 13 | 12 | bot_merge_weighted +27, inactive_maintainer_bench +16, emeritus_candidates_named +12 |
| 28 | 45 | asyncapi/protobuf-schema-parser | 2 | 94% | 1 / 17 | 0 | two_active_maintainers +12, bot_merge_weighted +33 |
| 29 | 45 | asyncapi/spec-json-schemas | 4 | 49% | 19 / 37 | 17 | bot_merge_weighted +17, inactive_maintainer_bench +16, emeritus_candidates_named +12 |
| 30 | 38 | asyncapi/bundler | 2 | 75% | 5 / 20 | 0 | two_active_maintainers +12, bot_merge_weighted +26 |
| 31 | 36 | asyncapi/converter-js | 2 | 58% | 13 / 31 | 1 | two_active_maintainers +12, bot_merge_weighted +20, inactive_maintainer_bench +2, emeritus_candidates_named +2 |
| 32 | 36 | asyncapi/vs-asyncapi-preview | 2 | 68% | 13 / 40 | 0 | two_active_maintainers +12, bot_merge_weighted +24 |
| 33 | 33 | asyncapi/html-template | 2 | 48% | 32 / 62 | 1 | two_active_maintainers +12, bot_merge_weighted +17, inactive_maintainer_bench +2, emeritus_candidates_named +2 |
| 34 | 30 | asyncapi/asyncapi-react | 2 | 39% | 36 / 59 | 1 | two_active_maintainers +12, bot_merge_weighted +14, inactive_maintainer_bench +2, emeritus_candidates_named +2 |
| 35 | 30 | asyncapi/markdown-template | 2 | 39% | 22 / 36 | 1 | two_active_maintainers +12, bot_merge_weighted +14, inactive_maintainer_bench +2, emeritus_candidates_named +2 |
| 36 | 28 | asyncapi/parser-js | 2 | 45% | 11 / 20 | 0 | two_active_maintainers +12, bot_merge_weighted +16 |
| 37 | 24 | asyncapi/studio | 4 | 58% | 27 / 65 | 1 | bot_merge_weighted +20, inactive_maintainer_bench +2, emeritus_candidates_named +2 |
| 38 | 23 | asyncapi/community | 4 | 55% | 116 / 255 | 1 | bot_merge_weighted +19, inactive_maintainer_bench +2, emeritus_candidates_named +2 |
| 39 | 22 | asyncapi/website | 9 | 63% | 207 / 560 | 0 | bot_merge_weighted +22 |
| 40 | 21 | asyncapi/jasyncapi-idea-plugin | 2 | 14% | 69 / 80 | 1 | two_active_maintainers +12, bot_merge_weighted +5, inactive_maintainer_bench +2, emeritus_candidates_named +2 |
| 41 | 16 | asyncapi/saunter | 2 | 11% | 8 / 9 | 0 | two_active_maintainers +12, bot_merge_weighted +4 |
| 42 | 15 | asyncapi/kotlin-asyncapi | 2 | 8% | 128 / 139 | 0 | two_active_maintainers +12, bot_merge_weighted +3 |
| 43 | 15 | asyncapi/openapi-schema-parser | 3 | 43% | 20 / 35 | 0 | bot_merge_weighted +15 |
| 44 | 11 | asyncapi/cli | 4 | 30% | 102 / 146 | 0 | bot_merge_weighted +11 |
| 45 | 11 | asyncapi/spec | 5 | 32% | 19 / 28 | 0 | bot_merge_weighted +11 |
| 46 | 10 | asyncapi/generator | 4 | 16% | 178 / 212 | 1 | bot_merge_weighted +6, inactive_maintainer_bench +2, emeritus_candidates_named +2 |
| 47 | 3 | asyncapi/conference-website | 4 | 9% | 113 / 124 | 0 | bot_merge_weighted +3 |
| 48 | 0 | asyncapi/.github | 3 | 0% | 27 / 27 | 0 | bot_merge_weighted +0 |
