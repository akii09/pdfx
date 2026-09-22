---
'pdfx-cli': patch
---

Validate the registry URL before any request, so `add` and `block add` no longer fail
with an opaque `NetworkError: Could not reach http://REG` when the configured registry
is a placeholder or malformed value.

`registry` in pdfx.json must now be an HTTP(S) base URL with no credentials, query
string, or fragment, and trailing slashes are normalized away so request URLs cannot
double up. Invalid values are rejected up front with guidance naming the field and the
default registry.

The same validation now applies to the `--registry` override on `add`, which
previously bypassed it entirely and reached the network untouched.

When a well-formed registry is genuinely unreachable, the network error explains how to
check the configured value and distinguishes a timeout from an unresolvable host.
