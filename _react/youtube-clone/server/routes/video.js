const express = require("express");
const router = express.Router();
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");

const { Video } = require("../models/Video");
const { Subscriber } = require("../models/Subscriber");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/uploadfiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true, //
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/thumbnail", (req, res) => {
  let thumbsFilePath = "";
  let fileDuration = "";

  //비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
    console.dir(metadata);
    console.log(metadata.format.duration);

    fileDuration = metadata.format.duration;
  });

  //썸네일 생성
  ffmpeg(req.body.filePath)
    // 썸네일 파일명을 여기서 생성
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));

      thumbsFilePath = "uploads/thumbnails/" + filenames[0];
    })
    // 썸네일을 생성한 뒤, 무엇을 할 것인지
    .on("end", function () {
      console.log("Screenshots taken");
      return res.json({
        success: true, //
        thumbsFilePath,
        fileDuration,
      });
    })
    // 에러가 난 경우, 어떻게 할 것인지
    .on("error", function (err) {
      console.log(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      // %b : 확장자를 제외한 파일명
      filename: "thumbnail-%b.png",
    });
});

router.post("/uploadVideo", (req, res) => {
  const video = new Video(req.body);

  video.save((err, doc) => {
    if (err) return res.json({ success: false, err });

    res.status(200).json({ success: true });
  });
});

router.get("/getVideos", (req, res) => {
  // populate()을 해줘야 User Collection의 데이터를 가져올 수 있음.
  // 하지 않으면 writer의 id만 넘어온다.
  Video.find()
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);

      res.status(200).json({ success: true, videos });
    });
});

router.post("/getVideoDetail", (req, res) => {
  Video.findOne({ _id: req.body.videoId })
    .populate("writer")
    .exec((err, videoDetail) => {
      if (err) return res.status(400).send(err);

      res.status(200).json({ success: true, videoDetail });
    });
});

router.post("/getSubscriptionVideos", (req, res) => {
  Subscriber.find({ userFrom: req.body.userFrom }) //
    .exec((err, subscribers) => {
      if (err) return res.status(400).send(err);

      let subscribedUser = [];

      subscribers.map((subscriber) => {
        subscribedUser.push(subscriber.userTo);
      });
      Video.find({ writer: { $in: subscribedUser } })
        .populate("writer")
        .exec((err, videos) => {
          if (err) return res.status(400).send(err);
          res.status(200).json({ success: true, videos });
        });
    });
});

module.exports = router;
