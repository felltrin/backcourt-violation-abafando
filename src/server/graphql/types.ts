import { GraphQLResolveInfo } from 'graphql';
import { User, Post } from '@prisma/client';
import { Context } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Driver = {
  __typename?: 'Driver';
  avatarInitials: Scalars['String']['output'];
  eta: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  licensePlate: Scalars['String']['output'];
  name: Scalars['String']['output'];
  rating: Scalars['Float']['output'];
  trips: Scalars['Int']['output'];
  vehicle: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  createUser: User;
  deletePost: Post;
  deleteUser: User;
  publishPost: Post;
  updatePost: Post;
  updateUser: User;
};


export type MutationCreatePostArgs = {
  authorId: Scalars['String']['input'];
  content?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationPublishPostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdatePostArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  published?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  authorId: Scalars['String']['output'];
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  published: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  post?: Maybe<Post>;
  posts: Array<Post>;
  publishedPosts: Array<Post>;
  savedPlaces?: Maybe<Array<SavedPlace>>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type RecentLocation = {
  __typename?: 'RecentLocation';
  address: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type RideHistory = {
  __typename?: 'RideHistory';
  date: Scalars['String']['output'];
  distance: Scalars['String']['output'];
  driverName: Scalars['String']['output'];
  driverRating: Scalars['Float']['output'];
  dropoff: Scalars['String']['output'];
  duration: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  pickup: Scalars['String']['output'];
  price: Scalars['String']['output'];
  status: Scalars['String']['output'];
  vehicleType: Scalars['String']['output'];
};

export type RideType = {
  __typename?: 'RideType';
  basePrice: Scalars['Float']['output'];
  capacity: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  eta: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  priceMultiplier: Scalars['Float']['output'];
};

export type SavedPlace = {
  __typename?: 'SavedPlace';
  address: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type SearchSuggestion = {
  __typename?: 'SearchSuggestion';
  address: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  posts: Array<Post>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Driver: ResolverTypeWrapper<Driver>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Post: ResolverTypeWrapper<Post>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  RecentLocation: ResolverTypeWrapper<RecentLocation>;
  RideHistory: ResolverTypeWrapper<RideHistory>;
  RideType: ResolverTypeWrapper<RideType>;
  SavedPlace: ResolverTypeWrapper<SavedPlace>;
  SearchSuggestion: ResolverTypeWrapper<SearchSuggestion>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Driver: Driver;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: Record<PropertyKey, never>;
  Post: Post;
  Query: Record<PropertyKey, never>;
  RecentLocation: RecentLocation;
  RideHistory: RideHistory;
  RideType: RideType;
  SavedPlace: SavedPlace;
  SearchSuggestion: SearchSuggestion;
  String: Scalars['String']['output'];
  User: User;
};

export type DriverResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Driver'] = ResolversParentTypes['Driver']> = {
  avatarInitials?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  eta?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  licensePlate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  trips?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  vehicle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'authorId' | 'title'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email'>>;
  deletePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  publishPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationPublishPostArgs, 'id'>>;
  updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'id'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id'>>;
};

export type PostResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  published?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  publishedPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  savedPlaces?: Resolver<Maybe<Array<ResolversTypes['SavedPlace']>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type RecentLocationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RecentLocation'] = ResolversParentTypes['RecentLocation']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  lng?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type RideHistoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RideHistory'] = ResolversParentTypes['RideHistory']> = {
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  distance?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  driverName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  driverRating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  dropoff?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pickup?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vehicleType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type RideTypeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RideType'] = ResolversParentTypes['RideType']> = {
  basePrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  capacity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  eta?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priceMultiplier?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
};

export type SavedPlaceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SavedPlace'] = ResolversParentTypes['SavedPlace']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type SearchSuggestionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SearchSuggestion'] = ResolversParentTypes['SearchSuggestion']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  lng?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Driver?: DriverResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RecentLocation?: RecentLocationResolvers<ContextType>;
  RideHistory?: RideHistoryResolvers<ContextType>;
  RideType?: RideTypeResolvers<ContextType>;
  SavedPlace?: SavedPlaceResolvers<ContextType>;
  SearchSuggestion?: SearchSuggestionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

