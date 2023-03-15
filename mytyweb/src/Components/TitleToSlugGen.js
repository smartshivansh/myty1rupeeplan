export function TitleToSlug(text) {
    // const trimmed = text.trim();
    // const spacetoDashes = trimmed.split(" ").join("-");
    // const dashed = spacetoDashes
    //   .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|/\\,\\.<>?]/g, " ")
    //   .toLowerCase();
    // // text.replace(/^\s+|\s+$/gm, "");
    // // const slug = text.replace(/\s+/g, "-");
    // const slug = dashed.replace(/\s+/g, "-");
    // console.log(slug);
  
    const regex =
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    const nonemoji = text.replace(regex, "");
  
    const spaced = nonemoji
      .replace(/[`~!@#$%^&*()_\-+=[\]{};:'"\\|/,.<>?]/g, "")
      .toLowerCase();
  
    const trimmed = spaced.trim().toLowerCase();
    const dashed = trimmed.split(" ").join("-");
  
    const slug = dashed.replace(/-+/g, "-").toLowerCase();
  
    return slug;
  }
  
  export function textToSubdomainString(text) {
    let slug = String(text);
    if (slug.length === 0) {
      return slug;
    }
  
    slug = slug.trim();
    slug = slug.replace(/[^a-zA-Z0-9_-]+/g, "");
    slug = slug.toLowerCase();
    slug = slug.slice(0, 63);
    console.log(text, slug);
    return slug;
  }
  
  export function isValidSubdomain(text) {
    if (text.length === 0 || text.length > 64) {
      return false;
    }
  
    if (text.startsWith("-") || text.endsWith("-")) {
      return false;
    }
  
    return true;
  }
  
  export function validateSubdomain(text) {
    let slug = String(text);
    if (slug.length === 0) {
      return slug;
    }
    slug = slug.trim();
    slug = slug.match(/[A-Za-z0-9]([A-Za-z0-9_-]{0,61}[A-Za-z0-9])?/g, "");
    slug = slug.join("");
    slug = slug.toLowerCase();
    slug = slug.slice(0, 63);
  
    return slug;
  }
  