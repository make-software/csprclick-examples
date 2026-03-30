---
name: csprclick-sdk-integration
title: CSPR.click SDK Integration
description: Skills for integrating the CSPR.click Web SDK into dApps on the Casper blockchain. Covers wallet connection, transaction signing, event handling, theming, and CSPR.cloud API proxy — for React < 19 (npm), React 19+, Next.js, and Vanilla JS (CDN). Use when working on any CSPR.click integration task.
allowed-tools: Read, Grep, Glob, Edit, Write, Bash
user-invocable: true
---

# CSPR.click Web SDK — AI Skills Reference

> **SDK:** `@make-software/csprclick-core-client` (web-sdk) + `@make-software/csprclick-ui`
> **Types:** `@make-software/csprclick-core-types`
> **CDN:** `https://cdn.cspr.click/ui/v2.0.0/csprclick-client-2.0.0.js`
> **Full API reference:** [`llms.txt`](./references/llms.txt)

---

## Overview

CSPR.click is a **unified Web3 SDK for the Casper blockchain** that aggregates all major Casper wallets behind a single, consistent API. A dApp integrates one SDK instead of individually supporting each wallet provider.

### What CSPR.click Provides

| Capability | Description |
|---|---|
| **Wallet Aggregator** | Single integration for Casper Wallet, Ledger, WalletConnect, MetaMask Snap |
| **Social Logins** | Google and Apple OIDC with an MPC wallet |
| **Transaction Signing UI** | Managed wallet interaction UI for signing and sending transactions |
| **CSPR.cloud Proxy** | Authenticated access to CSPR.cloud REST, Streaming, and Node RPC APIs — no backend required |
| **Fiat On-Ramp** | Purchase CSPR with credit card or wire transfer via Topper by Uphold |

### Architecture

CSPR.click uses a **cross-origin iframe bridge** pattern:

1. **Client script** — downloaded into the dApp. Fetches app configuration and injects a hidden `<iframe>` pointing to the CSPR.click host. All sensitive operations happen inside that iframe, isolating private keys from the dApp origin.
2. **Core (iframe side)** — runs on `accounts.cspr.click` domain. Owns account storage (IndexedDB via `AccountManager`), manages auth tokens, handles wallet provider sessions, and processes sign/send requests.
3. **Message bridge** — all cross-window communication uses typed `window.postMessage` (`ClickMessage` objects). The SDK validates `event.origin` on every message before processing.
4. **`CSPRClickSDK` extends `SafeEventEmitter`** — exposed as `window.csprclick` (CDN) or via `useClickRef()` (React). Always wait for `csprclick:loaded` before calling any SDK method.

### Integration Paths

| Environment | Package | Access |
|---|---|---|
| React < 19 | `@make-software/csprclick-ui` (npm) | `useClickRef()` hook |
| React 19+ | CDN bundle | `window.csprclick` |
| Next.js | CDN bundle (inject in `useEffect`) | `window.csprclick` |
| Vanilla JS / HTML | CDN bundle | `window.csprclick` |

### Packages (npm)

| Package | Description |
|---|---|
| `@make-software/csprclick-core-types` | TypeScript type definitions — import all types from here |
| `@make-software/csprclick-ui` | React components: `<ClickProvider>`, `<ClickUI>`, hooks, themes |

### Application ID

An `appId` is required to initialize the SDK. It identifies your application to CSPR.click and is used for analytics, rate limiting, and feature access control. Use the following values based on your environment:

- **localhost development:** use `appId: 'csprclick-template'`
- **Production:** self-register at https://console.cspr.build

---

## Capabilities

### Wallet & Account Management
- `signIn()` — open wallet selector modal
- `connect(provider)` — connect a specific wallet directly
- `signInWithAccount(account)` — resume a previous session silently
- `switchAccount()` — switch to a different account
- `signOut()` — end session (keeps wallet connected)
- `disconnect(fromWallet)` — revoke wallet permission
- `getActiveAccount()` — synchronous, reads localStorage
- `getActiveAccountAsync(options?)` — async, supports balance and fiat fetching
- `getSignInOptions(refresh?)` — list available providers and previously connected accounts
- `forgetAccount(account)` — remove a known account
- `isProviderPresent(provider)` — check if provider is installed
- `isConnected(provider)` — check if wallet is connected
- `isUnlocked(provider)` — check if wallet is unlocked
- `getProviderInfo(provider?)` — name, version, supported features
- `getActivePublicKey()` — get the current active public key

