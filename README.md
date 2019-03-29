# Sec-Reporter

An application which sends security logs to an endpoint.

**CSP:** Content Security Policy

## Getting Started

1. Run `npm install` 

2. Run `npm run start` to host the application on `localhost:3200`.

3. Go to [localhost:3200](http://localhost:3200) and check the console to see the Content Security Policy.

```markdown
Refused to load the stylesheet `https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css`
because it violates the following Content Security Policy directive: `"style-src 'self'"`.
Note that `style-src-elem` was not explicitly set, so 'style-src' is used as a fallback.
```

4. Press the buttons or refresh the page to send security reports to `http://localhost:3000/reports`

5. Check out `app.js` lines 25 to 37:

```javascript
// Adds a Content Security Policy to the header on all responses:
app.get('/*', function (req, res, next) {
    /* The Content-Security-Policy, see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
    // Allows for directives to made which control what resources the browser will allow to load.
    // `default-src http` requires the page to be loaded via https
    // `style-src 'self'` requires all stylesheets to be from the origin where the document is served (must include port numbers)
    // `report-uri http:// ...` tells the browser to send a JSON payload containing details about breaches to the security policy
    */ 
        res.header(`Content-Security-Policy-Report-Only`, `default-src https; block-all-mixed-content; style-src https; script-src https code.jquery.com/jquery-3.3.1.min.js cdnjs.cloudflare.com; connect-src code.jquery.com; require-sri-for script style; report-uri http://localhost:3000/report;`);
    next();
});
```
## Shape of the Content Security Policy Reports

The following is the shape of a content security policy 
report that is sent by a compliant browser when a security 
policy is breached.

```json
{
  "csp-report": {
    "document-uri": "http://example.com/signup.html",
    "referrer": "",
    "blocked-uri": "http://example.com/css/style.css",
    "violated-directive": "style-src cdn.example.com",
    "original-policy": "default-src 'none'; style-src cdn.example.com; report-uri /_/csp-reports"
  }
}
```

## Shape of the Custom Security Report

The following is the shape of a the custom security report:

```json
{
  "document-uri": "http://localhost:3200",
  "blocked-uri": "http://evil.com",
  "ip": "100.1.2.190",
  "payload": "text"
}
```
