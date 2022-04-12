const db = require("../../models");
const Chapter = db.chapter;
const Certificate = db.certificate;
const asyncHandler = require("express-async-handler");
const Category = db.categorylearning


exports.addChapter = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "chapter name  can not be empty!" });
    return;
  }
  const chapter = new Chapter({
    name: req.body.name,
    content: req.body.content,
  });
  chapter
    .save(chapter)
    .then((data) => {
      console.log("Calling certif update wit hID  " + req.body.certifId);
      Certificate.updateOne(
        { _id: req.body.certifId },
        { $push: { chapters: chapter._id } }
      ).exec(res.send(data));
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the chapter.",
      });
    });
};

exports.getChapter = (req, res) => {
  const id = req.params.id;
  Chapter.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found Chapter with id " + id });
      } else {
        console.log(data);
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Chapter with id=" + id });
    });
};
exports.getAllChapters = asyncHandler(async (req, res) => {
  try {
    const chapters = await Chapter.find();
    return res.json(chapters);
  } catch (error) {
    res.json({ message: error });
  }
});


exports.addCertificate = (req, res) => {
 /* if (!req.body.name || !req.body.category) {
    res.status(400).send({ message: "certificate name/category  can not be empty!" });
    return;
  }*/
  console.log("FROM LEARNING CONTROLLER body = ");
  console.log(req.body);
  const certificate = new Certificate({
    name: req.body.name,
    category: req.body.category,
    tutor: req.body.tutor,
    img: {
      data: req.file.filename,
      contentType: 'image/png'
  }
  });
  certificate
    .save(certificate)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the certificate.",
      });
    });
};

exports.getCertificate = (req, res) => {
  const id = req.params.id;
  Certificate.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Certificate with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Certificate with id=" + id });
    });
};

exports.getAllCertificates = (req, res) => {
  Certificate.find().populate("chapters")
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Certificate with id " });
      else {
        console.log(data);
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Certificate with id=" });
    });
};

exports.addChapterToCertificate = asyncHandler(async (req, res) => {
  if (!req.params.certifId) {
    res.status(400);
    throw Error("certif name is required");
  }
  Chapter.findOne({ _id: req.body._id }, (err, chapter) => {
    if (err) {
      return;
    } else {
      console.log(chapter);
      Certificate.updateOne(
        { _id: req.params.certifId },
        { $push: { chapters: chapter._id } }
      ).exec(
        res.status(200).send({ message: "chapter " + chapter.name + "added!" })
      );
    }
  });
});

exports.addCategorylearning = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Category name  can not be empty!" });
    return;
  }
  const category = new Category({
    name: req.body.name,
  });
  category
    .save(category)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category.",
      });
    });
};


exports.getCategorylearning = (req, res) => {
  const id = req.body._id;
  Category.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Category with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Category with id=" + id });
    });
}

exports.getCategorieslearning = async(req, res) => {
  Category.find()
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Categories " });
      else {
        console.log(data);
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Categories" });
    });
}