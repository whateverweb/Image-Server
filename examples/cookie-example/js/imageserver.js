    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    //Set width of screen in a cookie
    (function (w, d) {

        //set width to vpw
        var e = d.documentElement, g = d.getElementsByTagName('body')[0], vpw = w.innerWidth || e.clientWidth || g.clientWidth;

        var existing = readCookie("RESS");
        var bp;

        //set break point
        if (vpw >= 1024) {
            vpw = 1024;
            bp = "w";
        } else if (vpw >= 768) {
            bp = "m";
        } else {
            bp = "n";
        }

        // Set a cookie with the client side capabilities. 
        // There is two specified groups which can be used to scale images to a predefined width in pixels using:
        // http://<SERVICE_URL>/gn_<GROUPNAME>/<IMG_URL>
        var ccapDate = new Date()
        ccapDate.setFullYear(ccapDate.getFullYear() + 1);
        d.cookie = 'RESS=vpw.' + vpw + '|bp.' + bp + '|g.groupName1.320' + '|g.groupName2.640' + '; domain=*'

    }(window, document));