### Transaction Signing & Sending
- `send(transactionJSON, publicKey, onStatusUpdate?, timeout?)` — sign and submit to the Casper network
- `sign(transactionJSON, publicKey)` — sign only, returns signed object for manual submission
- `signMessage(message, publicKey)` — sign arbitrary text message

### Encryption
- `encryptMessage(message, publicKey)` — encrypt a message with the wallet
- `decryptMessage(encryptedMessage, publicKey)` — decrypt a message with the wallet

### UI Components (React < 19 only)
- `<ClickProvider>` — wraps the app, initializes the SDK
- `<ClickUI>` — top bar and all wallet modal windows
- `<AccountIdenticon>` — visual avatar from public key or account hash
- `useClickRef()` — hook to access the SDK instance inside any component
- `buildTheme()` / `DefaultThemes` / `clickStyleguide` — theme customization API

### CSPR.cloud API Proxy
- `getCsprCloudProxy()` — returns proxy object
- `proxy.fetch(endpoint)` — REST API (same signature as `window.fetch`)
- `proxy.newWebSocket(endpoint)` — WebSocket streaming
- `proxy.RpcURL` + `proxy.RpcDigestToken` — Node RPC via `casper-js-sdk`

### Fiat On-Ramp
- `showBuyCsprUi()` — open the Buy CSPR widget

### SDK Events
| Event | Fired When |
|---|---|
| `csprclick:loaded` | SDK iframe handshake complete — safe to call SDK methods |
| `csprclick:signed_in` | Account connected |
| `csprclick:switched_account` | Active account changed |
| `csprclick:signed_out` | Session closed |
| `csprclick:disconnected` | Wallet disconnected |
| `csprclick:sign_in` | `signIn()` was called |
| `csprclick:unsolicited_account_change` | Wallet changed account externally |

---

## Skills

This file describes step-by-step skills available to AI agents working with the CSPR.click Web SDK.
Full API reference, types, and code examples live in [`llms.txt`](./references/llms.txt).

---

## Skill: Initialize CSPR.click SDK

### Description
Set up CSPR.click in a dApp so it can connect wallets, manage accounts, and sign transactions. The correct setup path depends on the framework and React version.

### When to Use

Use this skill whenever the task involves **CSPR.click, Casper wallets, or blockchain interactions on the Casper network**.

#### Trigger on user intent (keywords & phrases)
- Mentions of: `csprclick`, `cspr.click`, `casper`, `casper network`, `casper wallet`. 
- Actions like:
    - "connect wallet", "wallet integration", "add wallet support"
    - "sign transaction", "send transaction", "deploy contract"
    - "sign message", "authenticate with wallet"
    - "get account", "get balance", "switch account"
- Mentions of SDK usage: `window.csprclick`, `useClickRef`, `ClickProvider`, `ClickUI`

#### Trigger on task type
- Integrating wallet connection into a Casper Network dApp
- Handling authentication via wallet (sign-in / sign-out)
- Sending or signing blockchain transactions
- Displaying or reacting to wallet/account state in UI
- Listening to wallet events (sign-in, account switch, disconnect)
- Accessing CSPR.cloud APIs via proxy

#### Trigger on environment setup
- Setting up CSPR.click in:
    - React (< 19 or 19+)
    - Next.js
    - Vanilla JS / HTML
- Questions about CDN vs npm integration
- Adding `<ClickUI>`

#### Trigger on implicit requirements
- Any feature that requires a **user wallet or public key**
- Any on-chain interaction (transfer, staking, contract call)
- Any UI that depends on connected account state


### Inputs
| Input | Required | Notes |
|---|---|---|
| Framework | Yes | React < 19, React 19+, Next.js, or Vanilla JS |
| HTML div | CDN setups | Add `<div id="csprclick-ui"></div>` to the HTML file so the topbar has a mount point |
| `appId` | Yes | `'csprclick-template'` for localhost; production ID from https://console.cspr.build |
| Wallet providers | Yes | At minimum one of: `casper-wallet`, `ledger`, `metamask-snap`, `walletconnect` |
| WalletConnect `projectId` | If using WalletConnect | From https://dashboard.reown.com |

### Process

