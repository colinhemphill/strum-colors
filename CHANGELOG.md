# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.4] - 2025-02-09

### Changed

- Dependency updates
- Moved export of public types

## [0.1.3] - 2025-01-26

### Changed

- Dependency updates
- Pin to Tailwind CSS v3 in the only place it's used (alias util)

## [0.1.2] - 2025-01-13

### Changed

- Dependency updates

### Fixed

- Fixed incorrect lightness for `neutral/dark/02` and improved lightness for `neutral/light/02`

## [0.1.1] - 2025-01-10

### Changed

- Dependency updates
- New algorithm for Accent Bright colors

### Removed

- Removed undocumented foreground colors for each shade

## [0.1.0] - 2025-01-04

Initial beta release.

### Added

- Base JS/TS exports of colors
- CSS exports of each OKLCH color with RGB fallbacks
- Tailwind 3 and Tailwind 4 configs
- Tailwind 3 and Tailwind 4 alias options

[0.1.1]: https://github.com/colinhemphill/strum-colors/releases/tag/v0.1.1
[0.1.0]: https://github.com/colinhemphill/strum-colors/releases/tag/v0.1.0
