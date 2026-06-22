# 취향엔진 FE — 디자인 시스템 & 프론트 가이드

웹툰 취향 분석·추천 서비스의 프론트엔드. **Vite + React + TypeScript + Tailwind v4**.
이 문서는 화면을 만들 때 따르는 **단일 기준**이다. 새 컴포넌트/페이지는 여기 규칙을 먼저 읽고 작성한다.

---

## 0. 무엇을 보고 만들었나 (학습 출처)

UX/UI에서 호평받는 제품들의 공통 패턴을 분석해 정립했다. 핵심 레퍼런스:

- **Linear** — 다크 우선, 차분한 회색조 + 단일 브랜드 액센트, 키보드 우선, 빠른 마이크로인터랙션.
- **Vercel / Geist** — 거의 모노크롬, 강한 대비, 넉넉한 여백. 색은 "의미"에만.
- **Stripe** — 절제된 색 + 정교한 그라데이션, 그림자보다 표면/보더로 깊이.
- **Raycast** — 다크 + 선명한 단일 액센트의 "브랜드 소유색" 전략.

여기서 뽑은 4대 원칙(아래)을 이 프로젝트의 제약(표지 이미지 금지 → 색·타이포로 정체성)과 결합했다.

출처: [Mantlr](https://mantlr.com/blog/stripe-linear-vercel-premium-ui) · [Pixeldarts](https://www.pixeldarts.com/en/post/four-design-principles-behind-stripe-linear-and-vercel) · [LogRocket: Linear design](https://blog.logrocket.com/ux-design/linear-design/) · [Geist Design System](https://designsystems.surf/design-systems/vercel)

---

## 1. 핵심 원칙 (흔들리지 말 것)

1. **절제된 색.** 화면의 90%는 무채색(canvas/surface/line/fg). 브랜드 코발트(너울)는 **의미·포커스·주요 액션에만**, 장식으로 쓰지 않는다.
2. **그림자보다 보더.** 깊이는 `box-shadow`가 아니라 **표면색 대비 + 옅은 보더(line)**로. 떠 있는 레이어일수록 표면이 밝아진다 (canvas → surface → surface-2).
3. **강한 대비 + 여백.** 텍스트 위계는 fg / fg-muted / fg-subtle 3단계로 명확히. 여백은 "빈 곳"이 아니라 호흡.
4. **6개 마이크로상태.** 모든 인터랙티브 요소는 default·hover·focus·active·disabled·loading을 갖는다. 포커스는 전역 `:focus-visible` 브랜드 링으로 일관 처리.

프로젝트 고유 제약: **웹툰 표지/이미지 자산 절대 금지.** 카드 정체성은 제목·장르로 결정론적 생성하는 그라데이션(`lib/gradient.ts`)으로만 만든다.

---

## 2. 디자인 토큰 (`src/index.css`의 `@theme`)

토큰 변경은 **`index.css`에서만**. 컴포넌트에 raw hex(`#xxxxxx`)를 박지 않는다.

### 색
| 토큰 | 용도 |
|---|---|
| `canvas` | 페이지 배경 (가장 어두움) |
| `surface` / `surface-2` / `surface-hover` | 카드·입력 등 떠 있는 표면 (위로 갈수록 밝게) |
| `line` / `line-strong` | 보더. hover 시 strong으로 |
| `fg` / `fg-muted` / `fg-subtle` | 텍스트 위계 (제목 / 본문보조 / 가장 흐림) |
| `brand-300…700` | 코발트 액센트(너울). 기본 액션 `brand-500`(=`primary` #2D6BE5), hover `brand-400`, active `brand-600` |
| `primary` / `bg-light` / `bg-dark` | 브랜드 원색 #2D6BE5 / off-white #F4F2EC / navy #10183A |
| `--gradient-brand` | 심볼 그라데이션(#4F8DF5→#2D6BE5). 브랜드 면(인증 패널·락업 배경)에 사용 |

Tailwind 유틸로 노출됨: `bg-surface`, `text-fg-muted`, `border-line`, `bg-brand-500` 등.

### 타이포
- 폰트: **Pretendard Variable** (한국어 최적, Latin 양호) → `--font-sans`.
- 위계: 페이지 제목 `text-3xl font-bold text-fg` / 섹션 `text-xl font-bold` / 본문 `text-sm`~`text-[15px]` / 메타 `text-xs`.
- 섹션 eyebrow(소제목 라벨)는 `text-sm uppercase tracking-widest text-brand-400`.

### 반경 / 모션
- 반경: 입력·버튼 `rounded-md`, 카드 `rounded-lg`, 알약 `rounded-full`.
- 모션: `transition-colors`는 `duration-150 ease-out`, 떠오름은 `duration-200 ease-out hover:-translate-y-1`. 과한 애니메이션 금지.

---

## 3. 컴포넌트 구조 (컴포넌트화 규칙)

```
src/
├─ components/
│  ├─ ui/            # 디자인 시스템 프리미티브 (도메인 무관, 재사용)
│  │  ├─ Button, Input, Field, Badge, Chip, Card
│  │  └─ index.ts    # 배럴 — 화면에서는 여기서만 import
│  ├─ layout/        # AppShell, TopBar (앱 골격)
│  ├─ WebtoonCard.tsx  # 도메인 컴포넌트 (프리미티브 조합)
│  └─ TierBadge.tsx
├─ pages/            # 라우트 단위 화면 (LoginPage, LibraryPage …)
├─ auth/             # AuthContext(목), ProtectedRoute
├─ lib/              # cn(), gradient() 등 순수 유틸
├─ types/            # 도메인 타입 (Webtoon, Tier)
└─ data/             # webtoons.ts (xlsx 변환 산출물)
```

**3계층 원칙:**
1. **ui/** = 무지성 재사용 프리미티브. 도메인(웹툰)을 모른다. variant/size/state를 props로.
2. **도메인 컴포넌트**(WebtoonCard, TierBadge) = 프리미티브를 조합해 도메인 의미를 입힌다.
3. **pages/** = 도메인 컴포넌트 + 레이아웃을 배치. 데이터 fetch/상태는 여기서.

규칙:
- 새 스타일이 필요하면 먼저 **ui/ 프리미티브에 variant 추가**를 검토. 페이지에 일회성 클래스 떡칠 금지.
- className 합성은 항상 `cn()` (clsx + tailwind-merge) 사용.
- ref가 필요한 프리미티브(Button/Input)는 `forwardRef`로.
- 폼 요소는 `Field`로 감싸 label·error·a11y(`htmlFor`/`id`) 연결.

---

## 4. 프리미티브 카탈로그

| 컴포넌트 | 주요 props | 비고 |
|---|---|---|
| `Button` | `variant: primary\|secondary\|ghost\|danger`, `size: sm\|md\|lg`, `loading`, `fullWidth` | 6상태 내장 |
| `Input` | `invalid` | placeholder/포커스/disabled 처리 |
| `Field` | `label`, `error`, `hint`, `children: (id)=>node` | 폼 필드 래퍼 |
| `Badge` | `tone: neutral\|brand\|glass` | 장르 칩 등 (glass=그라데이션 위) |
| `Chip` | — | 태그 알약 |
| `Card` | `interactive` | 표면 컨테이너, interactive 시 hover 떠오름 |

---

## 4.5 브랜드 자산 — 너울(Nuol)

서비스명 **너울**(큰 물결) / 영문·도메인 **Nuol**. 심볼은 단일 스트로크 파도 스웰.

- **`<Logo />`** (`components/Logo.tsx`) — `size`(심볼 높이px), `variant: symbol|lockup`, `orientation: horizontal|vertical`.
  - lockup = 심볼 + 한글 "너울". **워드마크는 반드시 웹폰트 텍스트(Pretendard)** — 이미지/AI 생성 금지. 색은 `currentColor`라 라이트/다크 자동 대응.
- **자산** (`public/`): `brand/logo-symbol.svg`(원본 보존, 수정 금지) · `brand/logo-symbol.png`(여백 트림+다운스케일, 컴포넌트가 사용) · `favicon-32.png` · `apple-touch-icon.png` · `icon-192/512.png`(네이비 #10183A 둥근 배경+심볼) · `site.webmanifest`.
- **금지(엄수)**: 심볼 패스/색 변경, 비율 왜곡, 그림자·3D·외곽선 추가, 웹툰 캐릭터·말풍선 결합. **크기 조절만 허용.** 여백은 심볼 높이의 최소 30% 확보.
- 원본 첨부는 벡터가 아니라 PNG-in-SVG 래스터였음 → 패스가 없으므로 "원본 보존 + 다운스케일 파생"으로 운용.

---

## 5. 인증 & 라우팅

- `AuthProvider`(`auth/AuthContext.tsx`)가 `user/login/signup/logout` 제공. **현재 localStorage 목** — 백엔드(`webtoon/be`) 준비 시 `login/signup` 내부만 fetch로 교체하면 화면은 그대로 동작.
- `ProtectedRoute`로 비로그인 시 `/login` 리다이렉트. 라우트 트리는 `App.tsx`.
- 공개: `/login`, `/signup` · 보호: `/library`, `/discover`(AppShell 안).

---

## 6. 작업 방식

- 새 화면: ① 필요한 프리미티브가 ui/에 있나 확인 → 없으면 추가 → ② 도메인 컴포넌트 조합 → ③ page에 배치.
- 색·간격·반경은 토큰으로. 매직 넘버/raw hex 지양.
- 데이터 갱신: `data/webtoons.ts`는 xlsx 변환 산출물이므로 **직접 수정 금지**(파이프라인으로 재생성).
- 변경 후 `npm run build`(tsc 포함)로 타입까지 검증.
