const uri = (key) => {
    let params = {};
    let matched = [];

    const parseSearch = (v) => {
        if (v.indexOf('?') === 0) {
            v = v.substr(1);
        }
        const search = v.split('&');

        for (var i = 0; i < search.length; i++) {
            var pair = search[i].split('=');
            if (pair[0]) {
                try {
                    params[decodeURIComponent(pair[0])] = decodeURIComponent(
                        pair[1] || ''
                    );
                } catch (e) {
                    params[pair[0]] = pair[1] || '';
                }
            }
        }
    };

    if (
        (matched = location.href.match(
            new RegExp(
                '^(https?):[/]{2}' + // protocal
                '(?:([^@/:?]+)(?::([^@/:]+))?@)?' + // username:password@
                '([^:/?#]+)' + // hostname
                '(?:[:]([0-9]+))?' + // port
                '([/][^?#;]*)?' + // pathname
                '(?:[?]([^?#]*))?' + // search
                '(#[^#]*)?$' // hash
            )
        ))
    ) {
        uri.protocal = matched[1];
        uri.username = matched[2] || '';
        uri.password = matched[3] || '';
        uri.hostname = matched[4];
        uri.port = matched[5] || '';
        uri.pathname = matched[6] || '/';
        uri.search = matched[7] || '';
        uri.hash = matched[8] || '';
        uri.origin = uri.protocal + '://' + uri.hostname;
        parseSearch(uri.search);
    }

    return params[key];
};

export default uri;
