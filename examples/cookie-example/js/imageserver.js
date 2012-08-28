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

        //set default grid values
        if (vpw >= 1024) {
            vpw = 1024;
            bp = "w";
        } else if (vpw >= 768) {
            bp = "m";
        } else {
            bp = "n";
        }

        // Set a cookie with the client side capabilities.
        var ccapDate = new Date()
        ccapDate.setFullYear(ccapDate.getFullYear() + 1);
        d.cookie = 'RESS=vpw.' + vpw + '|bp.' + bp + '; domain=*'

    }(window, document));
