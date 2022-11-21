// kết nối cơ sở dữ liệu
const firebaseConfig = {
  apiKey: "AIzaSyCmc_xmlyvJlI6Z5CcqO7eaX1E4uBDmCJY",
  authDomain: "fir-kfs-by-leduc-33b1a.firebaseapp.com",
  projectId: "fir-kfs-by-leduc-33b1a",
  storageBucket: "fir-kfs-by-leduc-33b1a.appspot.com",
  messagingSenderId: "857451377304",
  appId: "1:857451377304:web:234e7b5ad9cab8880e56ed",
  measurementId: "G-0GNN7E333T"
};

//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);


firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();
var ranID = "";
// Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);


//////////////// Sinh số ID ngẫu nhiên
 function randomString(len, an) {
   an = an && an.toLowerCase();
   var str = "",
       i = 0,
       min = an == "a" ? 10 : 0,
       max = an == "n" ? 10 : 62;
   for (; i++ < len;) {
       var r = Math.random() * (max - min) + min << 0;
       str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
   }
   return str;
   //randomString(10);        // "4Z8iNQag9v"
   //randomString(10, "A");   // "aUkZuHNcWw"
   //randomString(10, "N");   // "9055739230"
} 