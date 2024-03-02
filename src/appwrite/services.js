import { Client, Databases, ID, Query, Storage } from "appwrite";
import config from '../config/config'

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.endpoint)
      .setProject(config.projectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, image, status, userId }) {
    try {
      return await this.databases.createDocument(config.databaseID, config.collectionID, slug, {
        Title: title,
        Content: content,
        image,
        status,
        userId
      });
    } catch (error) {
      throw {
        file: 'services.js',
        function: 'createPost',
        error
      };
    }
  }

  async updatePost(slug, { title, content, image, status }) {
    try {
      return await this.databases.updateDocument(
        config.databaseID,
        config.collectionID,
        slug,
        {
          title,
          content,
          image,
          status
        }
      );
    } catch (error) {
      throw {
        file: 'services.js',
        function: 'updatePost',
        error
      };
    }
  }

  async deletePost(slug) {
    try {
      await this.databases(
        config.databaseID,
        config.collectionID,
        slug
      )
      return true;
    } catch (error) {
      throw {
        file: 'services.js',
        function: 'deletePost',
        error
      };
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.databaseID,
        config.collectionID,
        slug
      )
    } catch (error) {
      throw {
        file: 'services.js',
        function: 'getPost',
        error
      };
    }
  }

  async getPosts(queries = [Query.equal("status", true)]) {
    try {
      return await this.databases.listDocuments(
        config.databaseID,
        config.collectionID,
        queries,
      )
    } catch (error) {
      throw {
        file: 'services.js',
        function: 'getPosts',
        error
      };
    }
  }


  //File services

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.bucketID,
        ID.unique(),
        file
      )
    } catch (error) {
      throw {
        file: 'services.js',
        function: 'uploadFile',
        error
      };
    }
  }

  async deleteFile(FileId) {
    try {
      await this.bucket.deleteFile(
        config.bucketID,
        FileId
      )
      return true;
    } catch (error) {
      throw {
        file: 'services.js',
        function: 'deleteFile',
        error
      };
    }
  }

  getFilePreview(image) {
    return this.bucket.getFilePreview(
      config.bucketID,
      image
    )
  }
}

const service = new Service();
export default service;