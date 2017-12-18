import axios from 'axios';
import router from 'pro/router';
import _ from 'pro/lib/util';
import { Service } from 'pro/service';

const getUserInfo = () => {
    axios.get(Service.getUserInfo)
    .then(res => {
        let data = res.data;
        this.loaded = true;
        if (!data || data.code !== 200) {
            _.$deleteCookie('userFront');
            router.push({name: 'login'});
        }
        let username = data.body && data.body.username;
        this.$store.dispatch('setUserName', username);
    })
    .catch(() => {
        _.$deleteCookie('userFront');
        router.push({name: 'login'});
    });
};

export default getUserInfo;
