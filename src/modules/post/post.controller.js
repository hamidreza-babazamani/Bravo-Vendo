const autoBind = require("auto-bind");
const { PostMessage } = require("./post.message");
const HttpCodes = require("http-codes");
const postService = require("./post.service");
const CategoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const { Types } = require("mongoose");
const { removePropertyInObject } = require("../../common/utils/functions");
const { getAddressDetail } = require("../../common/utils/http");
const utf8 = require("utf8");

class PostController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = postService;
  }

  async createPostPage(req, res, next) {
    try {
      let { slug } = req.query;
      let match = { parent: null };
      let options = null;
      let category = null;

      if (slug) {
        slug = slug.trim();
        category = await CategoryModel.findOne({ slug });
        if (!category) throw new createHttpError.NotFound(PostMessage.NotFound);
        options = await this.#service.getCategoryOptions(category._id);
        if (options.length === 0) options = null;
        match = { parent: category._id };
      }

      const categories = await CategoryModel.aggregate([{ $match: match }]);

      return res.json({
        categories,
        category: category?._id.toString() || null,
        options,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const userId = req.user._id;
      const images = req?.files?.map((image) => image?.path?.slice(7));
      const {
        title_post: title,
        description: content,
        lat,
        lng,
        category,
        amount,
      } = req.body;

      const options = removePropertyInObject(req.body, [
        "amount",
        "title_post",
        "description",
        "lat",
        "lng",
        "category",
        "images",
      ]);

      for (let key in options) {
        let value = options[key];
        delete options[key];
        key = utf8.decode(key);
        options[key] = value;
      }

      const { address, province, city, district } = await getAddressDetail(
        lat,
        lng,
      );

      const post = await this.#service.create({
        userId,
        title,
        amount,
        content,
        coordinate: [lat, lng],
        category: new Types.ObjectId(category),
        images,
        options,
        address,
        province,
        city,
        district,
      });

      return res.status(HttpCodes.CREATED).json({
        message: PostMessage.Created,
        post,
      });
    } catch (error) {
      next(error);
    }
  }

  async findMyPosts(req, res, next) {
    try {
      const userId = req.user._id;
      const posts = await this.#service.find(userId);
      return res.json(posts);
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.remove(id);
      return res.json({
        message: PostMessage.Deleted,
      });
    } catch (error) {
      next(error);
    }
  }

  async showPost(req, res, next) {
    try {
      const { id } = req.params;
      const post = await this.#service.checkExist(id);
      return res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async postList(req, res, next) {
    try {
      const query = req.query;
      const posts = await this.#service.findAll(query);
      return res.json(posts);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
