import axios from 'axios';

const instance = axios.create(
    {
        baseURL: 'https://reactjs-myburger.firebaseio.com/'
    }
);

export default instance;
