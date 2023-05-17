import App from "next/app";
import Layout from  "../components/_App/Layout"
import { destroyCookie, parseCookies } from "nookies";
import { redirectUser } from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import { Router } from "next/router";

class MyApp extends App {
static async getInitialProps({Component, ctx}){  // ctx is the context info from the server
  const { token } = parseCookies(ctx);  
  let pageProps = {};

    if(Component.getInitialProps) {
       pageProps = await Component.getInitialProps(ctx); //  Calling the Home component's  getInitialProps
    }
    // For authorizing users:
    if (!token) {
      const isProtectedRoute =
        ctx.pathname === "/account" || ctx.pathname === "/create";
      if (isProtectedRoute) {
        redirectUser(ctx, "/login");
      }
    } else {
        try {
          const payload = { headers: { Authorization: token } };
          const url = `${baseUrl}/api/account`;
          const response = await axios.get(url, payload);
          const user = response.data;
          // Check user role to determine if can create a cart, delete and item etc...
          const isRoot = user.role === 'root';
          const isAdmin = user.role === 'admin';
          // if authenticated but not a root or admin, redirect from /create page.
          const isNotPermitted = !(isRoot || isAdmin) &&  ctx.pathname ==='/create';
          if(isNotPermitted){
             redirectUser(ctx, '/');  // Back to home page
          }
          pageProps.user = user;
        } catch (error) {
          console.error("Error getting current user", error);
          // 1 Throw out invalid token
           destroyCookie(ctx, "token");
          // 2 Redirect to login page
            redirectUser(ctx, '/login');
        }
    }

    return {pageProps};
}

componentDidMount(){
  window.addEventListener('storage', this.syncLogout);
}

syncLogout = event => {
  if(event.key ==='logout'){
      console.log('logged out from storage');
       Router.push('/login');
  }
}
// using spread operator ... with pageProps to flatten it out to its inividivual props and values
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component  {...pageProps}/>  
      </Layout>
    );
  }
}
export default MyApp;
