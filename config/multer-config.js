const multer=require("multer");
const crypto=require("crypto");
const path=require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve("./public/uploads"))
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(10, function(err, byte){
            const fn=byte.toString("hex") + path.extname(file.originalname);
            cb(null, fn);
        });
      
    }
  });
  
  const upload = multer({ storage: storage });

  module.exports.uploads=upload;