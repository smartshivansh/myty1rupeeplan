export const api = "https://bot.myty.in/api";
export const api2 = "https://myty.in/api";


const apis = {
  authenticate: `${api}/user`,

  linkSetup_link: `${api}/link/setup/subdomain`,
  linkSetup_appearance: `${api}/link/setup/appearance`,
  linkSetup_profile: `${api}/link/setup/profile`,
  linkSetup_qrcode: `${api}/link/setup/qrcode`,

  findDraftPostByUserId: (userId) => `${api}/blog/getdrafts/${userId}`,
  findBlogPostByUserId: (userId) => `${api}/blog/getblogs/${userId}`,
  deleteBlogPostById: (id) => `${api}/blog/deleteblog/${id}`,

  navbarByUserId: (userId) => `${api}/navbar/get/nav/${userId}`,
  allPagesByUserId: (userId) => `${api}/pages/get/allpages/${userId}`,

  quotePost: `${api}/quote-post/`,
  quotePostById: (id) => `${api}/quote-post/${id}`,
  findQuotePostByUserId: (user_id) =>
    `${api}/quote-post/findby-user/${user_id}`,

  imagePost: `${api}/image-post/`,
  imagePostById: (id) => `${api}/image-post/${id}`,
  findImagePostByUserId: (user_id) =>
    `${api}/image-post/findby-user/${user_id}`,
  imageLink: `${api}/image-post/image-link`,
  imageResource: `${api}/image-post/images`,
  imageResourceById: (id) => `${api}/image-post/images/${id}`,

  videoPost: `${api}/video-post/`,
  videoPostById: (id) => `${api}/video-post/${id}`,
  findVideoPostByUserId: (user_id) =>
    `${api}/video-post/findby-user/${user_id}`,
  videoLink: `${api}/video-post/video-link`,
  videoResource: `${api}/video-post/videos`,
  videoResourceById: (id) => `${api}/video-post/videos/${id}`,

  linkPost: `${api}/link-post`,
  linkPostById: (id) => `${api}/link-post/${id}`,
  findLinkPostByUserId: (user_id) => `${api}/link-post/findby-user/${user_id}`,
  linkPreview: `${api}/link-post/link-data`,

  paymentCreateOrder: (plan) => `${api2}/payment/create-order/${plan}`,
  paymentVerifyResponse: `${api2}/payment/verify-response`,

  searchResults: `${api}/search`,
  searchSuggestionResults: `${api}/search/suggestion`,
  // searchResults: `https://mytym.in/api/search`,
  // searchSuggestionResults: `https://mytym.in/api/search/suggestion`,

  getWebsiteDataBySubdomain: (subdomain) => `${api}/website/${subdomain}`,

  setupOneRupeePlan: `${api}/onersplan/onersplansetup`,
  availableDomain: `${api}/domain/findby`,
  checkUser: `${api}/auth/signup/check-user`,
  submitUser: `${api}/auth/signup/submit-user`,
};
export default apis;
