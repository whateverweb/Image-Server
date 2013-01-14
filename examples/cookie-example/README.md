# A cookie based example

In this example, we're defining three different breakpoints. The definition is in our javascript. Viewport width > 1024 is named 'w', width between 768 and 1024 is named 'm' and the rest is named 'n'.

    //set default grid values
    if (vpw >= 1024) {
                vpw = 1024;
                bp = "w";
            } else if (vpw >= 768) {
                bp = "m";
            } else {
                bp = "n";
            }

In the image URL in our markup, we state that for breakpoint 'w' we want an image scaled to 80% of the viewport width. For breakpoints 'm' and 'n' the values are 60 and 40 percent (pc), respectively.

    <img src="http://app-000000.wew.io/img/vpw_768/bp_m/pc/w_80/m_60/n_40/http://farm9.staticflickr.com/8154/7705240114_fdc69e5882_k_d.jpg" alt="Butterfly" />

The viewport width and breakpoint name is shared with the server using a cookie. Please note that this means that the webserver and imageserver needs to be in the same domain so the cookie will be sent to the image server.
Also, some Edge server caching mechanisms might not feel too good about this approach.