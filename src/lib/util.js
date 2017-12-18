import uri from './uri';

const _ = {
    $uri: uri,
    $uuid (len, radix) {
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        let uuid = [];
        radix = radix || chars.length;
        if (len) {
            // Compact form
            for (let i = 0; i < len; i++) {
                uuid[i] = chars[0 | Math.random() * radix];
            }
        } else {
            // rfc4122, version 4 form
            let r;
            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (let i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    },
    $setCookie (name, value, days) {
        let date = new Date();
        let expires = '';
        if (days) {
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = `; ${expires}=${date.toGMTString()}`;
        }
        document.cookie = name + '=' + value + expires + '; path=/';
    },
    $getCookie (name) {
        let res = null;
        document.cookie.split(';').forEach(item => {
            let itemArr = item.split('=');
            if (itemArr[0].trim() === name.trim()) {
                res = itemArr[1];
            };
        });

        return res;
    },
    $deleteCookie (name) {
        this.$setCookie(name, '', -1);
    },
    $getEnv () {
        const reg = /^(http|https):\/\/(localhost|127.0.0.1)/ig;
        if (reg.test(location.href)) {
            return 'dev';
        }

        return 'production';
    },
    $isDev () {
        return this.$getEnv() === 'dev';
    }
};

export default _;
