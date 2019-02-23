export type Maybe<T> = T | null;

export interface LoginRequestType {
  username: string;

  password: string;
}
/** Identifies user access level */
export enum UserRole {
  Admin = "Admin",
  Guest = "Guest",
  Regular = "Regular"
}

/** Bson ObjectId unique identifier (hexadecimal string). */
export type ObjectId = string;

/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
export type DateTime = string;

// ====================================================
// Documents
// ====================================================

export namespace QueryUser {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    getUser: GetUser;
  };

  export type GetUser = {
    __typename?: "User";

    init_date: string;

    role: UserRole;

    username: string;
  };
}

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export namespace QueryUser {
  export const Document = gql`
    query queryUser($id: ObjectId!) {
      getUser(id: $id) {
        init_date
        role
        username
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.DataProps<Query, Variables>
  > &
    TChildProps;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Query,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Query, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
