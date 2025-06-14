# Project Dependencies Audit

## Date: 14/06/2025

## **Objective**: conduct the audit of all dependencies to identify potential threats to project security

# Used Tools:

- npm audit;
- snyk;
- socket.dev;

# Audit Results:

## **npm audit report**: 2 vulnerabilities (1 low, 1 moderate)

- **brace-expansion** 1.0.0 - 1.1.11 || 2.0.0 - 2.0.1 - *Severity: low*

brace-expansion Regular Expression Denial of Service vulnerability
___

- **vite 6.3.0 - 6.3.3** - *Severity: moderate*

Vite's server.fs.deny bypassed with /. for files under project root

## **snyk audit report**: Tested 133 dependencies for known issues, no vulnerable paths found.

## **socket.dev audit report**: 2 vulnerabilities (0 Critical, 0 High, 1 Medium, 1 Low)

- **vite 6.3.2** - *Medium*

Vite's server.fs.deny bypassed with /. for files under project root

*Summary*

The contents of files in the project root that are denied by a file matching pattern can be returned to the browser.

*Impact*

Only apps explicitly exposing the Vite dev server to the network (using --host or server.host config option) are affected. Only files that are under project root and are denied by a file matching pattern can be bypassed.

Examples of file matching patterns: ```.env, .env.*, *.{crt,pem}, **/.env```

Examples of other patterns: ```**/.git/**, .git/**, .git/**/*```

- **brace-expansion 1.1.11 || 2.0.1** - *Low*

brace-expansion Regular Expression Denial of Service vulnerability

*Summary*

A vulnerability was found in juliangruber brace-expansion up to 1.1.11/2.0.1/3.0.0/4.0.0. It has been rated as problematic. Affected by this issue is the function expand of the file index.js. The manipulation leads to inefficient regular expression complexity. The attack may be launched remotely. The complexity of an attack is rather high. The exploitation is known to be difficult. The exploit has been disclosed to the public and may be used. Upgrading to version 1.1.12, 2.0.2, 3.0.1 and 4.0.1 is able to address this issue.

## Zero-Day Vulnerabilities
Zero-day vulnerabilities are, by definition, unknown to developers and security vendors at the time they are exploited, so it's crucial to understand that it is impossible to provide an absolute guarantee against zero-day vulnerabilities, but we can minimize it by:

- *Dependencies Scanning*: We use multiple advanced tools, including npm audit, snyk, and socket.dev to detect vulnerabilities.
- *Proactive Monitoring*: Regular audits, such as this one, and continuous integration of security checks (recommended for future implementation) are vital for identifying and addressing vulnerabilities as soon as they become publicly known.
- *Dependency Hygiene*: Each package must to be checked before installation. We need to be sure that the package has no known vulnerabilities, is well maintained, constantly updated, and has many downloads.

# Package Replacement Proposal

replace *mui-file-input* with *react-dropzone*

| Package        | Downloads      | Vulnerabilities | Maintenance                                                                          |
| :------------- | :------------- | :-------------- | :----------------------------------------------------------------------------------- |
| mui-file-input | 14,702         | 0               | Low (Only one developer)                                                             |
| react-dropzone | 4,427,608      | 0               | High (Team of developers with large community of contributors, sponsors and backers) |

The React-dropzone package benefits:
- popularity: has 4.4M+ downloads / week
- large community: team of developers with contributors/sponsors/backers
- constant updates
- no vulnerabilities were found (npm audit, snyk, socket.dev)
- only 3 devependecies without security issues

# Audit Summary

After auditing all project dependencies using npm audit, snyk, and socket.dev, only 2 non-critical vulnerabilities were identified (1 medium, 1 low).

## Identified Issues

1. *vite (versions 6.3.0 – 6.3.3)* – Medium severity (CVE): potential file access bypass via the server.fs.deny configuration when the dev server is explicitly exposed to the network using --host.
This does not affect production environments where the Vite server is not publicly accessible.

2. *brace-expansion* – Low severity (ReDoS): inefficient regular expression complexity may lead to Denial of Service under specific conditions.
Exploitation is known to be difficult; a fix is available in versions 1.1.12+, 2.0.2+, 3.0.1+, and 4.0.1+.

## Conclusion

- No critical or high-severity vulnerabilities were found.
- Identified issues do not impact production deployment when standard security practices are followed (e.g., Vite dev server is not publicly exposed).
- Zero-day risk is minimized through use of Snyk, which scans both public and proprietary vulnerability databases, and dependecies audit.
- All security issues were addressed using the *npm audit fix* command.
