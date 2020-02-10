import axios from 'axios';

const baseUrl = '/api';

export default axios.create({
    url: baseUrl,
});