**React < 19 (npm packages):**
1. Install `@make-software/csprclick-ui`, `@make-software/csprclick-core-types`, `styled-components@^5.3.9`
2. Define `CsprClickInitOptions` with `appName`, `appId`, `providers`, `contentMode`
3. Wrap root with `<ThemeProvider>` → `<ClickProvider options={clickOptions}>`
4. Define `topBarSettings` and pass it to `<ClickUI topBarSettings={topBarSettings} />`
5. Set up event listeners with `useClickRef()` inside a `useEffect`

`topBarSettings` for React < 19 uses **JSX component instances**. For full code examples covering all cases (all built-in menu items, theme switching with `ThemeProvider` + `buildTheme` + `ThemeModeType`, and network switcher), read the following sections from `docs/ai/llms.txt`:

- **`topBarSettings` field reference + all accountMenuItems examples** — `docs/ai/llms.txt` section "Configuring topBarSettings" (lines 294–403)
- **Wrapping with `ThemeProvider` + `buildTheme`** — `docs/ai/llms.txt` section "Build and apply a theme" (lines 509–528)
- **Switching light/dark at runtime with `ThemeModeType` state** — `docs/ai/llms.txt` section "Switching between light and dark at runtime" (lines 552–563)

**`accountMenuItems` notes:**
- The dropdown always shows **Switch Account** and **Sign Out** — these cannot be removed.
- Everything in `accountMenuItems` is added on top of those two.
- Pass an empty array (`[]`) to show only the two defaults.
- Pass custom React elements alongside built-in ones for fully custom menus.

Key rules to apply when generating a React < 19 app:
- `accountMenuItems` must be **JSX element instances** (e.g. `<AccountCardMenuItem key="account-card" />`), not strings.
- Build the theme **once outside the component**: `const AppTheme = buildTheme(DefaultThemes.csprclick);`
- Track `themeMode` in `useState<ThemeModeType>` and pass `AppTheme[themeMode]` to `<ThemeProvider theme={...}>`.
- `onThemeSwitch` receives no argument — toggle by flipping your own state.
- `networkSettings` is optional; include `networks`, `currentNetwork`, and `onNetworkSwitch` when a network switcher is needed.
- Omit `topBarSettings` entirely to hide the top bar (modals still work).

---

**React 19+ (CDN):**
1. Run `npm install @make-software/csprclick-core-types` then create `global.d.ts` with `interface Window { csprclick: ICSPRClickSDK }`
2. Add `<div id="csprclick-ui" />` in root `App.tsx` — top bar mount point
3. In `useEffect`, assign `window.clickSDKOptions` and `window.clickUIOptions` **before** injecting the CDN script
4. Inject CDN script dynamically via `document.createElement('script')` with `defer = true`
5. Listen for `window.addEventListener('csprclick:loaded', ...)` and register SDK event listeners inside the callback
6. Return cleanup that calls `.off()` for each listener

`clickUIOptions.accountMenuItems` for CDN uses **string keys** (not JSX). For the full setup including `clickSDKOptions`, `clickUIOptions`, event listeners, and CDN script injection, read:

- **Complete React 19+ / Next.js example** — `docs/ai/llms.txt` section "Quick Start — React 19** and Next.js" (lines 741–890)
- **`clickUIOptions` with `accountMenuItems`, `onThemeChanged`, `networkSettings`** — `docs/ai/llms.txt` lines 770–790 (inside that section)

Key rules to apply when generating a React 19+ app:
- `accountMenuItems` must be **string keys** (`'AccountCardMenuItem'`, `'CopyHashMenuItem'`, `'BuyCSPRMenuItem'`, `'ViewAccountOnExplorerMenuItem'`), not JSX.
- `onThemeChanged(theme: string)` receives `'light'` or `'dark'` — use it to toggle a CSS class or update state.
- `defaultTheme` sets the initial theme: `'light'` | `'dark'`.
- `networkSettings` is optional; include `networks`, `currentNetwork`, and `onNetworkSwitch` when a network switcher is needed.
- Add `'use client';` directive at the top for Next.js; remove it for plain React 19+.
- Assign both `window.clickSDKOptions` and `window.clickUIOptions` **before** injecting the CDN script.

---

