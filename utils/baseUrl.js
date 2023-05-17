const baseUrl =
process.env.NODE_ENV === "production"
    ? 'https://mernstack0523-rg.now.sh'
    :  'http://localhost:3000';

    export default baseUrl;