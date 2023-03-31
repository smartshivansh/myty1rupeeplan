const express = require("express");
const cors = require("cors");
const app = express();

const http = require('http');
const servers = http.createServer(app);

const userAnalytics = require("./middleware/userAnalytics");
const path = require("path");
const mongoose = require("mongoose");
const config = require("config");
const PORT = process.env.PORT || config.get("port");
const HOST = config.get("host");
const sockets = require("./socket_copy");
const { watchingByTypesense } = require("./utils/typesense/actions");
const { Server } = require("socket.io");

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: config.get("openai_key")
});

const openai = new OpenAIApi(configuration);



const io = new Server(servers, {
  cors: ["http://localhost:3000"]
});

app.use(express.json());




// const redis = require("redis");
// const client = redis.createClient();

// client.on("error", function (error) {
//   console.error(error);
// });

// client.get("name", redis.print);

const allowlist = [
  "https://doornext.in",
  "https://www.doornext.in",
  "https://doornextm.in",
  "https://www.doornextm.in",
  "http://localhost:8080",
  "http://localhost:3000",
  "http://localhost:3001",
  "https://anurag.doornextm.in",
  "https://namandubeysample.doornextm.in",
  "https://s3.ap-south-1.amazonaws.com",
];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));

mongoose
  .connect(config.get("mongoURI"), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(async (client) => {
    console.log("MongoDB Connected.👍");

    // listDatabases(client.connection.getClient());

    // try {
    //   watchingByTypesense(client.connection.getClient());
    // } catch (error) {
    //   console.log("Typesense not able to connect.💀");
    // }

    // databasesList = await client.connection
    //   .getClient()
    //   .db()
    //   .admin()
    //   .listDatabases();

    // console.log("Databases:");
    // databasesList.databases.forEach((db) => console.log(` - ${db.name}`));

    // const collection = await client.connection.getClient().db("myty");
    // console.log("db", client.connection.getClient().db("myty"));
    // const changeStream = collection.watch();
    // changeStream.on("change", (next) => {
    //   console.log("next", next);
    // });
  })
  .catch((err) => console.log("MongoDB could not connect!🚨", err.message));

// console.log("mongoose connected or not ", mongoose);

const usersRoute = require("./server/api/routes/users");
app.use("/api", usersRoute);

const paymentRoute = require("./server/api/routes/payment");
app.use("/api/payment", paymentRoute);

// reworked
const authRoute = require("./server/api/routes/auth");
app.use("/api/auth", authRoute);
// reworked end
const chatRoute = require("./server/@next/chat");
app.use("/api/chat", chatRoute);
// rework ongoing
const linkRoute = require("./server/api/routes/link");
app.use("/api/link", linkRoute);
const websiteApiRoute = require("./server/api/routes/website-api");
app.use("/api/website", websiteApiRoute);
// rework new

const domainRouting = require("./server/api/routes/domain");
app.use("/api/domain", domainRouting);

const uploadRoute = require("./server/api/routes/upload");
app.use("/api/upload", uploadRoute);

const recaptchaRoute = require("./server/api/routes/recaptcha");
app.use("/api/recaptcha", recaptchaRoute);

const navbarRoute = require("./server/api/routes/navigationbar/navbar");
app.use("/api/navbar", navbarRoute);

const themeRoute = require("./server/api/routes/theme");
app.use("/api/theme", themeRoute);

const pagesRoute = require("./server/api/routes/pages/pages");
app.use("/api/pages", pagesRoute);

const profilecardRoute = require("./server/api/routes/profilecard/profilecard");
app.use("/api/profilecard", profilecardRoute);

const blogRoute = require("./server/api/routes/blog/blog");
app.use("/api/blog", blogRoute);

const imagePostRoute = require("./server/api/routes/imagepost");
app.use("/api/image-post", imagePostRoute);
const videoPostRoute = require("./server/api/routes/videopost");
app.use("/api/video-post", videoPostRoute);
const quotePostRoute = require("./server/api/routes/quotepost");
app.use("/api/quote-post", quotePostRoute);
const linkPostRoute = require("./server/api/routes/linkpost");
app.use("/api/link-post", linkPostRoute);

const scoRoute = require("./server/api/routes/seo");
app.use("/api/seo", scoRoute);

const locationRoute = require("./server/api/routes/location");
app.use("/api/location", locationRoute);

const QrUploadRoute = require("./server/api/routes/qrUpload");
app.use("/api/upload/qr", QrUploadRoute);
app.use("/api/qr-code", require("./server/api/routes/qr-code"));

const betaUserRoute = require("./server/api/routes/beta");
app.use("/api/beta", betaUserRoute);

const invitecode = require("./server/api/routes/invitecode");
app.use("/api/invitecode", invitecode);

const analyticsRoute = require("./server/api/routes/analytics/index");
app.use("/api/analytics", analyticsRoute);

const likesRoute = require("./server/api/routes/Likes");
app.use("/api/likes", likesRoute);

const feedsRoute = require("./server/api/routes/feeds");
app.use("/api/feeds", feedsRoute);

app.use("/api/search", require("./server/api/routes/search"));

app.use("/api/admin", require("./server/api/routes/admin"));
app.use("/api/redis-cache", require("./server/api/routes/redis"));

app.use(
  "/api/chat-notification",
  require("./server/api/routes/chatNotification")
);

app.use("/uploads", express.static("uploads"));

app.use("/sitemap", require("./server/api/routes/seo/index"));

app.use("/api/find/userbyId/:id", require("./server/api/routes/OneRupeePlan/FindById"))
app.use("/api/onersplan/onersplansetup", require("./server/api/routes/OneRupeePlan/OneRupeePlanSetup"))
app.use("/api/onersplan/booksubdomain", require("./server/api/routes/OneRupeePlan/BookSubDomain"))

// TODO heroku config for deployment
// if (process.env.NODE_ENV == 'production') {
// 	app.use(express.static('myty-client/build/'));
// 	app.get('*', (req, res) => {
// 		res.sendFile(path.resolve(__dirname, 'myty-client', 'build', 'index.html'));
// 	});
// }

// LOCAL Build Test
// TODO Change this to 2 for TLD based configurations
// app.set("subdomain offset", 1);
// https://stackoverflow.com/questions/29146489/how-to-get-local-subdomains-using-express-js-s-req-subdomains
// --
// app.use(express.static('myty-client/build/'));
// app.get('/*', (req, res) => {
//   // console.log("host", config.get("host"));
//   res.sendFile(path.resolve(__dirname, 'myty-client', 'build', 'index.html'));
// });
app.use(express.static("mytyweb/build"));
app.get("/*", (req, res) => {
  // console.log("host", config.get("host"));
  res.sendFile(path.resolve(__dirname,"mytyweb", "build", "index.html"));
});

io.on('connection', (socket) => {

  const user = {
    prompt: ""
  }

  console.log("connected")

   socket.on('msgTextReq', async (data) => {

   user.prompt = user.prompt + data.text;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: user.prompt,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });
    user.prompt = user.prompt + response.data.choices[0].text
    socket.emit('msgTextRes', {response: `${response.data.choices[0].text}`, msg: data.msg} );
  });
  
});

servers.listen(PORT, () =>
  console.log(`server is running on ${Url}`)
);

//socket.init(server);
// sockets.init(server);

// const Url = `http://${HOST}`;
const Url = `http://localhost:${PORT}`;
// console.log(Url);
exports.Url = Url;
