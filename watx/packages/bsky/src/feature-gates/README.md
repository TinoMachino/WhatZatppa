# Feature Gates

A thin wrapper around [GrowthBook](https://www.growthbook.io/) for feature flag
evaluation and experiment tracking.

## Usage

Feature gates are accessible on `HydrationCtx` as `features`. A default scope
is defined in `Hydrator.createContext`, which is called by every request
handler. The default scope supplies anonymous `deviceId` and `sessionId`
identifiers for targeting unauthenticated users.

Feature gates can be checked via the following methods.

```typescript
// Check a single gate.
const enabled = ctx.features.checkGate(
  ctx.features.Gate.ThreadsReplyRankingExplorationEnable,
)

// Check multiple gates.
const gates = ctx.features.checkGates([
  ctx.features.Gate.ThreadsReplyRankingExplorationEnable,
  ctx.features.Gate.SearchFilteringExplorationEnable,
])
const enabled = gates.get(
  ctx.features.Gate.ThreadsReplyRankingExplorationEnable,
)
```

### User Context

To accurately gate features by user, we need additional context about that user.
For most use cases, we get this data from within the request handlers.

Here, the `features` client will be scoped to the current user, allowing for
accurate gate checks throughout the request lifecycle.

```typescript
const features = ctx.featureGatesClient.scope(
  ctx.featureGatesClient.parseUserContextFromHandler({
    viewer,
    req,
  }),
)

const hydrateCtx = await ctx.hydrator.createContext({
  labelers,
  viewer,
  features,
})
```

You can also create a temporary scope for checks that are independent of a
single request viewer, such as gates evaluated against image owner DIDs.

```typescript
const enabled = ctx.featureGatesClient
  .scope({ did: imageAuthor.did })
  .checkGate(ctx.featureGatesClient.Gate.ImageRemoveFormatFromUrl)
```

## User Identification

If the user is authenticated, we use their DID as the identifier for feature
targeting via the scoped feature gates client.

For unauthenticated users, and for experiments that don't require DID-level
targeting, we rely on identifiers passed from the client as headers:

- `X-Bsky-Device-Id` - persistent device/client identifier
- `X-Bsky-Session-Id` - current session identifier

> [!WARNING]
> If `deviceId` and `did` are both missing, the scoped client generates
> anonymous identifiers. This allows consistent unauthenticated targeting within
> the current request lifecycle without leaking state across requests.

## Adding Gates

See `gates.ts` and add them to the `Gate` enum. You can optionally prevent
metrics from being emitted for a gate by adding the gate to the
`IGNORE_METRICS_FOR_GATES` set.

## Metrics

Every feature evaluation fires the GrowthBook `onFeatureUsage` callback. Any
feature that is part of an experiment will also fire the `trackingCallback`
callback.

For some use cases, this can be noisy or performance intensive, so make use of
`IGNORE_METRICS_FOR_GATES` to silence metrics for specific gates.
