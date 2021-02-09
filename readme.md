Creates an attested invite.

- Please read our full docs for how to obtain an access token. The key for this use case is to enable the following scopes: `flows.read`, `invites.write`, `invites.attest`.
- You will also need the Envoy location ID, which can be retrieved from our API (`api/v3/locations` with the `locations.read` scope).
- The arrival time should be in ISO-8601 format.
