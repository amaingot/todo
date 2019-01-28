
// Human Generated
export interface Todo {
  __typename: 'Todo';
  id: string;
  description: string;
  done: boolean;
}

// Machine Generated
export interface CreateTodoInput {
  id?: string | null;
  description: string;
  done: boolean;
}

export interface UpdateTodoInput {
  id: string;
  description?: string | null;
  done?: boolean | null;
}

export interface DeleteTodoInput {
  id?: string | null;
}

export interface ModelTodoFilterInput {
  id?: ModelIDFilterInput | null;
  description?: ModelStringFilterInput | null;
  done?: ModelBooleanFilterInput | null;
  and?: Array<ModelTodoFilterInput | null> | null;
  or?: Array<ModelTodoFilterInput | null> | null;
  not?: ModelTodoFilterInput | null;
}

export interface ModelIDFilterInput {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
}

export interface ModelStringFilterInput {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
}

export interface ModelBooleanFilterInput {
  ne?: boolean | null;
  eq?: boolean | null;
}

export interface CreateTodoMutationVariables {
  input: CreateTodoInput;
}

export interface CreateTodoMutationData {
  createTodo: Todo | null;
}

export interface UpdateTodoMutationVariables {
  input: UpdateTodoInput;
}

export interface UpdateTodoMutationData {
  updateTodo: Todo | null;
}

export interface DeleteTodoMutationVariables {
  input: DeleteTodoInput;
}

export interface DeleteTodoMutationData {
  deleteTodo: Todo | null;
}

export interface GetTodoQueryVariables {
  id: string;
}

export interface GetTodoQueryData {
  getTodo: Todo | null;
}

export interface ListTodosQueryVariables {
  filter?: ModelTodoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
}

export interface ListTodosQueryData {
  listTodos: {
    __typename: 'ModelTodoConnection';
    items: Array<Todo | null> | null;
    nextToken: string | null;
  } | null;
}

export interface OnCreateTodoSubscriptionData {
  onCreateTodo: Todo | null;
}

export interface OnUpdateTodoSubscriptionData {
  onUpdateTodo: Todo | null;
}

export interface OnDeleteTodoSubscriptionData {
  onDeleteTodo: Todo | null;
}