**Next.js (CDN):**
Same shape as React 19+ CDN — use `useEffect` in `app/layout.tsx` or root `App.tsx`. For the full setup read the same reference as React 19+ above. Next.js-specific differences:
- Add `'use client';` at the top of the file.
- Use `rootAppElement: '#__next'` instead of `'#app'` or `'#root'`.
- Never inject the CDN script as a static `<script>` tag in `layout.tsx`.
- `accountMenuItems`, `onThemeChanged`, and `networkSettings` work identically to React 19+ — see `docs/ai/llms.txt` lines 770–790.

---

**Vanilla JS (CDN only):**
1. Add `<div id="csprclick-ui"></div>` to HTML — top bar mount point
2. In `app.js`, define `window.clickSDKOptions` and `window.clickUIOptions` as globals **before** injecting the CDN script
3. Inject CDN script dynamically after config objects are defined
4. Register event listeners inside `window.addEventListener('csprclick:loaded', ...)`

For the full setup including HTML, `clickSDKOptions`, `clickUIOptions`, event listeners, and CDN injection, read:

- **Complete Vanilla JS example** — `docs/ai/llms.txt` section "Quick Start — Vanilla JavaScript / HTML / React 19**" (lines 1004–1085)
- **`clickUIOptions` with `accountMenuItems`, `onThemeChanged`, `networkSettings`** — `docs/ai/llms.txt` lines 1037–1058 (inside that section)

Key rules to apply when generating a Vanilla JS app:
- `accountMenuItems` must be **string keys** (`'AccountCardMenuItem'`, `'CopyHashMenuItem'`, `'BuyCSPRMenuItem'`, `'ViewAccountOnExplorerMenuItem'`).
- `onThemeChanged(theme)` receives `'light'` or `'dark'` — toggle a CSS class or update variables.
- `defaultTheme` sets the initial theme: `'light'` | `'dark'`.
- `networkSettings` is optional; include `networks`, `currentNetwork`, and `onNetworkSwitch` (call `window.csprclickUI.setNetwork(network)` inside it).
- Define both `window.clickSDKOptions` and `window.clickUIOptions` **before** injecting the CDN script.

### Output
A working SDK integration where the wallet top bar is visible, wallet events are handled, and `window.csprclick` / `useClickRef()` is available for subsequent SDK calls.

