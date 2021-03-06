import axios, { AxiosInstance } from 'axios'

import {
  WordpressOptions,
  PostsOptions,
  RetrievePostOptions,
  Post,
  Category,
  RetrieveCategoryOptions,
  CategoriesOptions,
  User,
  ListUsersOptions,
} from './types'

class Wordpress {
  private http: AxiosInstance

  public initialize(options: WordpressOptions) {
    this.http = axios.create({
      baseURL: options.url,
    })
  }

  public async allPosts(
    options: PostsOptions = {
      per_page: 10,
      page: 1,
      order: 'desc',
      orderby: 'date',
    },
  ): Promise<{ total: number; pages: number; posts: Post[] }> {
    const { data, headers } = await this.http.get('/posts', {
      params: options,
    })
    return {
      total: headers['x-wp-total'],
      pages: headers['x-wp-totalpages'],
      posts: data,
    }
  }

  /**
   *
   * Retrieve a post by unique ID.
   *
   * @param id Unique ID of post.
   * @param options Query options
   */
  public async getPostById(
    id: number,
    options: RetrievePostOptions,
  ): Promise<Post> {
    const response = await this.http.get(`/posts/${id}`, {
      params: options,
    })
    return response.data
  }

  public async allCategories(
    options: CategoriesOptions = {
      per_page: 10,
      page: 1,
    },
  ): Promise<{ total: number; pages: number; categories: Category[] }> {
    const { data, headers } = await this.http.get('/categories', {
      params: options,
    })

    return {
      total: headers['x-wp-total'],
      pages: headers['x-wp-totalpages'],
      categories: data,
    }
  }

  /**
   *
   * Retrieve a category by unique ID.
   *
   * @param id Unique ID of category.
   * @param options Query options
   */
  public async getCategoryById(
    id: number,
    options: RetrieveCategoryOptions,
  ): Promise<Category> {
    const response = await this.http.get(`/categories/${id}`, {
      params: options,
    })
    return response.data
  }

  public async allUsers(
    options?: ListUsersOptions,
  ): Promise<{ total: number; pages: number; users: User[] }> {
    const { data, headers } = await this.http.get(`/users`, {
      params: options,
    })
    return {
      total: headers['x-wp-total'],
      pages: headers['x-wp-totalpages'],
      users: data,
    }
  }

  /**
   *
   * Retrieve a user by unique ID.
   *
   * @param id Unique ID of user.
   * @param options Query options
   */
  public async getUserById(id: number): Promise<Post> {
    const response = await this.http.get(`/users/${id}`)
    return response.data
  }
}

export const wordpress = new Wordpress()
export * from './types'
