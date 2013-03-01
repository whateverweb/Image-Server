# Serving optimized images
How to use the Image Server.

## Intro
The Image Server will scale and adapt images server side according to the viewport size or other specified value. It supports both responsive and static designs as it is also supports sizing an image according to the size of the container it is in. 

Please note that some of the examples use cookies to communicate client side information to the server. This require that the image server is available on the same domain as your site (you can CNAME). Further, note that CDNs and stuff does not fancy cookies that much…

## Getting started
1. Sign up for a free account at [whateverweb.com](http://whateverweb.com/)
2. Register an application to get an application key and service URL.
3. You might also what to consider CNAME-ing the service to the same domain as your site is living on. I.e. img.yoursite.com.

Your service URL will typically be `http://img.<your-id>.wew.io/`.

## Basic usage

The URL pattern is:
`http://img.demo.wew.io/<options>/<url-to-img>`

The valid options are listed below. 

Simplest example is to just tell the Image Server to resize an image according to screen size. The service will look in WURFL to determine the size of the image.

	<img src="http://img.demo.wew.io/http://farm1.staticflickr.com/154/369525606_c77b69e92c_o_d.jpg" alt="Butterfly" />

To scale an image to an absolute width 320px, create your `img`-url like in the example below. If requested width exceeds requesting device's capability returned image will be scaled to 100% of device width.

	<img src="http://img.demo.wew.io/px_320/http://farm1.staticflickr.com/154/369525606_c77b69e92c_o_d.jpg" alt="Butterfly" />

To cater for high-DPI screens, such as retina, the "@ notation" is used:

	<img src="http://img.demo.wew.io/@_2/http://farm1.staticflickr.com/154/369525606_c77b69e92c_o_d.jpg" alt="Butterfly" />

Combining the two latter examples:

	<img src="http://img.demo.wew.io/@_2/px_320/http://farm1.staticflickr.com/154/369525606_c77b69e92c_o_d.jpg" alt="Butterfly" />

This will actually return an image which is 640 physical pixels wide.

This "basic usage" can easily be combined with other image serving techniques, such as [Picturefill](https://github.com/whateverweb/Image-Server/tree/master/examples/picturefill) from Filament Group.

## Advanced usage - responsive design
In 'responsive' mode, the image sizing is controlled using a combination of browser javascript and a cookie. The script defines the desired breakpoints and default viewport, which in turn is communicated to the server using a cookie. In this mode, the URL can reference the (cookie) breakpoints by name and have the server base its operations on them.

See [example](https://github.com/whateverweb/Image-Server/tree/master/examples/cookie-example).

## Details
### Basic usage

#### Available parameters 


<table>
  <tr>
    <th>Name and value</th><th>Description</th><th>Example</th>
  </tr>
  <tr>
    <td><pre><code>px_&lt;number&gt;</code></pre></td>
    <td>Resize to a specific size</td>
    <td>px_320</td>
  </tr>
  <tr>
    <td><pre><code>@_&lt;number&gt;</code></pre></td>
    <td>The pixel ratio: For example `@_2` for Retina displays. Also note that high-DPI images are compressed much more than other images, so the image weight is quite acceptable.</td>
    <td>@_1.5</td>
  </tr>  
</table>

### RWD mode
To get the most out of "RWD mode", a short little JavaScript is needed to communicate viewport size and breakpoint info to the server.
	
	(function (w, d) {

        <!--
        //set width to vpw
        var e = d.documentElement, g = d.getElementsByTagName('body')[0], vpw = w.innerWidth || e.clientWidth || g.clientWidth;
        //-->

        var existing = readCookie("RESS");
        var bp;

        //set default grid values
        if (vpw >= 1024) {
            vpw = 1024;
            bp = "w";
        } else if (vpw >= 768) {
            bp = "m";
        } else {
            bp = "n";
        }
        
        // Set devicePixelRatio for use on retina screens
        var dpr = 1;
        if(window.devicePixelRatio !== undefined) dpr = window.devicePixelRatio;
        console.log('DevicePixelRatio' + dpr);

        // Set a cookie with the client side capabilities.
        var ccapDate = new Date()
        ccapDate.setFullYear(ccapDate.getFullYear() + 1);
        d.cookie = 'RESS=vpw.' + vpw + '|bp.' + bp '|dpr.' + dpr + '; expires=' + ccapDate.toUTCString() + '; path=/; domain=.wew.io';

    }(window, document));

Note the name of the cookie, and that the cookie domain must be the same as your site's domain.

You can define as many breakpoints as you want. Remember to define the same breakpoints, and the desired behavior, in the image `src`:

	http://img.demo.wew.io/vpw_1024/bp_w/pc/w_31/m_48/n_98/http://farm1.staticflickr.com/154/369525606_c77b69e92c_o_d.jpg

In this case the parameters tell the image server this:

* `vpw_1024`: The default viewport width, if nothing else is available is 1024px
* `bp_w`: If nothing else is provided, the default breakpoint is "w"
* `pc`: Unit to use is percentage
* `w_31`: In the wide grid, resize to 31% (see previous param) of container.
* `m_48`: In the medium grid, resize to 48% of container.
* `n_98`: In the narrow grid, resize to 98% of container.

In this mode, required parameters are:

* The default breakpoint: `bp_*`. In the example above: `bp_w`
* The unit of measure: `pc or px`. In the example aboce: `pc`
* The desired behavior for the default breakpoint: `<breakpintID>_<size>`. In the example above: `w_31`


#### Available parameters 


<table>
  <tr>
    <th>Name and value</th><th>Description</th><th>Example</th>
  </tr>
  <tr>
    <td><pre><code>@_&lt;number&gt;</code></pre></td>
    <td>The pixel ratio: For example `@_2` for Retina displays</td>
    <td>@_1.5</td>
  </tr>
  <tr>
    <td><pre><code>vpw_&lt;number&gt;</code></pre></td>
    <td>Set the default vierport width, if nothing else is provided</td>
    <td>vpw_960</td>
  </tr>  <tr>
    <td><pre><code>bp_*</code></pre></td>
    <td>Set the default breakpoint identified by an alpha-numeric value.</td>
    <td>bp_wide</td>
  </tr>  <tr>
    <td><pre><code>pc</code> or <code>px</code></pre></td>
    <td>Unit used by Image server when resizing. `pc` and `px` supported.</td>
    <td>pc</td>
  </tr><tr>
    <td><pre><code>wide_&lt;number&gt;</code></pre></td>
    <td>Scale image to 'number' <code>pc</code> or <code>px</code>  in breakpoint 'wide'</td>
    <td>wide_90</td>
  </tr><tr>
    <td><pre><code>medium_&lt;number&gt;</code></pre></td>
    <td>Scale image to 'number' <code>pc</code> or <code>px</code>  in breakpoint 'medium'</td>
    <td>medium_80</td>
  </tr><tr>
    <td><pre><code>narrow_&lt;number&gt;</code></pre></td>
    <td>Scale image to 'number' <code>pc</code> or <code>px</code>  in breakpoint 'narrow'</td>
    <td>narrow_100</td>
  </tr><tr>
    <td><pre><code>...</code></pre></td>
    <td>Goes on for as many breakpoints as needed. Remember to be consistent with the values defined int eh JavaScript too.</td>
    <td></td>
  </tr>
</table>

-----
[Image credits](http://www.flickr.com/photos/bengchye_loo/369525606/sizes/o/in/photostream/) in this doc and examples.