### Examples
See [`llms.txt` → Quick Start — React (version < 19)](./references/llms.txt#quick-start--react-version--19)
See [`llms.txt` → Quick Start — React 19+ and Next.js](./references/llms.txt#quick-start--react-19-and-nextjs)
See [`llms.txt` → Quick Start — Vanilla JavaScript / HTML](./references/llms.txt#quick-start--vanilla-javascript--html)
See [`llms.txt` → Configuring topBarSettings](./references/llms.txt#configuring-topbarsettings)

---

## Skill: Connect a Wallet

### Description
Trigger the CSPR.click wallet selector UI so the user can connect their wallet.

### When to Use
- User clicks a "Connect Wallet" button
- App needs an account before performing a transaction
- `getActiveAccount()` returns `null`

### Inputs
None required. Optionally pass a specific provider key to connect directly without showing the selector.

### Process
1. Confirm SDK is initialized (`csprclick:loaded` has fired)
2. Call `signIn()` to show the wallet selector modal, or `connect(providerKey)` to connect a specific wallet directly
3. Listen for `csprclick:signed_in` event to receive the connected account

### Output
`csprclick:signed_in` event fires with `{ account: AccountType }` payload.

### Examples
```tsx
// React
const clickRef = useClickRef();
clickRef?.signIn();

// Vanilla JS
window.csprclick.signIn();

// Connect specific wallet directly
window.csprclick.connect('casper-wallet');
```

---

## Skill: Handle Account Events

### Description
React to wallet lifecycle events: sign-in, account switch, sign-out, and disconnect.

### When to Use
- Any component that needs to display or act on the current account state
- Always set up alongside SDK initialization — do not skip

### Inputs
A reference to the SDK instance (`useClickRef()` in React, `window.csprclick` in Vanilla JS).

### Process

**React < 19:** See [`llms.txt` → Event Listeners](./references/llms.txt#event-listeners)

**React 19+ / Vanilla JS:** register the same listeners inside the `csprclick:loaded` callback. Always call `.off()` on cleanup.

### Output
Up-to-date `AccountType` object (or `null`) reflecting the current wallet session.

### Examples
See [`llms.txt` → Event Listeners](./references/llms.txt#event-listeners)
See [`llms.txt` → Events](./references/llms.txt#events)

---

## Skill: Send a Transaction

### Description
Request the user to sign a transaction and submit it to the Casper network in one call. Uses `casper-js-sdk` npm package.

### When to Use
- User initiates any on-chain action (transfer, contract call, staking, etc.)
- Preferred over `sign()` for most use cases — handles both signing and submission

### Inputs
| Input | Required | Notes |
|---|---|---|
| `transactionJSON` | Yes | Call `transaction.toJSON()` when using `casper-js-sdk` objects |
| `signingPublicKey` | Yes | Must equal `getActiveAccount().public_key` (lowercased) |
| `onStatusUpdate` | Optional | Callback `(status, data) => void` for real-time WebSocket updates |
| `timeout` | Optional | Default 120 seconds |

### Process
1. Get the active account: `clickRef?.getActiveAccount()` or `window.csprclick.getActiveAccount()`
2. Build the transaction using `casper-js-sdk` and call `.toJSON()`
3. Call `send(transactionJSON, publicKey, onStatusUpdate)`
4. Handle the result: check `result.transactionHash` (success), `result.cancelled`, or `result.error`

> Always use **TransactionV1** format. `Deploy` is legacy and will be deprecated.
> Always check `account.providerSupports` includes `'sign-transactionv1'` before sending.

### Output
`SendResult` object with `transactionHash`, `cancelled`, `status`, and `error` fields.

### Examples
See [`llms.txt` → Transaction Signing (React)](./references/llms.txt#transaction-signing-react)
See [`llms.txt` → Transaction Signing (Vanilla JS)](./references/llms.txt#transaction-signing-vanilla-js)

---

## Skill: Sign a Transaction (without submitting)

### Description
Request the user's signature on a transaction but return the signed object without submitting to the network.

### When to Use
- You need to submit to the network yourself (custom node, batching, etc.)
- Advanced flows where submission is handled separately from signing

### Inputs
| Input | Required |
|---|---|
| `transactionJSON` | Yes |
| `signingPublicKey` | Yes — must match active account |

### Process
1. Call `sign(transactionJSON, signingPublicKey)`
2. Check `result.cancelled` and `result.error`
3. Use `result.transaction` (TransactionV1) or `result.deploy` (legacy) for submission

### Output
`SignResult` object with `signatureHex`, `signature`, `transaction`, `deploy`, `cancelled`, `error`.

### Examples
```javascript
const result = await window.csprclick.sign(transactionJSON, activePublicKey);
if (result.cancelled) return;
if (result.error) throw new Error(result.error);
// submit result.transaction yourself
```

---

## Skill: Sign a Message

### Description
Request the user to sign an arbitrary text message (off-chain, no network submission).

### When to Use
- Authentication flows (sign-to-prove-ownership)
- Any off-chain signature requirement

### Inputs
| Input | Required |
|---|---|
| `message` | Yes — plain text string |
| `signingPublicKey` | Yes — must match active account |

### Process
1. Call `signMessage(message, signingPublicKey)`
2. Check `result.cancelled` and `result.error`
3. Use `result.signatureHex` for verification

### Output
`SignResult` object — relevant fields: `signatureHex`, `cancelled`, `error`.

### Examples
```javascript
const result = await window.csprclick.signMessage('Authenticate me', publicKey);
if (!result.cancelled && !result.error) {
  console.log(result.signatureHex);
}
```

---

## Skill: Get Active Account

### Description
Retrieve the currently connected wallet account, optionally with balance.

### When to Use
- Before any transaction to get the signing public key
- To display account info, balance, or identicon in the UI
- To check if a user is signed in

### Inputs
| Method | Returns | Notes |
|---|---|---|
| `getActiveAccount()` | Sync, reads localStorage | Fast, use for public key lookup |
| `getActiveAccountAsync({ withBalance: true })` | Async, fresh data | Use when balance display is needed |

### Process
1. Call `clickRef?.getActiveAccount()` (React) or `window.csprclick.getActiveAccount()` (Vanilla JS)
2. If `null` — no active session, prompt user to sign in
3. Always lowercase `public_key` before passing to `sign()` or `send()`

### Output
`AccountType` object or `null`. See [`llms.txt` → Types → AccountType](./references/llms.txt#accounttype).

---

## Skill: Customize Theme (React < 19 only)

### Description
Apply a custom color theme to the `<ClickUI>` top bar and wallet modals.

### When to Use
- Branding the wallet UI to match the dApp design
- Switching between light/dark mode

### Inputs
| Input | Required | Notes |
|---|---|---|
| Base theme | Yes | One of `DefaultThemes.csprclick`, `.red`, `.green`, `.blue` |
| `appLightTheme` / `appDarkTheme` | Optional | Override wrapper background and body colors |
| `csprclickLightTheme` / `csprclickDarkTheme` | Optional | Override internal `<ClickUI>` component colors using `clickStyleguide` tokens |

> Not available for React 19+, Next.js, or Vanilla JS — CDN bundle does not expose theme APIs.
> Requires `styled-components ^5.3.9`.

### Process
1. Import `buildTheme`, `DefaultThemes`, `ThemeModeType`, `clickStyleguide` from `@make-software/csprclick-ui`
2. Call `buildTheme({ ...DefaultThemes.csprclick, appLightTheme: {...}, appDarkTheme: {...} })`
3. Wrap app with `<ThemeProvider theme={AppTheme[ThemeModeType.light]}>`

### Output
Themed `<ClickUI>` that matches the dApp's visual design.

### Examples
See [`llms.txt` → Customizing Theme](./references/llms.txt#customizing-theme)

---

## Skill: Access CSPR.cloud API Proxy

### Description
Query CSPR.cloud REST, Streaming (WebSocket), and Node RPC APIs from the frontend without exposing API keys.

### When to Use
- Fetching account balances, transaction history, auction metrics, token data
- Subscribing to real-time blockchain events
- Using `casper-js-sdk` RPC calls from the browser

### Inputs
- Proxy must be enabled per-method in app settings at https://console.cspr.build
- Active SDK instance (`clickRef` or `window.csprclick`)

### Process
1. Call `getCsprCloudProxy()` to get the proxy object
2. Use `proxy.fetch('/endpoint')` for REST (same signature as `window.fetch`)
3. Use `proxy.newWebSocket('/endpoint')` for streaming
4. Use `proxy.RpcURL` + `proxy.RpcDigestToken` with `casper-js-sdk` `HttpHandler` for RPC

### Output
REST: response object with `data`, `item_count`, `page_count`.
WebSocket: standard `WebSocket` instance.
RPC: full `casper-js-sdk` RPC client.

### Examples
See [`llms.txt` → CSPR.cloud API Proxy](./references/llms.txt#csprcloud-api-proxy)

---

## Skill: Display Buy CSPR Widget

### Description
Open the fiat on-ramp widget so users can purchase CSPR with a credit card or wire transfer.

### When to Use
- User has insufficient CSPR balance to complete a transaction
- App wants to offer in-app token purchase

### Inputs
None.

### Process
Call `showBuyCsprUi()` — the widget opens as a modal managed by CSPR.click.

### Output
Fiat on-ramp modal shown to the user.

### Examples
```tsx
// React
const clickRef = useClickRef();
clickRef?.showBuyCsprUi();

// Vanilla JS
window.csprclick.showBuyCsprUi();
```

---

## Key Constraints AI Must Respect

- **Never call any SDK method before `csprclick:loaded` fires.**
- **`clickSDKOptions` and `clickUIOptions` must be assigned to `window` before the CDN script is injected** (React 19+, Next.js, Vanilla JS). The CDN bundle reads them on load.
- **`clickUIOptions` is required** — without it the top bar will not render correctly. Always include `uiContainer`, `rootAppElement`, `defaultTheme`, `accountMenuItems`.
- **`signingPublicKey` must exactly match `getActiveAccount().public_key` (lowercased).** Both `sign()` and `send()` throw otherwise.
- **Always use `TransactionV1` format.**
- **Always call `transaction.toJSON()`** when passing `casper-js-sdk` Transaction objects to CSPR.click `sign() and `send()` methods..
- **Theme APIs are React < 19 only.** Do not suggest `buildTheme` or `ThemeProvider` for React 19+, Next.js, or Vanilla JS.
- **CDN bundle for Vanilla JS / React 19+ / Next.js** — never suggest npm packages for these environments.
- **Inject CDN script dynamically** from app code — never as a static `<script>` tag in `index.html` or `layout.tsx`.
- **`signOut()` ≠ `disconnect()`** — do not conflate them. `signOut()` ends the session; `disconnect()` revokes wallet permission.
- **Always clean up `.off()` in `useEffect` return** to prevent memory leaks.
