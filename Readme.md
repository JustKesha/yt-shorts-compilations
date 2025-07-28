# YouTube Shorts Compilations

[Overview](#overview) |
[Website](https://justkesha.github.io/yt-shorts-compilations) |
[Extension](#chrome-extension) |
[Contributing](#contributing) |
[Documentation](#documentation) |
[License](LICENSE)

Lightweight, no-registration online solution for creating, sharing, and watching collections of YouTube Shorts.
This project consists of a [Web application](https://justkesha.github.io/yt-shorts-compilations) hosted via GitHub Pages and an optional [Chrome extension](#chrome-extension) for easier collection management.

### Overview

YouTube currently lacks native support for creating playlists of YT Shorts.<br>
This repository solves that problem by providing a simple way to compile, share, and view Shorts collections.<br>
The optional chrome extension simplifies collection creation with browser shortcuts.

### Features

- No Registration
- Shareable Links
- Mobile support

### Usage

1. Go to https://justkesha.github.io/yt-shorts-compilations
2. Fill in any text that contains links to yt shorts
3. Click generate

### Preview

Here are some preview screenshots from the website, PC & mobile view:

<img alt="PC View" height="500px" src="preview/website-player-pc.png" /> <img alt="Mobile View" height="500px" src="preview/website-player-mobile.png" />

### Controls

| Action | Description | PC | Mobile |
|-|-|-|-|
| Next | Go to the next video in queue | Arrow bottom / right,<br>Scroll down,<br>Click next video preview at the bottom | Swipe down / right |
| Back | Go back one video in queue | Arrow up / left,<br>Scroll up | Swipe up / left |
| Seek | Go to any video in queue | Progress bar at the top | Progress bar at the top |

> [!NOTE]
> To enable swiping anywhere on mobile devices, toggle the lock button on the bottom.<br>
> Othewise, swiping will only be avalibble under the video player or on the sides.

## Chrome extension

This chrome extension simplifies the process of creating collection links using browser shortcuts.<br>
It allows to add videos you're currently watching to your collections using hotkeys.<br>
You can have from 1 to 4 collections at a time and customize things like thier names, colors and icons.<br>

### Features

- Easy link generation
- Hotkeys for saving videos
- Collection customization

### Preview

Here are some preview screenshots from the extension popup and the settings page:

<img alt="Mobile View" height="320px" src="preview/chrome-extension-popup.png" /> <img alt="PC View" height="320px" src="preview/chrome-extension-settings.png" />

> [!NOTE]
> Collection backgrounds, unlikes colors, icons & names, are not selectable and are instead generated each time you open the extension popup from 16 possible variations.

### Requirements

- Browser with chrome extensions support - Chrome, Edge, Opera

### Installation

1. Download [extensions/chrome](extensions/chrome) directory
2. Go to `chrome://extensions` url
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the extension directory

> [!NOTE]
> If the extension doesn't work, make sure it has all the necessary permissions toggled on.

### Usage

1. Open any YT Shorts video
2. Click the [save hotkey](#controls)
3. Repeat several times
4. Click on the extension icon at the top right
5. Hover onto the filled collection and click play

### Controls

| Windows | Mac | Description |
|-|-|-|
| `Alt+Shift+Z` | `Command+Shift+1` | Save current playing YT Shorts video to collection 1 |
| `Alt+Shift+X` | `Command+Shift+2` | Save current playing YT Shorts video to collection 2 |
| `Alt+Shift+C` | `Command+Shift+3` | Save current playing YT Shorts video to collection 3 |
| `Alt+Shift+V` | `Command+Shift+4` | Save current playing YT Shorts video to collection 4 |

## Contributing

Contributions welcome! Here's how to help:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with:
   - Description of changes
   - Related issue references

You can also report bugs or create feature suggestions in the [Issues tab](../../issues),<br>
Just make sure you describe the problem properly and dont create duplicates.

#### Getting Started

Check for "[good first issue](../../issues?q=sort%3Aupdated-desc+is%3Aissue+is%3Aopen+label%3A"good+first+issue")" label in the issues tab for ideas.<br>
You can ask questions in existing issues or ask to assign you to the issue before starting,<br>
But don't forget to read the related [documentation](#documentation) first!

### Guidelines

- Maintain consistent style
- Test your changes thoroughly
- Keep the changes focused on one topic
- Update documentation if needed
- Update version in [manifest](extensions/chrome/manifest.json) when working on extention

# Documentation

This section contains minmal project documentation, mainly for contributors.<br>
Read it if you want to have a better understanding of how this application works.

If you feel like the current documentation is missing important information, see [Issue #66](../../issues/66).

## Website

All website files are located in the [docs/](docs/) folder for Github pages compatibility.<br>
You can find open issues using the "[website](../../issues?q=sort%3Aupdated-desc%20is%3Aissue%20is%3Aopen%20label%3Awebsite%20-label%3Aextension)" label.

#### Technologies

- Jquery 3.6.0
- YouTube IFrame API
- Google Fonts

### API / URL Parameters
   
| Param | Alias | Description | Example |
|-|-|-|-|
| `request` | `r`, `ids`, `i` | Unseparated YT video IDs,<br>duplicates are ignored | [...?r=E1RCT6eUyVgilcL2nHJvEc...](https://justkesha.github.io/yt-shorts-compilations?r=E1RCT6eUyVgilcL2nHJvEcJ5WIS3DKivYqbC6WHW0GJQNYXCuB5pTqg) |
| `startat` | `start`, `s` | Starting video index (0-based),<br>updates automatically | [...?r=...&s=3](https://justkesha.github.io/yt-shorts-compilations?r=E1RCT6eUyVgilcL2nHJvEcJ5WIS3DKivYqbC6WHW0GJQNYXCuB5pTqg&s=3) |
| `params` | `p` | Additional flags (see below) | [...?r=...&p=w](https://justkesha.github.io/yt-shorts-compilations?r=Q8NXO6YxBmUE6CcUj2mDbIYb18ldKjNoIor7tWjWI0ZAdQw4w9WgXcQ&p=w) |

#### Available Flags:

| Flag | Description |
|-|-|
| `w` | Experimental wide screen mode, [#64](../../issues/64) |

> [!NOTE]
> It seems like not long after this repo was published,<br>
> YT has added support for wider Shorts formats and the next & previous video buttons on pc.

### Ambient Colors

This feature was added to mimic YT's "Ambient mode",<br>
Although is a lot simpler. It works as follows:

1. Dominant video thumbnail color is calculated<br>
   \* Left & right sides of the image are ignored due to the vertical format
2. Saturation & lightness are adjusted for more contrast
3. Simple css animation is used to simulate a dynamic change

[Example thumbnail](https://img.youtube.com/vi/9mXdpjXj7GE/maxresdefault.jpg):<br>
<img alt="Example image" src="https://img.youtube.com/vi/9mXdpjXj7GE/maxresdefault.jpg" width="300px" /><br>
Result: gray `#959D9D`

## Chrome Extension

All files are located in the [extensions/chrome/](extensions/chrome/) folder.<br>
You can find open issues using the "[extension](../../issues?q=sort%3Aupdated-desc%20is%3Aissue%20is%3Aopen%20-label%3Awebsite%20label%3Aextension)" label.

### Permission

| Required Permission | Reasoning |
|-|-|
| `storage` | Local storage is used for saving collections data |
| `activeTab` | To detect currently playing YT video |

A more fresh version of this list can be found in [manifest](extensions/chrome/manifest.json) under "permissions".
