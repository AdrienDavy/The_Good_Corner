/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\nmutation CreateAd($data: AdCreateInput!) {\n  createAd(data: $data) {\n    id\n    createdBy {\n      id\n      email\n      role\n      }\n  }\n}\n": types.CreateAdDocument,
    "\nmutation CreateCategory($data: CategoryCreateInput!) {\n  createCategory(data: $data) {\n    id\n  }\n}\n": types.CreateCategoryDocument,
    "\nmutation CreateTag($data: TagCreateInput!) {\n  createTag(data: $data) {\n    id\n  }\n}\n": types.CreateTagDocument,
    "\nmutation CreateUser($data: UserCreateInput!) {\n    createUser(data: $data) {\n      id\n      email\n    }\n  }": types.CreateUserDocument,
    "\nmutation DeleteAd($id: ID!) {\n  deleteAd(id: $id) {\n    id\n  }\n}\n": types.DeleteAdDocument,
    "\nmutation DeleteCategory($id: ID!) {\n  deleteCategory(id: $id) {\n    id\n  }\n}\n": types.DeleteCategoryDocument,
    "\nmutation DeleteTag($id: ID!) {\n  deleteTag(id: $id) {\n    id\n  }\n}\n": types.DeleteTagDocument,
    "\nquery Ad($id: ID!) {\n  ad(id: $id) {\n    createdAt\n    description\n    id\n    location\n    picture\n    price\n    title\n    createdBy {\n      id\n      email\n      role\n    }\n    category {\n      id\n      name\n    }\n    tags {\n      id\n      name\n    }\n  }\n}\n": types.AdDocument,
    "\nquery Ads{\n  ads {\n    id\n    picture\n    title\n    price\n    createdAt\n    createdBy {\n      id\n      email\n      role\n    }\n    category {\n      id\n      name\n    }\n  }\n}\n": types.AdsDocument,
    "\nquery Categories {\n  categories {\n    id\n    name\n    createdAt\n    createdBy {\n      id\n      email\n    }\n  }    \n}\n": types.CategoriesDocument,
    "\nquery Category($categoryId: ID!) {\n  category(id: $categoryId) {\n    id\n    name\n    createdBy {\n      id\n      email\n    }\n    ads {\n      id\n      title\n      picture\n      price\n      description\n      location\n      createdAt\n      createdBy {\n      id\n      email\n    }    \n      tags {\n        id\n        name\n      }\n      category {\n        id\n        name\n      }\n    }\n  }\n}\n": types.CategoryDocument,
    "\nquery QueryTag($tagId: ID!) { \n  tag(id: $tagId) {\n    id\n    name\n    createdBy {\n      id\n      email\n    }\n    ads {\n      title\n      price\n      picture\n      location\n      id\n      description\n      createdAt\n      category {\n        id\n        name\n      }\n    }\n  }\n}\n\n": types.QueryTagDocument,
    "\nquery Tags {\n  tags {\n    id\n    name\n    createdBy {\n      id\n      email\n    } \n  }\n}\n": types.TagsDocument,
    "\nmutation Signin($email: String!, $password: String! ) {\n  signin(email: $email, password: $password) {\n    id\n    email\n  }\n}": types.SigninDocument,
    "\nmutation Mutation {\n  signout\n}\n  ": types.MutationDocument,
    "\nmutation UpdateAd($data: AdUpdateInput!, $id:ID!) {\n  updateAd(data: $data, id:$id) {\n    id\n   \n  }\n}\n": types.UpdateAdDocument,
    "\nmutation UpdateCategory($data: CategoryUpdateInput!, $id:ID!) {\n  updateCategory(data: $data, id:$id) {\n    id\n  }\n}\n": types.UpdateCategoryDocument,
    "\nmutation UpdateTag($data: TagUpdateInput!, $id:ID!) {\n  updateTag(data: $data, id:$id) {\n    id\n  }\n}\n": types.UpdateTagDocument,
    "\nquery Whoami {\n  whoami {\n    id\n    email\n    role\n  }\n}\n": types.WhoamiDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateAd($data: AdCreateInput!) {\n  createAd(data: $data) {\n    id\n    createdBy {\n      id\n      email\n      role\n      }\n  }\n}\n"): (typeof documents)["\nmutation CreateAd($data: AdCreateInput!) {\n  createAd(data: $data) {\n    id\n    createdBy {\n      id\n      email\n      role\n      }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateCategory($data: CategoryCreateInput!) {\n  createCategory(data: $data) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation CreateCategory($data: CategoryCreateInput!) {\n  createCategory(data: $data) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateTag($data: TagCreateInput!) {\n  createTag(data: $data) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation CreateTag($data: TagCreateInput!) {\n  createTag(data: $data) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateUser($data: UserCreateInput!) {\n    createUser(data: $data) {\n      id\n      email\n    }\n  }"): (typeof documents)["\nmutation CreateUser($data: UserCreateInput!) {\n    createUser(data: $data) {\n      id\n      email\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteAd($id: ID!) {\n  deleteAd(id: $id) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation DeleteAd($id: ID!) {\n  deleteAd(id: $id) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteCategory($id: ID!) {\n  deleteCategory(id: $id) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation DeleteCategory($id: ID!) {\n  deleteCategory(id: $id) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation DeleteTag($id: ID!) {\n  deleteTag(id: $id) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation DeleteTag($id: ID!) {\n  deleteTag(id: $id) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Ad($id: ID!) {\n  ad(id: $id) {\n    createdAt\n    description\n    id\n    location\n    picture\n    price\n    title\n    createdBy {\n      id\n      email\n      role\n    }\n    category {\n      id\n      name\n    }\n    tags {\n      id\n      name\n    }\n  }\n}\n"): (typeof documents)["\nquery Ad($id: ID!) {\n  ad(id: $id) {\n    createdAt\n    description\n    id\n    location\n    picture\n    price\n    title\n    createdBy {\n      id\n      email\n      role\n    }\n    category {\n      id\n      name\n    }\n    tags {\n      id\n      name\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Ads{\n  ads {\n    id\n    picture\n    title\n    price\n    createdAt\n    createdBy {\n      id\n      email\n      role\n    }\n    category {\n      id\n      name\n    }\n  }\n}\n"): (typeof documents)["\nquery Ads{\n  ads {\n    id\n    picture\n    title\n    price\n    createdAt\n    createdBy {\n      id\n      email\n      role\n    }\n    category {\n      id\n      name\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Categories {\n  categories {\n    id\n    name\n    createdAt\n    createdBy {\n      id\n      email\n    }\n  }    \n}\n"): (typeof documents)["\nquery Categories {\n  categories {\n    id\n    name\n    createdAt\n    createdBy {\n      id\n      email\n    }\n  }    \n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Category($categoryId: ID!) {\n  category(id: $categoryId) {\n    id\n    name\n    createdBy {\n      id\n      email\n    }\n    ads {\n      id\n      title\n      picture\n      price\n      description\n      location\n      createdAt\n      createdBy {\n      id\n      email\n    }    \n      tags {\n        id\n        name\n      }\n      category {\n        id\n        name\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery Category($categoryId: ID!) {\n  category(id: $categoryId) {\n    id\n    name\n    createdBy {\n      id\n      email\n    }\n    ads {\n      id\n      title\n      picture\n      price\n      description\n      location\n      createdAt\n      createdBy {\n      id\n      email\n    }    \n      tags {\n        id\n        name\n      }\n      category {\n        id\n        name\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery QueryTag($tagId: ID!) { \n  tag(id: $tagId) {\n    id\n    name\n    createdBy {\n      id\n      email\n    }\n    ads {\n      title\n      price\n      picture\n      location\n      id\n      description\n      createdAt\n      category {\n        id\n        name\n      }\n    }\n  }\n}\n\n"): (typeof documents)["\nquery QueryTag($tagId: ID!) { \n  tag(id: $tagId) {\n    id\n    name\n    createdBy {\n      id\n      email\n    }\n    ads {\n      title\n      price\n      picture\n      location\n      id\n      description\n      createdAt\n      category {\n        id\n        name\n      }\n    }\n  }\n}\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Tags {\n  tags {\n    id\n    name\n    createdBy {\n      id\n      email\n    } \n  }\n}\n"): (typeof documents)["\nquery Tags {\n  tags {\n    id\n    name\n    createdBy {\n      id\n      email\n    } \n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation Signin($email: String!, $password: String! ) {\n  signin(email: $email, password: $password) {\n    id\n    email\n  }\n}"): (typeof documents)["\nmutation Signin($email: String!, $password: String! ) {\n  signin(email: $email, password: $password) {\n    id\n    email\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation Mutation {\n  signout\n}\n  "): (typeof documents)["\nmutation Mutation {\n  signout\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateAd($data: AdUpdateInput!, $id:ID!) {\n  updateAd(data: $data, id:$id) {\n    id\n   \n  }\n}\n"): (typeof documents)["\nmutation UpdateAd($data: AdUpdateInput!, $id:ID!) {\n  updateAd(data: $data, id:$id) {\n    id\n   \n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateCategory($data: CategoryUpdateInput!, $id:ID!) {\n  updateCategory(data: $data, id:$id) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation UpdateCategory($data: CategoryUpdateInput!, $id:ID!) {\n  updateCategory(data: $data, id:$id) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation UpdateTag($data: TagUpdateInput!, $id:ID!) {\n  updateTag(data: $data, id:$id) {\n    id\n  }\n}\n"): (typeof documents)["\nmutation UpdateTag($data: TagUpdateInput!, $id:ID!) {\n  updateTag(data: $data, id:$id) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Whoami {\n  whoami {\n    id\n    email\n    role\n  }\n}\n"): (typeof documents)["\nquery Whoami {\n  whoami {\n    id\n    email\n    role\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;