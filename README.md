# Serving images from wew.io

### Intro
The imageserver will server-side scale and adapt images to the end-user's current context. It supports both responsive and static designs. 

### Getting started
1. Sign up for a free account at [whateverweb.com](http://whateverweb.com/)
2. Register an application to get an application key and service URL.

### Examples
## Basic - static design
To scale an image to an absolute width 320px, create your _img_-url like in the example below. If requested width exceeds requesting device's capability returned image will be scaled to 100% of device width.

	<img src="http://wew.io/img/px_320/http://farm9.staticflickr.com/8154/7705240114_fdc69e5882_k_d.jpg" alt="Butterfly" />

The URL pattern is: 'http://wew.io/img/option1/option2/URL-to-full-size-image'

## Advanced - responsive design
In 'responsive' mode, the image sizing is controlled using a combination of browser javascript and a cookie. The script defines the desired breakpoints and default viewport, which in turn is communicated to the server using a cookie. In this mode, the URL can reference the (cookie) breakpoints by name and have the server base its operations on them.

See [example](examples/cookie-example).

### Details

#### Available parameters
| Name and value	| Description									|
| ----------------- | --------------------------------------------- |
| vpw_2880			| Viewport width. Ignored if used with cookie	|
| px_320			| Target width in pixels						|
| bp_w              | Default breakpoint, 'w'                       |
| w_40              | Scale image to 40% of width in breakpoint 'w' |
